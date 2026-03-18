import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ visible, message = "Loading…" }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
        >
          {/* Spinner ring */}
          <div className="relative w-16 h-16 mb-5">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-teal-500 animate-spin" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-10 animate-pulse" />
          </div>
          <p className="text-slate-600 font-medium text-sm">{message}</p>
          <p className="text-slate-400 text-xs mt-1">Please wait a moment</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}