import React from "react";

export function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { overflow-x: hidden; width: 100%; position: relative; scroll-behavior: smooth; }
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: #ffffff; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 3px; }

      @keyframes floatA { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(1.5deg)} }
      @keyframes floatB { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-10px) rotate(-1deg)} 66%{transform:translateY(-5px) rotate(0.8deg)} }
      @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes floatD { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-1deg)} }
      @keyframes pulseGlow { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.95;transform:scale(1.06)} }
      @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      @keyframes marqueeTestimonial { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      @keyframes particleDrift { 0%{opacity:0;transform:translateY(0) scale(.4)} 25%{opacity:.7} 100%{opacity:0;transform:translateY(-70px) scale(1.4)} }
      @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

      .anim-float-a  { animation: floatA 6s ease-in-out infinite; }
      .anim-float-b  { animation: floatB 5s ease-in-out infinite 0.5s; }
      .anim-float-c  { animation: floatC 4.5s ease-in-out infinite 1s; }
      .anim-float-d  { animation: floatD 7s ease-in-out infinite 1.5s; }
      .anim-pulse    { animation: pulseGlow 3.5s ease-in-out infinite; }
      .anim-ticker   { animation: tickerScroll 40s linear infinite; }
      .anim-marquee  { animation: marqueeTestimonial 45s linear infinite; }
      .anim-marquee:hover { animation-play-state: paused; }

      .section-reveal { opacity:0; transform:translateY(44px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
      .section-reveal.visible { opacity:1; transform:translateY(0); }
      .reveal-left { opacity:0; transform:translateX(-44px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
      .reveal-left.visible { opacity:1; transform:translateX(0); }
      .reveal-right { opacity:0; transform:translateX(44px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
      .reveal-right.visible { opacity:1; transform:translateX(0); }

      .glass-card { background:rgba(255,255,255,.88); backdrop-filter:blur(18px); -webkit-backdrop-filter:blur(18px); border:1px solid rgba(255,255,255,.75); box-shadow:0 8px 32px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04); }
      .hover-lift { transition:transform .35s cubic-bezier(.34,1.56,.64,1),box-shadow .35s ease; cursor:pointer; }
      .hover-lift:hover { transform:translateY(-8px); }

      .btn-primary { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:99px; background:linear-gradient(135deg,#F97316,#F59E0B); color:#fff; font-weight:600; font-size:15px; box-shadow:0 8px 24px rgba(249,115,22,.35); transition:all .3s ease; text-decoration:none; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; }
      .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(249,115,22,.45); }
      .btn-primary:hover .btn-arrow { transform:translateX(4px); }
      .btn-arrow { transition:transform .3s ease; display:inline-flex; }
      .btn-ghost { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; border-radius:99px; background:#fff; color:#1a1a1a; font-weight:600; font-size:15px; border:1.5px solid rgba(0,0,0,.1); box-shadow:0 2px 8px rgba(0,0,0,.05); transition:all .3s ease; text-decoration:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; }
      .btn-ghost:hover { transform:translateY(-2px); border-color:rgba(0,0,0,.18); box-shadow:0 8px 24px rgba(0,0,0,.09); }

      .tag-pill { display:inline-flex; align-items:center; padding:4px 12px; border-radius:99px; font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
      .section-label { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border-radius:99px; font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; margin-bottom:20px; }
      .playfair { font-family:'Playfair Display',serif; }
      .mono { font-family:'DM Mono',monospace; }

      .nav-link { position:relative; font-size:14px; font-weight:500; color:#4b4b60; text-decoration:none; transition:color .2s; }
      .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:1.5px; background:#F97316; transform:scaleX(0); transition:transform .25s ease; transform-origin:left; }
      .nav-link:hover { color:#0f0f0f; }
      .nav-link:hover::after { transform:scaleX(1); }

      .nav-dropdown { position:relative; }
      .nav-dropdown-menu { position:absolute; top:calc(100% + 16px); left:50%; transform:translateX(-50%); background:white; border:1px solid rgba(0,0,0,.08); border-radius:16px; padding:12px; min-width:220px; box-shadow:0 20px 60px rgba(0,0,0,.12); opacity:0; visibility:hidden; transition:all .25s ease; z-index:200; }
      .nav-dropdown:hover .nav-dropdown-menu { opacity:1; visibility:visible; }
      .nav-dropdown-item { display:block; padding:9px 14px; border-radius:10px; font-size:13px; font-weight:500; color:#555; text-decoration:none; transition:all .2s; }
      .nav-dropdown-item:hover { background:rgba(249,115,22,.07); color:#F97316; }

      .form-input { width:100%; padding:14px 16px; border-radius:12px; border:1.5px solid rgba(0,0,0,.1); font-size:15px; font-family:'Plus Jakarta Sans',sans-serif; outline:none; transition:border-color .2s,box-shadow .2s; background:white; color:#111; }
      .form-input:focus { border-color:#F97316; box-shadow:0 0 0 3px rgba(249,115,22,.12); }
      .form-input::placeholder { color:#bbb; }

      .page-fade { animation:fadeIn .5s ease; }

      @media (max-width:1160px) {
        .hidden-mobile { display:none !important; }
        .show-mobile   { display:block !important; }
      }
      @media (min-width:1161px) {
        .show-mobile   { display:none !important; }
        .nowrap-desktop { white-space: nowrap !important; }
      }

      @media (max-width:768px) {
        .nowrap-desktop { white-space: normal !important; }
        .hero-vis-container { width: 420px !important; height: 420px !important; margin: 0 auto !important; }
        .hero-vis-scaler { width: 280px !important; height: 280px !important; transform: scale(0.68) !important; transform-origin: center center !important; margin: 0 auto !important; flex-shrink: 0 !important; }
        .hero-text-column { text-align: center !important; display: flex !important; flex-direction: column !important; align-items: center !important; }
        .hero-text-column h1 { text-align: center !important; }
        .hero-text-column h1 br { display: none !important; }
        .hero-text-column p { margin-left: auto !important; margin-right: auto !important; text-align: center !important; }
        .hero-buttons { justify-content: center !important; width: 100% !important; }
        .hero-ratings { justify-content: center !important; width: 100% !important; }
        .container-pad { padding: 0 16px !important; }
        .hero-inner { padding: 48px 16px !important; }
        section { padding: 56px 0 !important; }
        .hero-grid     { grid-template-columns:1fr !important; }
        .hero-vis      { height:320px !important; overflow:visible !important; display:flex !important; align-items:center !important; justify-content:center !important; width:100% !important; max-width:100% !important; }
        .about-grid    { grid-template-columns:1fr !important; gap:40px !important; }
        .about-stat-grid { grid-template-columns:1fr 1fr !important; gap:12px !important; }
        .about-stat-grid > div { padding: 18px 14px !important; border-radius: 16px !important; }
        .about-stat-grid > div > div:first-child { font-size: 24px !important; }
        .programs-grid { grid-template-columns:1fr !important; }
        .sol-grid      { grid-template-columns:1fr !important; }
        .why-grid      { grid-template-columns:1fr !important; }
        .stats-grid    { grid-template-columns:repeat(2,1fr) !important; gap:32px !important; }
        .footer-grid   { grid-template-columns:1fr !important; gap:32px !important; }
      }
      @media (max-width:440px) {
        .hero-vis-scaler { width: 220px !important; height: 220px !important; transform: scale(0.53) !important; }
        .hero-vis { height: 260px !important; }
      }
      @media (max-width:360px) {
        .hero-vis-scaler { width: 180px !important; height: 180px !important; transform: scale(0.43) !important; }
        .hero-vis { height: 220px !important; }
        .about-stat-grid { grid-template-columns:1fr !important; }
      }
      @media (min-width:769px) and (max-width:1024px) {
        .programs-grid { grid-template-columns:1fr 1fr !important; }
        .why-grid      { grid-template-columns:1fr 1fr !important; }
        .stats-grid    { grid-template-columns:repeat(3,1fr) !important; }
        .footer-grid   { grid-template-columns:1fr 1fr 1fr !important; }
      }
    `}</style>
  );
}
