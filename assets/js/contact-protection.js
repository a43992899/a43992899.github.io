(function () {
  function decodeB64(value) {
    if (!value || !window.atob) {
      return "";
    }

    try {
      return window.atob(value);
    } catch (error) {
      return "";
    }
  }

  function emailFromDataset(element) {
    var chars = element.getAttribute("data-email-chars");
    var order = parseOrder(element.getAttribute("data-email-order"));

    if (chars && order.length === chars.length) {
      return restoreScrambled(chars, order);
    }

    var user = decodeB64(element.getAttribute("data-email-user"));
    var domain = decodeB64(element.getAttribute("data-email-domain"));
    return user && domain ? user + "@" + domain : "";
  }

  function parseOrder(value) {
    if (!value) {
      return [];
    }

    return value.split(",").map(function (item) {
      return parseInt(item, 10);
    }).filter(function (item) {
      return !Number.isNaN(item);
    });
  }

  function restoreScrambled(chars, order) {
    var restored = [];

    for (var index = 0; index < chars.length; index += 1) {
      restored[order[index]] = chars[index];
    }

    return restored.join("");
  }

  function scrambledCharsFromDataset(element) {
    return element.getAttribute("data-email-chars") || "";
  }

  function shuffleIndices(length) {
    var values = [];

    for (var index = 0; index < length; index += 1) {
      values.push(index);
    }

    for (var cursor = length - 1; cursor > 0; cursor -= 1) {
      var random = Math.floor(Math.random() * (cursor + 1));
      var tmp = values[cursor];
      values[cursor] = values[random];
      values[random] = tmp;
    }

    return values;
  }

  function renderText(label, text, displayOrder) {
    label.innerHTML = "";

    displayOrder.forEach(function (sourceIndex, spanIndex) {
      var span = document.createElement("span");
      span.className = "email-scramble__char";
      span.textContent = text[sourceIndex];
      span.style.order = spanIndex;
      label.appendChild(span);
    });
  }

  function sequentialIndices(length) {
    var values = [];

    for (var index = 0; index < length; index += 1) {
      values.push(index);
    }

    return values;
  }

  function renderObfuscatedEmail(button, label) {
    var hint = button.querySelector(".js-email-hint");

    button.classList.add("is-obfuscated");
    button.classList.remove("is-revealed");
    button.setAttribute("aria-label", "Click to reveal email address");
    button.setAttribute("title", "Click to reveal email address");
    if (hint) {
      hint.textContent = "Email";
    }
    label.textContent = "click to reveal";
  }

  function revealEmail(button, label, email) {
    var hint = button.querySelector(".js-email-hint");
    var chars = scrambledCharsFromDataset(button);

    button.classList.add("is-shuffling");
    if (chars) {
      renderText(label, chars, shuffleIndices(chars.length));
    }

    window.setTimeout(function () {
      renderText(label, email, sequentialIndices(email.length));
      button.classList.remove("is-obfuscated");
      button.classList.remove("is-shuffling");
      button.classList.add("is-revealed");
      if (hint) {
        hint.textContent = "Email";
      }
      button.setAttribute("aria-label", email + " (click to copy)");
      button.setAttribute("title", "Click to copy email address");
    }, 180);
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }

    var input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();

    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(input);
    }

    return Promise.resolve();
  }

  function showCopyButton(button) {
    if (!button) {
      return;
    }

    button.classList.remove("is-hidden");
    button.removeAttribute("aria-hidden");
    button.removeAttribute("tabindex");
  }

  function markCopied(button) {
    button.classList.add("is-copied");
    window.setTimeout(function () {
      button.classList.remove("is-copied");
    }, 1100);
  }

  function wireProtectedEmail() {
    var scrambleButtons = document.querySelectorAll(".js-protected-email");
    var copyButtons = document.querySelectorAll(".js-protected-email-copy");

    scrambleButtons.forEach(function (button) {
      var chars = scrambledCharsFromDataset(button);
      var label = button.querySelector(".js-email-label");

      if (!chars || !label) {
        return;
      }

      var container = button.closest(".protected-email");
      var copyButton = container ? container.querySelector(".js-protected-email-copy") : null;

      renderObfuscatedEmail(button, label);

      button.addEventListener("click", function (event) {
        event.preventDefault();
        var email = emailFromDataset(button);

        if (!email) {
          return;
        }

        if (button.classList.contains("is-revealed")) {
          copyText(email).then(function () {
            markCopied(button);
          });
          return;
        }

        revealEmail(button, label, email);

        if (container) {
          container.classList.add("is-revealed");
        }
        showCopyButton(copyButton);
      });
    });

    copyButtons.forEach(function (button) {
      var email = emailFromDataset(button);

      if (!email) {
        return;
      }

      button.addEventListener("click", function (event) {
        event.preventDefault();
        copyText(email).then(function () {
          markCopied(button);
        }).catch(function () {
          window.location.href = "mailto:" + email;
        });
      });
    });
  }

  function wireVisitorStats() {
    var panel = document.querySelector("[data-visitor-stats]");

    if (!panel) {
      return;
    }

    var apiUrl = panel.getAttribute("data-api-url");
    var total = panel.querySelector("[data-visitor-total]");
    var locations = panel.querySelector("[data-visitor-locations]");
    var updated = panel.querySelector("[data-visitor-updated]");

    if (!apiUrl || !window.fetch) {
      return;
    }

    window.fetch(apiUrl, { credentials: "omit" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Visitor stats request failed");
        }
        return response.json();
      })
      .then(function (data) {
        var countryList = Array.isArray(data.countries) ? data.countries : [];
        var locationText = countryList.slice(0, 4).map(function (item) {
          return item.country || item.name || item.code;
        }).filter(Boolean).join(", ");

        if (total && data.total_visits) {
          total.textContent = data.total_visits.toLocaleString();
        }
        if (locations && locationText) {
          locations.textContent = locationText;
        }
        if (updated && data.updated_at) {
          updated.textContent = data.updated_at;
        }
      })
      .catch(function () {
        if (updated) {
          updated.textContent = "analytics unavailable";
        }
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireProtectedEmail();
    wireVisitorStats();
  });
}());
