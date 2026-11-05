# Monthly Ledger

A personal finance app that runs entirely in the browser. Track monthly income and expenses, set spending limits per category, and save toward goals.

**Your data never leaves your device.** There is no account, no server and no sync. Everything is stored in the browser on the device you use, so each person who opens the app on their own phone or computer has their own private ledger.

## Features

- **Dashboard**: total income, total expenses and net balance for the month, plus a plain-language monthly summary, spending by category and recent activity.
- **Income and Expenses**: add entries with a description, amount, category and date, and browse them month by month.
- **Budget**: set a monthly limit per expense category. Progress bars turn amber at 80% of the limit and red when you go over.
- **Savings goals**: create named goals with a target amount and an optional target date, then log contributions and track the percentage saved and the amount remaining.
- Installable on phones and desktops, and works offline after the first visit.
- Light and dark themes that follow your device setting.
- Choice of currency.

## Using it

### Open it on a website (recommended)

Host the folder on any static web host. For GitHub Pages:

1. In this repository, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
3. After a minute the app is live at `https://<your-username>.github.io/<repository-name>/`.

Share that link with anyone who should use the app. Each person's data stays on their own device.

### Install it like an app

- **Android (Chrome)**: open the link, tap the menu, then **Install app** or **Add to Home screen**.
- **iPhone/iPad (Safari)**: open the link, tap **Share**, then **Add to Home Screen**.
- **Desktop (Chrome or Edge)**: open the link and click the install icon in the address bar.

### Run it locally

Any static file server works. With Python:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly from disk also works, but offline support and installing need `http://localhost` or `https://`.

## Where the data lives

- Entries, budgets, goals and your currency are saved in the browser's `localStorage` under the key `monthly-ledger-v1`.
- Data is separate for each device, and for each browser on that device. People sharing one device and browser share one ledger.
- The app asks the browser to keep its storage persistent, but **clearing your browser's site data deletes your ledger**, and so does uninstalling the app on some phones.
- The first time the app opens on a device, it shows a sample month marked as examples. Use **Clear examples** to remove it.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: markup, styles and script |
| `manifest.webmanifest` | App name, icons and colours used when installing |
| `sw.js` | Service worker that caches the app for offline use and installs updates |
| `version.json` | Current version number and release note shown in the update prompt |
| `scripts/release.py` | Stamps a new version into `sw.js` and `version.json` |
| `icons/` | App icons (SVG sources and PNG exports) |

## Updates

Each time the app opens with an internet connection (and whenever the connection comes back, or after it has been in the background for 30 minutes), it checks the published site for a newer version. With no connection it skips the check and runs from its offline copy as usual.

- **In a browser tab**, a new version is applied automatically and the page reloads. If someone is typing into a form at that moment, the update waits until they leave or reopen the page, so nothing they typed is lost.
- **In an installed copy** (added to the home screen or installed from the browser), a prompt shows the new version number and what changed, with **Update now** and **Later**. Choosing **Later** asks again the next time the app opens.
- Updates never touch saved data: entries, budgets and goals stay on the device.
- The running version is shown at the bottom of the sidebar on wider screens.

### Publishing an update

1. Make your changes.
2. Stamp a new version number and a one-line description of what changed:

   ```bash
   python3 scripts/release.py 1.2.0 "Adds export to CSV."
   ```

   This updates `VERSION` in `sw.js` and the details in `version.json`, which is what the update prompt shows. Without Python, edit those two files by hand and keep the version numbers identical.
3. Commit and push to `main`. GitHub Pages republishes the site within a few minutes, and each device picks up the update the next time it opens online.

Changes pushed without a new version number are not delivered to devices that already have the app, because they keep running their offline copy.
