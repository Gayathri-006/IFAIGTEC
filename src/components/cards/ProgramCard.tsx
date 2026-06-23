import React from "react";
import { ChevronRight } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { ProgramCardProps } from "../../types";

export function ProgramCard({ c, i }: ProgramCardProps) {
  const ref = useReveal();
  return (
    <div ref={ref} className="section-reveal hover-lift" style={{
      background:"white", borderRadius:24,
      border:`1px solid ${c.border}`,
      padding:"28px 26px", position:"relative", overflow:"hidden",
      boxShadow:"0 4px 20px rgba(0,0,0,0.05)",
      transitionDelay:`${i * 0.07}s`,
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:c.color, borderRadius:"24px 24px 0 0" }} />
      <div className="tag-pill" style={{ background:c.bg, color:c.color, marginBottom:16 }}>{c.label}</div>
      <h3 style={{ fontSize:17, fontWeight:700, color:C.dark, lineHeight:1.4, marginBottom:10,
        fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{c.title}</h3>
      <p style={{ fontSize:14, color:"#888", lineHeight:1.72, marginBottom:20 }}>{c.desc}</p>
      <div style={{ display:"flex", gap:18, marginBottom:20, flexWrap:"wrap" }}>
        {[["Duration", c.duration],["Level", c.level]].map(([l, v]) => (
          <div key={l}>
            <div style={{ fontSize:10, color:"#ccc", fontWeight:600, textTransform:"uppercase",
              letterSpacing:"0.06em", marginBottom:2 }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#555" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ height:1, background:"rgba(0,0,0,0.05)", marginBottom:18 }} />
      <a href="#" style={{
        display:"inline-flex", alignItems:"center", gap:4,
        fontSize:13, fontWeight:600, color:c.color, textDecoration:"none",
        transition:"gap .2s",
      }}
      onClick={e => e.preventDefault()}
      onMouseEnter={e => (e.currentTarget.style.gap="8px")}
      onMouseLeave={e => (e.currentTarget.style.gap="4px")}>
        Learn More <ChevronRight size={14} />
      </a>
    </div>
  );
}
