# Upcoming updates

Planned improvements, roughly in priority order. Nothing here is built yet.

## Next release (suggested 1.3.0)

1. **Back up and restore**
   All data lives in one browser on one device, so clearing site data, losing the phone or uninstalling the app can wipe the ledger.
   - Export everything to a backup file.
   - Import a backup file to restore it or move to a new device.
   - A gentle reminder when there hasn't been a backup in 30 days.

2. **Edit entries**
   Tap an entry to fix its description, amount, category or date, instead of deleting and re-adding it. The same applies to savings goals (name, target, date) and logged contributions.

3. **Recurring entries**
   Mark income or expenses such as salary, rent and subscriptions as monthly, so they are added automatically or with one tap at the start of each month.

## Later

### More insight from the same data
- **Trends over time:** income against expenses for the last 6 to 12 months, and how each category changes month to month.
- **Search and filters:** find entries by description; filter by category or amount.
- **Your own categories:** add, rename or hide categories.
- **Savings tied to spending:** optionally record a goal contribution as an expense in the Savings category, so the dashboard balance reflects money moved into savings.
- **Spreadsheet export:** a CSV file for Excel or Google Sheets.

### Sharing devices
- **PIN or passcode lock** for shared or borrowed devices.
- **Multiple profiles on one device**, so people sharing a tablet keep separate ledgers.

### Behind the scenes
- **Automated tests** that run on GitHub with every push, covering saving, budgets, goals and updates.
- **Split the single file** into separate style and script files as the app grows.
- **Accessibility pass:** screen reader labels, keyboard navigation and colour contrast.
