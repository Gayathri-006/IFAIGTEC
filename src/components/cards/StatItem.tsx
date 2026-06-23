import React from "react";
import { useReveal } from "../../hooks/useReveal";
import { STAT_COLORS } from "../../data/stats";
import { StatItemProps } from "../../types";

export function StatItem({ s, i }: StatItemProps) {
  const ref = useReveal();
  const [c1, c2] = STAT_COLORS[i % STAT_COLORS.length];
  return (
    <div ref={ref} className="section-reveal" style={{ textAlign:"center", transitionDelay:`${i * 0.08}s` }}>
      <div style={{
        fontSize:"clamp(1.8rem, 2.8vw, 2.6rem)", fontWeight:900,
        letterSpacing:"-0.03em", lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif",
        background:`linear-gradient(135deg, ${c1}, ${c2})`,
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
        marginBottom:8,
      }}>{s.value}</div>
      <div style={{ fontSize:14, fontWeight:600, color:"#333", marginBottom:4 }}>{s.label}</div>
      <div style={{ fontSize:12, color:"#bbb" }}>{s.sub}</div>
    </div>
  );
}
