import React, { useState } from 'react';
import Layout from '../Layout';
import { 
  Plus,
  Search,
  TrendingUp,
  Apple,
  Droplets,
  Clock,
  Trash2
} from "lucide-react";
import { format } from 'date-fns';

export default function NutritionTracker() {
  const today = format(new Date(), 'EEEE, MMMM d');
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Sample logged foods
  const [loggedFoods] = useState([
    { id: 1, meal: 'Breakfast', name: 'Oatmeal with Berries', time: '8:30 AM', calories: 350, protein: 12, carbs: 58, fat: 8 },
    { id: 2, meal: 'Lunch', name: 'Grilled Chicken Salad', time: '12:45 PM', calories: 450, protein: 35, carbs: 25, fat: 18 },
    { id: 3, meal: 'Snack', name: 'Apple & Almonds', time: '3:00 PM', calories: 180, protein: 5, carbs: 22, fat: 9 },
  ]);

  const dailyTotals = loggedFoods.reduce((acc, food) => ({
    calories: acc.calories + food.calories,
    protein: acc.protein + food.protein,
    carbs: acc.carbs + food.carbs,
    fat: acc.fat + food.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const calorieGoal = 2000;
  const caloriePercent = Math.min((dailyTotals.calories / calorieGoal) * 100, 100);

  return (
    <Layout currentPageName="NutritionTracker">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Nutrition Tracker</h1>
              <p className="text-slate-600 mt-1">{today}</p>
            </div>
            
            <button 
              onClick={() => setShowAddDialog(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Log Food
            </button>
          </div>

          {/* Daily Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:col-span-2">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#f97316"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${caloriePercent * 2.51} 251`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{dailyTotals.calories}</p>
                      <p className="text-xs text-slate-500">kcal</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Calories</p>
                  <p className="text-xl font-bold text-slate-900">{Math.round(caloriePercent)}%</p>
                  <p className="text-xs text-slate-500 mt-1">of {calorieGoal} kcal goal</p>
                  <p className="text-sm text-emerald-600 mt-2">
                    {calorieGoal - dailyTotals.calories} remaining
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Apple className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Protein</p>
                  <p className="text-2xl font-bold text-slate-900">{dailyTotals.protein}g</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${Math.min((dailyTotals.protein / 125) * 100, 100)}%`}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Goal: 125g</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Water</p>
                  <p className="text-2xl font-bold text-slate-900">1.2 L</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Goal: 2L</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search foods to log..."
                className="flex-1 outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Today's Log */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Today's Log</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
              {loggedFoods.map((food) => (
                <div key={food.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                        {food.meal}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {food.time}
                      </div>
                    </div>
                    <p className="font-medium text-slate-900">{food.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      P: {food.protein}g · C: {food.carbs}g · F: {food.fat}g
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{food.calories}</p>
                      <p className="text-xs text-slate-500">kcal</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Coming Soon</p>
                <p className="text-sm text-emerald-700">
                  Advanced food logging with barcode scanning, custom recipes, and detailed nutritional breakdowns.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}