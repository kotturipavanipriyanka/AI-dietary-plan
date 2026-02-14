import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HealthMetricsCard({ 
  title, 
  value, 
  unit, 
  target, 
  icon: Icon, 
  color = "emerald",
  trend 
}) {
  const percentage = target ? Math.min((value / target) * 100, 100) : 0;
  
  const colorClasses = {
    emerald: { bg: "bg-emerald-500", light: "bg-emerald-100", text: "text-emerald-600" },
    blue: { bg: "bg-blue-500", light: "bg-blue-100", text: "text-blue-600" },
    amber: { bg: "bg-amber-500", light: "bg-amber-100", text: "text-amber-600" },
    rose: { bg: "bg-rose-500", light: "bg-rose-100", text: "text-rose-600" },
    purple: { bg: "bg-purple-500", light: "bg-purple-100", text: "text-purple-600" },
    coral: { bg: "bg-orange-400", light: "bg-orange-100", text: "text-orange-600" }
  };
  
  const colors = colorClasses[color] || colorClasses.emerald;
  
  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-2.5 rounded-xl", colors.light)}>
            <Icon className={cn("w-5 h-5", colors.text)} />
          </div>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              {trend > 0 ? "+" : ""}{trend}%
            </span>
          )}
        </div>
        
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold text-slate-800">{value}</span>
          <span className="text-sm text-slate-400">{unit}</span>
        </div>
        
        {target && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress</span>
              <span>{Math.round(percentage)}% of {target}{unit}</span>
            </div>
            <div className={cn("h-1.5 rounded-full", colors.light)}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("h-full rounded-full", colors.bg)}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}