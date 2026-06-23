import React from "react";
import { MEMBERS } from "../../data/members";

export function MembersSection() {
  const doubled = [...MEMBERS, ...MEMBERS, ...MEMBERS];
  return (
    <section style={{ padding:"56px 0", background:"white", borderTop:"1px solid rgba(0,0,0,0.05)", borderBottom:"1px solid rgba(0,0,0,0.05)", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }} className="container-pad">
        <p style={{ textAlign:"center", fontSize:11, fontWeight:750, color:"#999aa6",
          letterSpacing:"0.09em", textTransform:"uppercase", marginBottom:32 }}>
          Our Regional Confederations & National Chapters
        </p>
      </div>
      <div style={{ width:"100%", overflow:"hidden", position:"relative" }}>
        <div className="anim-ticker" style={{ display:"flex", gap:48, width:"max-content", alignItems:"center" }}>
          {doubled.map((name, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"linear-gradient(135deg, #F97316, #7C3AED)" }} />
              <span style={{ fontSize:16, fontWeight:800, color:"#1f1f2e", letterSpacing:"-0.01em", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
