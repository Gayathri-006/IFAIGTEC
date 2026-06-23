import React from "react";
import { ArrowRight } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { SolutionCardProps } from "../../types";

export function SolutionCard({ s, i }: SolutionCardProps) {
  const ref = useReveal();
  const { Icon } = s;
  return (
    <div ref={ref} className="section-reveal" style={{
      background:"white", borderRadius:28,
      border:"1px solid rgba(0,0,0,0.07)",
      padding:"40px 36px", position:"relative", overflow:"hidden",
      boxShadow:"0 4px 24px rgba(0,0,0,0.05)",
      transition:"transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s ease",
      transitionDelay:`${i * 0.1}s`,
    }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-7px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
    >
      <div style={{ position:"absolute", bottom:0, right:0, width:220, height:220, borderRadius:"50%",
        background:`radial-gradient(circle, ${s.color}07, transparent 70%)` }} />
      <div style={{ width:52, height:52, borderRadius:16, background:`${s.color}12`,
        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
        <Icon size={24} color={s.color} />
      </div>
      <div className="tag-pill" style={{ background:`${s.color}10`, color:s.color, marginBottom:14 }}>{s.tag}</div>
      <h3 style={{ fontSize:20, fontWeight:800, color:C.dark, marginBottom:12,
        fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.title}</h3>
      <p style={{ fontSize:15, color:"#777", lineHeight:1.78, marginBottom:24 }}>{s.desc}</p>
      {s.features.map((f, j) => (
        <div key={j} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:s.color, flexShrink:0 }} />
          <span style={{ fontSize:14, color:"#666" }}>{f}</span>
        </div>
      ))}
      <a href="#" style={{
        display:"inline-flex", alignItems:"center", gap:6, marginTop:28,
        fontSize:14, fontWeight:700, color:s.color, textDecoration:"none",
        transition:"gap .2s",
      }}
      onClick={e => e.preventDefault()}
      onMouseEnter={e => (e.currentTarget.style.gap="10px")}
      onMouseLeave={e => (e.currentTarget.style.gap="6px")}>
        Learn More <ArrowRight size={15} />
      </a>
    </div>
  );
}
