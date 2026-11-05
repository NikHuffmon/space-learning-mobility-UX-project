# Nashville · Stories of a Movement

A React + TypeScript + Vite starter for a student storytelling project. Leaflet provides the interactive map; GitHub Pages can host the entire production build. No API key, database, or paid map subscription is required for this prototype.

## What is included

- Home, Explore, Stories, and About routes, using hash URLs that work when refreshed on GitHub Pages.
- Draggable Nashville map, numbered markers, visible labels, zoom controls, reset view, and a dashed story sequence.
- Four approximate example stops, with matching numbered navigation, selected styles, and previous/next buttons.
- Per-stop photo carousel with arrows, a six-second timer, pause/play, and pause on hover or keyboard focus. Reduced-motion preference disables initial autoplay.
- Responsive layout, keyboard controls, source notes, original local SVG placeholders, and a Pages deployment workflow.

**This is an interface prototype, not a researched historical exhibit.** All stop coordinates and sequence are illustrative. Dates, narrative, archive photographs, citations, and permissions must be supplied by your team. The dashed line is not a walking route. No official Vanderbilt endorsement or branding is implied.

## 1. Run it on your computer

1. Install the current **Node.js LTS** from https://nodejs.org/ (Node 22.12+ or a newer supported LTS). Leave npm enabled during installation. Restart your terminal afterward.
2. Install VS Code if you want an editor: https://code.visualstudio.com/.
3. Extract this project ZIP. Open the `nashville-story` folder in VS Code. The folder you open should directly contain `package.json`.
4. In VS Code choose **Terminal → New Terminal** and run:

```sh
npm install
npm run dev
```

5. Open the localhost URL printed in the terminal. Keep that terminal running while you edit. Press Ctrl+C to stop.

If Windows PowerShell says script execution is disabled, choose **Command Prompt** as the VS Code terminal profile, then run the same commands. You do not need to change your system execution policy.

To check the production build:

```sh
npm run build
npm run preview
```

The build is placed in `dist`. Do not double-click `index.html` to run the source project; use the development server. Do not commit `node_modules` or `dist`.

## 2. Publish on GitHub Pages (beginner route)

These instructions use GitHub Desktop so you do not have to learn Git commands first.

1. Sign in or create an account at https://github.com/.
2. Install GitHub Desktop from https://desktop.github.com/ and sign in.
3. In GitHub Desktop select **File → New repository**.
4. Name it `nashville-story`. Choose a local parent folder. Create the repository.
5. Choose **Repository → Show in Explorer**. Copy the **contents** of the downloaded `nashville-story` folder into this new repository folder. `package.json` must be at the repository root, not inside a second nested folder. Include the hidden `.github` folder and `.gitignore`. If Windows hides dot files, verify their presence in VS Code's file explorer.
6. In GitHub Desktop, inspect Changes, enter `Add Nashville storytelling prototype`, and click **Commit to main**.
7. Click **Publish repository**. For free GitHub Pages hosting, uncheck **Keep this code private** and publish it as public. Everything in the repository is public, so only include approved content.
8. Open the repository on GitHub. Go to **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**. Do not select “Deploy from a branch” for this setup.
9. Go to the repository's **Actions** tab. Open **Deploy to GitHub Pages**. If the initial run failed before Pages was enabled, click **Re-run all jobs**. You can also choose **Run workflow → main → Run workflow**.
10. Wait until the workflow has a green check. Open the website URL in the deployment summary or **Settings → Pages**. It will normally be:

```text
https://YOUR-USERNAME.github.io/nashville-story/
```

To use `https://YOUR-USERNAME.github.io/` without the project suffix, name the repository **YOUR-USERNAME.github.io** instead. The included relative Vite base works for both URL forms.

The workflow builds and publishes the site on pushes to `main`. If your repository uses a different default branch, rename it to `main` or update `.github/workflows/deploy.yml`.

### Updating your live website

Edit locally and check with `npm run dev`. Run `npm run build` before publishing. In GitHub Desktop, commit your changes, then click **Push origin**. The Actions workflow deploys the update. No manual upload of `dist` is needed.

## 3. Replace the sample content

Edit **`src/stories.ts`**. Every stop has:

| Field | What to enter |
| --- | --- |
| `id` | A unique stable slug, e.g. `first-workshop` |
| `title` | Story heading |
| `location` | Prominent place name |
| `date` | Researched display date or year |
| `coordinates` | `[latitude, longitude]` — Nashville longitude is negative |
| `text` | Your narrative paragraph |
| `photos` | Image paths, descriptive alt text, and credited captions |

The **array order** controls marker numbers and the story line. Reorder stops after the dates are researched; they are not automatically sorted. Add or remove stop entries and the map/navigation update together. Do not leave `photos` empty; give each stop at least one image. With one image there is no timed advancement.

Put real photos in **`public/images/`**. Use local paths that include Vite's base URL so they work on repository Pages:

```ts
photos: [{
  src: `${import.meta.env.BASE_URL}images/your-photo.jpg`,
  alt: 'Describe what the photograph shows',
  caption: 'Photographer · Collection · date · reuse permission'
}]
```

Use licensed images and optimize large photos before adding them. The current placeholder label and draft badges are intentionally visible. Remove or revise them in `src/main.tsx` only when the associated content is real. Add research and photo credits to each stop's Sources section and the About page. Currently the Sources text is shared placeholder copy; extend the `Stop` type with a `sources` field when you have citations.

Other edit locations:

- **`src/main.tsx`** — page copy, layout, routes, map settings, carousel, and source notes.
- **`src/style.css`** — colors, fonts, spacing, and mobile breakpoints.
- **`index.html`** — site title, description, and browser theme color.
- **`.github/workflows/deploy.yml`** — deployment configuration.

## 4. Add pages or chapters

Main links use `#/`, `#/explore`, `#/stories`, and `#/about`. To add a page, create a React component in `src/main.tsx` (or a separate component file), add its hash route in `App`, and add a navigation link. Tabs inside a page can remain local React state.

To add another actual story chapter, separate each chapter's stop array into data files and pass the selected chapter into the explorer. The current starter intentionally contains one functioning chapter rather than fake links to unfinished chapters.

## Map services and privacy

Leaflet is free and open source. The map background is requested from OpenStreetMap; it is not bundled offline. Keep visible attribution and follow https://operations.osmfoundation.org/policies/tiles/. Do not add bulk downloading or offline tile prefetching. For heavy traffic or a service guarantee, choose a suitable tile provider and change the tile URL and attribution in `MapView`. Add your project's contact information before public launch.

The only other external presentation service is Google Fonts (the page has local fallback fonts). There are no analytics, accounts, or tracking scripts in the app. GitHub and map/font providers still receive normal web requests.

## Troubleshooting

- **npm is not recognized:** install Node LTS and reopen VS Code.
- **Red Actions run:** open the failed step to read the error. Confirm Pages uses GitHub Actions and the workflow runs on `main`.
- **npm ci complains about a lockfile:** include `package-lock.json` from this project. If you change dependencies, run `npm install` and commit the updated lockfile too.
- **Page is blank:** deploy through the included workflow, not the unbuilt source. Verify `package.json` and `.github/workflows/deploy.yml` are at the repository root.
- **Images missing:** filenames are case-sensitive on GitHub Pages. Use the base-aware image path shown above, not `/images/photo.jpg`.
- **Map blank:** check the internet connection and content blockers. The map is an external service; the story card and numbered controls still work if its tiles cannot load.
- **Need a backend later:** GitHub Pages does not run a Node server or store user submissions. A separate service would be needed for accounts or shared submissions.

## Before a professor review

Check all four routes and refresh a story URL. Try every marker and timeline number, previous/next, photo arrows and pause/play. Resize to a narrow phone layout and use the keyboard. Confirm map attribution stays visible. Replace all sample history and images, confirm geographic accuracy, add sources, and check image rights.

Official setup references: https://vite.dev/guide/static-deploy#github-pages and https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site.
