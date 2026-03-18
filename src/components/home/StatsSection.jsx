import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Stethoscope, Building } from "lucide-react";

const stats = [
  { icon: Users, value: "50,000+", label: "Patients Treated", color: "from-teal-500 to-emerald-500" },
  { icon: Award, value: "35+", label: "Years of Excellence", color: "from-blue-500 to-indigo-500" },
  { icon: Stethoscope, value: "100+", label: "Expert Doctors", color: "from-violet-500 to-purple-500" },
  { icon: Building, value: "12", label: "Departments", color: "from-amber-500 to-orange-500" },
];

export default function StatsSection() {
  return (
    <section className="relative -mt-16 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}