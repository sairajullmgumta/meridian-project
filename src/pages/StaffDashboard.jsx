import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format, isSameDay, parseISO, isAfter, isBefore, startOfDay } from "date-fns";
import { CalendarDays, List, RefreshCw, Users, CheckCircle, Clock, XCircle, X } from "lucide-react";
import DNASpiral from "../components/dashboard/DNASpiral";
import AppointmentCalendar from "../components/dashboard/AppointmentCalendar";
import AppointmentTable from "../components/dashboard/AppointmentTable";
import AppointmentSection from "../components/dashboard/AppointmentSection";

const FILTERS = ["All", "Pending", "Confirmed", "Cancelled"];

const STAT_DEFS = [
  { label: "Total", key: "total", icon: Users, color: "from-slate-600 to-slate-700" },
  { label: "Confirmed", key: "confirmed", icon: CheckCircle, color: "from-emerald-500 to-teal-500" },
  { label: "Pending", key: "pending", icon: Clock, color: "from-amber-400 to-orange-400" },
  { label: "Cancelled", key: "cancelled", icon: XCircle, color: "from-rose-500 to-pink-500" },
];

export default function StaffDashboard() {
  const [view, setView] = useState("list"); // "list" | "calendar"
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [updating, setUpdating] = useState(null);
  const [dayModal, setDayModal] = useState(null); // { day, apts }

  const fetchAppointments = async () => {
  setLoading(true);

  try {
    const res = await fetch("/api/appointments");
    const data = await res.json();
    setAppointments(data.appointments || []);
  } catch (err) {
    console.error("Error fetching appointments:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAppointments();
}, []);

  const handleUpdateStatus = async (id, status) => {
  setUpdating(id);

  try {
    await fetch("/api/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    // update UI instantly
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );

    toast.success("Status updated");
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("Failed to update status");
  }

  setUpdating(null);
};

  const filtered = filter === "All"
    ? appointments
    : appointments.filter((a) => (a.status || "Pending").toLowerCase() === filter.toLowerCase());

  const todayStart = startOfDay(new Date());

  // Parse date-only strings safely in local time to avoid UTC offset shifting the day
  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const pastApts = filtered.filter((a) => a.date && isBefore(parseLocalDate(a.date), todayStart));
  const todayApts = filtered.filter((a) => a.date && isSameDay(parseLocalDate(a.date), new Date()));
  const upcomingApts = filtered.filter((a) => a.date && isAfter(parseLocalDate(a.date), todayStart) && !isSameDay(parseLocalDate(a.date), new Date()));

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter((a) => (a.status || "").toLowerCase() === "confirmed").length,
    pending: appointments.filter((a) => !a.status || a.status.toLowerCase() === "pending").length,
    cancelled: appointments.filter((a) => (a.status || "").toLowerCase() === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-full">
            <DNASpiral />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-semibold text-teal-400 tracking-widest uppercase">
            Staff Portal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="mt-3 text-4xl md:text-5xl font-bold tracking-tight"
          >
            Appointments{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Dashboard</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-3 text-slate-300 text-base max-w-xl"
          >
            View, filter, and manage all patient appointments in real-time.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {STAT_DEFS.map(({ label, key, icon: StatIcon, color }) => (
              <div key={key} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                  <StatIcon className="w-4 h-4 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{loading ? "—" : stats[key]}</p>
                <p className="text-xs text-slate-300 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-6">
          {/* Filter tabs */}
          <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            {/* View toggle */}
            <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  view === "list" ? "bg-teal-600 text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <List className="w-4 h-4" /> List
              </button>
              <button
                onClick={() => setView("calendar")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  view === "calendar" ? "bg-teal-600 text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <CalendarDays className="w-4 h-4" /> Calendar
              </button>
            </div>

            <button
              onClick={fetchAppointments}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                    <div className="h-4 w-40 bg-slate-100 rounded-full animate-pulse" />
                    <div className="h-5 w-16 bg-slate-100 rounded-full animate-pulse" />
                  </div>
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex items-center gap-4 px-5 py-4 border-b border-slate-50 last:border-0">
                      <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 bg-slate-100 rounded-full animate-pulse w-1/3" />
                        <div className="h-3 bg-slate-100 rounded-full animate-pulse w-1/2" />
                      </div>
                      <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          ) : view === "calendar" ? (
            <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <AppointmentCalendar
                appointments={filtered}
                onSelectDay={(day, apts) => setDayModal({ day, apts })}
              />

            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <AppointmentSection
                title="Today's Appointments"
                accent="today"
                appointments={todayApts}
                onUpdateStatus={handleUpdateStatus}
                updating={updating}
              />
              <AppointmentSection
                title="Upcoming Appointments"
                accent="upcoming"
                appointments={upcomingApts}
                onUpdateStatus={handleUpdateStatus}
                updating={updating}
              />
              <AppointmentSection
                title="Past Appointments"
                accent="past"
                appointments={pastApts}
                onUpdateStatus={handleUpdateStatus}
                updating={updating}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Day modal */}
      <AnimatePresence>
        {dayModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDayModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-800 text-lg">
                  {format(dayModal.day, "EEEE, MMMM d")}
                </h3>
                <button onClick={() => setDayModal(null)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {dayModal.apts.map((apt) => (
                  <div key={apt.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{apt.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm truncate">{apt.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{apt.department} · {apt.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${(apt.status || "Pending").toLowerCase() === "confirmed" ? "bg-emerald-100 text-emerald-700" :
                        (apt.status || "Pending").toLowerCase() === "cancelled" ? "bg-rose-100 text-rose-700" :
                        "bg-amber-100 text-amber-700"}`}>
                      {apt.status || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}