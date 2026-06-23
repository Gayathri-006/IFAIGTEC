import React from "react";
import { C } from "../../constants/colors";

export function AIVisualization() {
  const CX = 210, CY = 210;
  
  const outerNodes = Array.from({ length: 8 }, (_, i) => {
    const ang = (i * 45 - 90) * (Math.PI / 180);
    return {
      x: CX + 108 * Math.cos(ang), y: CY + 108 * Math.sin(ang),
      color: [C.orange, C.purple, C.teal, C.coral, C.orange, C.amber, C.teal, C.green][i],
      r: [8, 6, 9, 7, 6, 8, 7, 6][i],
    };
  });
  
  const innerNodes = Array.from({ length: 6 }, (_, i) => {
    const ang = (i * 60 - 90) * (Math.PI / 180);
    return {
      x: CX + 58 * Math.cos(ang), y: CY + 58 * Math.sin(ang),
      color: [C.orange, C.amber, C.purple, C.teal, C.orange, C.coral][i],
      r: [5, 4, 5, 4, 5, 4][i],
    };
  });

  return (
    <div style={{ position:"relative", width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none" }}>
      <div className="hero-vis-scaler" style={{ position:"relative", width:420, height:420, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <div style={{ position:"absolute", top:"5%", right:"8%", width:320, height:320, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)" }} className="anim-pulse" />
        <div style={{ position:"absolute", bottom:"8%", left:"2%", width:260, height:260, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", top:"35%", left:"18%", width:200, height:200, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)" }} />

      <div className="hero-vis-container" style={{ position:"relative", width:420, height:420, flexShrink:0 }}>
        <svg viewBox="0 0 420 420" style={{ width:"100%", height:"100%", overflow:"visible" }}>
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="35%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#7C3AED" />
            </radialGradient>
            <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tealHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,0,0,0.18)" />
            </filter>
            <path id="op1" d={`M ${CX},${CY - 108} A 108,108 0 1,1 ${CX - 0.001},${CY - 108} Z`} fill="none" />
            <path id="op2" d={`M ${CX},${CY - 162} A 162,162 0 1,1 ${CX - 0.001},${CY - 162} Z`} fill="none" />
            <path id="op3" d={`M ${CX},${CY - 200} A 200,200 0 1,1 ${CX - 0.001},${CY - 200} Z`} fill="none" />
          </defs>

          <circle cx={CX} cy={CY} r="130" fill="url(#haloGrad)" className="anim-pulse" />
          <circle cx={CX} cy={CY} r="178" fill="url(#tealHalo)" opacity="0.6" />

          <circle cx={CX} cy={CY} r="108" fill="none" stroke="rgba(249,115,22,0.18)" strokeWidth="1.5" strokeDasharray="7,5">
            <animateTransform attributeName="transform" type="rotate" values={`0 ${CX} ${CY}; 360 ${CX} ${CY}`} dur="26s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="162" fill="none" stroke="rgba(124,58,237,0.13)" strokeWidth="1" strokeDasharray="4,9">
            <animateTransform attributeName="transform" type="rotate" values={`360 ${CX} ${CY}; 0 ${CX} ${CY}`} dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx={CX} cy={CY} r="200" fill="none" stroke="rgba(13,148,136,0.09)" strokeWidth="1" strokeDasharray="2,14">
            <animateTransform attributeName="transform" type="rotate" values={`0 ${CX} ${CY}; 360 ${CX} ${CY}`} dur="40s" repeatCount="indefinite" />
          </circle>

          {outerNodes.map((n, i) => (
            <line key={`co${i}`} x1={CX} y1={CY} x2={n.x} y2={n.y}
              stroke={n.color} strokeWidth="1" strokeOpacity="0.22" strokeDasharray="5 4">
              <animate attributeName="stroke-dashoffset" values="9;0" dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" />
            </line>
          ))}
          {innerNodes.map((n, i) => {
            const next = innerNodes[(i + 1) % innerNodes.length];
            return (
              <line key={`ih${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y}
                stroke="rgba(249,115,22,0.3)" strokeWidth="1" strokeDasharray="4 3">
                <animate attributeName="stroke-dashoffset" values="7;0" dur={`${1.6 + i * 0.18}s`} repeatCount="indefinite" />
              </line>
            );
          })}
          {outerNodes.map((n, i) => (
            <g key={`on${i}`} filter="url(#softShadow)">
              <circle cx={n.x} cy={n.y} r={n.r + 5} fill={n.color} opacity="0.12" />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} />
            </g>
          ))}
          {innerNodes.map((n, i) => (
            <g key={`in${i}`}>
              <circle cx={n.x} cy={n.y} r={n.r + 4} fill={n.color} opacity="0.12" />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity="0.85" />
            </g>
          ))}
          <circle cx={CX} cy={CY} r="64" fill="url(#coreGrad)" filter="url(#glow)" opacity="0.55" />
          <circle cx={CX} cy={CY} r="54" fill="url(#coreGrad)" />
          <circle cx={CX} cy={CY} r="49" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x={CX} y={CY - 7} textAnchor="middle" fill="rgba(255,255,255,0.65)"
            fontSize="8" fontWeight="600" letterSpacing="2" fontFamily="'DM Mono',monospace">GLOBAL</text>
          <text x={CX} y={CY + 10} textAnchor="middle" fill="white"
            fontSize="13" fontWeight="800" fontFamily="'Plus Jakarta Sans',sans-serif">AI GOV</text>
          <text x={CX} y={CY + 26} textAnchor="middle" fill="rgba(255,255,255,0.6)"
            fontSize="7.5" fontWeight="600" letterSpacing="2.5" fontFamily="'DM Mono',monospace">IFAIGTEC</text>
          <circle r="7.5" fill={C.orange} filter="url(#softShadow)">
            <animateMotion dur="8.5s" repeatCount="indefinite"><mpath href="#op1" /></animateMotion>
          </circle>
          <circle r="5.5" fill={C.purple} filter="url(#softShadow)">
            <animateMotion dur="13s" repeatCount="indefinite" begin="1.5s"><mpath href="#op2" /></animateMotion>
          </circle>
          <circle r="5" fill={C.teal} filter="url(#softShadow)">
            <animateMotion dur="19s" repeatCount="indefinite" begin="4s"><mpath href="#op3" /></animateMotion>
          </circle>
          <circle r="4.5" fill={C.amber}>
            <animateMotion dur="11s" repeatCount="indefinite" begin="2s" calcMode="linear" keyPoints="1;0" keyTimes="0;1">
              <mpath href="#op1" />
            </animateMotion>
          </circle>
        </svg>

        {/* Floating glass cards */}
        <div className="glass-card anim-float-a" style={{
          position:"absolute", top:-28, right:-72,
          padding:"14px 18px", borderRadius:18, minWidth:158,
        }}>
          <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", color:"#9999aa", textTransform:"uppercase", marginBottom:4 }}>Members Worldwide</p>
          <p style={{ fontSize:28, fontWeight:800, color:C.orange, lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>340+</p>
          <p style={{ fontSize:11, color:"#9999aa", marginTop:3 }}>Global organizations</p>
          <div style={{ marginTop:8, height:3, borderRadius:2, background:`linear-gradient(90deg, ${C.orange}, ${C.amber})`, width:"82%" }} />
        </div>

        <div className="glass-card anim-float-b" style={{
          position:"absolute", bottom:16, left:-80,
          padding:"14px 18px", borderRadius:18, minWidth:160,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.teal }} />
            <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", color:"#9999aa", textTransform:"uppercase" }}>Countries</p>
          </div>
          <p style={{ fontSize:28, fontWeight:800, color:C.teal, lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>48+</p>
          <p style={{ fontSize:11, color:"#9999aa", marginTop:3 }}>Global reach</p>
        </div>

        <div className="glass-card anim-float-c" style={{
          position:"absolute", top:60, left:-68,
          padding:"14px 18px", borderRadius:18, minWidth:150,
        }}>
          <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", color:"#9999aa", textTransform:"uppercase", marginBottom:4 }}>Committees</p>
          <p style={{ fontSize:28, fontWeight:800, color:C.purple, lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>25+</p>
          <p style={{ fontSize:11, color:"#9999aa", marginTop:3 }}>Specialized domains</p>
        </div>

        <div className="glass-card anim-float-d" style={{
          position:"absolute", bottom:65, right:-66,
          padding:"14px 18px", borderRadius:18, minWidth:152,
        }}>
          <p style={{ fontSize:10, fontWeight:600, letterSpacing:"0.06em", color:"#9999aa", textTransform:"uppercase", marginBottom:4 }}>Certifications</p>
          <p style={{ fontSize:28, fontWeight:800, color:C.coral, lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>6+</p>
          <p style={{ fontSize:11, color:"#9999aa", marginTop:3 }}>International programs</p>
          <div style={{ display:"flex", gap:3, marginTop:7 }}>
            {[1,1,1,1,0.2].map((op, i) => (
              <div key={i} style={{ flex:1, height:3, borderRadius:2, background:C.coral, opacity:op }} />
            ))}
          </div>
        </div>

        {[
          { left:"18%", bottom:"22%", delay:"0s",   color:C.orange },
          { left:"75%", bottom:"38%", delay:"1.2s", color:C.purple },
          { left:"48%", bottom:"10%", delay:"2.4s", color:C.teal },
          { left:"88%", bottom:"58%", delay:"0.6s", color:C.amber },
        ].map((p, i) => (
          <div key={i} style={{
            position:"absolute", left:p.left, bottom:p.bottom,
            width:6, height:6, borderRadius:"50%", background:p.color,
            animation:`particleDrift 3.5s ease-out ${p.delay} infinite`,
          }} />
        ))}
      </div>
    </div>
  </div>
  );
}
