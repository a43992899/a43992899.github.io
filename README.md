# Ruibin Yuan Personal Website

Source for [a43992899.github.io](https://a43992899.github.io), built with a Jekyll academic homepage template.

## Local Build

This repo keeps Bundler installs local to `vendor/bundle`, so building should not require `sudo` or writes to `/Library/Ruby/Gems`.

```bash
bundle install
bundle exec jekyll build
```

The full CV PDF and LaTeX source are kept in the private `a43992899/ruibin-yuan-cv` repository. The public homepage exposes a request form instead of hosting downloadable CV files.

## Visual Design

The homepage and blog share an editorial design with warm ivory and terracotta in day mode, and charcoal-green with champagne accents at night. Content remains in `_pages/`, `_posts/`, and `_data/`; edit theme tokens and responsive presentation in `_sass/_editorial.scss`. See [visual design and maintenance](docs/visual-design.md) for colors, layout, accessibility, and verification scope.
