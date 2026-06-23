import React from "react";
import { ArrowRight } from "lucide-react";
import { C } from "../../constants/colors";
import { FooterProps } from "../../types";

export function Footer({ setPage }: FooterProps) {
  const LINKS = {
    "About":           ["Overview","Vision & Mission","Values","Activities","Administration","Governance/Reporting"],
    "Governance":      ["Scope","Development","Constitution","Statutes & Rules","Key Decisions","Annual General Meeting"],
    "Members":         ["IFAIGTEC India","IFAIGTEC Malaysia","IFAIGTEC USA","Asia IFAIGTEC","Africa IFAIGTEC","Confederations"],
    "Certifications":  ["DPDP Act","NIST RMF","EU AI Act","Product Approvals","Assessment","Affiliations"],
    "Support":         ["Contact Us","FAQ","Returns & Refunds","Terms & Conditions","Privacy Policy"],
  };
  return (
    <footer style={{ background:"#0f0f0f", color:"white", padding:"80px 0 40px" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:40, marginBottom:64 }} className="footer-grid">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ width:40, height:40, borderRadius:12,
                background:"linear-gradient(135deg, #F97316, #7C3AED)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"white", fontWeight:900, fontSize:13 }}>IF</span>
              </div>
              <div>
                <span style={{ fontWeight:900, fontSize:17, letterSpacing:"-0.02em" }}>
                  IFAI<span style={{ color:C.orange }}>GTEC</span>
                </span>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.04em", marginTop:1 }}>
                  AI · GOVERNANCE · TECHNOLOGY
                </div>
              </div>
            </div>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", lineHeight:1.78, maxWidth:280, marginBottom:28 }}>
              The international federation setting standards for AI governance, technology education, and cybersecurity worldwide.
            </p>
            <p style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.4)", letterSpacing:"0.07em",
              textTransform:"uppercase", marginBottom:10 }}>Stay Updated</p>
            <div style={{ display:"flex", gap:8 }}>
              <input type="email" placeholder="your@email.com" className="form-input" style={{
                flex:1, padding:"10px 14px", borderRadius:10,
                background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)",
                color:"white", fontSize:13,
              }} />
              <button style={{
                padding:"10px 16px", borderRadius:10,
                background:`linear-gradient(135deg, ${C.orange}, ${C.amber})`,
                border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              }} onClick={e => e.preventDefault()}>
                <ArrowRight size={16} color="white" />
              </button>
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.5)",
                letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16 }}>{heading}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {links.map((l) => (
                  <a key={l} href="#" onClick={e => e.preventDefault()} style={{ fontSize:13, color:"rgba(255,255,255,0.38)", textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.82)"}
                    onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.38)"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop:32, borderTop:"1px solid rgba(255,255,255,0.07)",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.28)" }}>
            © 2025 IFAIGTEC — International Federation for AI Governance Technology Education Cybersecurity. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:24 }}>
            {["LinkedIn","Twitter / X","YouTube"].map((s) => (
              <a key={s} href="#" onClick={e => e.preventDefault()} style={{ fontSize:12, color:"rgba(255,255,255,0.28)", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,0.7)"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.28)"}
              >{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
