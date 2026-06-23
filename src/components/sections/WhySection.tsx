import React from "react";
import { Award } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { WHY } from "../../data/why";
import { WhyCard } from "../cards/WhyCard";

export function WhySection() {
  const title = useReveal();
  return (
    <section style={{ padding:"120px 0", background:"#f8f5ff" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div ref={title} className="section-reveal" style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-label" style={{ background:"rgba(124,58,237,0.08)", color:C.purple, display:"inline-flex" }}>
            <Award size={12} /> Why Join IFAIGTEC
          </div>
          <h2 className="playfair" style={{
            fontSize:"clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight:800,
            lineHeight:1.15, letterSpacing:"-0.02em", color:C.dark, marginBottom:16,
          }}>
            The global standard for responsible<br />AI governance and certification.
          </h2>
          <p style={{ fontSize:16, color:"#888", maxWidth:500, margin:"0 auto", lineHeight:1.78 }}>
            Six reasons why organizations worldwide choose IFAIGTEC as their AI governance partner.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20 }} className="why-grid">
          {WHY.map((w, i) => <WhyCard key={i} w={w} i={i} />)}
        </div>
      </div>
    </section>
  );
}
