---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

<section class="profile-hero">
<div class="hero-copy" markdown="1">

<p class="hero-kicker">Open Music AGI · Multimodal Foundation Models · Creative AI</p>
# Ruibin Yuan

I am a PhD student in Artificial Intelligence at HKUST, an AI researcher, developer, and musician working on open music AGI. My research sits at the intersection of music generation, music understanding, multimodal LLMs, and the open data and systems needed to make creative AI genuinely useful.

I co-founded the [Multimodal Art Projection Research Community](https://huggingface.co/m-a-p), lead MAP's multimodal and AI music direction, and have led or contributed to [YuE](https://github.com/multimodal-art-projection/YuE), MERT, MARBLE, ChatMusician, MMMU/CMMMU, COIG, and other open research infrastructure.

<div class="hero-actions" markdown="1">
[Google Scholar](https://scholar.google.com/citations?user=Qd_hX1cAAAAJ){: .btn}
[GitHub Profile](https://github.com/a43992899){: .btn}
[MAP](https://huggingface.co/m-a-p){: .btn}
</div>

</div>
<aside class="hero-identity">
<img src="/images/WechatIMG24.jpg" alt="Ruibin Yuan" />
<strong>Teaching AGI music</strong>
<span>HKUST PhD · MAP cofounder</span>
<span>Hong Kong · remote collaboration</span>
</aside>
</section>

<section class="impact-strip" markdown="1">
<div markdown="1">
<strong data-metric="scholar.citations">{{ site.data.metrics.scholar.citations | default: 6111 }}</strong>
<span>Google Scholar citations</span>
</div>
<div markdown="1">
<strong data-metric="scholar.h_index">{{ site.data.metrics.scholar.h_index | default: 29 }}</strong>
<span>Google Scholar h-index</span>
</div>
<div markdown="1">
<strong data-metric="scholar.i10_index">{{ site.data.metrics.scholar.i10_index | default: 41 }}</strong>
<span>Google Scholar i10-index</span>
</div>
<div markdown="1">
<strong data-metric="github.yue.stars_display">{{ site.data.metrics.github.yue.stars_display | default: "6.2k+" }}</strong>
<span>GitHub stars on YuE</span>
</div>
</section>

<p class="metric-note">Citation metrics are from <a href="https://scholar.google.com/citations?user=Qd_hX1cAAAAJ">Google Scholar</a>, captured on <span data-metric="scholar.updated_at">{{ site.data.metrics.scholar.updated_at | default: "May 16, 2026" }}</span>. The page refreshes these numbers automatically.</p>

<span class='anchor' id='research-areas'></span>

## Research Areas

<section class="research-grid" markdown="1">
<div class="research-card area-music-generation" markdown="1">
### Music Generation
Full-song generation, symbolic music LLMs, text and melody control, and open alternatives for high-fidelity creative music systems.

<span>YuE</span><span>Qwen-Omni</span><span>ChatMusician</span><span>MuPT</span>
</div>

<div class="research-card area-music-understanding" markdown="1">
### Music Understanding
Self-supervised music audio representation, multilingual MIR, cross-modal retrieval, and practical evaluation for music intelligence.

<span>MERT</span><span>MARBLE</span><span>CLaMP 2/3</span><span>SongFormer</span>
</div>

<div class="research-card area-multimodal" markdown="1">
### Multimodal LLMs and Benchmarks
Discrete multimodal modeling, expert-level reasoning benchmarks, Chinese multimodal evaluation, and generalist instruction data.

<span>MMMU</span><span>CMMMU</span><span>AnyGPT</span><span>OmniBench</span>
</div>

<div class="research-card area-systems" markdown="1">
### Open Research Infrastructure
Open datasets, reproducible training pipelines, benchmark design, community releases, and tooling for researchers and builders.

<span>MAP</span><span>COIG</span><span>RQ-RAG</span><span>Open data</span>
</div>
</section>

<span class='anchor' id='work'></span>

## Selected Work

<div class="work-grid" markdown="1">
<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Open music model</span><span class="star-pill" data-metric="github.yue.stars_display" data-metric-suffix=" stars">{{ site.data.metrics.github.yue.stars_display | default: "6.2k+" }} stars</span></div>
### [YuE / OpenSuno](https://github.com/multimodal-art-projection/YuE)
Open full-song music generation foundation model, designed as an open alternative in the direction of systems such as Suno and Udio.
</div>

<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Omni-modal foundation models</span><span class="star-pill">Qwen-Omni</span></div>
### [Qwen-Omni Series](https://github.com/QwenLM/Qwen3-Omni)
Omni-modal foundation model work across text, image, audio, video, and real-time speech interaction, spanning the Qwen2.5-Omni and Qwen3-Omni line.
</div>

<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Music LLM</span><span class="star-pill">ACL Findings</span></div>
### [ChatMusician](https://huggingface.co/collections/m-a-p/chatmusician-65de07b3b87b189c2a588329)
Symbolic music LLM research, large-scale music-language data, and advanced music understanding evaluation.
</div>

<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Music understanding</span><span class="star-pill">ICLR / NeurIPS</span></div>
### [MERT](https://huggingface.co/collections/m-a-p/mert-65a2cb498448f47df2d9e927) and [MARBLE](https://marble-bm.shef.ac.uk)
Self-supervised music audio representation learning and unified benchmark design for music understanding.
</div>

<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Multimodal benchmark</span><span class="star-pill">CVPR</span></div>
### [MMMU / CMMMU](https://mmmu-benchmark.github.io)
Expert-level multimodal understanding benchmarks for testing reasoning across university-level disciplines and Chinese multimodal settings.
</div>

<div class="work-card" markdown="1">
<div class="project-meta"><span class="project-type">Open community</span><span class="star-pill">MAP</span></div>
### [Multimodal Art Projection](https://huggingface.co/m-a-p)
Open research community for multimodal art, music intelligence, datasets, checkpoints, and reproducible releases.
</div>
</div>

<span class='anchor' id='publications'></span>

## Selected Publications and Manuscripts

### Flagship Music and Audio Generation

<div class="publication-list" markdown="1">
<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-iclr">ICLR 2026</span><span class="topic-pill">Open full-song generation</span><span class="star-pill" data-metric="github.yue.stars_display" data-metric-suffix=" stars">{{ site.data.metrics.github.yue.stars_display | default: "6.2k+" }} stars</span></div>
#### [YuE: Scaling Open Foundation Models for Long-Form Music Generation](https://openreview.net/forum?id=hZy6YG2Ij8)
**Ruibin Yuan**, Hanfeng Lin, Shuyue Guo, Ge Zhang, Jiahao Pan, et al.

Open foundation model family for long-form lyrics-to-song generation; ICLR 2026 poster.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-iclr">ICLR 2026</span><span class="topic-pill">Anything-to-audio</span></div>
#### [AudioX: A Unified Framework for Anything-to-Audio Generation](https://openreview.net/forum?id=qjJWxK3yWo)
Zeyue Tian, Zhaoyang Liu, Yizhu Jin, **Ruibin Yuan**, Liumeng Xue, Xu Tan, Qifeng Chen, Wei Xue, Yike Guo.

Unified diffusion framework for multimodal-conditioned audio and music generation; ICLR 2026 poster.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-siggraph">SIGGRAPH 2026</span><span class="topic-pill">Audio understanding/generation/editing</span></div>
#### [Audio-Omni: Extending Multi-modal Understanding to Versatile Audio Generation and Editing](https://zeyuet.github.io/Audio-Omni/)
Zeyue Tian, Binxin Yang, Zhaoyang Liu, Jiexuan Zhang, **Ruibin Yuan**, Hubery Yin, Qifeng Chen, Chen Li, Jing Lv, Wei Xue, Yike Guo.

Unified framework spanning general sound, music, speech understanding, generation, and editing; SIGGRAPH 2026.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-cvpr">CVPR 2025</span><span class="topic-pill">Video-to-music generation</span></div>
#### [VidMuse: A Simple Video-to-Music Generation Framework with Long-Short-Term Modeling](https://openaccess.thecvf.com/content/CVPR2025/papers/Tian_VidMuse_A_Simple_Video-to-Music_Generation_Framework_with_Long-Short-Term_Modeling_CVPR_2025_paper.pdf)
Zeyue Tian*, Zhaoyang Liu*, **Ruibin Yuan**, Jiahao Pan, Qifeng Liu, Xu Tan, Qifeng Chen, Wei Xue, Yike Guo.

Video-conditioned music generation with long-short-term visual modeling; CVPR 2025.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-iclr">ICLR 2025</span><span class="topic-pill">Symbolic pretraining</span><span class="cite-pill" data-metric="publications.mupt.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.mupt.citations | default: 35 }}</span></div>
#### [MuPT: A Generative Symbolic Music Pretrained Transformer](https://proceedings.iclr.cc/paper_files/paper/2025/hash/73f6f8897896f7bda86ea7d1ebc1dc4f-Abstract-Conference.html)
Xingwei Qu, Yuelin Bai, Yinghao Ma, Ziya Zhou, Ka Man Lo, Jiaheng Liu, **Ruibin Yuan**, et al.

Generative pretraining for symbolic music modeling and controllable composition.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-acl">ACL Findings 2024</span><span class="topic-pill">Symbolic music LLM</span><span class="cite-pill" data-metric="publications.chatmusician.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.chatmusician.citations | default: 125 }}</span></div>
#### [ChatMusician: Understanding and Generating Music Intrinsically with LLM](https://aclanthology.org/2024.findings-acl.373/)
**Ruibin Yuan**, Hanfeng Lin, Yi Wang, Zeyue Tian, et al.

Music-language modeling that treats symbolic music as a native language for understanding and generation.
</div>
</div>

### High-Impact Multimodal and LLM Work

<div class="publication-list" markdown="1">
<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-cvpr">CVPR 2024</span><span class="topic-pill">Expert AGI benchmark</span><span class="cite-pill" data-metric="publications.mmmu.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.mmmu.citations | default: 2303 }}</span></div>
#### [MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI](https://doi.org/10.1109/cvpr52733.2024.00913)
Xiang Yue*, Yuansheng Ni*, Kai Zhang*, Tianyu Zheng*, et al., **Ruibin Yuan**, et al.

Large-scale multimodal benchmark across college-level disciplines and expert reasoning tasks.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-acl">ACL 2024 Main</span><span class="topic-pill">Unified multimodal LLM</span><span class="cite-pill" data-metric="publications.anygpt.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.anygpt.citations | default: 298 }}</span></div>
#### [AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling](https://doi.org/10.18653/v1/2024.acl-long.521)
Jun Zhan, Junqi Dai, Jiasheng Ye, Yunhua Zhou, et al., **Ruibin Yuan**, et al.

Unified discrete sequence modeling for language, image, audio, and speech modalities.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-neurips">NeurIPS 2025</span><span class="topic-pill">Omni-language evaluation</span></div>
#### [OmniBench: Towards The Future of Universal Omni-Language Models](https://nips.cc/virtual/2025/poster/121644)
Yizhi Li, Ge Zhang, Yinghao Ma, **Ruibin Yuan**, Kang Zhu, Hangyu Guo, et al.

Tri-modal benchmark for integrated visual, acoustic, and textual reasoning in omni-language models.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-colm">COLM 2024</span><span class="topic-pill">Retrieval-augmented generation</span><span class="cite-pill" data-metric="publications.rq_rag.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.rq_rag.citations | default: 277 }}</span></div>
#### [RQ-RAG: Learning to Refine Queries for Retrieval Augmented Generation](https://openreview.net/forum?id=tzE7VqsaJ4)
Chi-Min Chan, Chunpu Xu, **Ruibin Yuan**, Hongyin Luo, Wei Xue, Yike Guo, Jie Fu.

Query refinement for stronger retrieval-augmented generation.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-iclr">ICLR 2026</span><span class="topic-pill">Expressive S2ST</span></div>
#### [UniSS: Unified Expressive Speech-to-Speech Translation with Your Voice](https://openreview.net/forum?id=5o0ZvYzh6B)
Sitong Cheng, Weizhen Bian, Xinsheng Wang, **Ruibin Yuan**, Jianyi Chen, Shunshun Yin, Yike Guo, Wei Xue.

Single-stage expressive speech-to-speech translation preserving content, speaker identity, emotion, and duration; ICLR 2026 poster.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-naacl">NAACL Findings 2025</span><span class="topic-pill">Instruction data quality</span></div>
#### [COIG-CQIA: Quality is All You Need for Chinese Instruction Fine-tuning](https://aclanthology.org/2025.findings-naacl.457/)
Yuelin Bai, Xeron Du, Yiming Liang, Leo Jin, Junting Zhou, et al., **Ruibin Yuan**, et al.

High-quality Chinese instruction data construction and fine-tuning.
</div>

</div>

### Music Understanding and MIR

<div class="publication-list" markdown="1">
<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-iclr">ICLR 2024</span><span class="topic-pill">Music representation</span><span class="cite-pill" data-metric="publications.mert.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.mert.citations | default: 329 }}</span></div>
#### [MERT: Acoustic Music Understanding Model with Large-Scale Self-supervised Training](https://openreview.net/forum?id=w3YZ9MSlBu)
Yizhi Li*, **Ruibin Yuan***, Ge Zhang*, Yinghao Ma*, et al.

Large-scale self-supervised acoustic music model for transferable music understanding.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-neurips">NeurIPS 2023</span><span class="topic-pill">Music benchmark</span><span class="cite-pill" data-metric="publications.marble.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.marble.citations | default: 59 }}</span></div>
#### [MARBLE: Music Audio Representation Benchmark for Universal Evaluation](https://proceedings.neurips.cc/paper_files/paper/2023/hash/7cbeec46f979618beafb4f46d8f39f36-Abstract-Datasets_and_Benchmarks.html)
**Ruibin Yuan***, Yinghao Ma*, Yizhi Li*, Ge Zhang*, et al.

Unified benchmark for evaluating music audio representations across diverse MIR tasks.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-acl">ACL Findings 2025</span><span class="topic-pill">Universal music retrieval</span></div>
#### [CLaMP 3: Universal Music Information Retrieval Across Unaligned Modalities and Unseen Languages](https://aclanthology.org/2025.findings-acl.133/)
Shangda Wu, Zhancheng Guo, **Ruibin Yuan**, Junyan Jiang, Seungheon Doh, Gus Xia, Juhan Nam, et al.

Universal music information retrieval across unaligned modalities and unseen languages.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-naacl">NAACL Findings 2025</span><span class="topic-pill">Multilingual music retrieval</span><span class="cite-pill" data-metric="publications.clamp2.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.clamp2.citations | default: 19 }}</span></div>
#### [CLaMP 2: Multimodal Music Information Retrieval Across 101 Languages Using Large Language Models](https://doi.org/10.18653/v1/2025.findings-naacl.27)
Shangda Wu, Yashan Wang, **Ruibin Yuan**, Zhancheng Guo, Xu Tan, Ge Zhang, et al.

Multilingual music information retrieval across text, audio, and symbolic music interfaces.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-ismir">ISMIR 2023</span><span class="topic-pill">Lyrics transcription</span><span class="cite-pill" data-metric="publications.lyricwhiz.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.lyricwhiz.citations | default: 43 }}</span></div>
#### [LyricWhiz: Robust Multilingual Zero-shot Lyrics Transcription by Whispering to ChatGPT](https://doi.org/10.5281/zenodo.10265295)
Le Zhuo, **Ruibin Yuan**, Jiahao Pan, Yinghao Ma, et al.

Multilingual zero-shot lyrics transcription using speech recognition and LLM post-processing.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-arxiv">Preprint 2025</span><span class="topic-pill">Music structure analysis</span></div>
#### [SongFormer: Scaling Music Structure Analysis with Heterogeneous Supervision](https://arxiv.org/abs/2510.02797)
Chunbo Hao, **Ruibin Yuan**, Jixun Yao, Qixin Deng, Xinyi Bai, Wei Xue, Lei Xie.

Large-scale heterogeneous supervision for music structure analysis, with SongFormDB and SongFormBench.
</div>
</div>

### Selected Benchmarks, Data, and Earlier Work

<div class="publication-list" markdown="1">
<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-ismir">ISMIR 2024</span><span class="topic-pill">Multi-agent composition</span><span class="cite-pill" data-metric="publications.composerx.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.composerx.citations | default: 67 }}</span></div>
#### [ComposerX: Multi-Agent Symbolic Music Composition with LLMs](https://doi.org/10.5281/zenodo.14877425)
**Ruibin Yuan**, et al.

Multi-agent symbolic composition framework for structured music creation with language models.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-ismir">ISMIR 2024</span><span class="topic-pill">Music reasoning evaluation</span></div>
#### [Can LLMs "Reason" in Music? An Evaluation of LLMs' Capability of Music Understanding and Generation](https://doi.org/10.5281/zenodo.14877281)
Ziya Zhou, Yuhang Wu, Zhiyue Wu, Xinyue Zhang, **Ruibin Yuan**, Yinghao Ma, et al.

Evaluation of LLMs on symbolic music understanding, generation, and multi-step music reasoning.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-arxiv">Preprint 2026</span><span class="topic-pill">Global music QA</span></div>
#### [Voices of Civilizations: A Multilingual QA Benchmark for Global Music Understanding](https://arxiv.org/abs/2603.00533)
Shangda Wu, Ziya Zhou, Yongyi Zang, Yutong Zheng, Dafang Liang, **Ruibin Yuan**, Qiuqiang Kong.

Multilingual benchmark for music understanding across cultural and linguistic contexts.
</div>

<div class="publication-card" markdown="1">
<div class="pub-card-top"><span class="venue-badge venue-interspeech">Interspeech 2022</span><span class="topic-pill">Voice conversion</span><span class="cite-pill" data-metric="publications.deid_vc.citations" data-metric-prefix="GS cites ">GS cites {{ site.data.metrics.publications.deid_vc.citations | default: 13 }}</span></div>
#### [DeID-VC: Speaker De-identification via Zero-shot Pseudo Voice Conversion](https://doi.org/10.21437/interspeech.2022-11036)
**Ruibin Yuan**, Yuxuan Wu, Jacob Li, Jaxter Kim.

Zero-shot pseudo voice conversion for privacy-preserving speaker de-identification.
</div>
</div>

See [Google Scholar](https://scholar.google.com/citations?user=Qd_hX1cAAAAJ) for the complete publication list.

<span class='anchor' id='collaborate'></span>

## Let's Build Together

<div class="collab-panel" markdown="1">
I am always open to collaboration with people who care about open music AI, large-scale training, evaluation, and creative tools. The shortest informal version of what I am exploring lives in my [GitHub profile README](https://github.com/a43992899), and the more academic version lives here.

Current ideas I am especially excited about:

- A public Lyrics2Song dataset.
- Better diffusion upsampling for YuE, especially fidelity and resolution.
- Better evaluation metrics for musicality.
- More controllability for full-song generation.
- A music arena for popular AI music systems.
- **NMLB (No Music Left Behind)**: collecting all human music, not only western music, and building open music understanding and generation models on top of it.

[GitHub Profile README](https://github.com/a43992899){: .btn}
[MAP Discord](https://discord.gg/Z8ZHxS44uE){: .btn}
[Buy Me a Coffee](https://buymeacoffee.com/ruibin){: .btn}
</div>

<section class="compact-profile-grid" markdown="1">
<div class="compact-profile-section" markdown="1">
<span class='anchor' id='experience'></span>

## Experience

<div class="timeline-list compact-timeline" markdown="1">
<div markdown="1">
**Qwen**<br>
Research Intern, Qwen-Omni Series.<br>
<span>2025.04 - present · Remote</span>
</div>

<div markdown="1">
**Moonshot.ai**<br>
Research Intern.<br>
<span>2024.09 - 2025.04 · Remote</span>
</div>

<div markdown="1">
**Stardust.ai**<br>
Part-time ML Consultant, Ex-engineer.<br>
<span>2020.05 - 2021 · Beijing</span>
</div>

<div markdown="1">
**NetEase, Inc.**<br>
Intern Machine Learning Engineer.<br>
<span>2019.12 - 2020.04 · Shanghai</span>
</div>
</div>
</div>

<div class="compact-profile-section" markdown="1">
<span class='anchor' id='education'></span>

## Education

<div class="timeline-list compact-timeline" markdown="1">
<div markdown="1">
**Hong Kong University of Science and Technology**<br>
PhD in Artificial Intelligence.<br>
<span>2023.09 - present · Hong Kong</span>
</div>

<div markdown="1">
**Carnegie Mellon University**<br>
M.S. in Music and Technology, Computer Science Emphasis.<br>
<span>2021.09 - 2023.05 · Pittsburgh</span>
</div>
</div>
</div>
</section>

<section class="music-note" markdown="1">
## Music

Lead guitarist, band cofounder, guitar club organizer, and longtime believer that intelligence without music is missing something essential.
</section>
