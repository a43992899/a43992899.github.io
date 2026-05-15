(function () {
  var storageKey = 'theme';
  var root = document.documentElement;
  var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Ignore storage failures; the visual toggle should still work for this page.
    }
  }

  function giscusTheme(theme) {
    return theme === 'dark' ? 'dark' : 'light';
  }

  function syncGiscus(theme) {
    var iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({
      giscus: {
        setConfig: {
          theme: giscusTheme(theme)
        }
      }
    }, 'https://giscus.app');
  }

  function syncGiscusSoon(theme) {
    [150, 800, 1800].forEach(function (delay) {
      window.setTimeout(function () {
        syncGiscus(theme);
      }, delay);
    });
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;

    var isDark = theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      var label = button.querySelector('[data-theme-toggle-label]');
      if (label) label.textContent = isDark ? 'Light' : 'Dark';
    });

    if (persist) setStoredTheme(theme);
    syncGiscusSoon(theme);
  }

  function preferredTheme() {
    return storedTheme() || (mediaQuery && mediaQuery.matches ? 'dark' : 'light');
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(preferredTheme(), false);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, true);
      });
    });
  });

  if (mediaQuery && mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', function (event) {
      if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light', false);
    });
  }
})();
