# FinanceHub

A financial dashboard built with React and Tailwind CSS for tracking income, expenses, and spending patterns.


## Tech Stack

- **React 18** — UI framework
- **Tailwind CSS** — styling
- **Vite** — build tool
- **React Context API** — state management
- **localStorage** — data persistence
- **Custom SVG** — charts built from scratch, no chart library


### Dashboard
- Summary cards for Total Balance, Income, and Expenses
- Balance trend line chart with hover tooltips
- Spending by category donut chart with hover tooltips

### Transactions
- Full transaction list with date, description, category, type, amount
- Search by name or category
- Filter by category and type (All / Income / Expense)
- Sort by date or amount
- Admin can add, edit, delete transactions
- Viewer gets read-only access

### Insights
- Highest spending category
- Monthly expense comparison (this month vs last)
- Average daily spending
- Spending alerts and tips
- Category breakdown with progress bars

### Settings
- Edit profile name and email
- Toggle light / dark mode
- Notification preferences
- Security options
- Payment method management

### Role Based UI
Switch roles using the dropdown in the top-right corner:
| Role | Access |
|------|--------|
| Admin | View + Add + Edit + Delete transactions |
| Viewer | View only, no edit controls shown |

## Getting Started

### Prerequisites
- Node.js v18 or above
- npm v8 or above

### Installation
```bash
# 1. Clone the repo
git clone https://github.com/aru151203/financehub.git

# 2. Go into the project folder
cd financehub

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure
financehub/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Collapsible sidebar navigation
│   │   └── Topbar.jsx        # Header with role switcher and dark mode toggle
│   ├── context/
│   │   └── AppContext.jsx    # Global state using React Context
│   ├── data/
│   │   └── transactions.js   # Mock data and constants
│   ├── pages/
│   │   ├── Dashboard.jsx     # Overview with charts and summary cards
│   │   ├── Transactions.jsx  # Transaction list with CRUD
│   │   ├── Insights.jsx      # Spending insights and category breakdown
│   │   └── Settings.jsx      # Profile, theme, notifications
│   ├── App.jsx               # Root layout and error boundary
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind imports and global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json

## State Management

All state is managed through a single React Context (`AppContext`):

- `transactions` — list of all transactions, supports add / edit / delete
- `role` — current role, either `Admin` or `Viewer`
- `darkMode` — boolean for theme
- `page` — currently active page
- `sidebarOpen` — sidebar visibility

Everything is persisted to `localStorage` so state survives page refresh.

## Important Notes

- No backend involved — this is a fully static frontend app
- All transaction data is mock / hardcoded in `src/data/transactions.js`
- Charts are built using raw SVG, no external charting library was used
- Dark mode is controlled via React state, not Tailwind's `dark:` class prefix

