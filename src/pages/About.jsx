import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Heart, Target, Eye, Gem } from "lucide-react";

const values = [
  { icon: Heart, title: "Compassion", desc: "Every interaction begins and ends with genuine empathy and care for our patients and their families." },
  { icon: Target, title: "Excellence", desc: "We pursue the highest standards in medical practice, research, and patient outcomes." },
  { icon: Eye, title: "Innovation", desc: "Embracing the latest medical technologies and treatments to deliver superior healthcare." },
  { icon: Gem, title: "Integrity", desc: "Transparency, honesty, and ethical practice are the cornerstones of everything we do." },
];

const milestones = [
  { year: "1985", title: "Founded", desc: "Meridian Health opens its doors with a vision to transform healthcare." },
  { year: "1998", title: "Expansion", desc: "New cardiac and neurology wings added, doubling our capacity." },
  { year: "2010", title: "Research Center", desc: "Launch of the Meridian Research Institute for clinical trials." },
  { year: "2020", title: "Digital Health", desc: "Pioneering telemedicine and AI-assisted diagnostics." },
  { year: "2025", title: "Global Recognition", desc: "Named among the top 50 hospitals worldwide for patient care." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold text-teal-400 tracking-widest uppercase"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            A Legacy of{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Healing & Hope
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
          >
            For over three decades, Meridian Health has been at the forefront of medical innovation, delivering exceptional patient care with compassion and excellence.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <span className="text-sm font-semibold text-teal-600 tracking-widest uppercase">Our Story</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Building a Healthier Future, One Patient at a Time
            </h2>
            <p className="mt-6 text-slate-500 leading-relaxed">
              Founded in 1985 by Dr. Eleanor Meridian, our hospital began as a small community clinic with a big dream — to make world-class healthcare accessible to everyone. What started with a team of 12 dedicated professionals has grown into one of the region's most respected medical institutions.
            </p>
            <p className="mt-4 text-slate-500 leading-relaxed">
              Today, with over 100 board-certified specialists across 12 departments, we continue Dr. Meridian's vision of combining cutting-edge medical technology with the human touch that makes healing possible.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                { value: "50K+", label: "Patients" },
                { value: "100+", label: "Doctors" },
                { value: "35+", label: "Years" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-teal-600">{s.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80"
                alt="Hospital building"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80"
                alt="Medical team"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-teal-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-widest uppercase">Our Values</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              The Principles That Guide Us
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-xl hover:border-teal-100 transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-widest uppercase">Our Journey</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Milestones of Excellence
            </h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-teal-400 to-emerald-200" />
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                <div className={`hidden md:block flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm inline-block ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                    <span className="text-sm font-bold text-teal-600">{m.year}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{m.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 shrink-0 w-3 h-3 mt-2 rounded-full bg-teal-500 ring-4 ring-teal-100 md:mx-0 ml-2.5" />
                <div className="flex-1 md:hidden">
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <span className="text-sm font-bold text-teal-600">{m.year}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{m.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}