import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, GraduationCap } from "lucide-react";
import { format, addDays, isToday, isTomorrow } from "date-fns";

const TIME_SLOTS = [
  { label: "9:00 AM", period: "Morning" },
  { label: "10:30 AM", period: "Morning" },
  { label: "12:00 PM", period: "Afternoon" },
  { label: "2:00 PM", period: "Afternoon" },
  { label: "4:30 PM", period: "Afternoon" },
];

function getDayLabel(date) {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEE");
}

const AVAILABLE_DAYS = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i + 1));

export default function Step2DateTime({ department, selected, onSelect, onNext, onBack }) {
  const [selectedDay, setSelectedDay] = useState(selected?.date || null);
  const [selectedSlot, setSelectedSlot] = useState(selected?.slot || null);

  const canContinue = selectedDay && selectedSlot;

  const handleNext = () => {
    onSelect({ date: selectedDay, slot: selectedSlot });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      {/* Doctor card */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-teal-50 border border-slate-200 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {department.doctor.split(" ").pop()[0]}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{department.doctor}</p>
          <p className="text-xs text-teal-600 font-medium">{department.label} Specialist</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Board Certified</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><User className="w-3 h-3" /> 4.9 ★</span>
          </div>
        </div>
      </div>

      {/* Date picker */}
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-teal-500" /> Select a Date
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {AVAILABLE_DAYS.map((day, i) => {
          const isSelected = selectedDay && format(selectedDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(day)}
              className={`flex flex-col items-center justify-center w-16 h-20 rounded-xl border-2 shrink-0 transition-all duration-200 ${
                isSelected
                  ? "border-teal-500 bg-teal-500 text-white shadow-lg shadow-teal-200"
                  : "border-slate-100 bg-white text-slate-700 hover:border-teal-300"
              }`}
            >
              <span className={`text-xs font-medium ${isSelected ? "text-teal-100" : "text-slate-400"}`}>
                {getDayLabel(day)}
              </span>
              <span className="text-xl font-bold mt-0.5">{format(day, "d")}</span>
              <span className={`text-xs ${isSelected ? "text-teal-100" : "text-slate-400"}`}>
                {format(day, "MMM")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-teal-500" /> Available Time Slots
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {TIME_SLOTS.map((slot, i) => {
          const isSelected = selectedSlot?.label === slot.label;
          return (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-teal-500 bg-teal-50 shadow-sm"
                  : "border-slate-100 bg-white hover:border-teal-300"
              }`}
            >
              <span className={`text-sm font-bold ${isSelected ? "text-teal-700" : "text-slate-700"}`}>
                {slot.label}
              </span>
              <span className={`text-xs mt-0.5 ${isSelected ? "text-teal-500" : "text-slate-400"}`}>
                {slot.period}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canContinue}
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-teal-600/20 hover:shadow-xl transition-all duration-300"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}