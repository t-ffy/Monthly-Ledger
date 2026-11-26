# Upcoming updates

Planned improvements, roughly in priority order.

## Released

- **1.4.0**: your own categories. Add, rename, hide and merge income and expense categories; every category has a permanent id, so changes apply to past entries, repeating items and budget limits.
- **1.3.0**: back up and restore (with a 30-day reminder), edit entries, goals and contributions, and repeating monthly entries.

## Next: 1.5.0, categories become accounts (envelope budgeting)

Agreed design decisions: envelope model; unspent money rolls over to the next month; savings goals become accounts; released separately from 1.4.0.

**How it works**
- Income arrives in a holding pool called **To assign**.
- You move money from To assign into accounts (Groceries, Rent, Holiday...). That is money **added**.
- Expenses are paid from an account. That is money **taken out**.
- Each account keeps a running balance, and unspent money rolls over month to month.
- Money can be moved between accounts, for example to cover overspending.
- An account's budget limit becomes its **monthly top-up**; the 80% amber and over-limit red indicators still apply to the month's spending.
- Savings goals become accounts with an optional target amount and date. Contributions become money moved into the account.

**Screens**
- The Budget tab becomes **Accounts**: To assign at the top, then each account's balance, this month's in and out, and its monthly top-up. Actions: Fund accounts (fills each account with its monthly top-up from To assign), Move money, Add account.
- Account page: a statement (date, description, in, out, running balance) and settings (name, monthly top-up, target, hide).
- Expense form: "Pay from" an account. Income form: a source (the income categories) and where it goes, To assign by default or straight into an account.
- The Goals tab shows accounts that have a target, with the existing progress bars.
- Dashboard: shows To assign; insights flag negative or low accounts.

**Under the hood**
- Expense categories become accounts, keeping their ids. Income categories stay as income sources.
- Transfers are stored as their own records (from, to, amount, date, note). Balances are always calculated from records, never stored.
- An account can only be deleted at zero balance; otherwise move the money out first or hide it.
- Backup format 3; restore still accepts formats 1 and 2.

**Moving existing data across**
1. Keep a safety copy of the current data on the device and offer a backup download.
2. Each expense category becomes an account; its budget limit becomes the monthly top-up.
3. Past entries are kept. Each account starts at zero through one "Opening balance" line, and the overall net (income minus expenses so far) lands in To assign.
4. Savings goals become accounts with targets; past contributions become money moved in from To assign.
5. Repeating items stay linked.

## Planned

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
