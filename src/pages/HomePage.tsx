import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { MembersSection } from "../components/sections/MembersSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ProgramsSection } from "../components/sections/ProgramsSection";
import { SolutionsSection } from "../components/sections/SolutionsSection";
import { WhySection } from "../components/sections/WhySection";
import { StatsSection } from "../components/sections/StatsSection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { CTASection } from "../components/sections/CTASection";
import { HomePageProps } from "../types";

export function HomePage({ setPage }: HomePageProps) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <MembersSection />
      <AboutSection />
      <ProgramsSection />
      <SolutionsSection />
      <WhySection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection setPage={setPage} />
    </>
  );
}
