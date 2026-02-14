import React from 'react';
import { cn } from "@/lib/utils";
import { 
  Heart, 
  Droplets, 
  Activity, 
  Wheat, 
  Milk, 
  Scale, 
  Bone, 
  CircleDot,
  Pill,
  Flame
} from "lucide-react";

const conditionConfig = {
  diabetes_type1: { label: "Type 1 Diabetes", icon: Droplets, color: "bg-blue-50 text-blue-700 border-blue-200" },
  diabetes_type2: { label: "Type 2 Diabetes", icon: Droplets, color: "bg-blue-50 text-blue-700 border-blue-200" },
  hypertension: { label: "Hypertension", icon: Activity, color: "bg-red-50 text-red-700 border-red-200" },
  cardiovascular_disease: { label: "Cardiovascular", icon: Heart, color: "bg-rose-50 text-rose-700 border-rose-200" },
  kidney_disease: { label: "Kidney Disease", icon: CircleDot, color: "bg-purple-50 text-purple-700 border-purple-200" },
  celiac_disease: { label: "Celiac Disease", icon: Wheat, color: "bg-amber-50 text-amber-700 border-amber-200" },
  lactose_intolerance: { label: "Lactose Intolerant", icon: Milk, color: "bg-orange-50 text-orange-700 border-orange-200" },
  high_cholesterol: { label: "High Cholesterol", icon: Flame, color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  gout: { label: "Gout", icon: Pill, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  obesity: { label: "Obesity", icon: Scale, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  anemia: { label: "Anemia", icon: Droplets, color: "bg-pink-50 text-pink-700 border-pink-200" },
  osteoporosis: { label: "Osteoporosis", icon: Bone, color: "bg-slate-50 text-slate-700 border-slate-200" }
};

export default function ConditionBadge({ condition, size = "default" }) {
  const config = conditionConfig[condition] || { 
    label: condition?.replace(/_/g, ' '), 
    icon: CircleDot, 
    color: "bg-gray-50 text-gray-700 border-gray-200" 
  };
  
  const Icon = config.icon;
  
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 border rounded-full font-medium transition-all",
      config.color,
      size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
    )}>
      <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {config.label}
    </span>
  );
}

export { conditionConfig };