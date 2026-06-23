import React from "react";
import { LucideProps } from "lucide-react";

export interface ProgramItem {
  label: string;
  title: string;
  desc: string;
  duration: string;
  level: string;
  color: string;
  bg: string;
  border: string;
}

export interface SolutionItem {
  Icon: React.ComponentType<LucideProps>;
  tag: string;
  color: string;
  title: string;
  desc: string;
  features: string[];
}

export interface WhyItem {
  Icon: React.ComponentType<LucideProps>;
  title: string;
  text: string;
  color: string;
}

export interface StatType {
  value: string;
  label: string;
  sub: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  init: string;
  color: string;
  tag: string;
  quote: string;
}

export interface NavbarProps {
  page: string;
  setPage: (page: string) => void;
}

export interface HeroProps {
  setPage: (page: string) => void;
}

export interface ProgramCardProps {
  c: ProgramItem;
  i: number;
  key?: React.Key;
}

export interface SolutionCardProps {
  s: SolutionItem;
  i: number;
  key?: React.Key;
}

export interface WhyCardProps {
  w: WhyItem;
  i: number;
  key?: React.Key;
}

export interface StatItemProps {
  s: StatType;
  i: number;
  key?: React.Key;
}

export interface CTAProps {
  setPage: (page: string) => void;
}

export interface FooterProps {
  setPage: (page: string) => void;
}

export interface LoginPageProps {
  setPage: (page: string) => void;
}

export interface RegisterPageProps {
  setPage: (page: string) => void;
}

export interface HomePageProps {
  setPage: (page: string) => void;
}
