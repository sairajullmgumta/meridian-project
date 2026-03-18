import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Department" },
  { number: 2, label: "Date & Time" },
  { number: 3, label: "Your Details" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = currentStep > step.number;
        const active = currentStep === step.number;
        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  backgroundColor: done ? "#0d9488" : active ? "#0d9488" : "#e2e8f0",
                  scale: active ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
              >
                {done ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className={`text-sm font-bold ${active ? "text-white" : "text-slate-400"}`}>
                    {step.number}
                  </span>
                )}
              </motion.div>
              <span className={`mt-1.5 text-xs font-medium ${active ? "text-teal-600" : done ? "text-teal-500" : "text-slate-400"}`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4 rounded-full overflow-hidden bg-slate-200 w-16 md:w-24">
                <motion.div
                  className="h-full bg-teal-500 rounded-full"
                  animate={{ width: currentStep > step.number ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}