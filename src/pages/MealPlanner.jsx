import React, { useState } from 'react';
import Layout from '../Layout';
import { 
  Sparkles, 
  Calendar as CalendarIcon,
  ChefHat,
  Clock,
  Apple,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format, addDays, subDays } from "date-fns";

export default function MealPlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateString = format(selectedDate, 'MMM d, yyyy');

  return (
    <Layout currentPageName="MealPlanner">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Meal Planner</h1>
              <p className="text-slate-600 mt-1">
                AI-powered meal recommendations for your health conditions
              </p>
            </div>
            
            {/* Date Selector */}
            <div className="flex items-center bg-white rounded-xl border shadow-sm">
              <button
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                className="p-2 hover:bg-slate-100 rounded-l-xl transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="px-4 py-2 flex items-center gap-2 border-x">
                <CalendarIcon className="w-4 h-4 text-slate-600" />
                <span className="font-medium text-slate-800">{dateString}</span>
              </div>
              
              <button
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                className="p-2 hover:bg-slate-100 rounded-r-xl transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-sm border border-emerald-200 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Generate Meal Plan</h3>
                  <p className="text-sm text-slate-600">
                    Get personalized meals based on your conditions
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-lg shadow-emerald-200 transition-colors">
                <Sparkles className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>

          {/* Sample Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                type: 'Breakfast',
                name: 'Oatmeal with Berries',
                icon: '🥣',
                time: '15 min',
                calories: 350,
                protein: 12,
                carbs: 58,
                color: 'from-orange-50 to-amber-50'
              },
              {
                type: 'Lunch',
                name: 'Grilled Chicken Salad',
                icon: '🥗',
                time: '20 min',
                calories: 450,
                protein: 35,
                carbs: 25,
                color: 'from-green-50 to-emerald-50'
              },
              {
                type: 'Dinner',
                name: 'Baked Salmon with Vegetables',
                icon: '🐟',
                time: '30 min',
                calories: 550,
                protein: 40,
                carbs: 35,
                color: 'from-blue-50 to-cyan-50'
              },
              {
                type: 'Snack',
                name: 'Greek Yogurt & Almonds',
                icon: '🥜',
                time: '5 min',
                calories: 200,
                protein: 15,
                carbs: 18,
                color: 'from-purple-50 to-pink-50'
              }
            ].map((meal, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${meal.color} rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-slate-500 uppercase">{meal.type}</span>
                    <h3 className="text-lg font-semibold text-slate-900 mt-1">{meal.name}</h3>
                  </div>
                  <span className="text-3xl">{meal.icon}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{meal.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Apple className="w-4 h-4" />
                    <span>{meal.calories} cal</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Protein: {meal.protein}g</span>
                    <span>Carbs: {meal.carbs}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Coming Soon</p>
                <p className="text-sm text-blue-700">
                  AI-powered meal generation with personalized recipes tailored to your medical conditions and dietary preferences.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}