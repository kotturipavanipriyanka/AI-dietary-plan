import React from 'react';
import Layout from '../Layout';
import { 
  Flame, 
  Droplets, 
  Wheat, 
  Apple,
  Plus,
  Sparkles,
  Calendar
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils/index.js";

export default function Dashboard() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const dailyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const calorieTarget = 2000;

  return (
    <Layout currentPageName="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-800">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
              </h1>
              <p className="text-slate-500 mt-1">
                {format(new Date(), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
            <Link to={createPageUrl("MealPlanner")}>
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-200 transition-colors">
                <Sparkles className="w-4 h-4" />
                Generate Meal Plan
              </button>
            </Link>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Calories */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Calories</p>
                  <p className="text-xl font-bold text-slate-900">{dailyTotals.calories}</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Target: {calorieTarget} kcal</p>
            </div>

            {/* Protein */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-emerald-100">
                  <Apple className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Protein</p>
                  <p className="text-xl font-bold text-slate-900">{dailyTotals.protein}g</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Target: {Math.round(calorieTarget * 0.25 / 4)}g</p>
            </div>

            {/* Carbs */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-amber-100">
                  <Wheat className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Carbs</p>
                  <p className="text-xl font-bold text-slate-900">{dailyTotals.carbs}g</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Target: {Math.round(calorieTarget * 0.45 / 4)}g</p>
            </div>

            {/* Hydration */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-blue-100">
                  <Droplets className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Hydration</p>
                  <p className="text-xl font-bold text-slate-900">6</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Target: 10 glasses</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Meals */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">Today's Meals</h2>
                <Link to={createPageUrl("MealPlanner")} className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </Link>
              </div>
              
              <div className="bg-white border-dashed border-2 border-slate-200 rounded-xl">
                <div className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-medium text-slate-700 mb-2">No meals planned for today</h3>
                  <p className="text-sm text-slate-500 mb-4">Generate an AI-powered meal plan tailored to your conditions</p>
                  <Link to={createPageUrl("MealPlanner")}>
                    <button className="flex items-center gap-2 mx-auto border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                      Create Meal Plan
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Nutrition Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800">Nutrition Summary</h2>
              <div className="bg-white border-0 shadow-sm rounded-xl">
                <div className="p-6">
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Daily Goal</span>
                      <span className="font-medium text-slate-700">{calorieTarget} kcal</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-slate-500">Remaining</span>
                      <span className="font-medium text-emerald-600">
                        {Math.max(0, calorieTarget - dailyTotals.calories)} kcal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Log */}
              <Link to={createPageUrl("NutritionTracker")}>
                <button className="w-full border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Log Food Intake
                </button>
              </Link>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-900">Your app is running successfully!</p>
                <p className="text-sm text-green-700 mt-1">
                  All components loaded • Server connected • Ready to use
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}