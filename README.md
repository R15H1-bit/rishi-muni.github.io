# Engineering portfolio

A fast, static portfolio for design and analysis work. Every project is one Markdown file with its images sitting next to it. Push a change to GitHub and the site rebuilds itself in about a minute.

## Put it online (one time, ~10 minutes)

1. **Create the repo.** On GitHub, click **New repository**.
   - Name it `your-username.github.io` to get the address `https://your-username.github.io`.
   - Any other name (e.g. `portfolio`) works too and gives `https://your-username.github.io/portfolio/`.
   - Leave "Add a README" unchecked.
2. **Upload these files.** Either:
   - **No terminal:** on the new repo's page, click **uploading an existing file**, drag in everything from this folder (including the hidden `.github` folder — on a Mac press `Cmd+Shift+.` in Finder to show it), and commit. Don't upload `node_modules` or `_site` if they exist.
   - **Terminal:**
     ```bash
     cd portfolio
     git remote add origin https://github.com/your-username/your-repo.git
     git push -u origin main
     ```
3. **Turn on Pages.** Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab, wait for the green check, and visit your address.

## Edit your details

`src/_data/site.json` holds your name, one-line statement, email, links and the two discipline headings on the home page. Put your résumé at `src/files/resume.pdf`.

The About page is `src/about.md`.

## Add or edit a project

Each project lives in its own folder:

```
src/projects/swirl-injector/
├── index.md        ← the write-up
├── cover.png       ← thumbnail + header image
├── geometry.png
└── cold-flow.mp4
```

To add one, make a new folder in `src/projects/`, copy `PROJECT_TEMPLATE.md` into it as `index.md`, and drop your images in beside it. The template shows every formatting option:

| You write | You get |
|---|---|
| `![](plot.png "Caption")` on its own line | Full-width figure with caption |
| Several image lines in a row | Side-by-side gallery |
| `![](test.mp4 "Caption")` | Embedded video |
| `$...$` and `$$...$$` | Rendered equations |
| A Markdown table | Clean data table, numbers right-aligned |
| `> text` | Highlighted key-result callout |
| `{# note #}` | A note to yourself, hidden from the site |

Click any image on the live site to enlarge it.

Front-matter fields at the top of `index.md` control the project's title block (role, team, timeline, status, tools), the cover image, its order on the home page (`order:`), and `draft: true` to hide it while you work.

You can edit everything straight on github.com: open a file, click the pencil, commit. For images, open the project folder and use **Add file → Upload files**.

## Preview on your own computer (optional)

Needs [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm start      # opens a live preview at http://localhost:8080
```

## Tips for good project pages

- Lead with the result: one plot or photo that shows what you achieved.
- Export plots as PNG at about 1600 px wide; photos as JPG under ~1 MB.
- For MATLAB figures: `exportgraphics(gcf, "plot.png", "Resolution", 200)`.
- Short GIFs or MP4s of simulations and test fires are worth more than paragraphs.
