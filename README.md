# Nikhil Kumar Singh: Portfolio

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Files
- `images/` and `certificates/`: certificate photos and Infosys PDFs shown in Achievements
- `index.html`: content and structure
- `styles.css`: design tokens (colors, fonts) at the top, then each section
- `script.js`: menu, scroll effects, project filter, case-study modal, copy-email, contact form

## Run locally
Double-click `index.html`, or serve the folder:

    python -m http.server 8000

Then open http://localhost:8000. (The copy-email button uses the clipboard API, which needs `http://localhost` or `https`. On a plain `file://` page it falls back to an older copy method.)

## Already set up
- GitHub: https://github.com/singhnikhil9655
- LinkedIn: https://www.linkedin.com/in/nikhil-kumar-singh-439b48388/
- Email: Singh.nikhil9655@gmail.com (in `index.html`, 3 places, and `EMAIL` at the top of `script.js`)

## Things to add
1. **Resume.** Put `resume.pdf` in this folder, then add this inside the `.actions` block in the hero and contact sections:
   `<a class="btn ghost" href="resume.pdf" download>Download Resume</a>`
2. **Project links.** Each case study currently links to your GitHub profile. In `index.html`, find the `modal-body` block and replace the "GitHub profile" link, or add per-project repo and live-demo links inside each `.case` div.
3. **Screenshots.** The cards use CSS illustrations. To use real screenshots, replace a card's `<div class="art">` with `<img src="images/name.webp" alt="Describe the screen" loading="lazy" width="600" height="360">`.
4. **Verified results.** The CropTrust and Fraud Detection case studies say no metrics are published. Add real numbers there only once you have measured them.
5. **CodeChef link.** Add `<a href="https://www.codechef.com/users/YOUR-ID" target="_blank" rel="noopener">CodeChef</a>` to the footer and contact buttons.
6. **Social preview.** Add `<meta property="og:image" content="https://your-site/preview.png">` and `og:url` after deploying.

## Colors and fonts
Edit the variables in `:root` at the top of `styles.css`.

## Deploy
**GitHub Pages:** create a repo, upload these files to the root, then Settings > Pages > Deploy from branch > `main` / root. Your site appears at `https://singhnikhil9655.github.io/<repo>/`.

**Netlify:** go to app.netlify.com/drop and drag the folder in. Or connect the repo with build command empty and publish directory `.`.

## Contact form
There is no server. The form checks the fields and opens a pre-filled email draft. For direct delivery, create a form at formspree.io and point the form's `action` at it.
