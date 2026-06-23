import React, { useState } from "react";
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { C } from "../constants/colors";
import { LoginPageProps } from "../types";

export function LoginPage({ setPage }: LoginPageProps) {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email:"", password:"" });

  return (
    <div className="page-fade" style={{ minHeight:"100vh", background:"linear-gradient(135deg, #fffcf8 0%, #f8f5ff 50%, #f0fdfb 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      {/* Background orbs */}
      <div style={{ position:"fixed", top:"10%", right:"10%", width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"10%", left:"5%", width:320, height:320, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ width:"100%", maxWidth:480 }}>
        {/* Back button */}
        <button onClick={() => setPage("home")} style={{
          display:"flex", alignItems:"center", gap:8, background:"none", border:"none",
          cursor:"pointer", fontSize:14, color:"#666", marginBottom:32,
          transition:"color .2s",
        }}
        onMouseEnter={e => e.currentTarget.style.color=C.orange}
        onMouseLeave={e => e.currentTarget.style.color="#666"}>
          <ChevronLeft size={18} /> Back to IFAIGTEC
        </button>

        {/* Card */}
        <div style={{ background:"white", borderRadius:28, padding:"48px 44px",
          boxShadow:"0 24px 80px rgba(0,0,0,0.09)", border:"1px solid rgba(0,0,0,0.06)" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:36 }}>
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

          <h1 style={{ fontSize:26, fontWeight:800, color:C.dark, marginBottom:8,
            fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:"-0.02em" }}>Welcome back</h1>
          <p style={{ fontSize:15, color:"#888", marginBottom:36 }}>Sign in to your IFAIGTEC account</p>

          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {/* Email */}
            <div>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#444", marginBottom:8 }}>Email Address</label>
              <div style={{ position:"relative" }}>
                <Mail size={16} color="#ccc" style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)" }} />
                <input type="email" placeholder="your@organization.com" className="form-input"
                  style={{ paddingLeft:44 }}
                  value={form.email}
                  onChange={e => setForm({...form, email:e.target.value})} />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <label style={{ fontSize:13, fontWeight:600, color:"#444" }}>Password</label>
                <a href="#" style={{ fontSize:12, color:C.orange, textDecoration:"none", fontWeight:500 }} onClick={e => e.preventDefault()}>Forgot password?</a>
              </div>
              <div style={{ position:"relative" }}>
                <Lock size={16} color="#ccc" style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)" }} />
                <input type={showPw ? "text" : "password"} placeholder="Enter your password" className="form-input"
                  style={{ paddingLeft:44, paddingRight:44 }}
                  value={form.password}
                  onChange={e => setForm({...form, password:e.target.value})} />
                <button onClick={() => setShowPw(!showPw)} style={{
                  position:"absolute", right:16, top:"50%", transform:"translateY(-50%)",
                  background:"none", border:"none", cursor:"pointer", padding:2,
                }}>
                  {showPw ? <EyeOff size={16} color="#ccc" /> : <Eye size={16} color="#ccc" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <input type="checkbox" id="remember" style={{ accentColor:C.orange, width:16, height:16, cursor:"pointer" }} />
              <label htmlFor="remember" style={{ fontSize:13, color:"#666", cursor:"pointer" }}>Remember me for 30 days</label>
            </div>

            {/* Submit */}
            <button style={{
              width:"100%", padding:"15px", borderRadius:12,
              background:`linear-gradient(135deg, ${C.orange}, ${C.amber})`,
              color:"white", fontWeight:700, fontSize:15, border:"none", cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif",
              boxShadow:`0 8px 24px rgba(249,115,22,0.35)`,
              transition:"all .3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 14px 36px rgba(249,115,22,.45)`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(249,115,22,0.35)`; }}
            >
              Sign In to IFAIGTEC
            </button>

            {/* Divider */}
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
              <span style={{ fontSize:12, color:"#bbb", fontWeight:500 }}>or continue with</span>
              <div style={{ flex:1, height:1, background:"rgba(0,0,0,0.08)" }} />
            </div>

            {/* SSO */}
            {["Sign in with Google", "Sign in with Microsoft"].map((label, i) => (
              <button key={i} style={{
                width:"100%", padding:"13px", borderRadius:12,
                background:"white", color:"#333", fontWeight:600, fontSize:14, border:"1.5px solid rgba(0,0,0,0.1)",
                cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif",
                transition:"all .25s ease",
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(0,0,0,0.2)"; e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,0.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(0,0,0,0.1)"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ width:18, height:18, borderRadius:4, background: i === 0 ? "#EA4335" : "#00A4EF",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"white", fontSize:10, fontWeight:900 }}>{i === 0 ? "G" : "M"}</span>
                </div>
                {label}
              </button>
            ))}
          </div>

          {/* Register link */}
          <p style={{ textAlign:"center", fontSize:14, color:"#888", marginTop:28 }}>
            Not a member yet?{" "}
            <button onClick={() => setPage("register")} style={{
              background:"none", border:"none", cursor:"pointer",
              color:C.orange, fontWeight:600, fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif",
            }}>
              Join IFAIGTEC &rarr;
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
