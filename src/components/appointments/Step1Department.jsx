import React from "react";
import { motion } from "framer-motion";
import { Heart, Brain, Bone, Baby, Microscope, Activity, Scan, Pill, ArrowRight } from "lucide-react";

const DEPARTMENTS = [
  { value: "general_medicine", label: "General Medicine", icon: Pill, doctor: "Dr. David Martinez", desc: "Routine check-ups & primary care", color: "text-green-600 bg-green-50" },
  { value: "cardiology", label: "Cardiology", icon: Heart, doctor: "Dr. Sarah Chen", desc: "Heart & cardiovascular care", color: "text-red-600 bg-red-50" },
  { value: "neurology", label: "Neurology", icon: Brain, doctor: "Dr. James Wilson", desc: "Brain, spine & nerve conditions", color: "text-purple-600 bg-purple-50" },
  { value: "orthopedics", label: "Orthopedics", icon: Bone, doctor: "Dr. Robert Kim", desc: "Bones, joints & sports injuries", color: "text-blue-600 bg-blue-50" },
  { value: "pediatrics", label: "Pediatrics", icon: Baby, doctor: "Dr. Maria Santos", desc: "Healthcare for children", color: "text-pink-600 bg-pink-50" },
  { value: "dermatology", label: "Dermatology", icon: Scan, doctor: "Dr. Lisa Thompson", desc: "Skin, hair & nail conditions", color: "text-fuchsia-600 bg-fuchsia-50" },
  { value: "oncology", label: "Oncology", icon: Microscope, doctor: "Dr. Emily Parker", desc: "Cancer diagnosis & treatment", color: "text-amber-600 bg-amber-50" },
  { value: "emergency", label: "Emergency", icon: Activity, doctor: "Dr. Michael Brown", desc: "Urgent & critical care", color: "text-teal-600 bg-teal-50" },
];

export { DEPARTMENTS };

export default function Step1Department({ selected, onSelect, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      <h2 className="text-xl font-bold text-slate-900 mb-1">Select a Department</h2>
      <p className="text-slate-500 text-sm mb-6">Choose the specialty that best matches your needs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selected?.value === dept.value;
          return (
            <button
              key={dept.value}
              onClick={() => onSelect(dept)}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                isSelected
                  ? "border-teal-500 bg-teal-50 shadow-md shadow-teal-100"
                  : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${dept.color}`}>
                <dept.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${isSelected ? "text-teal-800" : "text-slate-800"}`}>
                  {dept.label}
                </p>
                <p className="text-xs text-slate-500 truncate">{dept.desc}</p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-teal-600/20 hover:shadow-xl transition-all duration-300"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}