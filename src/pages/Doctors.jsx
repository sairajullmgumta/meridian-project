import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Award, GraduationCap, ArrowRight } from "lucide-react";

const doctors = [
  { name: "Dr. Sarah Chen", dept: "Cardiology", title: "Chief of Cardiology", exp: "20+ years", edu: "Harvard Medical School", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name: "Dr. James Wilson", dept: "Neurology", title: "Head of Neurosciences", exp: "18 years", edu: "Johns Hopkins University", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
  { name: "Dr. Maria Santos", dept: "Pediatrics", title: "Pediatric Specialist", exp: "15 years", edu: "Stanford University", image: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&q=80" },
  { name: "Dr. Robert Kim", dept: "Orthopedics", title: "Orthopedic Surgeon", exp: "22 years", edu: "Mayo Clinic", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" },
  { name: "Dr. Emily Parker", dept: "Oncology", title: "Oncology Director", exp: "16 years", edu: "Yale School of Medicine", image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&q=80" },
  { name: "Dr. Michael Brown", dept: "Emergency", title: "ER Director", exp: "14 years", edu: "Columbia University", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80" },
  { name: "Dr. Lisa Thompson", dept: "Dermatology", title: "Dermatology Lead", exp: "12 years", edu: "UCLA Medical School", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80" },
  { name: "Dr. David Martinez", dept: "General Medicine", title: "Internal Medicine", exp: "19 years", edu: "University of Chicago", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80" },
];

const departments = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Oncology", "Emergency", "Dermatology", "General Medicine"];

export default function Doctors() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? doctors : doctors.filter(d => d.dept === filter);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-teal-400 tracking-widest uppercase">Our Team</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Meet Our <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Expert Doctors</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Our team of board-certified specialists brings decades of experience and a passion for exceptional patient care.
          </motion.p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  filter === dept
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/25"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-teal-200 hover:text-teal-700"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-teal-700">
                      {doc.dept}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-sm text-teal-600 font-medium">{doc.title}</p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {doc.exp} experience
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      {doc.edu}
                    </div>
                  </div>
                  <Link
                    to={createPageUrl("Appointments")}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-all duration-300"
                  >
                    Book Appointment <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}