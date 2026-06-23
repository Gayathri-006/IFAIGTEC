import React from "react";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { C } from "../../constants/colors";
import { useReveal } from "../../hooks/useReveal";

export function AboutSection() {
  const left = useReveal();
  const right = useReveal();

  return (
    <section style={{ padding:"120px 0", background:"#white" }}>
      <div className="container-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:72, alignItems:"center" }} className="about-grid">
          
          {/* Left Panel */}
          <div ref={left} className="section-reveal" style={{ display:"flex", flexDirection:"column" }}>
            <div className="section-label" style={{ background:"rgba(13,148,136,0.08)", color:C.teal, display:"inline-flex" }}>
              <ShieldCheck size={12} /> Overview & Mission
            </div>
            <h2 className="playfair" style={{
              fontSize:"clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight:800,
              lineHeight:1.15, letterSpacing:"-0.02em", color:C.dark, marginBottom:24,
            }}>
              Unifying global expertise to establish trusted AI standardizations.
            </h2>
            <p style={{ fontSize:15.5, color:"#555566", lineHeight:1.75, marginBottom:20 }}>
              The International Federation for AI Governance Technology Education Cybersecurity (IFAIGTEC) serves as an international standards body and accrediting authority. We unite industry leaders, technologists, academic institutions, and government stakeholders to design robust AI safety, compliance, and cybersecurity structures.
            </p>
            <p style={{ fontSize:15.5, color:"#555566", lineHeight:1.75, marginBottom:32 }}>
              Our work spans across developing comprehensive technical regulations, establishing legal and judicial processes for AI compliance, and issuing globally recognized professional certifications.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                "Global confederation across 5 continents",
                "Specialized committees covering AI, GRC, and industries",
                "Product, project, and service compliance assessments",
                "DPDP Act, NIST RMF, and EU AI Act readiness pathways",
              ].map((text, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <CheckCircle size={15} color={C.teal} />
                  <span style={{ fontSize:14.5, fontWeight:600, color:"#333344" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Bento Stats */}
          <div ref={right} className="section-reveal" style={{ display:"flex", flexDirection:"column" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }} className="about-stat-grid">
              {[
                { title: "Standardization", desc: "Setting the baseline for compliance across digital domains.", count: "01", col: C.orange, bg: "rgba(249,115,22,0.04)" },
                { title: "Technology Education", desc: "Equipping teams with modern technical competencies.", count: "02", col: C.purple, bg: "rgba(124,58,237,0.04)" },
                { title: "Cybersecurity", desc: "Securing intelligent nodes and models from emerging threats.", count: "03", col: C.teal, bg: "rgba(13,148,136,0.04)" },
                { title: "Global Certification", desc: "Issuing formal compliance marks recognized worldwide.", count: "04", col: C.coral, bg: "rgba(239,68,68,0.04)" },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.bg, borderRadius:24, padding:"32px 28px",
                  border:`1.5px solid ${item.col}15`, display:"flex", flexDirection:"column", justifyContent:"space-between",
                }}>
                  <div>
                    <div style={{ fontSize:11, fontWeight:750, color:item.col, letterSpacing:"0.08em",
                      textTransform:"uppercase", marginBottom:12 }}>{item.title}</div>
                    <p style={{ fontSize:13, color:"#777788", lineHeight:1.6 }}>{item.desc}</p>
                  </div>
                  <div style={{ fontSize:32, fontWeight:900, color:item.col, opacity:0.25,
                    fontFamily:"'Plus Jakarta Sans',sans-serif", textAlign:"right", marginTop:16 }}>{item.count}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
