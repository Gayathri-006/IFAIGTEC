import React from "react";
import { Target } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { SOLUTIONS } from "../../data/solutions";
import { SolutionCard } from "../cards/SolutionCard";

export function SolutionsSection() {
  const title = useReveal();
  return (
    <section style={{ padding:"120px 0", background:"white" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div ref={title} className="section-reveal" style={{ textAlign:"center", marginBottom:72 }}>
          <div className="section-label" style={{ background:"rgba(13,148,136,0.08)", color:C.teal, display:"inline-flex" }}>
            <Target size={12} /> Our Services
          </div>
          <h2 className="playfair" style={{
            fontSize:"clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight:800,
            lineHeight:1.15, letterSpacing:"-0.02em", color:C.dark, marginBottom:16,
          }}>
            End-to-end AI governance services<br />built for responsible organizations.
          </h2>
          <p style={{ fontSize:16, color:"#888", maxWidth:560, margin:"0 auto", lineHeight:1.78 }}>
            From governance framework design to international certification — our integrated suite addresses every dimension of responsible AI deployment.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:24 }} className="sol-grid">
          {SOLUTIONS.map((s, i) => <SolutionCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
