(function () {
  function readMetric(data, path) {
    if (!data || !path) {
      return undefined;
    }

    return path.split(".").reduce(function (current, part) {
      if (current && Object.prototype.hasOwnProperty.call(current, part)) {
        return current[part];
      }
      return undefined;
    }, data);
  }

  function numberFromText(text) {
    var match = String(text || "").match(/([\d,.]+)\s*([kK])?/);

    if (!match) {
      return 0;
    }

    var value = parseFloat(match[1].replace(/,/g, ""));

    if (Number.isNaN(value)) {
      return 0;
    }

    return match[2] ? Math.round(value * 1000) : value;
  }

  function citationValue(card, metrics) {
    var metricElement = card.querySelector('[data-metric$=".citations"]');
    var metricPath = metricElement ? metricElement.getAttribute("data-metric") : "";
    var metricValue = readMetric(metrics, metricPath);

    if (metricValue !== undefined && metricValue !== null && metricValue !== "") {
      return Number(metricValue) || 0;
    }

    return metricElement ? numberFromText(metricElement.textContent) : 0;
  }

  function originalIndex(card, index) {
    if (!card.hasAttribute("data-original-order")) {
      card.setAttribute("data-original-order", String(index));
    }

    return Number(card.getAttribute("data-original-order")) || index;
  }

  function sortContainer(container, metrics) {
    var cards = Array.prototype.filter.call(container.children, function (child) {
      return child.classList.contains("work-card") || child.classList.contains("publication-card");
    });

    cards.forEach(function (card, index) {
      originalIndex(card, index);
    });

    cards.sort(function (left, right) {
      var citationDelta = citationValue(right, metrics) - citationValue(left, metrics);

      if (citationDelta !== 0) {
        return citationDelta;
      }

      return originalIndex(left, 0) - originalIndex(right, 0);
    });

    cards.forEach(function (card) {
      container.appendChild(card);
    });
  }

  function sortCitationDisplays(metrics) {
    var containers = document.querySelectorAll(".work-grid, .publication-list");

    Array.prototype.forEach.call(containers, function (container) {
      sortContainer(container, metrics);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    sortCitationDisplays();
  });

  document.addEventListener("siteMetricsUpdated", function (event) {
    sortCitationDisplays(event.detail && event.detail.metrics);
  });
}());
