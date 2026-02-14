import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { conditionConfig } from "../ui/ConditionBadge";
import { motion, AnimatePresence } from "framer-motion";

const conditions = [
  "diabetes_type1",
  "diabetes_type2", 
  "hypertension",
  "cardiovascular_disease",
  "kidney_disease",
  "celiac_disease",
  "lactose_intolerance",
  "high_cholesterol",
  "gout",
  "obesity",
  "anemia",
  "osteoporosis"
];

export default function ConditionSelector({ selected = [], onChange }) {
  const toggleCondition = (condition) => {
    if (selected.includes(condition)) {
      onChange(selected.filter(c => c !== condition));
    } else {
      onChange([...selected, condition]);
    }
  };
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {conditions.map((condition) => {
        const config = conditionConfig[condition];
        const Icon = config.icon;
        const isSelected = selected.includes(condition);
        
        return (
          <motion.button
            key={condition}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleCondition(condition)}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
              isSelected 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-slate-200 bg-white hover:border-slate-300"
            )}
          >
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-emerald-500"
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className={cn(
              "p-2 rounded-lg w-fit mb-2",
              isSelected ? "bg-emerald-100" : "bg-slate-100"
            )}>
              <Icon className={cn(
                "w-5 h-5",
                isSelected ? "text-emerald-600" : "text-slate-500"
              )} />
            </div>
            
            <p className={cn(
              "font-medium text-sm",
              isSelected ? "text-emerald-700" : "text-slate-700"
            )}>
              {config.label}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}