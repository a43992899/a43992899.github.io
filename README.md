# Ruibin Yuan Personal Website

Source for [a43992899.github.io](https://a43992899.github.io), built with a Jekyll academic homepage template.

## Local Build

This repo keeps Bundler installs local to `vendor/bundle`, so building should not require `sudo` or writes to `/Library/Ruby/Gems`.

```bash
bundle install
bundle exec jekyll build
```

The full CV PDF and LaTeX source are kept in the private `a43992899/ruibin-yuan-cv` repository. The public homepage exposes a request form instead of hosting downloadable CV files.
