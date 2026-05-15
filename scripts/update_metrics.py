#!/usr/bin/env python3
"""Update homepage metrics for Google Scholar citations and GitHub stars."""

from __future__ import annotations

import argparse
import copy
import json
import os
import sys
import urllib.error
import urllib.request
from datetime import datetime
from multiprocessing import get_context
from pathlib import Path
from queue import Empty
from typing import Any
from zoneinfo import ZoneInfo


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_METRICS = REPO_ROOT / "_data" / "metrics.json"
DEFAULT_SCHOLAR_ID = "Qd_hX1cAAAAJ"
DATE_FORMAT = "%B %-d, %Y" if sys.platform != "win32" else "%B %#d, %Y"
LOCAL_TZ = ZoneInfo("Asia/Shanghai")

PUBLICATION_MATCHERS = {
    "mmmu": ["mmmu: a massive multi-discipline multimodal understanding"],
    "anygpt": ["anygpt: unified multimodal llm"],
    "rq_rag": ["rq-rag:", "learning to refine queries for retrieval augmented generation"],
    "cmmmu": ["cmmmu: a chinese massive multi-discipline multimodal understanding"],
    "coig": ["chinese open instruction generalist"],
    "coig_cqia": ["coig-cqia:"],
    "omnibench": ["omnibench:"],
    "yue": ["yue: scaling open foundation models"],
    "mert": ["mert: acoustic music understanding model"],
    "marble": ["marble: music audio representation benchmark"],
    "clamp2": ["clamp 2:"],
    "clamp3": ["clamp 3:"],
    "speech_ssl_music": ["on the effectiveness of speech self-supervised learning for music"],
    "lyricwhiz": ["lyricwhiz:"],
    "chatmusician": ["chatmusician:"],
    "composerx": ["composerx:"],
    "mupt": ["mupt:"],
    "deid_vc": ["deid-vc:"],
}


def today_label() -> str:
    return datetime.now(LOCAL_TZ).strftime(DATE_FORMAT)


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_previous_from_url(url: str) -> dict[str, Any] | None:
    request = urllib.request.Request(url, headers={"User-Agent": "a43992899-homepage-metrics"})
    try:
        with urllib.request.urlopen(request, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError):
        return None


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def compact_stars(stars: int) -> str:
    if stars >= 1000:
        return f"{stars / 1000:.1f}k+"
    return str(stars)


def fetch_json(url: str, token: str | None = None) -> dict[str, Any]:
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "a43992899-homepage-metrics",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def update_github_metrics(metrics: dict[str, Any], errors: list[str]) -> None:
    token = os.environ.get("GITHUB_TOKEN")
    repo = metrics.get("github", {}).get("yue", {}).get("repo", "multimodal-art-projection/YuE")
    try:
        repo_data = fetch_json(f"https://api.github.com/repos/{repo}", token=token)
        stars = int(repo_data["stargazers_count"])
        metrics.setdefault("github", {})["yue"] = {
            "repo": repo,
            "stars": stars,
            "stars_display": compact_stars(stars),
            "updated_at": today_label(),
        }
    except Exception as exc:  # noqa: BLE001
        errors.append(f"GitHub stars update failed: {exc}")


def publication_title(publication: dict[str, Any]) -> str:
    bib = publication.get("bib") or {}
    return str(bib.get("title") or publication.get("title") or "").strip()


def build_scholar_payload(scholar_id: str) -> dict[str, Any]:
    from scholarly import scholarly  # type: ignore

    author = scholarly.search_author_id(scholar_id)
    author = scholarly.fill(author, sections=["basics", "indices", "counts", "publications"])
    publication_metrics: dict[str, dict[str, int]] = {}
    scholar_publications = author.get("publications", [])
    for key, matchers in PUBLICATION_MATCHERS.items():
        best_citations = None
        for publication in scholar_publications:
            title = publication_title(publication).lower()
            if any(matcher in title for matcher in matchers):
                citations = publication.get("num_citations")
                if citations is None:
                    continue
                citations = int(citations)
                if best_citations is None or citations > best_citations:
                    best_citations = citations
        if best_citations is not None:
            publication_metrics[key] = {"citations": best_citations}

    return {
        "scholar": {
            "source": "Google Scholar",
            "profile_url": f"https://scholar.google.com/citations?user={scholar_id}",
            "updated_at": today_label(),
            "citations": author.get("citedby"),
            "h_index": author.get("hindex"),
            "i10_index": author.get("i10index"),
        },
        "publications": publication_metrics,
    }


def scholar_worker(queue: Any, scholar_id: str) -> None:
    try:
        queue.put({"ok": True, "payload": build_scholar_payload(scholar_id)})
    except Exception as exc:  # noqa: BLE001
        queue.put({"ok": False, "error": str(exc)})


def update_scholar_with_scholarly(
    metrics: dict[str, Any],
    errors: list[str],
    timeout_seconds: int,
) -> bool:
    scholar_id = os.environ.get("GOOGLE_SCHOLAR_ID", DEFAULT_SCHOLAR_ID)
    context = get_context("spawn")
    queue = context.Queue()
    process = context.Process(target=scholar_worker, args=(queue, scholar_id))
    process.start()
    process.join(timeout_seconds)

    if process.is_alive():
        process.terminate()
        process.join(5)
        errors.append(f"Google Scholar update timed out after {timeout_seconds}s")
        return False

    try:
        result = queue.get_nowait()
    except Empty:
        errors.append("Google Scholar update failed without returning a result")
        return False

    if not result.get("ok"):
        errors.append(f"Google Scholar update failed: {result.get('error')}")
        return False

    payload = result["payload"]
    scholar = metrics.setdefault("scholar", {})
    for key, value in payload["scholar"].items():
        if value is not None:
            scholar[key] = value

    publications = metrics.setdefault("publications", {})
    for key, value in payload["publications"].items():
        publications.setdefault(key, {}).update(value)

    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--previous-url", default="")
    parser.add_argument("--skip-scholar", action="store_true")
    parser.add_argument("--scholar-timeout-seconds", type=int, default=75)
    args = parser.parse_args()

    metrics = load_json(DEFAULT_METRICS)
    if args.previous_url:
        previous = load_previous_from_url(args.previous_url)
        if previous:
            metrics = previous

    metrics = copy.deepcopy(metrics)
    errors: list[str] = []

    update_github_metrics(metrics, errors)
    if not args.skip_scholar:
        update_scholar_with_scholarly(metrics, errors, args.scholar_timeout_seconds)

    metrics["updated_at"] = today_label()
    if errors:
        metrics["update_errors"] = errors
    else:
        metrics.pop("update_errors", None)

    write_json(args.output, metrics)
    for error in errors:
        print(error, file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
