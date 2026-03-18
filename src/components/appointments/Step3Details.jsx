import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Mail, Phone, FileText, Calendar, Clock, Stethoscope } from "lucide-react";
import { format } from "date-fns";

export default function Step3Details({ department, dateTime, onSubmit, onBack, submitting }) {
  const [details, setDetails] = useState({
    patient_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const canSubmit = details.patient_name.trim() && details.email.trim() && details.phone.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(details);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      {/* Booking summary */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-4 mb-6 grid grid-cols-3 gap-3 text-center">
        <div>
          <Stethoscope className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500 font-medium">Department</p>
          <p className="text-sm font-bold text-slate-800">{department.label}</p>
        </div>
        <div>
          <Calendar className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500 font-medium">Date</p>
          <p className="text-sm font-bold text-slate-800">{format(dateTime.date, "MMM d, yyyy")}</p>
        </div>
        <div>
          <Clock className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <p className="text-xs text-slate-500 font-medium">Time</p>
          <p className="text-sm font-bold text-slate-800">{dateTime.slot.label}</p>
        </div>
      </div>

      <h2 className="text-sm font-bold text-slate-700 mb-4">Your Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
          </label>
          <Input
            value={details.patient_name}
            onChange={(e) => setDetails({ ...details, patient_name: e.target.value })}
            placeholder="John Smith"
            required
            className="h-11 rounded-xl"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email *
            </label>
            <Input
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              placeholder="john@example.com"
              required
              className="h-11 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone *
            </label>
            <Input
              value={details.phone}
              onChange={(e) => setDetails({ ...details, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              required
              className="h-11 rounded-xl"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" /> Reason for Visit (optional)
          </label>
          <Textarea
            value={details.message}
            onChange={(e) => setDetails({ ...details, message: e.target.value })}
            placeholder="Briefly describe your symptoms or reason for visit…"
            className="min-h-[90px] rounded-xl"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-slate-300 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-teal-600/20 hover:shadow-xl transition-all duration-300"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Confirming…
              </>
            ) : (
              "Confirm Appointment"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}