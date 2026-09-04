# Personal Website — Owen Gardner

A single-page portfolio site built with plain HTML, CSS, and JavaScript (no build step, no dependencies).

## Structure

```
personal-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

## Running locally

Any static file server works, e.g.:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

This is a static site — it can be hosted as-is on GitHub Pages, Netlify, Vercel, or any static host. For GitHub Pages: push this folder to a repo and enable Pages on the `main` branch (root or `/personal-website` depending on repo layout).

## Editing content

All content lives directly in `index.html` — experience, projects, and education are plain markup, no CMS or data file. Update the `#projects` section to add new project cards as they're built.
