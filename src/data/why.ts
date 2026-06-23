import { Globe, Award, Lightbulb, BarChart3, FileText, Network } from "lucide-react";
import { C } from "../constants/colors";
import { WhyItem } from "../types";

export const WHY: WhyItem[] = [
  { Icon: Globe,       title:"Global Confederation",       text:"A worldwide federation spanning 8 regional bodies across Asia, Africa, Europe, Americas, and Oceania — setting international standards.", color:C.orange },
  { Icon: Award,       title:"Internationally Recognized", text:"Certifications and accreditations recognized by industry, governments, and regulatory bodies across 48+ countries worldwide.",            color:C.purple },
  { Icon: Lightbulb,   title:"Expert-Led Programs",        text:"Learn from AI governance practitioners, policymakers, and regulatory experts who shape the global AI landscape.",                       color:C.teal },
  { Icon: BarChart3,   title:"Multi-Domain Coverage",       text:"From AI and Data Science to Healthcare, Agriculture, Banking, and Manufacturing — governance expertise across every sector.",           color:C.coral },
  { Icon: FileText,    title:"Policy & Standards Body",     text:"IFAIGTEC actively develops governance policies, technical regulations, and judicial processes that govern AI deployment worldwide.",     color:C.amber },
  { Icon: Network,     title:"Active Committee Network",    text:"25+ specialized committees and commissions covering AI, GRC, Cybersecurity, Education, Industries, and Skill Development.",            color:C.green },
];
