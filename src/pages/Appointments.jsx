import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";

import StepIndicator from "../components/appointments/StepIndicator";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Step1Department from "../components/appointments/Step1Department";
import Step2DateTime from "../components/appointments/Step2DateTime";
import Step3Details from "../components/appointments/Step3Details";
import ConfirmationScreen from "../components/appointments/ConfirmationScreen";

export default function Appointments() {
  const [step, setStep] = useState(1);
  const [department, setDepartment] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null); // { patientName, email, emailSent }

  const handleConfirm = async (details) => {
    setSubmitting(true);

    const appointmentData = {
      patient_name: details.patient_name,
      email: details.email,
      phone: details.phone,
      department: department.value,
      preferred_date: format(dateTime.date, "yyyy-MM-dd"),
      preferred_time: dateTime.slot.label,
      message: details.message,
    };

    // 1. Save booking to Supabase
    await base44.functions.invoke("insertAppointment", {
      department: department.value,
      date: format(dateTime.date, "yyyy-MM-dd"),
      time: dateTime.slot.label,
      name: details.patient_name,
      email: details.email,
      phone: details.phone,
      reason: details.message,
    });

    // 2. Send confirmation email (non-blocking)
    let emailSent = false;
    try {
      const res = await base44.functions.invoke("sendAppointmentEmail", {
        patient_name: details.patient_name,
        email: details.email,
        department: department.value,
        preferred_date: format(dateTime.date, "yyyy-MM-dd"),
        preferred_time: dateTime.slot.value || dateTime.slot.label,
      });
      emailSent = res.data?.success === true;
    } catch (_) {
      emailSent = false;
    }

    setSubmitting(false);
    setConfirmation({ patientName: details.patient_name, email: details.email, emailSent });

    if (emailSent) {
      toast.success("Appointment booked successfully. A confirmation email has been sent.");
    } else {
      toast.warning("Appointment booked, but email could not be sent.");
    }
  };

  const handleReset = () => {
    setStep(1);
    setDepartment(null);
    setDateTime(null);
    setConfirmation(null);
  };

  return (
    <div>
      <LoadingOverlay visible={submitting} message="Booking your appointment…" />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold text-teal-400 tracking-widest uppercase">
            Schedule a Visit
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Book Your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Appointment
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Three simple steps to connect with the right specialist.
          </motion.p>
        </div>
      </section>

      {/* Booking flow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          {!confirmation && <StepIndicator currentStep={step} />}

          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 md:p-8">
            <AnimatePresence mode="wait">
              {confirmation ? (
                <ConfirmationScreen
                  key="confirmation"
                  department={department}
                  dateTime={dateTime}
                  patientName={confirmation.patientName}
                  email={confirmation.email}
                  emailSent={confirmation.emailSent}
                  onReset={handleReset}
                />
              ) : step === 1 ? (
                <Step1Department
                  key="step1"
                  selected={department}
                  onSelect={setDepartment}
                  onNext={() => setStep(2)}
                />
              ) : step === 2 ? (
                <Step2DateTime
                  key="step2"
                  department={department}
                  selected={dateTime}
                  onSelect={setDateTime}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              ) : (
                <Step3Details
                  key="step3"
                  department={department}
                  dateTime={dateTime}
                  onSubmit={handleConfirm}
                  onBack={() => setStep(2)}
                  submitting={submitting}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}