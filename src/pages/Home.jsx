import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import ServicesPreview from "../components/home/ServicesPreview";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}