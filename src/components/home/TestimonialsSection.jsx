import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Cardiology Patient",
    text: "The care I received at Meridian Health was nothing short of extraordinary. From my initial consultation to post-surgery recovery, every team member treated me with genuine warmth and professionalism.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
  },
  {
    name: "David Chen",
    role: "Orthopedics Patient",
    text: "After my knee replacement surgery, the rehabilitation team helped me get back on my feet faster than I ever imagined. The facilities are truly world-class and the staff goes above and beyond.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
  },
  {
    name: "Emily Rodriguez",
    role: "Pediatrics Parent",
    text: "Finding a hospital where my children feel safe was so important. The pediatrics team at Meridian makes every visit comfortable and even fun. I couldn't ask for better care for my family.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-teal-50/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-teal-600 tracking-widest uppercase">Testimonials</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            What Our Patients Say
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100"
            >
              <Quote className="w-10 h-10 text-teal-100 mb-6" />
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light italic">
                "{testimonials[current].text}"
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonials[current].name}</p>
                    <p className="text-sm text-slate-500">{testimonials[current].role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-teal-500" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}