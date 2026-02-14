import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils/index.js';
import { 
  LayoutDashboard, 
  User, 
  CalendarDays, 
  UtensilsCrossed,
  Leaf,
  Menu
} from "lucide-react";

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Meal Planner', icon: CalendarDays, page: 'MealPlanner' },
  { name: 'Nutrition Tracker', icon: UtensilsCrossed, page: 'NutritionTracker' },
  { name: 'Medical Profile', icon: User, page: 'MedicalProfile' }
];

function NavLink({ item, isActive, onClick }) {
  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";
  const activeClasses = isActive 
    ? "bg-emerald-100 text-emerald-700" 
    : "text-slate-600 hover:bg-slate-100";
  
  return (
    <Link
      to={createPageUrl(item.page)}
      onClick={onClick}
      className={`${baseClasses} ${activeClasses}`}
    >
      <item.icon className={`w-5 h-5 ${isActive && "text-emerald-600"}`} />
      <span className="font-medium">{item.name}</span>
    </Link>
  );
}

export default function Layout({ children, currentPageName }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40">
        <div className="p-6 border-b border-slate-100">
          <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              NutriCare
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.page} 
              item={item} 
              isActive={currentPageName === item.page}
            />
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
            <p className="text-sm font-medium text-emerald-800">AI-Powered</p>
            <p className="text-xs text-emerald-600 mt-1">
              Personalized nutrition based on medical guidelines
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            NutriCare
          </span>
        </Link>
        
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 lg:hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  NutriCare
                </span>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.page} 
                  item={item} 
                  isActive={currentPageName === item.page}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}