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
| `sw.js` | Service worker that caches the app for offline use |
| `icons/` | App icons (SVG sources and PNG exports) |

## Updating

After changing `index.html` or any other file the app caches, bump `VERSION` in `sw.js` (for example `ledger-v2`) so installed copies pick up the new version.
