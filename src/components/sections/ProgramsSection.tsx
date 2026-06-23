import React from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { PROGRAMS } from "../../data/programs";
import { ProgramCard } from "../cards/ProgramCard";

export function ProgramsSection() {
  const title = useReveal();
  return (
    <section style={{ padding:"120px 0", background:"#fffcf8" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div ref={title} className="section-reveal" style={{
          marginBottom:64, display:"flex", justifyContent:"space-between",
          alignItems:"flex-end", flexWrap:"wrap", gap:24,
        }}>
          <div>
            <div className="section-label" style={{ background:"rgba(124,58,237,0.08)", color:C.purple }}>
              <BookOpen size={12} /> Certifications & Accreditations
            </div>
            <h2 className="playfair" style={{
              fontSize:"clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight:800,
              lineHeight:1.15, letterSpacing:"-0.02em", color:C.dark,
            }}>
              Globally recognized credentials for every<br />stage of AI governance expertise.
            </h2>
          </div>
          <a href="#" className="btn-ghost" onClick={e => e.preventDefault()} style={{ flexShrink:0 }}>
            View All Programs <ArrowRight size={15} />
          </a>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }} className="programs-grid">
          {PROGRAMS.map((c, i) => <ProgramCard key={i} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}
