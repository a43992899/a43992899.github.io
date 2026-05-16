(function () {
  var legacyStorageKey = 'theme';
  var storageKey = 'theme-mode';
  var root = document.documentElement;
  var mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function storedMode() {
    try {
      localStorage.removeItem(legacyStorageKey);
      localStorage.removeItem(storageKey);
    } catch (error) {
      // Ignore storage failures; the theme should still follow the system.
    }

    return 'system';
  }

  function setStoredMode(mode) {
    try {
      localStorage.removeItem(legacyStorageKey);
      localStorage.removeItem(storageKey);
    } catch (error) {
      // Ignore storage failures; the visual toggle should still work for this page.
    }
  }

  function systemTheme() {
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function themeFromMode(mode) {
    return mode === 'light' || mode === 'dark' ? mode : systemTheme();
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

  function updateToggle(button, theme, mode) {
    var isDark = theme === 'dark';
    var label = button.querySelector('[data-theme-toggle-label]');
    var followsSystem = mode === 'system';
    var nextLabel = followsSystem ? (isDark ? 'Light' : 'Dark') : 'Auto';

    button.setAttribute('aria-pressed', followsSystem ? 'false' : 'true');
    button.setAttribute('aria-label', followsSystem ? 'Switch theme temporarily' : 'Follow system theme');
    button.setAttribute('title', followsSystem ? 'Following system theme' : 'Return to system theme');
    if (label) label.textContent = nextLabel;
  }

  function applyTheme(mode, persist) {
    var theme = themeFromMode(mode);

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-theme-mode', mode);
    root.style.colorScheme = theme;

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      updateToggle(button, theme, mode);
    });

    if (persist) setStoredMode(mode);
    syncGiscusSoon(theme);
  }

  function nextMode() {
    var currentMode = root.getAttribute('data-theme-mode') || storedMode();
    var currentTheme = root.getAttribute('data-theme') || themeFromMode(currentMode);

    if (currentMode === 'system') {
      return currentTheme === 'dark' ? 'light' : 'dark';
    }

    return 'system';
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(storedMode(), false);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        applyTheme(nextMode(), true);
      });
    });
  });

  if (mediaQuery && mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', function (event) {
      if ((root.getAttribute('data-theme-mode') || storedMode()) === 'system') {
        applyTheme('system', false);
      }
    });
  }
})();
