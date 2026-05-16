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
    var user = decodeB64(element.getAttribute("data-email-user"));
    var domain = decodeB64(element.getAttribute("data-email-domain"));
    return user && domain ? user + "@" + domain : "";
  }

  function mailto(email, subject, body) {
    var url = "mailto:" + email;
    var params = [];

    if (subject) {
      params.push("subject=" + encodeURIComponent(subject));
    }
    if (body) {
      params.push("body=" + encodeURIComponent(body));
    }

    if (params.length) {
      url += "?" + params.join("&");
    }

    window.location.href = url;
  }

  function wireProtectedEmailLinks() {
    var links = document.querySelectorAll(".js-protected-email");

    links.forEach(function (link) {
      var email = emailFromDataset(link);
      var label = link.querySelector(".js-email-label");

      if (!email) {
        return;
      }

      link.setAttribute("href", "#");
      if (label && link.getAttribute("data-reveal") === "true") {
        label.textContent = email;
      }

      link.addEventListener("click", function (event) {
        event.preventDefault();
        mailto(email);
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
    wireProtectedEmailLinks();
    wireVisitorStats();
  });
}());
