import AppointmentTable from "./AppointmentTable";
import { motion } from "framer-motion";

const ACCENT = {
  today: {
    border: "border-teal-200",
    header: "bg-gradient-to-r from-teal-50 to-teal-100/60 border-b border-teal-200",
    badge: "bg-teal-600 text-white",
    emptyText: "text-teal-700",
  },
  upcoming: {
    border: "border-emerald-200",
    header: "bg-gradient-to-r from-emerald-50 to-emerald-100/60 border-b border-emerald-200",
    badge: "bg-emerald-600 text-white",
    emptyText: "text-emerald-700",
  },
  past: {
    border: "border-teal-200",
    header: "bg-gradient-to-r from-teal-50 to-teal-100/60 border-b border-teal-200",
    badge: "bg-teal-600 text-white",
    emptyText: "text-teal-700",
  },
};

export default function AppointmentSection({ title, appointments, onUpdateStatus, updating, accent }) {
  const s = ACCENT[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-2xl border shadow-sm overflow-hidden bg-white ${s.border}`}
    >
      {/* Header */}
      <div className={`px-5 py-4 flex items-center justify-between ${s.header}`}>
        <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badge}`}>
          {appointments.length}
        </span>
      </div>

      {/* Body */}
      {appointments.length === 0 ? (
        <div className="flex items-center justify-center py-8 bg-white">
          <p className={`text-sm italic ${s.emptyText}`}>No Appointments</p>
        </div>
      ) : (
        <AppointmentTable
          appointments={appointments}
          onUpdateStatus={onUpdateStatus}
          updating={updating}
        />
      )}
    </motion.div>
  );
}