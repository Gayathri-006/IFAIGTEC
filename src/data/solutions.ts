import { Gavel, Shield, Users, GraduationCap } from "lucide-react";
import { C } from "../constants/colors";
import { SolutionItem } from "../types";

export const SOLUTIONS: SolutionItem[] = [
  {
    Icon: Gavel,
    tag: "Governance",
    color: C.orange,
    title: "AI Governance Frameworks",
    desc: "We partner with organizations to design and implement bespoke AI governance structures — from policy design and board-level reporting to audit readiness and regulatory alignment.",
    features: ["Governance Policy Design", "Board Reporting Frameworks", "Regulatory Compliance Audits", "AI Risk Register Development"],
  },
  {
    Icon: Shield,
    tag: "Accreditation",
    color: C.purple,
    title: "Accreditation & Assessment",
    desc: "End-to-end product, project, and service approval processes with internationally recognized assessment frameworks that validate AI system quality and compliance.",
    features: ["Product Approval Assessments", "AI System Certification", "Portfolio Evaluation", "Solution Bundling Reviews"],
  },
  {
    Icon: Users,
    tag: "Training",
    color: C.teal,
    title: "Corporate AI Workshops",
    desc: "Immersive hands-on workshops tailored to your industry, regulatory environment, and team structure — from board-level literacy to technical deep-dives.",
    features: ["Customized Curriculum Design", "Industry-Specific Use Cases", "World Seminars & Summits", "National Workshop Programs"],
  },
  {
    Icon: GraduationCap,
    tag: "Certification",
    color: C.coral,
    title: "Professional Certifications",
    desc: "Industry-recognized certifications developed with global AI governance advisory boards, validated across 48+ countries and aligned to international regulatory standards.",
    features: ["DPDP Act Compliance Cert", "NIST RMF Certification", "EU AI Act Readiness", "Digital Badge Issuance"],
  },
];
