export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Entertainment', 'Healthcare', 'Salary', 'Freelance', 'Other'];

export const CATEGORY_COLORS = {
  Food: '#6366f1',
  Travel: '#10b981',
  Bills: '#f97316',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Healthcare: '#14b8a6',
  Salary: '#3b82f6',
  Freelance: '#f59e0b',
  Other: '#6b7280',
};

export const initialTransactions = [
  { id: 1,  date: '2026-04-03', description: 'Monthly Salary',     category: 'Salary',        type: 'income',  amount: 450000 },
  { id: 2,  date: '2026-04-02', description: 'Grocery Shopping',   category: 'Food',           type: 'expense', amount: 10250 },
  { id: 3,  date: '2026-04-01', description: 'Electric Bill',      category: 'Bills',          type: 'expense', amount: 7350 },
  { id: 4,  date: '2026-03-30', description: 'Coffee Shop',        category: 'Food',           type: 'expense', amount: 1020 },
  { id: 5,  date: '2026-03-28', description: 'Freelance Project',  category: 'Freelance',      type: 'income',  amount: 65000 },
  { id: 6,  date: '2026-03-27', description: 'Flight Tickets',     category: 'Travel',         type: 'expense', amount: 36750 },
  { id: 7,  date: '2026-03-25', description: 'New Shoes',          category: 'Shopping',       type: 'expense', amount: 7350 },
  { id: 8,  date: '2026-03-23', description: 'Netflix',            category: 'Entertainment',  type: 'expense', amount: 649 },
  { id: 9,  date: '2026-03-22', description: 'Doctor Visit',       category: 'Healthcare',     type: 'expense', amount: 3450 },
  { id: 10, date: '2026-03-20', description: 'Restaurant Dinner',  category: 'Food',           type: 'expense', amount: 4200 },
  { id: 11, date: '2026-03-18', description: 'Hotel Booking',      category: 'Travel',         type: 'expense', amount: 6780 },
  { id: 12, date: '2026-03-15', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
  { id: 13, date: '2026-03-12', description: 'Online Shopping',    category: 'Shopping',       type: 'expense', amount: 12800 },
  { id: 14, date: '2026-03-10', description: 'Internet Bill',      category: 'Bills',          type: 'expense', amount: 7800 },
  { id: 15, date: '2026-03-08', description: 'Spotify',            category: 'Entertainment',  type: 'expense', amount: 119 },
  { id: 16, date: '2026-03-05', description: 'Freelance Design',   category: 'Freelance',      type: 'income',  amount: 32000 },
  { id: 17, date: '2026-03-03', description: 'Swiggy Order',       category: 'Food',           type: 'expense', amount: 850 },
  { id: 18, date: '2026-03-01', description: 'Bus Ticket',         category: 'Travel',         type: 'expense', amount: 0 },
  { id: 19, date: '2026-02-28', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
  { id: 20, date: '2026-02-25', description: 'Movie Tickets',      category: 'Entertainment',  type: 'expense', amount: 1200 },
  { id: 21, date: '2026-02-22', description: 'Pharmacy',           category: 'Healthcare',     type: 'expense', amount: 0 },
  { id: 22, date: '2026-02-20', description: 'Train Tickets',      category: 'Travel',         type: 'expense', amount: 0 },
  { id: 23, date: '2026-02-18', description: 'Zomato',             category: 'Food',           type: 'expense', amount: 620 },
  { id: 24, date: '2026-02-15', description: 'Amazon Order',       category: 'Shopping',       type: 'expense', amount: 0 },
  { id: 25, date: '2026-02-10', description: 'Gas Bill',           category: 'Bills',          type: 'expense', amount: 0 },
  { id: 26, date: '2026-01-31', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
  { id: 27, date: '2026-01-28', description: 'Freelance Project',  category: 'Freelance',      type: 'income',  amount: 34100 },
  { id: 28, date: '2025-12-31', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
  { id: 29, date: '2025-12-25', description: 'Christmas Shopping', category: 'Shopping',       type: 'expense', amount: 0 },
  { id: 30, date: '2025-11-30', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
  { id: 31, date: '2025-10-31', description: 'Monthly Salary',     category: 'Salary',         type: 'income',  amount: 450000 },
];

// Fix zero amounts
initialTransactions.forEach(t => {
  if (t.amount === 0) {
    const map = { Food: 1800, Travel: 4500, Bills: 2200, Shopping: 5500, Entertainment: 800, Healthcare: 1200, Other: 3000 };
    t.amount = map[t.category] || 1000;
  }
});

export const balanceTrend = [
  { month: 'Oct', balance: 1070000 },
  { month: 'Nov', balance: 1175000 },
  { month: 'Dec', balance: 1148000 },
  { month: 'Jan', balance: 1275000 },
  { month: 'Feb', balance: 1340000 },
  { month: 'Mar', balance: 1510000 },
  { month: 'Apr', balance: 1570000 },
];
