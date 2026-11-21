# Michiki Taniwaki's academic website

This repository contains the source for [mitaniwaki.github.io](https://mitaniwaki.github.io/). It is a deliberately small Jekyll site published by GitHub Pages.

## How the site is organized

- `_pages/` contains the main pages.
- `_talks/`, `_teaching/`, and `_news/` contain reusable records. Each record is written once and displayed wherever it is needed.
- `_posts/` contains blog posts.
- `_layouts/` defines the shared page structure.
- `_includes/` contains the small reusable pieces used by those layouts.
- `_sass/` and `assets/css/main.scss` provide the styling.
- `assets/js/main.js` contains the readable, dependency-free JavaScript for the responsive menu and color theme.

There is no Node or npm build step. Jekyll builds the complete site.

## Publications

The publication list is maintained on [ResearchGate](https://www.researchgate.net/profile/Michiki-Taniwaki). Both the Publications page and CV link there, so adding a publication only requires updating ResearchGate.

Old local publication URLs redirect to `/publications/`.

## Add a talk

Create one Markdown file in `_talks/`:

```yaml
---
title: "Presentation title"
type: "Oral" # or "Poster"
presentation_scope: "international" # or "domestic"
sort_date: "YYYY-MM-DD"
permalink: /talks/YYYY-MM-DD-short-slug
venue: "Event name"
date: YYYY-MM-DD
location: "City, Country"
---
```

If only a month is known, omit `date`, use a quoted `sort_date` such as `"2026-03"`, and add `date_label: "March 2026"`. The Talks page and CV will both update from this record.

## Add news

Create one Markdown file in `_news/`:

```yaml
---
title: "News headline"
date: YYYY-MM-DD
excerpt: "Short homepage summary."
link: https://example.com/optional-source
---
```

The homepage shows the five newest items, and `/news/` shows all of them.

## Edit existing sections

- English biography: `_pages/about.md`
- Japanese biography: `_pages/about-ja.md`
- Education, research experience, awards, skills, and service: `_pages/cv.md`
- Talks: records in `_talks/`
- Teaching: records in `_teaching/`
- Header links: `_data/navigation.yml`
- Author details: the `author` block in `_config.yml`

## Preview locally

With Ruby 3.x and Bundler:

```sh
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. Restart Jekyll after changing `_config.yml`.

Or use Docker:

```sh
docker compose up --build
```

The generated `_site/` directory and dependency caches are intentionally ignored. GitHub Pages publishes after the finished changes are committed and pushed to its configured publishing branch.
