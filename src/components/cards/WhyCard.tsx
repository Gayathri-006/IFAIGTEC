import React from "react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { WhyCardProps } from "../../types";

export function WhyCard({ w, i }: WhyCardProps) {
  const ref = useReveal();
  const { Icon } = w;
  return (
    <div ref={ref} className="section-reveal hover-lift" style={{
      background:"white", borderRadius:24,
      border:"1px solid rgba(255,255,255,0.8)",
      padding:"32px 28px",
      boxShadow:"0 4px 20px rgba(124,58,237,0.06)",
      transitionDelay:`${i * 0.07}s`,
    }}>
      <div style={{ width:48, height:48, borderRadius:14, background:`${w.color}12`,
        display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18 }}>
        <Icon size={22} color={w.color} />
      </div>
      <h3 style={{ fontSize:16, fontWeight:700, color:C.dark, marginBottom:10,
        fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{w.title}</h3>
      <p style={{ fontSize:14, color:"#888", lineHeight:1.72 }}>{w.text}</p>
    </div>
  );
}
