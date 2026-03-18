import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  { icon: MapPin, title: "Visit Us", lines: ["123 Healthcare Blvd, Suite 100", "New York, NY 10001"] },
  { icon: Phone, title: "Call Us", lines: ["571-202-4306", "571-202-4306 (Emergency)"] },
  { icon: Mail, title: "Email Us", lines: ["info@meridianhealth.com", "appointments@meridianhealth.com"] },
  { icon: Clock, title: "Working Hours", lines: ["Mon-Fri: 8:00 AM - 8:00 PM", "Emergency: 24/7"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.entities.ContactMessage.create(form);
    setSending(false);
    setSent(true);
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-teal-400 tracking-widest uppercase">Get In Touch</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            We're Here <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">To Help</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Have a question or need assistance? Reach out and our team will respond promptly.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative -mt-12 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{info.title}</h3>
              {info.lines.map((line, j) => (
                <p key={j} className="text-sm text-slate-500">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
            <p className="text-slate-500 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Subject</label>
                <Input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Message</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  required
                  className="min-h-[140px] rounded-xl"
                />
              </div>
              <Button
                type="submit"
                disabled={sending || sent}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-lg shadow-teal-600/25 transition-all duration-300"
              >
                {sent ? (
                  <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Message Sent!</span>
                ) : sending ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center gap-2"><Send className="w-4 h-4" /> Send Message</span>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Map area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 min-h-[400px] lg:min-h-0"
          >
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80"
              alt="Hospital exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Meridian Health Center</h3>
                    <p className="text-sm text-slate-500 mt-1">123 Healthcare Blvd, Suite 100</p>
                    <p className="text-sm text-slate-500">New York, NY 10001</p>
                    <a href="#" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700">
                      Get Directions <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}