---
layout: archive
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

A list of the pages and collection records on this site. An [XML sitemap]({{ '/sitemap.xml' | relative_url }}) is also available.

<h2>Pages</h2>
{% for item in site.pages %}
  {% unless item.sitemap == false %}
    {% include archive-item.html item=item %}
  {% endunless %}
{% endfor %}

<h2>Posts</h2>
{% for item in site.posts %}
  {% include archive-item.html item=item %}
{% endfor %}

{% for collection in site.collections %}
  {% if collection.output and collection.label != "posts" %}
    <h2>{{ collection.label | capitalize }}</h2>
    {% for item in collection.docs %}
      {% include archive-item.html item=item %}
    {% endfor %}
  {% endif %}
{% endfor %}
