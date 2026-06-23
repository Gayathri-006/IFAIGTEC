import React, { useState } from "react";
import { ChevronLeft, User, Mail, Phone, Building, Globe, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { C } from "../constants/colors";
import { MEMBER_TYPES, COUNTRIES } from "../data/countries";
import { RegisterPageProps } from "../types";

export function RegisterPage({ setPage }: RegisterPageProps) {
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", phone:"", organization:"",
    memberType:"", country:"", password:"", confirm:""
  });

  return (
    <div className="page-fade" style={{ minHeight:"100vh", background:"linear-gradient(135deg, #fffcf8 0%, #f8f5ff 50%, #f0fdfb 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <div style={{ position:"fixed", top:"10%", right:"10%", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"10%", left:"5%", width:320, height:320, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:560 }}>
        <button onClick={() => setPage("home")} style={{
          display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
          cursor:"pointer", fontSize:14, color:"#666", marginBottom:32, transition:"color .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.color=C.orange}
        onMouseLeave={e => e.currentTarget.style.color="#666"}>
          <ChevronLeft size={18} /> Back to IFAIGTEC
        </button>

        <div style={{ background:"white", borderRadius:28, padding:"48px 44px",
          boxShadow:"0 24px 80px rgba(0,0,0,0.09)", border:"1px solid rgba(0,0,0,0.06)" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32 }}>
            <div style={{ width:42, height:42, borderRadius:13,
              background:"linear-gradient(135deg, #F97316, #7C3AED)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontWeight:900, fontSize:14 }}>IF</span>
            </div>
            <div>
              <span style={{ fontWeight:900, fontSize:18, letterSpacing:"-0.02em", color:C.dark }}>
                IFAI<span style={{ color:C.orange }}>GTEC</span>
              </span>
              <div style={{ fontSize:9, color:"#aaa", letterSpacing:"0.04em" }}>AI · GOVERNANCE · TECHNOLOGY</div>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ display:"flex", gap:8, marginBottom:32 }}>
            {[1,2].map(s => (
              <div key={s} style={{ flex:1, height:4, borderRadius:2,
                background: s <= step ? `linear-gradient(90deg, ${C.orange}, ${C.amber})` : "rgba(0,0,0,0.08)",
                transition:"background .4s ease" }} />
            ))}
          </div>

          <h1 style={{ fontSize:26, fontWeight:800, color:C.dark, marginBottom:8,
            fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.02em" }}>
            {step === 1 ? "Join IFAIGTEC" : "Account Security"}
          </h1>
          <p style={{ fontSize:15, color:"#888", marginBottom:32 }}>
            {step === 1 ? "Create your membership account — Step 1 of 2" : "Set up your password — Step 2 of 2"}
          </p>

          {step === 1 ? (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Name row */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>First Name</label>
                  <div style={{ position:"relative" }}>
                    <User size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                    <input type="text" placeholder="First name" className="form-input"
                      style={{ paddingLeft:40 }}
                      value={form.firstName}
                      onChange={e => setForm({...form, firstName:e.target.value})} />
                  </div>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Last Name</label>
                  <input type="text" placeholder="Last name" className="form-input"
                    value={form.lastName}
                    onChange={e => setForm({...form, lastName:e.target.value})} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Work Email</label>
                <div style={{ position:"relative" }}>
                  <Mail size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                  <input type="email" placeholder="your@organization.com" className="form-input"
                    style={{ paddingLeft:40 }}
                    value={form.email}
                    onChange={e => setForm({...form, email:e.target.value})} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Phone Number</label>
                <div style={{ position:"relative" }}>
                  <Phone size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                  <input type="tel" placeholder="+1 (555) 000-0000" className="form-input"
                    style={{ paddingLeft:40 }}
                    value={form.phone}
                    onChange={e => setForm({...form, phone:e.target.value})} />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Organization / Institution</label>
                <div style={{ position:"relative" }}>
                  <Building size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                  <input type="text" placeholder="Your organization name" className="form-input"
                    style={{ paddingLeft:40 }}
                    value={form.organization}
                    onChange={e => setForm({...form, organization:e.target.value})} />
                </div>
              </div>

              {/* Member type */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Membership Type</label>
                <select className="form-input" value={form.memberType}
                  onChange={e => setForm({...form, memberType:e.target.value})}
                  style={{ cursor:"pointer" }}>
                  <option value="">Select membership type</option>
                  {MEMBER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Country */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Country</label>
                <div style={{ position:"relative" }}>
                  <Globe size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", zIndex:1 }} />
                  <select className="form-input" value={form.country}
                    onChange={e => setForm({...form, country:e.target.value})}
                    style={{ paddingLeft:40, cursor:"pointer" }}>
                    <option value="">Select your country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button onClick={() => setStep(2)} style={{
                width:"100%", padding:"15px", borderRadius:12, marginTop:4,
                background:`linear-gradient(135deg, ${C.orange}, ${C.amber})`,
                color:"white", fontWeight:700, fontSize:15, border:"none", cursor:"pointer",
                fontFamily:"'Plus Jakarta Sans',sans-serif",
                boxShadow:`0 8px 24px rgba(249,115,22,.35)`,
                transition:"all .3s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
              >
                Continue to Step 2 <ChevronLeft size={16} style={{ display:"inline", marginLeft:6, transform:"rotate(180deg)" }} />
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Password */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Create Password</label>
                <div style={{ position:"relative" }}>
                  <Lock size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                  <input type={showPw ? "text" : "password"} placeholder="Minimum 8 characters" className="form-input"
                    style={{ paddingLeft:40, paddingRight:44 }}
                    value={form.password}
                    onChange={e => setForm({...form, password:e.target.value})} />
                  <button onClick={() => setShowPw(!showPw)} style={{
                    position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer",
                  }}>
                    {showPw ? <EyeOff size={15} color="#ccc" /> : <Eye size={15} color="#ccc" />}
                  </button>
                </div>
                {/* Password strength */}
                {form.password && (
                  <div style={{ display:"flex", gap:4, marginTop:8 }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{ flex:1, height:3, borderRadius:2, transition:"background .3s",
                        background: form.password.length > i*3 ?
                          (form.password.length < 6 ? C.coral : form.password.length < 10 ? C.amber : C.green) :
                          "rgba(0,0,0,0.08)" }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Confirm Password</label>
                <div style={{ position:"relative" }}>
                  <Lock size={15} color="#ccc" style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }} />
                  <input type="password" placeholder="Re-enter your password" className="form-input"
                    style={{ paddingLeft:40,
                      borderColor: form.confirm && form.confirm !== form.password ? C.coral : undefined }}
                    value={form.confirm}
                    onChange={e => setForm({...form, confirm:e.target.value})} />
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p style={{ fontSize:12, color:C.coral, marginTop:6 }}>Passwords do not match</p>
                )}
              </div>

              {/* Membership benefits preview */}
              <div style={{ background:"rgba(249,115,22,0.04)", border:"1px solid rgba(249,115,22,0.15)",
                borderRadius:12, padding:"16px 18px" }}>
                <p style={{ fontSize:12, fontWeight:700, color:C.orange, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                  Your Membership Includes
                </p>
                {[
                  "Access to all certification programs",
                  "Global governance resources & frameworks",
                  "Events: summits, webinars & workshops",
                  "Committee & commission membership access",
                ].map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <CheckCircle size={13} color={C.teal} />
                    <span style={{ fontSize:13, color:"#555" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Terms */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <input type="checkbox" id="terms" style={{ accentColor:C.orange, width:16, height:16, cursor:"pointer", marginTop:2 }} />
                <label htmlFor="terms" style={{ fontSize:13, color:"#666", cursor:"pointer", lineHeight:1.6 }}>
                  I agree to the <a href="#" style={{ color:C.orange, textDecoration:"none" }} onClick={e => e.preventDefault()}>Terms & Conditions</a> and <a href="#" style={{ color:C.orange, textDecoration:"none" }} onClick={e => e.preventDefault()}>Privacy Policy</a> of IFAIGTEC
                </label>
              </div>

              <div style={{ display:"flex", gap:12 }}>
                <button onClick={() => setStep(1)} className="btn-ghost" style={{ flex:1, justifyContent:"center" }}>
                  &larr; Back
                </button>
                <button style={{
                  flex:2, padding:"15px", borderRadius:12,
                  background:`linear-gradient(135deg, ${C.orange}, ${C.amber})`,
                  color:"white", fontWeight:700, fontSize:15, border:"none", cursor:"pointer",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",
                  boxShadow:`0 8px 24px rgba(249,115,22,.35)`,
                  transition:"all .3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
                >
                  Create My Account
                </button>
              </div>
            </div>
          )}

          <p style={{ textAlign:"center", fontSize:14, color:"#888", marginTop:28 }}>
            Already have an account?{" "}
            <button onClick={() => setPage("login")} style={{
              background:"none", border:"none", cursor:"pointer",
              color:C.orange, fontWeight:600, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif",
            }}>
              Sign In &rarr;
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
