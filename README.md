# 💸 Pesa Tracker

A simple expense tracker in Kenyan shillings, built with **React + Vite**.

## Features
- Add expenses with a description, amount, date and category
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

## Project structure
```
src/
  App.jsx                  # holds the state and puts the pieces together
  components/
    Summary.jsx            # total, budget bar, category breakdown
    ExpenseForm.jsx        # controlled form with validation
    ExpenseList.jsx        # filtered, sorted list with delete
  hooks/
    useLocalStorage.js     # custom hook: useState that persists
  utils/
    format.js              # KES formatting, dates, categories
```

## Ideas to extend it
- Filter by month
- Add a chart (e.g. with Recharts)
- Export to CSV
