import React from "react";
import { Shield, Globe, ArrowRight, ChevronDown } from "lucide-react";
import { C } from "../../constants/colors";
import { AIVisualization } from "../visual/AIVisualization";
import { HeroProps } from "../../types";

export function HeroSection({ setPage }: HeroProps) {
  return (
    <section style={{
      position:"relative", minHeight:"100vh", overflow:"hidden",
      background:"linear-gradient(135deg, #fffcf8 0%, #f8f5ff 50%, #f0fdfb 100%)",
      display:"flex", alignItems:"center", paddingTop:96,
    }}>
      {/* Background radial orbs */}
      <div style={{ position:"absolute", top:"10%", right:"10%", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", left:"5%", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px", width:"100%" }}>
        <div className="hero-inner" style={{ padding:"80px 0" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:56, alignItems:"center" }} className="hero-grid">
            
            {/* LEFT COLUMN: TEXT */}
            <div className="hero-text-column page-fade" style={{ display:"flex", flexDirection:"column" }}>
              <h1 className="playfair" style={{
                fontSize:"clamp(2.3rem, 4.2vw, 3.8rem)", fontWeight:900,
                lineHeight:1.1, letterSpacing:"-0.03em", color:C.dark, marginBottom:20,
              }}>
                <span className="nowrap-desktop">International Federation for</span> <br />
                <span style={{
                  background:"linear-gradient(135deg, #F97316 0%, #7C3AED 55%, #0D9488 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }} className="nowrap-desktop">AI Governance Technology</span> <br />
                Education Cybersecurity
              </h1>

              <p style={{
                fontSize:"clamp(1rem, 1.3vw, 1.15rem)", color:"#555566",
                lineHeight:1.75, marginBottom:36, maxWidth:580, fontWeight:500,
              }}>
                IFAIGTEC is the premier global confederation establishing standardizations, certifications, and compliance frameworks for secure and ethical AI deployment across industries.
              </p>

              {/* CTAs */}
              <div style={{ display:"flex", gap:14, marginBottom:44, flexWrap:"wrap" }} className="hero-buttons">
                <button onClick={() => setPage("register")} className="btn-primary">
                  Become a Member
                  <span className="btn-arrow"><ArrowRight size={16} /></span>
                </button>
                <button style={{ background:"none", border:"none", padding:0, cursor:"pointer" }}>
                  <a href="#" className="btn-ghost" onClick={e => e.preventDefault()}>Explore Frameworks</a>
                </button>
              </div>

              {/* Ratings / Badges */}
              <div style={{ display:"flex", alignItems:"center", gap:28, flexWrap:"wrap" }} className="hero-ratings">
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ display:"flex", gap:2 }}>
                    {[1,2,3,4,5].map(n => (
                      <span key={n} style={{ color:C.amber, fontSize:15 }}>★</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ fontSize:14, fontWeight:750, color:C.dark }}>4.9★ Rating</span>
                    <span style={{ fontSize:11, color:"#999", display:"block", marginTop:1 }}>Across 3,200+ assessments</span>
                  </div>
                </div>
                <div style={{ width:1, height:28, background:"rgba(0,0,0,0.1)" }} className="hidden-mobile" />
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Shield size={16} color={C.teal} />
                  <span style={{ fontSize:13, fontWeight:650, color:"#555" }}>NIST & EU AI Act Aligned</span>
                </div>
                <div style={{ width:1, height:28, background:"rgba(0,0,0,0.1)" }} className="hidden-mobile" />
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Globe size={16} color={C.purple} />
                  <span style={{ fontSize:13, fontWeight:650, color:"#555" }}>48+ Countries</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VISUALIZATION */}
            <div className="hero-vis" style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
              <AIVisualization />
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden-mobile" style={{
          position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          color:"#aaa", fontSize:11, fontWeight:600, letterSpacing:"0.08em",
        }}>
          SCROLL TO EXPLORE
          <ChevronDown size={14} className="anim-pulse" />
        </div>
      </div>
    </section>
  );
}
