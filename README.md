# 💸 Pesa Tracker

A simple expense tracker in Kenyan shillings, built with **React + Vite**.

## Features
- Add expenses with a description, amount, date and category
- Browse month by month (each month starts fresh)
- Set a monthly budget and see a progress bar (turns red when you go over)
- Spending broken down by category
- Edit or delete any entry
- Filter the list by category
- Data is saved in your browser (localStorage), so it survives a refresh

## Run it
```bash
npm install
npm run dev
```
Then open the link Vite prints (usually http://localhost:5173).

## Tests
```bash
npm test          # run once
npm run test:watch
```
Tests use **Vitest** and **React Testing Library**: unit tests for the helpers in `utils/`,
and app tests that click through adding, editing, deleting, switching months and reloading.
The deploy workflow runs them first, so a failing test blocks the deploy.

## Project structure
```
src/
  App.jsx                  # holds the state and puts the pieces together
  components/
    Summary.jsx            # total, budget bar, category breakdown
    ExpenseForm.jsx        # controlled form with validation
    ExpenseList.jsx        # filtered, sorted list with edit and delete
    MonthPicker.jsx        # previous / next month navigation
  hooks/
    useLocalStorage.js     # custom hook: useState that persists
  utils/
    format.js              # KES formatting, dates, categories
    month.js               # month helpers ('YYYY-MM')
```

## Ideas to extend it
- Add a chart (e.g. with Recharts)
- Export to CSV
