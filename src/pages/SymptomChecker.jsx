import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle, Activity, Stethoscope, Info, Sparkles,
  ShieldAlert, CheckCircle, AlertCircle, Thermometer, Wind,
  Zap, Leaf, Heart, Brain, ArrowRight, Hospital, MessageCircle,
} from "lucide-react";

/* ─── Config ──────────────────────────────────────────────── */
const urgencyConfig = {
  Low: {
    gradient: "from-emerald-500 to-green-500",
    softBg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    icon: CheckCircle,
    label: "Low Urgency",
    sub: "Schedule a routine appointment at your convenience.",
    ring: "ring-emerald-200",
    glow: "shadow-emerald-100",
  },
  Medium: {
    gradient: "from-amber-500 to-yellow-500",
    softBg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: AlertTriangle,
    label: "Medium Urgency",
    sub: "Consider seeing a doctor within the next few days.",
    ring: "ring-amber-200",
    glow: "shadow-amber-100",
  },
  High: {
    gradient: "from-red-500 to-rose-500",
    softBg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: AlertCircle,
    label: "High Urgency",
    sub: "Seek medical attention promptly or visit an ER.",
    ring: "ring-red-200",
    glow: "shadow-red-100",
  },
};

const CAUSE_ICONS = [Thermometer, Wind, Zap, Leaf, Heart, Brain, Activity, Stethoscope];

/* ─── Loading animation ───────────────────────────────────── */
function LoadingState() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-5 py-14"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-20 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <Sparkles className="w-7 h-7 text-white animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-slate-800 font-semibold text-base">Analyzing your symptoms</p>
        <div className="flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-teal-500"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
        <p className="text-slate-400 text-xs">This usually takes a few seconds…</p>
      </div>
    </motion.div>
  );
}

/* ─── Results layout ──────────────────────────────────────── */
function Results({ result }) {
  const urgency = urgencyConfig[result.urgency] || urgencyConfig["Medium"];
  const UrgencyIcon = urgency.icon;

  const colLeft = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };
  const colRight = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-5 gap-4"
    >
      {/* ── LEFT COLUMN (3/5) ── */}
      <motion.div variants={colLeft} className="md:col-span-3 flex flex-col gap-4">

        {/* Urgency — dominant */}
        <div className={`relative rounded-2xl overflow-hidden ring-2 ${urgency.ring} shadow-xl ${urgency.glow}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${urgency.gradient} opacity-100`} />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative p-6 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-lg">
              <UrgencyIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Urgency Level</p>
              <p className="text-white text-2xl font-bold leading-tight">{urgency.label}</p>
              <p className="text-white/80 text-sm mt-1.5 leading-relaxed">{urgency.sub}</p>
            </div>
          </div>
          {/* decorative glow circle */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>

        {/* Summary — white card, green accents */}
        {result.brief_explanation && (
          <div className="bg-white rounded-2xl border-2 border-teal-100 shadow-xl shadow-teal-50 self-start">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-500/20">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600">AI Summary</span>
              </div>
              <p className="text-slate-700 text-[15px] leading-[1.8]">{result.brief_explanation}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* ── RIGHT COLUMN (2/5) ── */}
      <motion.div variants={colRight} className="md:col-span-2 flex flex-col gap-4">

        {/* Possible Causes — white card, green accents */}
        {result.possible_causes?.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border-2 border-emerald-100 shadow-xl shadow-emerald-50"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <ShieldAlert className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Possible Causes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.possible_causes.map((cause, i) => {
                  const Icon = CAUSE_ICONS[i % CAUSE_ICONS.length];
                  return (
                    <motion.div
                      key={i}
                      variants={item}
                      whileHover={{ scale: 1.04, y: -1 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold cursor-default hover:bg-emerald-100 transition-all"
                    >
                      <Icon className="w-3 h-3 text-emerald-500 shrink-0" />
                      {cause}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommended Care — white card, green accents */}
        {(result.recommended_department || result.recommended_doctor_type) && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border-2 border-green-100 shadow-xl shadow-green-50"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-md shadow-green-500/20">
                  <Stethoscope className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-green-600">Recommended Care</span>
              </div>
              <div className="flex flex-col gap-2">
                {result.recommended_department && (
                  <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 cursor-default hover:bg-green-100 transition-all"
                  >
                    <Hospital className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-green-700 text-sm font-semibold">{result.recommended_department}</span>
                  </motion.div>
                )}
                {result.recommended_doctor_type && (
                  <motion.div
                    variants={item}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-teal-50 border border-teal-200 cursor-default hover:bg-teal-100 transition-all"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="text-teal-700 text-sm font-semibold">{result.recommended_doctor_type}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Self-Care Tips — white card, green accents */}
        {result.self_care_tips?.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl border-2 border-emerald-100 shadow-xl shadow-emerald-50 flex-1"
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Self-Care Tips</span>
              </div>
              <div className="space-y-2.5">
                {result.self_care_tips.map((tip, i) => (
                  <motion.div key={i} variants={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Chat CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="md:col-span-5 relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 rounded-full blur-2xl" />
        </div>
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Have follow-up questions?</p>
              <p className="text-slate-400 text-xs mt-0.5">Chat with our AI medical assistant for more guidance.</p>
            </div>
          </div>
          <Link
            to={createPageUrl("MedicalChat")}
            className="shrink-0 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" /> Chat with Assistant
          </Link>
        </div>
      </motion.div>

      {/* Bottom disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="md:col-span-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
      >
        <Info className="w-3.5 h-3.5 text-slate-300 shrink-0" />
        <p className="text-xs text-slate-400">Not medical advice. Always consult a healthcare professional for health concerns.</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleCheck = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);

    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a helpful medical information assistant. A user has described the following symptoms: "${symptoms}"

Analyze these symptoms and respond ONLY with a valid JSON object in this exact format:
{
  "possible_causes": ["cause 1", "cause 2", "cause 3"],
  "recommended_department": "Department name (e.g. Cardiology, General Medicine)",
  "recommended_doctor_type": "Short description of the type of doctor",
  "urgency": "Low" | "Medium" | "High",
  "brief_explanation": "1-2 sentence plain-language summary of what might be going on.",
  "self_care_tips": ["tip 1", "tip 2"]
}

Rules:
- Do NOT provide any definitive diagnosis.
- Keep language simple and reassuring.
- possible_causes should list 2-4 common, general causes (not rare conditions).
- urgency must be exactly "Low", "Medium", or "High".
- Respond ONLY with the JSON object, no extra text.`,
      response_json_schema: {
        type: "object",
        properties: {
          possible_causes: { type: "array", items: { type: "string" } },
          recommended_department: { type: "string" },
          recommended_doctor_type: { type: "string" },
          urgency: { type: "string" },
          brief_explanation: { type: "string" },
          self_care_tips: { type: "array", items: { type: "string" } },
        },
      },
    });

    setResult(response);
    setLoading(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs font-semibold text-teal-300 tracking-widest uppercase">AI-Powered Health Tool</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Symptom{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Checker
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
          >
            Describe how you're feeling and get AI-powered guidance on possible causes and the right type of care.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white min-h-[60vh]">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Input card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white rounded-2xl border-2 shadow-lg transition-all duration-300 overflow-hidden ${
              focused ? "border-teal-400 shadow-teal-100/80 shadow-xl" : "border-slate-200"
            }`}
          >
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Tell me how you're feeling</h2>
              </div>
              <p className="text-xs text-slate-400 ml-9 mb-4">Include duration, location, and any other relevant details.</p>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Describe your symptoms in detail… e.g. I've had a throbbing headache for 2 days, mostly on the left side, with sensitivity to light and some nausea."
                disabled={loading}
                rows={5}
                className="w-full resize-none bg-transparent text-slate-700 text-sm leading-relaxed placeholder:text-slate-300 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50">
              <span className="text-xs text-slate-300">{symptoms.length > 0 ? `${symptoms.length} characters` : "Start typing…"}</span>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleCheck}
                disabled={loading || !symptoms.trim()}
                className="inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-semibold shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {loading ? "Analyzing…" : "Check Symptoms"}
                {!loading && <ArrowRight className="w-3.5 h-3.5" />}
              </motion.button>
            </div>
          </motion.div>

          {/* Subtle disclaimer */}
          {!result && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <Info className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <p className="text-xs text-slate-400">For informational purposes only — not medical advice. Always consult a healthcare provider.</p>
            </motion.div>
          )}

          {/* Loading / Results */}
          <AnimatePresence mode="wait">
            {loading && (
              <div key="loading" className="bg-white rounded-2xl border border-slate-100 shadow-md">
                <LoadingState />
              </div>
            )}
            {result && !loading && (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Results result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}