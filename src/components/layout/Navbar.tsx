import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ChevronRight, Leaf } from "lucide-react";
import { C } from "../../constants/colors";
import { NAV_ITEMS } from "../../constants/navigation";
import { NavbarProps } from "../../types";

// ─── Main Navbar ───────────────────────────────────────────────────────────────
export function Navbar({ page, setPage, onOpenAgriculture }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobOpen, setMobOpen]     = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const dropdownRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setActiveTab(null);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const handleLink = (e: React.MouseEvent, p: string) => {
    e.preventDefault();
    setPage(p);
    setMobOpen(false);
    setActiveTab(null);
  };

  // ── Learning dropdown definition ──────────────────────────────────────────
  const LEARNING_LABEL = "Learning";

  const isLearningActive = activeTab === LEARNING_LABEL;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.03)" : "none",
      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div className="container-pad" style={{
        maxWidth: 1440, margin: "0 auto", padding: "0 clamp(16px, 2.5vw, 32px)",
        height: scrolled ? 80 : 96, display: "flex", alignItems: "center",
        justifyContent: "space-between", transition: "height 0.35s ease",
        boxSizing: "border-box",
      }}>

        {/* LOGO */}
        <a href="#" onClick={e => handleLink(e, "home")} style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", marginLeft: "-24px" }}>
          <div style={{
            width: 52, height: 52, borderRadius: 18,
            background: "linear-gradient(135deg, #F97316 0%, #7C3AED 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 18px rgba(249,115,22,0.28)", flexShrink: 0,
          }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: 18, letterSpacing: "-0.01em" }}>IF</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, transform: "translateY(7px)" }}>
            <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em", color: C.dark, lineHeight: 1, whiteSpace: "nowrap" }}>
              IFAI<span style={{ color: C.orange }}>GTEC</span>
            </span>
            <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1, whiteSpace: "nowrap" }}>
              AI · GOVERNANCE · TECH
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <div ref={dropdownRef} className="hidden-mobile" style={{ display: "flex", gap: "clamp(8px, 1.2vw, 20px)", alignItems: "center", height: "100%" }}>

          {/* ── Existing NAV_ITEMS ── */}
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <div key={item.label} className="nav-dropdown"
                style={{ height: "100%", display: "flex", alignItems: "center", position: "relative" }}
                onMouseEnter={() => setActiveTab(item.label)}
                onMouseLeave={() => setActiveTab(null)}>

                <button onClick={() => setActiveTab(isActive ? null : item.label)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600, color: isActive ? C.orange : "#4b4b58",
                  display: "flex", alignItems: "center", gap: 4, transition: "color 0.25s",
                  height: "100%", padding: "0 4px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                }}>
                  {item.label}
                  <ChevronDown size={13} style={{ transform: isActive ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
                </button>

                <div style={{
                  position: "absolute", top: scrolled ? 80 : 96, left: "50%",
                  transform: "translateX(-50%)", background: "white",
                  borderRadius: 24, border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 24px 72px rgba(0,0,0,0.11)",
                  padding: "32px 36px", width: "max-content",
                  opacity: isActive ? 1 : 0, visibility: isActive ? "visible" : "hidden",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  display: "flex", gap: 38, zIndex: 1100,
                }}>
                  {item.sections.map((section, idx) => (
                    <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 130 }}>
                      {section.title && (
                        <p style={{ fontSize: 10, fontWeight: 800, color: C.orange, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                          {section.title}
                        </p>
                      )}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {section.items.map((sub, sIdx) => (
                          <a key={sIdx} href="#" onClick={e => e.preventDefault()} style={{
                            fontSize: 14, fontWeight: 550, color: "#555",
                            textDecoration: "none", transition: "all 0.2s",
                            display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = C.orange; e.currentTarget.style.transform = "translateX(4px)"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#555"; e.currentTarget.style.transform = "none"; }}>
                            <ChevronRight size={12} color={C.orange} style={{ opacity: 0, transition: "opacity 0.2s" }} />
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* ── Learning dropdown ── */}
          <div
            className="nav-dropdown"
            style={{ height: "100%", display: "flex", alignItems: "center", position: "relative" }}
            onMouseEnter={() => setActiveTab(LEARNING_LABEL)}
            onMouseLeave={() => setActiveTab(null)}
          >
            <button
              onClick={() => setActiveTab(isLearningActive ? null : LEARNING_LABEL)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 600,
                color: isLearningActive ? C.orange : "#4b4b58",
                display: "flex", alignItems: "center", gap: 4,
                transition: "color 0.25s", height: "100%", padding: "0 4px",
                fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
              }}
            >
              Learning
              <ChevronDown
                size={13}
                style={{ transform: isLearningActive ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}
              />
            </button>

            <div style={{
              position: "absolute", top: scrolled ? 80 : 96, left: "50%",
              transform: "translateX(-50%)", background: "white",
              borderRadius: 24, border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 24px 72px rgba(0,0,0,0.11)",
              padding: "32px 36px", width: "max-content",
              opacity: isLearningActive ? 1 : 0,
              visibility: isLearningActive ? "visible" : "hidden",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
              display: "flex", gap: 38, zIndex: 1100,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 130 }}>
                <p style={{
                  fontSize: 10, fontWeight: 800, color: C.orange,
                  letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4,
                }}>
                  Explore
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      onOpenAgriculture("overview");
                      setActiveTab(null);
                    }}
                    style={{
                      fontSize: 14, fontWeight: 550, color: "#555",
                      textDecoration: "none", transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = C.orange;
                      e.currentTarget.style.transform = "translateX(4px)";
                      const icon = e.currentTarget.querySelector(".chevron-icon") as HTMLElement;
                      if (icon) icon.style.opacity = "1";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "#555";
                      e.currentTarget.style.transform = "none";
                      const icon = e.currentTarget.querySelector(".chevron-icon") as HTMLElement;
                      if (icon) icon.style.opacity = "0";
                    }}
                  >
                    <ChevronRight
                      size={12}
                      color={C.orange}
                      className="chevron-icon"
                      style={{ opacity: 0, transition: "opacity 0.2s" }}
                    />
                    <Leaf size={13} color="currentColor" style={{ flexShrink: 0 }} />
                    AI in Agriculture
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AUTH BUTTONS CONTAINER */}
        {/* FIX: Applied 'marginRight: "80px"' here to pull both Login and Register inward together */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 14px)", flexShrink: 0, marginRight: "80px" }}>
          <button onClick={() => setPage("login")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#4b4b58", padding: "10px clamp(10px, 1.5vw, 20px)",
            transition: "color 0.25s", fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.orange}
          onMouseLeave={e => e.currentTarget.style.color = "#4b4b58"}>
            Login
          </button>
          
          <button onClick={() => setPage("register")} style={{
            background: "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
            color: "white", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 700, padding: "12px clamp(16px, 1.8vw, 24px)", borderRadius: 99,
            boxShadow: "0 4px 14px rgba(249,115,22,0.22)", transition: "all 0.25s ease",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.32)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(249,115,22,0.22)"; }}>
            Register
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setMobOpen(!mobOpen)} className="show-mobile" style={{
          background: "none", border: "none", cursor: "pointer", padding: 8,
          color: C.dark, display: "flex", alignItems: "center",
        }}>
          {mobOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAV */}
      <div style={{
        position: "fixed", top: scrolled ? 80 : 96, left: 0, right: 0,
        height: "calc(100vh - 80px)", background: "white", zIndex: 999,
        borderTop: "1px solid rgba(0,0,0,0.06)", padding: "24px 32px 40px",
        display: mobOpen ? "block" : "none", overflowY: "auto",
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 }}>

          {/* Existing nav items */}
          {NAV_ITEMS.map((item, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 750, color: C.orange, letterSpacing: "0.04em", textTransform: "uppercase" }}>{item.label}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 8 }}>
                {item.sections.map(sec => sec.items.map((sub, sIdx) => (
                  <a key={sIdx} href="#" onClick={e => e.preventDefault()} style={{ fontSize: 14, fontWeight: 550, color: "#555", textDecoration: "none" }}>
                    {sub.name}
                  </a>
                )))}
              </div>
            </div>
          ))}

          {/* Learning section in mobile */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 750, color: C.orange, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Learning
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 8 }}>
              <button
                onClick={() => { onOpenAgriculture("overview"); setMobOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", padding: 0,
                  fontSize: 14, fontWeight: 550, color: "#555",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                <Leaf size={13} />
                AI in Agriculture
              </button>
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "12px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => { setPage("login"); setMobOpen(false); }} style={{
              width: "100%", padding: "14px", borderRadius: 12, background: "rgba(0,0,0,0.03)",
              border: "1.5px solid rgba(0,0,0,0.08)", color: C.dark, fontWeight: 650, fontSize: 14,
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Login</button>
            <button onClick={() => { setPage("register"); setMobOpen(false); }} style={{
              width: "100%", padding: "14px", borderRadius: 12,
              background: "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
              color: "white", fontWeight: 700, fontSize: 14, border: "none",
              cursor: "pointer", boxShadow: "0 4px 14px rgba(249,115,22,0.2)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
}