import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, ChevronRight, Leaf, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const mealTypeStyles = {
  breakfast: { gradient: "from-amber-400 to-orange-400", icon: "🌅" },
  lunch: { gradient: "from-emerald-400 to-teal-400", icon: "☀️" },
  dinner: { gradient: "from-indigo-400 to-purple-400", icon: "🌙" },
  snack: { gradient: "from-pink-400 to-rose-400", icon: "🍎" }
};

export default function MealCard({ meal, onClick, isCompleted = false }) {
  const style = mealTypeStyles[meal.type] || mealTypeStyles.snack;
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "overflow-hidden border-0 shadow-sm cursor-pointer transition-all duration-300",
          "hover:shadow-lg group",
          isCompleted && "opacity-75"
        )}
        onClick={onClick}
      >
        <div className={cn("h-1.5 bg-gradient-to-r", style.gradient)} />
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  {meal.type}
                </p>
                <h3 className="font-semibold text-slate-800 line-clamp-1">{meal.name}</h3>
              </div>
            </div>
            {isCompleted && (
              <div className="p-1.5 rounded-full bg-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            )}
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">
            {meal.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>{meal.calories} kcal</span>
            </div>
            {meal.prep_time_minutes && (
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{meal.prep_time_minutes} min</span>
              </div>
            )}
          </div>
          
          {meal.condition_benefits?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {meal.condition_benefits.slice(0, 2).map((benefit, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="bg-emerald-50 text-emerald-700 border-0 text-xs"
                >
                  <Leaf className="w-3 h-3 mr-1" />
                  {benefit}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex gap-3 text-xs text-slate-500">
              <span>P: {meal.protein_g}g</span>
              <span>C: {meal.carbs_g}g</span>
              <span>F: {meal.fat_g}g</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}