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

  function wireCvRequestForm() {
    var form = document.getElementById("cv-request-form");

    if (!form) {
      return;
    }

    var status = document.getElementById("cv-request-status");
    var email = emailFromDataset(form);

    form.addEventListener("submit", function (event) {
      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var institution = String(data.get("institution") || "").trim();
      var requesterEmail = String(data.get("requester_email") || "").trim();
      var role = String(data.get("role") || "").trim();
      var purpose = String(data.get("purpose") || "").trim();
      var profileUrl = String(data.get("profile_url") || "").trim();

      event.preventDefault();

      if (!email) {
        if (status) {
          status.textContent = "Email is not available in this build. Please use another contact link.";
        }
        return;
      }

      if (!name || !institution || !requesterEmail || !purpose) {
        form.reportValidity();
        return;
      }

      var body = [
        "Hi Ruibin,",
        "",
        "I would like to request your full academic CV.",
        "",
        "Name: " + name,
        "Institution / affiliation: " + institution,
        "Institutional email: " + requesterEmail,
        "Role / title: " + (role || "N/A"),
        "Purpose: " + purpose,
        "Profile or institution page: " + (profileUrl || "N/A"),
        "",
        "I understand the CV is shared manually after review.",
        "",
        "Best,"
      ].join("\n");

      if (status) {
        status.textContent = "Opening a local email draft with the request details.";
      }

      mailto(email, "CV request from " + name + " / " + institution, body);
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
    wireCvRequestForm();
    wireVisitorStats();
  });
}());
