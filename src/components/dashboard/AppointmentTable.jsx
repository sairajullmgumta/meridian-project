import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { User, Phone, Mail, Clock, Stethoscope } from "lucide-react";

const STATUS_STYLES = {
  Confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  cancelled: "bg-rose-100 text-rose-700 border-rose-200",
};

export default function AppointmentTable({ appointments, onUpdateStatus, updating }) {
  if (appointments.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <Stethoscope className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {appointments.map((apt) => (
        <div key={apt.id} className="p-4 md:p-5 hover:bg-slate-50/60 transition-colors group">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            {/* Avatar + Name */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-semibold text-sm">
                  {apt.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 truncate">{apt.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Mail className="w-3 h-3" />{apt.email}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Phone className="w-3 h-3" />{apt.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Department + Date/Time */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
                <span className="capitalize">{apt.department}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Clock className="w-3.5 h-3.5 text-teal-500" />
                <span>{(() => { try { return apt.date ? format(new Date(apt.date + "T00:00:00"), "MMM d, yyyy") : "—"; } catch { return apt.date || "—"; } })()}</span>
                {apt.time && <span className="text-slate-400">· {apt.time}</span>}
              </div>
            </div>

            {/* Status selector */}
            <div className="shrink-0">
              <Select
                value={apt.status || "Pending"}
                onValueChange={(val) => onUpdateStatus(apt.id, val)}
                disabled={updating === apt.id}
              >
                <SelectTrigger className={`w-36 h-8 text-xs font-medium border rounded-lg ${STATUS_STYLES[apt.status] || STATUS_STYLES["Pending"]}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {apt.reason && (
            <p className="mt-2 ml-13 text-xs text-slate-400 italic truncate pl-13">
              "{apt.reason}"
            </p>
          )}
        </div>
      ))}
    </div>
  );
}