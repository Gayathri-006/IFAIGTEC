import React from "react";
import { ArrowRight } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";
import { CTAProps } from "../../types";

export function CTASection({ setPage }: CTAProps) {
  const ref = useReveal();
  return (
    <section style={{ padding:"80px 32px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div ref={ref} className="section-reveal" style={{
          borderRadius:36,
          background:"linear-gradient(135deg, #F97316 0%, #7C3AED 55%, #0D9488 100%)",
          padding:"80px 64px", position:"relative", overflow:"hidden", textAlign:"center",
        }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:300, height:300, borderRadius:"50%",
            border:"60px solid rgba(255,255,255,0.06)" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:240, height:240, borderRadius:"50%",
            border:"50px solid rgba(255,255,255,0.04)" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px",
              borderRadius:99, background:"rgba(255,255,255,0.15)", marginBottom:28 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"white" }} className="anim-pulse" />
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.9)", letterSpacing:"0.06em" }}>
                JOIN THE GLOBAL GOVERNANCE MOVEMENT
              </span>
            </div>
            <h2 className="playfair" style={{
              fontSize:"clamp(2rem, 4vw, 3.2rem)", fontWeight:900,
              lineHeight:1.12, letterSpacing:"-0.02em", color:"white", marginBottom:20,
            }}>
              Ready to shape responsible AI?
            </h2>
            <p style={{ fontSize:17, color:"rgba(255,255,255,0.8)", maxWidth:520, margin:"0 auto 40px", lineHeight:1.78 }}>
              Join 340+ organizations across 48 countries who chose IFAIGTEC to lead AI governance, certification, and responsible deployment at global scale.
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
              <button onClick={() => setPage("register")} style={{
                display:"inline-flex", alignItems:"center", gap:8, padding:"15px 30px",
                borderRadius:99, background:"white", color:C.orange,
                fontWeight:700, fontSize:15, textDecoration:"none", border:"none", cursor:"pointer",
                boxShadow:"0 8px 24px rgba(0,0,0,0.2)",
                transition:"all .3s ease", fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
              >
                Become a Member <ArrowRight size={17} />
              </button>
              <button style={{
                display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px",
                borderRadius:99, background:"rgba(255,255,255,0.15)", color:"white",
                fontWeight:600, fontSize:15, textDecoration:"none", border:"none", cursor:"pointer",
                borderWidth:"1.5px", borderStyle:"solid", borderColor:"rgba(255,255,255,0.3)",
                transition:"background .3s ease", fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}
              onClick={e => e.preventDefault()}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.15)"; }}
              >
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
