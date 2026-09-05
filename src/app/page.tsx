"use client";

import Hero from "@/components/Hero";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ProjectGallery from "@/components/ProjectGallery";
import CaseStudySection from "@/components/CaseStudySection";
import TechStackSection from "@/components/TechStackSection";
import MindsetGallery from "@/components/MindsetGallery";
import AboutSection from "@/components/AboutSection";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <main className="bg-charcoal text-off-white min-h-screen relative selection:bg-amber selection:text-charcoal">
      {/* Chapter 01: The Introduction */}
      <Hero />

      {/* Chapter 02: What I Do */}
      <CapabilitiesSection />

      {/* Chapter 03: The Work */}
      <ProjectGallery />

      {/* Chapter 04: Case Study Moment */}
      <CaseStudySection />

      {/* Chapter 05: The Stack */}
      <TechStackSection />

      {/* Atmospheric Mindset & Philosophy: Scroll Animated Parallax Gallery */}
      <MindsetGallery />

      {/* Chapter 06: About */}
      <AboutSection />

      {/* Chapter 07: Currently Building */}
      <CurrentlyBuilding />

      {/* Chapter 08: Contact & Minimalist Footer */}
      <ContactSection />
    </main>
  );
}
