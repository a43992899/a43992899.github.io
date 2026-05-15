---
permalink: /blog/
title: "Blog"
excerpt: "Notes on open music AGI, multimodal foundation models, and building useful creative AI systems."
author_profile: true
---

<span class="anchor" id="blog"></span>

<section class="blog-index-hero" markdown="1">
<p class="blog-index-hero__kicker">Notes and research diaries</p>

# Blog

Some longer thoughts on music intelligence, open foundation models, research process, and the parts of creative AI that do not fit cleanly into a paper abstract.
</section>

<nav class="blog-language-nav" aria-label="Blog language sections">
  <a href="#zh">中文</a>
  <a href="#en">English</a>
</nav>

<h2 id="zh" class="blog-section-heading">中文</h2>
<section class="blog-index-list">
{% assign zh_posts = site.posts | where: "lang", "zh" %}
{% for post in zh_posts %}
  <article class="blog-index-card">
    <p class="blog-index-card__meta">{{ post.date | date: "%Y-%m-%d" }} · {{ post.lang_label | default: post.lang }}</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.excerpt %}
      <p>{{ post.excerpt | markdownify | strip_html | truncate: 220 }}</p>
    {% endif %}
    {% if post.tags and post.tags.size > 0 %}
      <div class="blog-index-card__tags">
        {% for tag in post.tags %}
          <span>{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </article>
{% endfor %}
</section>

<h2 id="en" class="blog-section-heading">English</h2>
<section class="blog-index-list">
{% assign en_posts = site.posts | where: "lang", "en" %}
{% for post in en_posts %}
  <article class="blog-index-card">
    <p class="blog-index-card__meta">{{ post.date | date: "%Y-%m-%d" }} · {{ post.lang_label | default: post.lang }}</p>
    <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
    {% if post.excerpt %}
      <p>{{ post.excerpt | markdownify | strip_html | truncate: 220 }}</p>
    {% endif %}
    {% if post.tags and post.tags.size > 0 %}
      <div class="blog-index-card__tags">
        {% for tag in post.tags %}
          <span>{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </article>
{% endfor %}
</section>
