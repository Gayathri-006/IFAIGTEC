import React from "react";
import { useReveal } from "../../hooks/useReveal";
import { STATS } from "../../data/stats";
import { StatItem } from "../cards/StatItem";

export function StatsSection() {
  const title = useReveal();
  return (
    <section style={{ padding:"96px 0", background:"white", borderTop:"1px solid rgba(0,0,0,0.05)", borderBottom:"1px solid rgba(0,0,0,0.05)" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div ref={title} className="section-reveal" style={{ textAlign:"center", marginBottom:56 }}>
          <p style={{ fontSize:12, fontWeight:600, letterSpacing:"0.1em", color:"#ccc", textTransform:"uppercase" }}>
            IFAIGTEC by the numbers
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:24 }} className="stats-grid">
          {STATS.map((s, i) => <StatItem key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
