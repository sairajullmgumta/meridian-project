import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Stethoscope, User, Mail, ArrowRight, MessageCircle } from "lucide-react";
import { format } from "date-fns";

export default function ConfirmationScreen({ department, dateTime, patientName, email, emailSent, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-teal-500/25"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-2xl font-bold text-slate-900">Appointment Confirmed!</h2>
      <p className="text-slate-500 mt-1 mb-7 text-sm">
        {emailSent
          ? "A confirmation email has been sent to your inbox."
          : "Your booking is saved. Our team will follow up shortly."}
      </p>

      {/* Summary card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6 text-left shadow-sm">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-5 py-3">
          <p className="text-white font-semibold text-sm">Booking Summary</p>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { icon: User, label: "Patient", value: patientName },
            { icon: Stethoscope, label: "Department", value: department.label },
            { icon: User, label: "Doctor", value: department.doctor },
            { icon: Calendar, label: "Date", value: format(dateTime.date, "EEEE, MMMM d, yyyy") },
            { icon: Clock, label: "Time", value: dateTime.slot.label },
            { icon: Mail, label: "Email", value: email },
          ].map((row, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <row.icon className="w-4 h-4 text-teal-500 shrink-0" />
              <span className="text-xs text-slate-400 w-24 shrink-0">{row.label}</span>
              <span className="text-sm font-semibold text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat CTA */}
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="relative flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-xs">Have questions before your visit?</p>
              <p className="text-slate-400 text-xs">Chat with our AI medical assistant.</p>
            </div>
          </div>
          <Link
            to={createPageUrl("MedicalChat")}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-3 h-3" /> Chat
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex-1 h-11 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:border-teal-300 hover:text-teal-700 transition-all text-sm"
        >
          Book Another
        </button>
        <Link
          to={createPageUrl("Home")}
          className="flex-1 h-11 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 text-sm hover:shadow-xl transition-all"
        >
          Back to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}