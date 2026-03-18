import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppointmentCalendar({ appointments, onSelectDay }) {
  const [current, setCurrent] = useState(new Date());

  const days = eachDayOfInterval({ start: startOfMonth(current), end: endOfMonth(current) });
  const startDay = startOfMonth(current).getDay();

  const parseLocalDate = (dateStr) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const getAptsForDay = (day) =>
    appointments.filter((a) => a.date && isSameDay(parseLocalDate(a.date), day));

  const today = new Date();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">
          {format(current, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setCurrent(subMonths(current, 1))} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <button onClick={() => setCurrent(addMonths(current, 1))} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map((day) => {
          const apts = getAptsForDay(day);
          const isToday = isSameDay(day, today);
          const hasApts = apts.length > 0;

          return (
            <button
              key={day.toISOString()}
              onClick={() => hasApts && onSelectDay(day, apts)}
              className={`relative flex flex-col rounded-xl transition-all min-h-[80px] p-1.5 text-left
                ${isToday ? "ring-2 ring-teal-400 bg-teal-50" : "bg-slate-50 hover:bg-slate-100"}
                ${hasApts ? "cursor-pointer" : "cursor-default"}
              `}
            >
              {/* Date number */}
              <span className={`text-xs font-semibold mb-1 ${isToday ? "text-teal-700" : "text-slate-500"}`}>
                {format(day, "d")}
              </span>

              {/* Appointment tags */}
              <div className="flex flex-col gap-0.5 w-full">
                {apts.slice(0, 2).map((apt, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-tight truncate
                      ${(apt.status || "").toLowerCase() === "confirmed"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : (apt.status || "").toLowerCase() === "cancelled"
                        ? "bg-rose-100 text-rose-700 border border-rose-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                      }`}
                  >
                    <span className="font-semibold">
                     {(apt.status || "Pending") === "Confirmed" ? "✓ Confirmed" :
                      (apt.status || "Pending") === "Cancelled" ? "✗ Cancelled" : ".. Pending"}
                    </span>
                    <br />
                    <span className="opacity-80">{apt.name}</span>
                    {apt.reason && (
                      <>
                        <br />
                        <span className="opacity-60 italic">{apt.reason}</span>
                      </>
                    )}
                  </div>
                ))}
                {apts.length > 2 && (
                  <span className="text-[10px] text-slate-400 pl-1">+{apts.length - 2} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-slate-100">
        {[["Confirmed", "bg-emerald-500"], ["Pending", "bg-amber-400"], ["Cancelled", "bg-rose-500"]].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}