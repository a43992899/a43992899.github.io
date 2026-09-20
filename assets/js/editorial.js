(function () {
  'use strict';
  var root = document.documentElement;
  var nav = document.getElementById('site-nav');
  var menu = nav && nav.querySelector('button');
  var overflow = nav && nav.querySelector('.hidden-links');
  var ticking = false;
  function progress() {
    var extent = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--read-progress', (extent > 0 ? Math.min(100, Math.max(0, window.scrollY / extent * 100)) : 0) + '%');
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(progress); }
  }, { passive: true });
  window.addEventListener('resize', progress);
  progress();
  function syncMenu() { if (menu && overflow) menu.setAttribute('aria-expanded', String(!overflow.classList.contains('hidden'))); }
  function closeMenu() { if (!menu || !overflow) return; overflow.classList.add('hidden'); menu.classList.remove('close'); syncMenu(); }
  if (menu && overflow) {
    new MutationObserver(syncMenu).observe(overflow, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !overflow.classList.contains('hidden')) { closeMenu(); menu.focus(); }
    });
    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target) || event.target.closest('a')) closeMenu();
    });
    syncMenu();
  }
  // Respect the sticky header and reduced motion instead of the legacy scroll offset.
  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== '_self') return;
    var url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
    var target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch (error) { return; }
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (menu && overflow) closeMenu();
    var header = document.querySelector('.masthead');
    var top = target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 24;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
    history.pushState(null, '', url.hash);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }, true);
  // Highlight the existing section links without moving or hiding any content.
  var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a')) : [];
  var sections = Array.prototype.slice.call(document.querySelectorAll('.page__content .anchor[id]'));
  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          if (link.hash === '#' + entry.target.id && !link.closest('.masthead__menu-home-item')) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-90px 0px -65% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }
})();
