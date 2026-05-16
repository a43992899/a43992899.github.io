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

  function renderEmail(label, email, displayOrder, readable) {
    label.innerHTML = "";

    displayOrder.forEach(function (sourceIndex, spanIndex) {
      var span = document.createElement("span");
      span.className = "email-scramble__char";
      span.textContent = email[sourceIndex];
      span.style.order = readable ? sourceIndex : spanIndex;
      label.appendChild(span);
    });
  }

  function reshuffleEmail(button, email, label) {
    var displayOrder = shuffleIndices(email.length);

    button.classList.add("is-shuffling");
    renderEmail(label, email, displayOrder, false);

    window.setTimeout(function () {
      renderEmail(label, email, displayOrder, true);
      button.classList.remove("is-shuffling");
    }, 520);
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
      var email = emailFromDataset(button);
      var label = button.querySelector(".js-email-label");

      if (!email || !label) {
        return;
      }

      renderEmail(label, email, shuffleIndices(email.length), true);

      button.addEventListener("click", function (event) {
        event.preventDefault();
        reshuffleEmail(button, email, label);
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
