import { Plus, Search, Wallet, TrendingUp, Download, Filter, Car, Hotel, Utensils, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata = { title: "Expense Manager | ZUno" };

const recentExpenses = [
  {
    id: 1,
    title: "First Class: Zurich to Tokyo",
    category: "Transport",
    icon: Car,
    amount: 3200.00,
    currency: "USD",
    status: "Cleared",
    date: "Oct 24, 2023",
  },
  {
    id: 2,
    title: "Park Hyatt Tokyo (3 Nights)",
    category: "Lodging",
    icon: Hotel,
    amount: 1850.00,
    currency: "USD",
    status: "Cleared",
    date: "Oct 25, 2023",
  },
  {
    id: 3,
    title: "Omaskase at Sukiyabashi Jiro",
    category: "Dining",
    icon: Utensils,
    amount: 450.00,
    currency: "USD",
    status: "Pending",
    date: "Oct 26, 2023",
  },
  {
    id: 4,
    title: "Ginza Shopping District",
    category: "Shopping",
    icon: ShoppingBag,
    amount: 920.00,
    currency: "USD",
    status: "Cleared",
    date: "Oct 26, 2023",
  },
];

export default function ExpensesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-5xl font-bold text-white tracking-tighter mb-2">Expense Manager</h2>
          <p className="text-white/60 font-medium text-lg">Track your luxury journey investments in real-time.</p>
        </div>
        <div className="flex gap-4">
          <button className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-secondary hover:bg-white/5 transition-all">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          <button className="primary-gradient text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform">
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Top Category Card */}
        <div className="glass-panel p-8 rounded-[32px] flex items-center justify-between hover:border-white/20 transition-all group">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Top Category</p>
            <h3 className="text-3xl font-bold text-white mb-1">Fine Dining</h3>
            <p className="text-secondary text-xs font-bold flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> 12% from last trip
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
            <Utensils className="h-8 w-8" />
          </div>
        </div>

        {/* Remaining Funds Card */}
        <div className="glass-panel p-8 rounded-[32px] flex items-center justify-between border-l-4 border-l-primary group">
          <div className="flex-1 mr-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Remaining Funds</p>
            <h3 className="text-3xl font-bold text-white mb-4">$12,450.00</h3>
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
              <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(108,99,255,0.5)]" style={{ width: "65%" }}></div>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Wallet className="h-8 w-8" />
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="glass-panel p-8 rounded-[32px] flex items-center justify-between group">
          <div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3">Total Expense</p>
            <h3 className="text-3xl font-bold text-white mb-1">$6,842.20</h3>
            <p className="text-white/40 text-xs font-medium italic">Swiss Alps Expedition</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-indigo-400/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <TrendingUp className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Expense Table Section */}
      <div className="glass-panel rounded-[32px] overflow-hidden shadow-2xl">
        <div className="px-10 py-8 flex items-center justify-between border-b border-white/5">
          <h4 className="text-2xl font-bold text-white tracking-tight">Recent Transactions</h4>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 h-4 w-4 group-focus-within:text-secondary transition-colors" />
            <input 
              className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-3 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all w-80 text-sm text-white placeholder:text-white/20" 
              placeholder="Search expenses..." 
              type="text"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-10 py-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Title</th>
                <th className="px-10 py-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Category</th>
                <th className="px-10 py-6 text-[10px] text-white/40 uppercase tracking-widest font-bold text-right">Amount</th>
                <th className="px-10 py-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Status</th>
                <th className="px-10 py-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <expense.icon className="h-5 w-5" />
                      </div>
                      <span className="text-base font-bold text-white leading-tight">{expense.title}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="bg-white/5 text-white/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right text-xl font-bold text-white">
                    ${expense.amount.toLocaleString()} <span className="text-[10px] text-white/30 font-bold ml-1">{expense.currency}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className={cn(
                      "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                      expense.status === "Cleared" ? "text-secondary" : "text-orange-400"
                    )}>
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        expense.status === "Cleared" ? "bg-secondary shadow-[0_0_8px_rgba(71,245,219,0.6)]" : "bg-orange-400 shadow-[0_0_8px_rgba(255,185,95,0.6)] animate-pulse"
                      )}></span>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-white/40 font-bold text-xs uppercase tracking-widest">{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-10 py-6 bg-white/5 flex items-center justify-between">
          <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Showing 1-4 of 42 transactions</p>
          <div className="flex gap-3">
            <button className="p-3 glass-panel rounded-xl hover:text-secondary transition-colors text-white/60">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-12 right-12 w-16 h-16 rounded-full primary-gradient text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-primary/40 z-50">
        <Plus className="h-8 w-8" />
      </button>
    </div>
  );
}
