# Shuhuai Zhang — personal website

This is a small static website designed for GitHub Pages. The live Google Site is not changed by this project.

## Updating the content

Most updates only require editing one of these plain-text files:

- `content/profile.md` — role, institution, biography, and contact details
- `content/research.md` — publications and working papers
- `content/performances.md` — performance details and video links

Each research or performance item starts with `##`. To add an item, copy an existing block, replace its text, and keep the field labels unchanged.

## Previewing locally

Run `npm run dev`, then open the Local URL shown in the terminal. The website rebuilds when a content or style file changes.

## Publishing later

The included GitHub Pages workflow publishes the site automatically after the project is placed in a GitHub repository and Pages is configured to use GitHub Actions. Nothing is published by the local prototype.
