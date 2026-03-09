import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Flame, Leaf, ChefHat } from "lucide-react";

const mealTypeStyles = {
  breakfast: { gradient: "from-amber-400 to-orange-400", icon: "🌅" },
  lunch: { gradient: "from-emerald-400 to-teal-400", icon: "☀️" },
  dinner: { gradient: "from-indigo-400 to-purple-400", icon: "🌙" },
  snack: { gradient: "from-pink-400 to-rose-400", icon: "🍎" }
};

export default function MealDetailSheet({ meal, onClose }) {
  if (!meal) return null;
  
  const style = mealTypeStyles[meal.type] || mealTypeStyles.snack;

  return (
    <Sheet open={!!meal} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <div className={`-mx-6 -mt-6 h-2 bg-gradient-to-r ${style.gradient}`} />
        
        <SheetHeader className="pt-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{style.icon}</span>
            <Badge variant="secondary" className="text-xs uppercase tracking-wide">
              {meal.type}
            </Badge>
          </div>
          <SheetTitle className="text-2xl font-semibold text-slate-800">
            {meal.name}
          </SheetTitle>
          <p className="text-slate-500">{meal.description}</p>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-50 rounded-lg">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">{meal.calories} kcal</span>
            </div>
            {meal.prep_time_minutes && (
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{meal.prep_time_minutes} min</span>
              </div>
            )}
          </div>

          {/* Nutrition */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Nutrition Facts</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Protein', value: meal.protein_g, unit: 'g', color: 'bg-emerald-50 text-emerald-700' },
                { label: 'Carbs', value: meal.carbs_g, unit: 'g', color: 'bg-amber-50 text-amber-700' },
                { label: 'Fat', value: meal.fat_g, unit: 'g', color: 'bg-blue-50 text-blue-700' },
                { label: 'Fiber', value: meal.fiber_g, unit: 'g', color: 'bg-green-50 text-green-700' },
                { label: 'Sodium', value: meal.sodium_mg, unit: 'mg', color: 'bg-red-50 text-red-700' },
                { label: 'Sugar', value: meal.sugar_g, unit: 'g', color: 'bg-pink-50 text-pink-700' }
              ].map((stat) => (
                <div key={stat.label} className={`p-3 rounded-lg ${stat.color}`}>
                  <p className="text-xs opacity-75">{stat.label}</p>
                  <p className="font-semibold">{stat.value}{stat.unit}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Health Benefits */}
          {meal.condition_benefits?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />
                Health Benefits
              </h3>
              <div className="space-y-2">
                {meal.condition_benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500 mt-1">•</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Ingredients */}
          {meal.ingredients?.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {meal.ingredients.map((ingredient, idx) => (
                  <Badge key={idx} variant="outline" className="bg-slate-50">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Recipe */}
          {meal.recipe_instructions && (
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-slate-500" />
                Recipe Instructions
              </h3>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                  {meal.recipe_instructions}
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}