import React from "react";
import { Star } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { TESTIMONIALS } from "../../data/testimonials";

export function TestimonialsSection() {
  const title = useReveal();
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section style={{ padding:"120px 0", background:"#fffcf8", overflow:"hidden" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div ref={title} className="section-reveal" style={{
          display:"flex", justifyContent:"space-between", alignItems:"flex-end",
          marginBottom:56, flexWrap:"wrap", gap:24,
        }}>
          <div>
            <div className="section-label" style={{ background:"rgba(249,115,22,0.08)", color:C.orange }}>
              <Star size={12} fill={C.orange} color={C.orange} /> Member Testimonials
            </div>
            <h2 className="playfair" style={{
              fontSize:"clamp(1.9rem, 3.2vw, 2.7rem)", fontWeight:800,
              lineHeight:1.15, letterSpacing:"-0.02em", color:C.dark,
            }}>
              Heard from governance leaders<br />
              <span style={{
                background:`linear-gradient(135deg, ${C.orange}, ${C.purple})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>who chose IFAIGTEC.</span>
            </h2>
          </div>
        </div>
      </div>

      <div style={{ width:"100%", overflow:"hidden", position:"relative", padding:"10px 0" }}>
        <div className="anim-marquee" style={{ display:"flex", gap:24, width:"max-content" }}>
          {doubled.map((t, i) => (
            <div key={i} style={{
              background:"white",
              borderRadius:4,
              border:`1.5px solid rgba(0,0,0,0.06)`,
              padding:"36px 32px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
              width: 380,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div>
                <div style={{ fontSize:48, lineHeight:1, color:`${t.color}22`,
                  fontFamily:"Georgia,serif", marginBottom:12, marginTop:-8 }}>&ldquo;</div>
                <p style={{ fontSize:14.5, color:"#555", lineHeight:1.75, marginBottom:24, fontStyle:"italic" }}>
                  {t.quote}
                </p>
              </div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:4, background:t.color,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:14, fontWeight:800, color:"white" }}>{t.init}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.dark }}>{t.name}</div>
                    <div style={{ fontSize:12, color:"#999", marginTop:2 }}>{t.role}</div>
                  </div>
                </div>
                <div className="tag-pill" style={{ background:`${t.color}10`, color:t.color, borderRadius:4 }}>{t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
