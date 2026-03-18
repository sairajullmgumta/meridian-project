import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import {
  Heart, Brain, Bone, Baby, Microscope, Activity,
  Scan, Pill, Eye, Ear, Scissors, ArrowRight, CheckCircle
} from "lucide-react";

const departments = [
  { icon: Heart, name: "Cardiology", color: "from-red-500 to-rose-500", bg: "bg-red-50", desc: "Comprehensive heart care including interventional cardiology, electrophysiology, and cardiac rehabilitation.", features: ["Heart Surgery", "Catheterization", "Cardiac Rehab", "ECG & Monitoring"] },
  { icon: Brain, name: "Neurology", color: "from-purple-500 to-violet-500", bg: "bg-purple-50", desc: "Expert diagnosis and treatment for neurological conditions from stroke care to epilepsy management.", features: ["Stroke Center", "Epilepsy Care", "Brain Mapping", "Neuro Rehab"] },
  { icon: Bone, name: "Orthopedics", color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", desc: "Advanced bone, joint, and muscle care including robotics-assisted surgery and sports medicine.", features: ["Joint Replacement", "Sports Medicine", "Spine Surgery", "Physical Therapy"] },
  { icon: Baby, name: "Pediatrics", color: "from-pink-500 to-rose-400", bg: "bg-pink-50", desc: "Specialized medical care for children from birth through adolescence in a child-friendly environment.", features: ["Well-Child Visits", "Vaccinations", "NICU", "Pediatric Surgery"] },
  { icon: Microscope, name: "Oncology", color: "from-amber-500 to-orange-500", bg: "bg-amber-50", desc: "Personalized cancer care with the latest in immunotherapy, chemotherapy, and precision medicine.", features: ["Chemotherapy", "Radiation", "Immunotherapy", "Cancer Screening"] },
  { icon: Activity, name: "Emergency Medicine", color: "from-teal-500 to-emerald-500", bg: "bg-teal-50", desc: "24/7 emergency services with rapid response teams and Level I trauma center capabilities.", features: ["24/7 ER", "Trauma Center", "Rapid Response", "Critical Care"] },
  { icon: Scan, name: "Radiology", color: "from-cyan-500 to-sky-500", bg: "bg-cyan-50", desc: "State-of-the-art diagnostic imaging including MRI, CT, ultrasound, and nuclear medicine.", features: ["MRI", "CT Scan", "Ultrasound", "X-Ray"] },
  { icon: Pill, name: "General Medicine", color: "from-green-500 to-emerald-500", bg: "bg-green-50", desc: "Primary care services for routine checkups, chronic disease management, and preventive healthcare.", features: ["Health Checkups", "Chronic Care", "Preventive Medicine", "Wellness"] },
  { icon: Eye, name: "Ophthalmology", color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50", desc: "Complete eye care from routine exams to advanced surgical procedures including LASIK.", features: ["LASIK Surgery", "Cataract Care", "Retina Treatment", "Glaucoma"] },
  { icon: Ear, name: "ENT", color: "from-rose-500 to-pink-500", bg: "bg-rose-50", desc: "Ear, nose, and throat specialists providing medical and surgical care for head and neck conditions.", features: ["Hearing Tests", "Sinus Surgery", "Voice Therapy", "Sleep Apnea"] },
  { icon: Scissors, name: "Surgery", color: "from-slate-500 to-zinc-500", bg: "bg-slate-50", desc: "General and specialized surgical services using minimally invasive techniques and robotic assistance.", features: ["Minimally Invasive", "Robotic Surgery", "Laparoscopy", "Day Surgery"] },
  { icon: Heart, name: "Dermatology", color: "from-fuchsia-500 to-purple-400", bg: "bg-fuchsia-50", desc: "Comprehensive skin care from cosmetic procedures to treatment of complex dermatological conditions.", features: ["Skin Cancer", "Cosmetic Care", "Laser Therapy", "Acne Treatment"] },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-teal-400 tracking-widest uppercase">Our Departments</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Comprehensive <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Medical Services</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            From preventive care to complex surgeries, our specialized departments cover every aspect of your health needs.
          </motion.p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-50 transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <dept.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{dept.desc}</p>
                <div className="space-y-2">
                  {dept.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-teal-600 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Not Sure Which Department You Need?
          </h2>
          <p className="mt-4 text-teal-100 text-lg">
            Our patient coordinators will help guide you to the right specialist.
          </p>
          <Link
            to={createPageUrl("Appointments")}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-teal-700 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Schedule a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}