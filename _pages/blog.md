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

<section class="blog-index-list">
{% for post in site.posts %}
  <article class="blog-index-card">
    <p class="blog-index-card__meta">{{ post.date | date: "%Y-%m-%d" }}{% if post.reading_time %} · {{ post.reading_time }}{% endif %}</p>
    <h2><a href="{{ post.url | relative_url }}" target="_self">{{ post.title }}</a></h2>
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
