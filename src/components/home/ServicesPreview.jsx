import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import {
  Heart, Brain, Bone, Baby, Microscope, Activity,
  ArrowRight
} from "lucide-react";

const services = [
  { icon: Heart, name: "Cardiology", desc: "Advanced heart care with state-of-the-art catheterization labs and cardiac surgery.", color: "bg-red-50 text-red-600" },
  { icon: Brain, name: "Neurology", desc: "Comprehensive neurological diagnostics and treatment for brain and spine conditions.", color: "bg-purple-50 text-purple-600" },
  { icon: Bone, name: "Orthopedics", desc: "Joint replacement, sports medicine, and minimally invasive spine surgery.", color: "bg-blue-50 text-blue-600" },
  { icon: Baby, name: "Pediatrics", desc: "Gentle, specialized care designed for children from infancy through adolescence.", color: "bg-pink-50 text-pink-600" },
  { icon: Microscope, name: "Oncology", desc: "Personalized cancer treatment with the latest in immunotherapy and precision medicine.", color: "bg-amber-50 text-amber-600" },
  { icon: Activity, name: "Emergency", desc: "Round-the-clock emergency care with rapid response teams and trauma specialists.", color: "bg-teal-50 text-teal-600" },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-teal-600 tracking-widest uppercase">What We Offer</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            World-Class Medical Services
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            Our dedicated departments deliver specialized care with the latest medical technology and compassionate expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl p-7 border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-teal-600 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-0 transition-all duration-300">
                Learn More <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 hover:gap-3 transition-all duration-300"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}