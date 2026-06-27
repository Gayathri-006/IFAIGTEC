import { useState, useEffect, useRef, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type PageId =
  | "overview"
  | "value-proposition"
  | "governance"
  | "coe-team"
  | "agro-sciences"
  | "agriculture-landscape"
  | "forestry-landscape"
  | "allied-landscape"
  | "seed-landscape"
  | "food-science"
  | "agri-business";

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview & Vision", icon: "🌐" },
  { id: "value-proposition", label: "Value Proposition", icon: "💡" },
  { id: "governance", label: "Governance Structure", icon: "🏛" },
  { id: "coe-team", label: "CoE Team", icon: "👥" },
  { id: "agro-sciences", label: "Agro Sciences", icon: "🔬" },
  { id: "agriculture-landscape", label: "Agriculture Landscape", icon: "🌾" },
  { id: "forestry-landscape", label: "Forestry Landscape", icon: "🌲" },
  { id: "allied-landscape", label: "Allied Landscape", icon: "🌿" },
  { id: "seed-landscape", label: "Seed Landscape", icon: "🌱" },
  { id: "food-science", label: "Food Science", icon: "🍃" },
  { id: "agri-business", label: "Agri Business", icon: "📈" },
];

// ── Design Tokens ──────────────────────────────────────────────────────────
const C = {
  orange: "#FF7A00",
  orangeLight: "#FF8F1F",
  teal: "#14B8A6",
  green: "#16A34A",
  purple: "#7C3AED",
  blue: "#2563EB",
  cyan: "#06B6D4",
  dark: "#0F172A",
  gray: "#475569",
  muted: "#64748B",
  border: "#E5E7EB",
  bg: "#FFFFFF",
  bgAlt: "#FAFAFA",
  bgLight: "#F4F4F5",
} as const;

const serif = "'Playfair Display', Georgia, serif";
const sans = "'Plus Jakarta Sans', -apple-system, sans-serif";

// ── Image URLs ─────────────────────────────────────────────────────────────
const IMG = {
  heroMain: "https://images.unsplash.com/photo-1713952160156-bb59cac789a9?w=1600&h=900&fit=crop&auto=format",
  droneField: "https://images.unsplash.com/photo-1627920769842-6887c6df05ca?w=1200&h=700&fit=crop&auto=format",
  labResearch: "https://images.unsplash.com/photo-1475906089153-644d9452ce87?w=1200&h=700&fit=crop&auto=format",
  teamWork: "https://images.unsplash.com/photo-1580982327559-c1202864eb05?w=1200&h=700&fit=crop&auto=format",
  forest: "https://images.unsplash.com/photo-1685023620523-9c726f2c499b?w=1200&h=700&fit=crop&auto=format",
  forestAerial: "https://images.unsplash.com/photo-1593679916468-851527f3ee27?w=1200&h=700&fit=crop&auto=format",
  foodFactory: "https://images.unsplash.com/photo-1652211955967-99c892925469?w=1200&h=700&fit=crop&auto=format",
  seedFarm: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=1200&h=700&fit=crop&auto=format",
} as const;

// ── Shared Style Helpers ────────────────────────────────────────────────────
const styles = {
  page: { fontFamily: sans, color: C.dark, background: C.bg, minHeight: "100vh" } as React.CSSProperties,

  badge: (color = C.orange): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 14px",
    borderRadius: 999, background: `${color}18`, border: `1px solid ${color}30`,
    color, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase" as const, fontFamily: sans, marginBottom: 20,
  }),

  sectionTitle: {
    fontFamily: serif, fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 700,
    lineHeight: 1.15, color: C.dark, margin: 0, marginBottom: 16,
  } as React.CSSProperties,

  sectionSubtitle: {
    fontSize: 18, color: C.gray, lineHeight: 1.7, maxWidth: 560, margin: 0, fontFamily: sans,
  } as React.CSSProperties,

  card: {
    background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16,
    padding: "28px 28px", transition: "box-shadow 0.25s ease, transform 0.25s ease",
  } as React.CSSProperties,

  pill: (color: string): React.CSSProperties => ({
    display: "inline-block", padding: "6px 16px", borderRadius: 999,
    background: `${color}12`, border: `1px solid ${color}25`, color,
    fontSize: 13, fontWeight: 600, fontFamily: sans,
  }),
};

// ── Floating Blob Background ───────────────────────────────────────────────
function BlobBg({ colors }: { colors?: string[] }) {
  const blobs = colors || [C.orange, C.teal, C.green];
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {blobs.map((color, i) => (
        <div key={i} style={{
          position: "absolute", width: 400 + i * 80, height: 400 + i * 80,
          borderRadius: "50%", background: color, opacity: 0.07, filter: "blur(80px)",
          top: i === 0 ? "-10%" : i === 1 ? "40%" : "20%",
          left: i === 0 ? "60%" : i === 1 ? "-8%" : "80%",
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
      border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 24px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)", flex: "1 1 140px", minWidth: 140,
    }}>
      <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color, lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontSize: 13, color: C.muted, fontWeight: 500, fontFamily: sans }}>{label}</div>
    </div>
  );
}

// ── Hero Section (shared) ──────────────────────────────────────────────────
function PageHero({ badge, badgeColor, title, titleAccent, subtitle, imgUrl, stats }: {
  badge: string; badgeColor?: string; title: string; titleAccent?: string;
  subtitle: string; imgUrl: string; stats?: { value: string; label: string; color: string }[];
}) {
  const color = badgeColor || C.orange;
  return (
    <section style={{ position: "relative", background: C.bg, overflow: "hidden", paddingTop: 64, paddingBottom: 48 }}>
      <BlobBg colors={[color, C.teal, C.green]} />
      <div className="agri-container agri-hero-grid">
        <div>
          <div style={styles.badge(color)}>{badge}</div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(36px, 4.5vw, 62px)", fontWeight: 800, lineHeight: 1.12, color: C.dark, margin: "0 0 16px" }}>
            {title}
            {titleAccent && <> <span style={{ color }}>{titleAccent}</span></>}
          </h1>
          <p style={{ fontSize: 17, color: C.gray, lineHeight: 1.75, maxWidth: 480, margin: "0 0 32px", fontFamily: sans }}>{subtitle}</p>
          {stats && (
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
          )}
        </div>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.12)", aspectRatio: "4/3", position: "relative", width: "100%" }}>
          <img src={imgUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 60%)" }} />
        </div>
      </div>
    </section>
  );
}

// ── Section Wrapper ────────────────────────────────────────────────────────
function Section({ children, bg, py }: { children: React.ReactNode; bg?: string; py?: number }) {
  return (
    <section style={{ background: bg || C.bg, padding: `${py ?? 80}px 0`, position: "relative" }}>
      <div className="agri-container">{children}</div>
    </section>
  );
}

// ── SectionHeader ──────────────────────────────────────────────────────────
function SectionHeader({ badge, title, subtitle, color, center }: {
  badge?: string; title: string; subtitle?: string; color?: string; center?: boolean;
}) {
  const c = color || C.orange;
  return (
    <div style={{ marginBottom: 48, textAlign: center ? "center" : "left" }}>
      {badge && (
        <div style={{ ...styles.badge(c), ...(center ? { display: "inline-flex", marginLeft: "auto", marginRight: "auto" } : {}) }}>
          {badge}
        </div>
      )}
      <h2 style={styles.sectionTitle}>{title}</h2>
      {subtitle && <p style={{ ...styles.sectionSubtitle, ...(center ? { margin: "0 auto" } : {}) }}>{subtitle}</p>}
    </div>
  );
}

// ── Hover Card ────────────────────────────────────────────────────────────
function HoverCard({ children, accent, style: extraStyle }: {
  children: React.ReactNode; accent?: string; style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px ${accent || C.orange}30` : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        borderTop: `3px solid ${hovered ? accent || C.orange : "transparent"}`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Overview & Vision
// ────────────────────────────────────────────────────────────────────────────
function OverviewPage() {
  const objectives = [
    { icon: "🎓", title: "Standardize AI Education", desc: "Establish world-class certification and education frameworks for AI across all industries.", color: C.orange },
    { icon: "🏭", title: "AI Industrial Solutions", desc: "Deploy practical AI solutions across business verticals — agriculture, healthcare, manufacturing.", color: C.teal },
    { icon: "🔬", title: "Build Global AI Labs", desc: "Create AI R&D hubs, incubators, and innovation labs at continental and country levels.", color: C.green },
    { icon: "📋", title: "AI Governance", desc: "Develop robust policy frameworks covering GRC, cybersecurity, data and cloud governance.", color: C.purple },
    { icon: "🌍", title: "AI Continental Federation", desc: "Build a global network of AI country federations and academic partnerships.", color: C.blue },
    { icon: "💼", title: "Consulting & Advisory", desc: "Assessment, certification, research and development labs for enterprise transformation.", color: C.cyan },
  ];
  const mission = ["Empowering AI Skills in Education", "Industry-Aligned AI Solutions", "AI Resource Library", "Digital Economy Enablement", "AI Hubs & Incubators", "Innovation Labs"];

  return (
    <div>
      <PageHero
        badge="IFAIGTEC · AI Agriculture" badgeColor={C.green}
        title="Transforming Global" titleAccent="Agriculture with AI"
        subtitle="IFAIGTEC leads the international movement to standardize AI governance, education, and deployment across the world's most critical agricultural systems."
        imgUrl={IMG.heroMain}
        stats={[
          { value: "11", label: "Specializations", color: C.orange },
          { value: "48+", label: "Countries", color: C.teal },
          { value: "340+", label: "Certifications", color: C.green },
        ]}
      />
      <div style={{ background: C.dark, padding: "28px 0" }}>
        <div className="agri-container" style={{ display: "flex", gap: "20px 40px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontFamily: serif, fontSize: 13, fontWeight: 600, color: C.orange, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>Our Mission</span>
          {mission.map((m) => (
            <span key={m} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: sans, fontWeight: 500, whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.teal, display: "inline-block", flexShrink: 0 }} />{m}
            </span>
          ))}
        </div>
      </div>
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Objectives" title="What We Aim to Achieve" subtitle="Six strategic pillars that define IFAIGTEC's mission across AI governance, education, and agricultural innovation." color={C.green} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {objectives.map((obj) => (
            <HoverCard key={obj.title} accent={obj.color}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${obj.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{obj.icon}</div>
              <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, margin: "0 0 10px", color: C.dark }}>{obj.title}</h3>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{obj.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
      <section style={{ position: "relative", minHeight: 380, padding: "40px 0", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src={IMG.droneField} alt="AI drone precision agriculture" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.40) 100%)" }} />
        <div className="agri-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <p style={{ fontFamily: serif, fontSize: "clamp(24px, 4vw, 38px)", color: "#fff", fontStyle: "italic", maxWidth: 640, lineHeight: 1.45, margin: 0 }}>
            "AI for Agriculture is not about replacing the farmer — it's about empowering every farmer with the intelligence of the world."
          </p>
          <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,0.65)", marginTop: 16, fontWeight: 500 }}>— IFAIGTEC Vision Statement</p>
        </div>
      </section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Value Proposition
// ────────────────────────────────────────────────────────────────────────────
function ValuePropositionPage() {
  const pillars = [
    { num: "01", color: C.orange, title: "Drive AI Investments", headline: "Asia's World Class AI City of Hubs", points: ["R&D and Investment Framework Creation", "AI Industrial Solutions deployment", "Build AI Technology Business Incubator", "Export Market Creation", "AI Hubs & AI Knowledge City", "AI Industrial / Academic Center of Excellence", "AI Business Growth Drivers across Education, Healthcare, Tourism, Sports, Manufacturing, Agriculture and Technology"] },
    { num: "02", color: C.teal, title: "Promote AI Innovation", headline: "Digital Economy Development", points: ["AI Digital Economy Development — Min. Digital Malaysia", "AI Technology Collaboration with MDEC, MOSTI, Ministry of Health, Ministry of Education", "AI Solutions Collaboration with Malaysian Medical Association", "AI Knowledge Collaboration with Universities across Malaysia"] },
    { num: "03", color: C.green, title: "Foster Collaboration", headline: "Strategic National Partnerships", points: ["Facilitate and solicit in Industrial Policy and Business Policy", "Governance Policy and Security Policy", "Education Policy and Healthcare Policy", "Manufacturing Policy and Export–Import Policy"] },
    { num: "04", color: C.purple, title: "Formulate Robust Policy", headline: "Policy to Process Framework", points: ["Assist in Policy Adherence and Policy Compliance", "Policy to Process Framework development", "Policy Framework in Standards and Convention", "Governance, Risk and Compliance (GRC) alignment"] },
    { num: "05", color: C.blue, title: "Ensure Governance & Security", headline: "Multi-Layer Governance Architecture", points: ["E-Governance — Knowledge & Policy Governance", "Social Governance and Process Governance", "Data Governance and Technology Governance", "Cloud, Network, Risk and Threat Intelligence Governance", "Cybersecurity Governance and GRC"] },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Value Proposition" badgeColor={C.orange} title="Five Strategic" titleAccent="Pillars of Value" subtitle="IFAIGTEC's value proposition is built on five interlocking pillars — from driving AI investments and fostering innovation to formulating governance policy and securing digital infrastructure." imgUrl={IMG.teamWork} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="IFAGS Value Proposition" title="How We Create Value" subtitle="Each pillar represents a strategic commitment to advancing AI governance, investment, collaboration, policy, and security." color={C.orange} center />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {pillars.map((p) => (
            <HoverCard key={p.num} accent={p.color}>
              <div className="agri-val-prop-grid">
                <div>
                  <div style={{ fontFamily: serif, fontSize: 52, fontWeight: 800, color: `${p.color}22`, lineHeight: 1, marginBottom: 4 }}>{p.num}</div>
                  <div style={styles.pill(p.color)}>{p.title}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: C.dark, margin: "0 0 16px" }}>{p.headline}</h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px 24px" }}>
                    {p.points.map((pt) => (
                      <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.gray, lineHeight: 1.6, fontFamily: sans }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, marginTop: 7, flexShrink: 0 }} />{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HoverCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Governance Structure
// ────────────────────────────────────────────────────────────────────────────
function GovernancePage() {
  const leadership = [
    { role: "President", color: C.orange, level: 0 },
    { role: "Deputy President", color: C.orange, level: 1 },
    { role: "Vice President [AI]", color: C.teal, level: 2 },
    { role: "Vice President [Governance]", color: C.teal, level: 2 },
    { role: "Vice President [Cyber Security]", color: C.teal, level: 2 },
    { role: "Vice President [DS/Analytics]", color: C.teal, level: 2 },
    { role: "Treasurer", color: C.blue, level: 3 },
    { role: "Secretary", color: C.blue, level: 3 },
  ];
  const councils = [
    { title: "Governance Council", color: C.purple, items: ["Committees", "Commissions", "Accreditation & Affiliation"] },
    { title: "Committees", color: C.teal, items: ["Education", "Healthcare", "Tourism", "Agriculture", "Governance", "Skill", "BFSI", "Industry"] },
    { title: "Commissions", color: C.green, items: ["Artificial Intelligence", "Data Science", "Machine Learning", "Cyber Security", "Governance", "Certification"] },
    { title: "Secretariat", color: C.blue, items: ["Secretary General", "COO", "Admin Head", "Finance Head", "Partnership Head", "Office Assistant"] },
  ];
  const members = ["Companies", "Academy", "Labs", "Faculties", "Auditors"];
  const bidProcess = [
    { step: "Proposal Initiation", icon: "📝" }, { step: "Proposal Submission", icon: "📤" },
    { step: "Order Received", icon: "📬" }, { step: "Company Selection", icon: "🏢" },
    { step: "Evaluation Criteria", icon: "🔍" }, { step: "Deposit to IFAGS", icon: "💰" },
    { step: "Order Acceptance", icon: "✅" }, { step: "PMO Establishment", icon: "🏗" },
    { step: "Progress & Review", icon: "📊" }, { step: "Pre-Deployment Certification", icon: "🏅" },
    { step: "Deployment & Delivery", icon: "🚀" },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Governance" badgeColor={C.purple} title="Governance" titleAccent="Structure" subtitle="A transparent, multi-layered governance architecture ensures IFAIGTEC operates with institutional integrity — from executive leadership to specialized commissions." imgUrl={IMG.teamWork} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Executive Leadership" title="Organizational Hierarchy" color={C.purple} center />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, width: "100%" }}>
          {[0, 1].map((level) => {
            const items = leadership.filter((l) => l.level === level);
            return (
              <div key={level} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, width: "100%" }}>
                  {items.map((item) => (
                    <div key={item.role} style={{ background: "#fff", border: `2px solid ${item.color}`, borderRadius: 12, padding: "14px 24px", fontFamily: sans, fontWeight: 700, fontSize: 14, color: item.color, textAlign: "center", flex: "1 1 180px", maxWidth: 220, boxShadow: `0 4px 20px ${item.color}20` }}>{item.role}</div>
                  ))}
                </div>
                {level < 1 && <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}><div style={{ width: 2, height: 24, background: C.border }} /></div>}
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}><div style={{ width: 2, height: 24, background: C.border }} /></div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", width: "100%" }}>
            {leadership.filter((l) => l.level === 2).map((item) => (
              <div key={item.role} style={{ background: "#fff", border: `2px solid ${item.color}`, borderRadius: 12, padding: "12px 16px", fontFamily: sans, fontWeight: 600, fontSize: 13, color: item.color, textAlign: "center", flex: "1 1 160px", maxWidth: 200, boxShadow: `0 4px 16px ${item.color}15` }}>{item.role}</div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", margin: "6px 0" }}><div style={{ width: 2, height: 24, background: C.border }} /></div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", width: "100%" }}>
            {leadership.filter((l) => l.level === 3).map((item) => (
              <div key={item.role} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 24px", fontFamily: sans, fontWeight: 600, fontSize: 13, color: item.color, textAlign: "center", flex: "1 1 160px", maxWidth: 200 }}>{item.role}</div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeader badge="Councils & Commissions" title="Organizational Bodies" color={C.purple} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {councils.map((c) => (
            <HoverCard key={c.title} accent={c.color}>
              <div style={{ ...styles.pill(c.color), marginBottom: 16 }}>{c.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {c.items.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.gray, fontFamily: sans }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, flexShrink: 0 }} />{item}
                  </li>
                ))}
              </ul>
            </HoverCard>
          ))}
        </div>
      </Section>
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Member Categories" title="Our Member Network" color={C.green} center />
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {members.map((m) => (
            <div key={m} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 32px", fontFamily: sans, fontWeight: 600, fontSize: 15, color: C.dark, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>{m}</div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader badge="Project Governance" title="Bid & Project Lifecycle" subtitle="A structured process ensuring transparency and quality from proposal initiation through deployment." color={C.orange} center />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 0", justifyContent: "center" }}>
          {bidProcess.map((step, i) => (
            <div key={step.step} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", fontFamily: sans, fontSize: 13, color: C.dark, fontWeight: 600, whiteSpace: "nowrap" }}>
                <span>{step.icon}</span><span>{step.step}</span>
              </div>
              {i < bidProcess.length - 1 && <div className="agri-hide-mobile" style={{ width: 24, height: 2, background: `linear-gradient(to right, ${C.orange}, ${C.teal})`, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: CoE Team
// ────────────────────────────────────────────────────────────────────────────
function CoETeamPage() {
  const roles = [
    { title: "Business Analyst", icon: "📊", color: C.orange, category: "Strategy", skills: ["Experience in defining roadmap and strategizing initiatives for smooth execution", "Authoring business and functional requirements through interaction with stakeholders"] },
    { title: "Subject Matter Expert", icon: "🧠", color: C.teal, category: "Expertise", skills: ["In-depth industry experience and ability to analyze trends and visualize solutions", "Transform thoughts and visions into business initiatives"] },
    { title: "Solution Architect", icon: "🏗", color: C.purple, category: "Architecture", skills: ["In-depth experience in defining solutions and architectural patterns", "Feasibility analysis and solution modeling"] },
    { title: "Delivery Team", icon: "🚀", color: C.green, category: "Execution", skills: ["Technology and process expertise with proven Independent Testing practice", "Total IT Infrastructure management"] },
  ];
  const designServices = [
    { title: "Organizational Context", desc: "External and Internal Issues Affecting the Management System and Scope Finalization", icon: "🏛", color: C.orange },
    { title: "Risk Management", desc: "Define Risk Assessment Methodology, conduct Periodic Risk Assessment and Risk Treatment Plans", icon: "🛡", color: C.teal },
    { title: "Policy Definition", desc: "Set Objectives and Objectives Management Program at organizational level", icon: "📋", color: C.purple },
    { title: "Design & Develop Policies", desc: "Create Procedures, Templates and Guidelines for institutional operations", icon: "⚙️", color: C.green },
    { title: "Measurement & Monitoring", desc: "Establish KPIs and track performance continuously to ensure compliance", icon: "📈", color: C.blue },
    { title: "Management System Training", desc: "Ensure Employees understand and follow Management System Requirements", icon: "🎓", color: C.cyan },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · CoE Team" badgeColor={C.teal} title="Centre of Excellence" titleAccent="Team Capabilities" subtitle="The IFAIGTEC CoE brings together industry leaders, academic specialists, solution architects, and delivery experts." imgUrl={IMG.teamWork} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="CoE Structure" title="Our Core Team Roles" subtitle="Four interconnected roles spanning strategy, expertise, architecture, and delivery." color={C.teal} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {roles.map((role) => (
            <HoverCard key={role.title} accent={role.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${role.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{role.icon}</div>
                <div>
                  <div style={styles.pill(role.color)}>{role.category}</div>
                  <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.dark, margin: "4px 0 0" }}>{role.title}</h3>
                </div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {role.skills.map((s) => (
                  <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: C.gray, lineHeight: 1.65, fontFamily: sans }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: role.color, marginTop: 7, flexShrink: 0 }} />{s}
                  </li>
                ))}
              </ul>
            </HoverCard>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader badge="Design & Development Services" title="Management System Services" subtitle="Comprehensive services ensuring your organization's management systems are designed, implemented, and continuously improved." color={C.orange} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {designServices.map((s) => (
            <HoverCard key={s.title} accent={s.color}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.dark, margin: "0 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{s.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Agro Sciences
// ────────────────────────────────────────────────────────────────────────────
function AgroSciencesPage() {
  const sciences = [
    { name: "Agriculture", icon: "🌾", color: C.green, desc: "Core crop cultivation, soil management, and agronomy research" },
    { name: "Horticulture", icon: "🌸", color: C.orange, desc: "Fruits, vegetables, flowers, and ornamental plant sciences" },
    { name: "Forestry", icon: "🌲", color: C.teal, desc: "Forest biology, silviculture, agroforestry, and timber science" },
    { name: "Sericulture", icon: "🐛", color: C.purple, desc: "Silk production, silkworm cultivation, and fiber technologies" },
    { name: "Animal Husbandry", icon: "🐄", color: C.blue, desc: "Livestock management, veterinary science, and dairy research" },
    { name: "Bio Technology", icon: "🧬", color: C.cyan, desc: "Genetic engineering, molecular biology, and biotech applications" },
    { name: "Bio Informatics", icon: "💻", color: C.green, desc: "Computational biology, genomics data analysis, and biodata systems" },
    { name: "Food Science", icon: "🍎", color: C.orange, desc: "Food processing, safety, quality assurance, and nutritional research" },
    { name: "Environment & Energy", icon: "☀️", color: C.teal, desc: "Sustainable energy, environmental conservation, and ecology" },
  ];
  const agriSubfields = ["Seed Science", "Soil Science", "Water Science", "Fruit Science", "Vegetable Science", "Herbal Science", "Plant Science", "Crop Science", "Weed Science"];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Agro Sciences" badgeColor={C.green} title="Agro Sciences" titleAccent="Overview" subtitle="Nine interconnected domains of agricultural science form the foundation of IFAIGTEC's research, education, and AI application programs." imgUrl={IMG.labResearch} stats={[{ value: "9", label: "Core Domains", color: C.green }, { value: "9+", label: "Agriculture Sub-fields", color: C.teal }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Core Disciplines" title="The Nine Domains of Agro Science" subtitle="Each domain represents a distinct scientific tradition, united by AI-driven innovation and IFAIGTEC certification frameworks." color={C.green} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {sciences.map((s, i) => (
            <HoverCard key={s.name} accent={s.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: s.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Domain {String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: C.dark, margin: 0 }}>{s.name}</h3>
                </div>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{s.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader badge="Agriculture Science" title="Agricultural Sub-disciplines" subtitle="Nine specialized sciences within agriculture that form the core of IFAIGTEC's academic and certification programs." color={C.orange} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {agriSubfields.map((field, i) => (
            <div key={field} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px rgba(20,184,166,0.15)`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.teal}15`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 13, fontWeight: 700, color: C.teal, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</div>
              <span style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.dark }}>{field}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Agriculture Landscape
// ────────────────────────────────────────────────────────────────────────────
function AgricultureLandscapePage() {
  const disciplines = [
    { name: "Agricultural Economics", cat: "Business" }, { name: "Agricultural Education", cat: "Education" },
    { name: "Agri Business Management", cat: "Business" }, { name: "Agronomy", cat: "Core" },
    { name: "Plant Physiology", cat: "Biology" }, { name: "Agricultural Meteorology", cat: "Science" },
    { name: "Soil Science", cat: "Science" }, { name: "Microbiology", cat: "Biology" },
    { name: "Nano Science", cat: "Technology" }, { name: "Nano Technology", cat: "Technology" },
    { name: "Environmental Science", cat: "Ecology" }, { name: "Remote Sensing and GIS", cat: "Technology" },
    { name: "Seed Science", cat: "Core" }, { name: "Seed Technology", cat: "Technology" },
    { name: "Genetics and Plant Breeding", cat: "Biology" }, { name: "Molecular Biology", cat: "Biology" },
    { name: "Bio Technology", cat: "Science" }, { name: "Plant Protection – Entomology", cat: "Protection" },
    { name: "Bio Informatics", cat: "Technology" }, { name: "Plant Pathology", cat: "Protection" },
    { name: "Nematology", cat: "Protection" }, { name: "Fruit Science", cat: "Core" },
    { name: "Vegetable Science", cat: "Core" }, { name: "Floriculture & Landscaping", cat: "Horticulture" },
    { name: "Horticulture & Landscaping", cat: "Horticulture" },
  ];
  const catColors: Record<string, string> = { Business: C.orange, Education: C.blue, Core: C.green, Biology: C.teal, Science: C.cyan, Technology: C.purple, Ecology: "#16A34A", Protection: "#DC2626", Horticulture: "#F59E0B" };
  const categories = [...new Set(disciplines.map((d) => d.cat))];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filtered = activeCategory === "All" ? disciplines : disciplines.filter((d) => d.cat === activeCategory);

  return (
    <div>
      <PageHero badge="IFAIGTEC · Agriculture" badgeColor={C.green} title="AI Agriculture" titleAccent="Landscape" subtitle="A comprehensive map of 25 agricultural disciplines where IFAIGTEC's AI frameworks, certifications, and research programs are actively deployed." imgUrl={IMG.droneField} stats={[{ value: "25", label: "Disciplines", color: C.green }, { value: "9", label: "Categories", color: C.teal }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Full Landscape" title="Agricultural Disciplines" subtitle="Filter by category to explore specific domains within the IFAIGTEC Agriculture program." color={C.green} center />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {["All", ...categories].map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === "All" ? C.green : catColors[cat] || C.green;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "7px 18px", borderRadius: 999, border: `1px solid ${isActive ? color : C.border}`, background: isActive ? color : "#fff", color: isActive ? "#fff" : C.gray, fontFamily: sans, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>{cat}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {filtered.map((d) => {
            const color = catColors[d.cat] || C.green;
            return (
              <div key={d.name} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, transition: "box-shadow 0.2s, transform 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 6px 24px ${color}20`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = C.border; }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: C.dark }}>{d.name}</div>
                  <div style={{ fontFamily: sans, fontSize: 11, color: color, fontWeight: 600, marginTop: 2, letterSpacing: "0.04em" }}>{d.cat}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Forestry Landscape
// ────────────────────────────────────────────────────────────────────────────
function ForestryLandscapePage() {
  const domains = [
    { name: "Plantation, Spices, Medicinal and Aromatic Crops", icon: "🌿", color: C.green, desc: "High-value crop systems including spices, medicinal herbs, and aromatic plant cultivation under AI-guided farm management." },
    { name: "Forest Biology", icon: "🌳", color: C.teal, desc: "Scientific study of forest ecosystem dynamics, biodiversity, and biological interactions in natural and managed forests." },
    { name: "Tree Improvement Management", icon: "🌱", color: C.orange, desc: "Genetic improvement of tree species for yield, disease resistance, and climate adaptability." },
    { name: "Silviculture", icon: "🌲", color: C.blue, desc: "Science and practice of cultivating forest trees — controlling the establishment, growth, and quality of forests." },
    { name: "Agro Forestry", icon: "🏡", color: C.purple, desc: "Integrated land-use systems that combine trees, crops, and livestock for sustainable productivity." },
    { name: "Forest Products and Utilization", icon: "🪵", color: C.cyan, desc: "Processing, value-addition, and sustainable utilization of timber, non-timber forest products, and biomass." },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Forestry" badgeColor={C.teal} title="AI Agriculture" titleAccent="Forestry Landscape" subtitle="Six core domains spanning forest biology, silviculture, agroforestry, and forest product utilization — all enhanced by IFAIGTEC's AI governance and research frameworks." imgUrl={IMG.forest} stats={[{ value: "6", label: "Core Domains", color: C.teal }, { value: "AI+", label: "Enhanced Analytics", color: C.green }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Forestry Science" title="Forestry Landscape Domains" subtitle="Each forestry domain is supported by AI-driven monitoring, remote sensing, and sustainable management protocols." color={C.teal} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {domains.map((d) => (
            <HoverCard key={d.name} accent={d.color}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${d.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{d.icon}</div>
              <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, color: C.dark, margin: "0 0 10px", lineHeight: 1.3 }}>{d.name}</h3>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{d.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
      <section style={{ position: "relative", minHeight: 320, padding: "40px 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={IMG.forestAerial} alt="Aerial forest" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.65)" }} />
        <div className="agri-container" style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: serif, fontSize: "clamp(24px, 4vw, 32px)", color: "#fff", fontStyle: "italic", margin: 0, textAlign: "center", maxWidth: 720 }}>"Forests are the lungs of our planet. AI is the intelligence that helps us protect them."</p>
        </div>
      </section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Allied Landscape
// ────────────────────────────────────────────────────────────────────────────
function AlliedLandscapePage() {
  const allied = [
    { name: "Landscaping and Ornamental Gardening", icon: "🌺", color: C.orange },
    { name: "Organic Farming", icon: "🌿", color: C.green },
    { name: "Sericulture", icon: "🐛", color: C.purple },
    { name: "Modern Irrigation Management", icon: "💧", color: C.blue },
    { name: "Waste Recycling and Vermi Composting", icon: "♻️", color: C.teal },
    { name: "Bee Keeping", icon: "🐝", color: C.orange },
    { name: "Sugarcane Production Technology", icon: "🎋", color: C.green },
    { name: "Mushroom Production", icon: "🍄", color: C.teal },
    { name: "Bakery and Confectionary Products", icon: "🍞", color: C.cyan },
    { name: "Coconut Cultivation Technology", icon: "🥥", color: C.orange },
    { name: "Medicinal Plants Nursery Techniques", icon: "🌱", color: C.green },
    { name: "Propagation of Horticultural Plants", icon: "🌸", color: C.purple },
    { name: "Vegetable Seed Production", icon: "🥦", color: C.teal },
    { name: "Cotton Cultivation Technology", icon: "☁️", color: C.blue },
    { name: "Hybrid Seed Production & Maize", icon: "🌽", color: C.orange },
    { name: "Flower Cultivation", icon: "🌻", color: C.cyan },
    { name: "Weed Management", icon: "🌾", color: C.green },
    { name: "Small Millet Cultivation and Value Addition", icon: "🌾", color: C.teal },
    { name: "Fodder Production", icon: "🐄", color: C.purple },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Allied Sciences" badgeColor={C.orange} title="AI Agriculture" titleAccent="Allied Landscape" subtitle="Nineteen allied agricultural domains that complement core farming practices — from organic cultivation and bee keeping to coconut technology and hybrid seed production." imgUrl={IMG.labResearch} stats={[{ value: "19", label: "Allied Domains", color: C.orange }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Allied Sciences" title="Allied Agricultural Disciplines" subtitle="A rich ecosystem of complementary sciences that enhance primary agricultural productivity and sustainability." color={C.orange} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {allied.map((item) => (
            <div key={item.name} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 18px", display: "flex", alignItems: "center", gap: 14, transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)", cursor: "default" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = `0 8px 28px ${item.color}20`; el.style.transform = "translateY(-3px)"; el.style.borderColor = `${item.color}35`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; el.style.borderColor = C.border; }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.dark, lineHeight: 1.4 }}>{item.name}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Seed Landscape
// ────────────────────────────────────────────────────────────────────────────
function SeedLandscapePage() {
  const seedPrograms = [
    { name: "Seed Production – Rice / Maize", icon: "🌾", color: C.green, desc: "Large-scale certified seed production programs for staple cereal crops with AI quality assurance." },
    { name: "Certified Seed Production – Vegetable Crops", icon: "🥕", color: C.orange, desc: "Standardized vegetable seed certification ensuring genetic purity, germination rates, and disease freedom." },
    { name: "High Density Planting, Fertigation and Orchard Management", icon: "🌳", color: C.teal, desc: "Precision agriculture techniques for fruit orchards including smart irrigation and nutrient management." },
    { name: "Seed Production Techniques in Cotton", icon: "☁️", color: C.blue, desc: "Specialized cotton seed production including hybrid development and isolation management." },
    { name: "Hybrid Seed Production in Maize", icon: "🌽", color: C.purple, desc: "Controlled pollination, hybrid development, and scale production of high-yield maize varieties." },
    { name: "Seed Consortium", icon: "🤝", color: C.cyan, desc: "Multi-stakeholder seed production and distribution networks linking farmers, researchers, and agribusiness." },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Seed Science" badgeColor={C.green} title="AI Agriculture" titleAccent="Seed Landscape" subtitle="Six specialized seed science programs covering rice, maize, cotton, vegetable crops, and consortium models — powered by AI-driven quality control and genetic verification systems." imgUrl={IMG.seedFarm} stats={[{ value: "6", label: "Seed Programs", color: C.green }, { value: "AI", label: "Quality Assurance", color: C.teal }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Seed Science Programs" title="Seed Production & Technology" subtitle="IFAIGTEC's seed science programs combine traditional expertise with AI-powered quality control and genomic verification." color={C.green} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {seedPrograms.map((p) => (
            <HoverCard key={p.name} accent={p.color}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.dark, margin: "0 0 10px", lineHeight: 1.35 }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{p.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader badge="Farm Technology" title="Agriculture Production Technologies" color={C.orange} center />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {["Farm Technology", "Horticultural Technologies", "Quality Control in AgriWarehousing", "Herbal Science", "Coconut Production Technology", "Organic Agriculture", "Production of Bio Fertilizers", "Bio Control Agent", "Food Science and Processing", "Quality in Medicinal Plants"].map((tech, i) => (
            <div key={tech} style={styles.pill(i % 2 === 0 ? C.orange : C.green)}>{tech}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Food Science
// ────────────────────────────────────────────────────────────────────────────
function FoodSciencePage() {
  const domains = [
    { name: "Food Processing Engineering", icon: "⚙️", color: C.orange, desc: "Engineering principles applied to food manufacturing — heat transfer, mass balance, unit operations, and process design." },
    { name: "Food Process Technology", icon: "🏭", color: C.teal, desc: "Technologies for preservation, transformation, and enhancement of food products." },
    { name: "Food Safety and Quality Assurance", icon: "✅", color: C.green, desc: "HACCP, ISO 22000, and AI-driven quality monitoring systems ensuring product safety across the food supply chain." },
    { name: "Food Plant Operations", icon: "🔧", color: C.blue, desc: "Efficient management of food production facilities including maintenance, workflow optimization, and compliance." },
    { name: "Food Packaging and Storage Technology", icon: "📦", color: C.purple, desc: "Advanced packaging materials, modified atmosphere, cold chain management, and shelf-life extension technologies." },
    { name: "Food Business Management", icon: "📊", color: C.cyan, desc: "Business strategy, supply chain management, market analysis, and entrepreneurship for the food industry." },
    { name: "Food Testing Laboratory", icon: "🔬", color: C.orange, desc: "Analytical testing methods for nutritional composition, contaminant detection, and microbial safety assessment." },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Food Science" badgeColor={C.orange} title="AI Food Science" titleAccent="Landscape" subtitle="Seven domains of food science — from processing engineering to laboratory testing — forming a complete AI-enhanced food technology program under IFAIGTEC certification." imgUrl={IMG.foodFactory} stats={[{ value: "7", label: "Food Science Domains", color: C.orange }, { value: "HACCP", label: "Safety Standards", color: C.green }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Food Science" title="Food Technology Domains" subtitle="Comprehensive coverage of the food science ecosystem — ensuring quality, safety, and innovation from farm gate to consumer." color={C.orange} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {domains.map((d) => (
            <HoverCard key={d.name} accent={d.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${d.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{d.icon}</div>
                <h3 style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, color: C.dark, margin: 0, lineHeight: 1.3 }}>{d.name}</h3>
              </div>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{d.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE: Agri Business
// ────────────────────────────────────────────────────────────────────────────
function AgriBusinessPage() {
  const programs = [
    { name: "Agri Business Incubation Forums", icon: "🚀", color: C.orange, desc: "Structured incubation programs for agri-tech startups — connecting founders with investors, mentors, and market access." },
    { name: "Agri Business Export Consortium", icon: "🌍", color: C.teal, desc: "Collective export initiatives enabling SME farmers and agri-producers to access global markets at scale." },
    { name: "Executive Development Program (IEDP)", icon: "🎓", color: C.green, desc: "Leadership development for agri-business executives — combining AI literacy with business strategy." },
    { name: "Agri Hub Consultancy Services", icon: "🏢", color: C.purple, desc: "Advisory services for governments, corporations, and cooperatives establishing AI-powered agriculture hubs." },
    { name: "Institutional Development Plan", icon: "📋", color: C.blue, desc: "Strategic planning frameworks for agricultural institutions seeking AI transformation and certification." },
    { name: "Seed Consortium", icon: "🌱", color: C.cyan, desc: "Collaborative seed networks ensuring supply chain resilience and varietal development partnerships." },
    { name: "Technology Commercialization", icon: "💡", color: C.orange, desc: "Pathways for translating agri-research innovations into commercial products and licensed technologies." },
    { name: "Venture Capital Scheme", icon: "💰", color: C.green, desc: "Investment facilitation connecting agri-tech ventures with impact investors and development finance." },
    { name: "Unnat Bharat Abhiyan (UBA)", icon: "🏘", color: C.teal, desc: "Rural transformation program linking universities with villages for technology-enabled agricultural development." },
  ];

  return (
    <div>
      <PageHero badge="IFAIGTEC · Agri Business" badgeColor={C.orange} title="AI Agri Business" titleAccent="Landscape" subtitle="Nine business development programs that transform agricultural innovation into economic value — through incubation, export consortiums, venture capital, and institutional development." imgUrl={IMG.droneField} stats={[{ value: "9", label: "Business Programs", color: C.orange }, { value: "VC", label: "Investment Access", color: C.green }, { value: "Global", label: "Export Markets", color: C.teal }]} />
      <Section bg={C.bgAlt}>
        <SectionHeader badge="Agri Business Programs" title="Business Development Landscape" subtitle="A complete ecosystem for transforming agricultural science into commercial success — from lab to market, farm to export." color={C.orange} center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {programs.map((p) => (
            <HoverCard key={p.name} accent={p.color}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{p.icon}</div>
              <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.dark, margin: "0 0 10px", lineHeight: 1.35 }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.7, margin: 0, fontFamily: sans }}>{p.desc}</p>
            </HoverCard>
          ))}
        </div>
      </Section>
      <Section>
        <div style={{ background: `linear-gradient(135deg, ${C.orange} 0%, #FF8F1F 100%)`, borderRadius: 24, padding: "clamp(32px, 6vw, 56px) clamp(24px, 5vw, 64px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", margin: "0 0 16px" }}>Ready to Transform Agriculture with AI?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", fontFamily: sans, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>Join IFAIGTEC's global network of agri-business innovators and access world-class AI certification, research, and business development programs.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ padding: "14px 32px", background: "#fff", color: C.orange, borderRadius: 10, border: "none", cursor: "pointer", fontFamily: sans, fontWeight: 700, fontSize: 15 }}>Become a Member</button>
            <button style={{ padding: "14px 32px", background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 10, border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: sans, fontWeight: 600, fontSize: 15 }}>Explore Programs</button>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// PAGE RENDERER
// ────────────────────────────────────────────────────────────────────────────
function renderPage(page: PageId) {
  switch (page) {
    case "overview": return <OverviewPage />;
    case "value-proposition": return <ValuePropositionPage />;
    case "governance": return <GovernancePage />;
    case "coe-team": return <CoETeamPage />;
    case "agro-sciences": return <AgroSciencesPage />;
    case "agriculture-landscape": return <AgricultureLandscapePage />;
    case "forestry-landscape": return <ForestryLandscapePage />;
    case "allied-landscape": return <AlliedLandscapePage />;
    case "seed-landscape": return <SeedLandscapePage />;
    case "food-science": return <FoodSciencePage />;
    case "agri-business": return <AgriBusinessPage />;
    default: return <OverviewPage />;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// BACK TO HOME BUTTON
// ────────────────────────────────────────────────────────────────────────────
function BackToHomeButton({ onExit }: { onExit?: () => void }) {
  const [hovered, setHovered] = useState(false);

  if (!onExit) return null;

  return (
    <button
      onClick={onExit}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="agri-back-btn"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: hovered ? "#fff" : "rgba(255,255,255,0.92)",
        border: `1.5px solid ${hovered ? C.orange : C.border}`,
        borderRadius: 8,
        padding: "8px 14px",
        cursor: "pointer",
        fontFamily: sans,
        fontWeight: 600,
        fontSize: 13,
        color: hovered ? C.orange : C.gray,
        transition: "all 0.2s ease",
        boxShadow: hovered ? `0 4px 16px rgba(255,122,0,0.15)` : "0 1px 4px rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.2s ease", transform: hovered ? "translateX(-2px)" : "translateX(0)" }}>
        <path d="M10 12L6 8L10 4" stroke={hovered ? C.orange : C.gray} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Back</span>
    </button>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// TOP NAV
// ────────────────────────────────────────────────────────────────────────────
function TopNav({
  activePage,
  onMenuToggle,
  sidebarOpen,
  onExit,
}: {
  activePage: PageId;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  onExit?: () => void;
}) {
  const current = NAV_ITEMS.find((n) => n.id === activePage);
  return (
    <header className="agri-topnav" style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${C.border}`, height: 60,
      display: "flex", alignItems: "center", padding: "0 24px", gap: 16,
    }}>
      <BackToHomeButton onExit={onExit} />
      
      {/* Hidden on mobile to save space */}
      <div className="agri-hide-mobile" style={{ width: 1, height: 24, background: C.border, flexShrink: 0 }} />

      {/* Logo container - NOW VISIBLE ON MOBILE */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div className="agri-logo-box" style={{
          width: 32, height: 32, borderRadius: 8,
          background: `linear-gradient(135deg, ${C.orange}, #FF8F1F)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: sans, letterSpacing: "-0.03em",
        }}>IF</div>
        <div style={{ textAlign: "left" }}>
          <div className="agri-logo-text" style={{ fontFamily: sans, fontWeight: 800, fontSize: 13, color: C.dark, letterSpacing: "-0.02em" }}>IFAIGTEC</div>
          <div className="agri-logo-sub" style={{ fontFamily: sans, fontSize: 10, color: C.muted, lineHeight: 1, fontWeight: 500 }}>AI Governance</div>
        </div>
      </div>

      <div className="agri-hide-mobile" style={{ width: 1, height: 24, background: C.border, flexShrink: 0 }} />

      {/* Breadcrumb - hidden on mobile */}
      <div className="agri-hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: sans, fontSize: 13, color: C.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        <span>Agriculture</span><span>›</span>
        <span style={{ color: C.dark, fontWeight: 600 }}>{current?.label}</span>
      </div>

      <div style={{ flex: 1 }} />

      <a href="#" className="agri-hide-mobile" style={{
        padding: "7px 18px", background: C.orange, color: "#fff", borderRadius: 8,
        fontFamily: sans, fontWeight: 600, fontSize: 13, textDecoration: "none",
        display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
      }}>
        Become a Member
      </a>

      {/* Mobile Hamburger Toggle */}
      <button
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        className="agri-mobile-toggle"
        style={{
          width: 36, height: 36, borderRadius: 8,
          border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer",
          alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0
        }}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ────────────────────────────────────────────────────────────────────────────
function Sidebar({ activePage, onNavigate }: { activePage: PageId; onNavigate: (page: PageId) => void }) {
  return (
    <nav aria-label="Agriculture section navigation" className="agri-sidebar-inner">
      <div style={{ padding: "0 20px 16px", borderBottom: `1px solid ${C.border}`, marginBottom: 8, flexShrink: 0 }}>
        <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Agriculture</div>
        <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.dark, marginTop: 2 }}>Section Navigator</div>
      </div>

      <div style={{ padding: "8px 12px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? "page" : undefined}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 10, border: "none",
                background: isActive ? `${C.orange}12` : "transparent",
                color: isActive ? C.orange : C.gray, cursor: "pointer",
                fontFamily: sans, fontWeight: isActive ? 700 : 500, fontSize: 13,
                textAlign: "left", transition: "all 0.18s ease", marginBottom: 2,
                borderLeft: isActive ? `3px solid ${C.orange}` : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.03)";
                  (e.currentTarget as HTMLButtonElement).style.color = C.dark;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = C.gray;
                }
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ lineHeight: 1.3, whiteSpace: "nowrap" }}>{item.label}</span>
              {isActive && <span style={{ marginLeft: "auto", fontSize: 10, color: C.orange, fontWeight: 700 }}>●</span>}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, marginTop: "auto", flexShrink: 0 }}>
        <div style={{ fontFamily: sans, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
          © 2026 IFAIGTEC
          <br />
          International Federation for AI Governance Technology Education Cybersecurity
        </div>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
function AgricultureFooter() {
  return (
    <footer style={{ background: C.dark, padding: "56px 0 32px" }}>
      <div className="agri-container">
        <div className="agri-footer-grid">
          <div>
            <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 12 }}>IFAIGTEC</div>
            <p style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 280 }}>
              International Federation for AI Governance Technology Education Cybersecurity — building the global framework for responsible AI.
            </p>
          </div>
          {[
            { title: "Agriculture", links: ["Overview", "Agro Sciences", "Forestry", "Seed Science"] },
            { title: "Programs", links: ["Certification", "Research Labs", "AI Hubs", "Consulting"] },
            { title: "Organization", links: ["Governance", "CoE Team", "Members", "Committees"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 IFAIGTEC. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service", "Contact"].map((l) => (
              <a key={l} href="#" style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// AGRICULTURE APP ROOT
// ────────────────────────────────────────────────────────────────────────────
export default function AgricultureApp({
  initialPage = "overview",
  onExit,
}: {
  initialPage?: PageId;
  onExit?: () => void;
}) {
  const [activePage, setActivePage] = useState<PageId>(initialPage);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true); // Desktop toggle
  const mainRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((page: PageId) => {
    setActivePage(page);
    setSidebarOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div style={{ ...styles.page, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .agri-container { max-width: 1280px; margin: 0 auto; padding: 0 40px; }
        .agri-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; position: relative; z-index: 1; }
        .agri-val-prop-grid { display: grid; grid-template-columns: 120px 1fr; gap: 32px; align-items: start; }
        .agri-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 32px; }
        
        .agri-mobile-toggle { display: none !important; }
        .mobile-overlay { display: none; }

        /* Sidebar Architecture */
        .agri-sidebar-wrapper {
          position: relative;
          width: 260px;
          flex-shrink: 0;
          border-right: 1px solid #E5E7EB;
          background: #FAFAFA;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 50;
          overflow: visible; /* FIX: Allows the arrow button to bleed outside when collapsed */
        }
        .agri-sidebar-wrapper.collapsed { width: 0px; border-right: none; }
        
        .agri-sidebar-inner {
          width: 260px;
          height: calc(100vh - 60px);
          position: sticky;
          top: 60px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          transition: opacity 0.2s;
          scrollbar-width: none;
        }
        .agri-sidebar-inner::-webkit-scrollbar { display: none; }
        .agri-sidebar-wrapper.collapsed .agri-sidebar-inner { opacity: 0; pointer-events: none; }

        /* Desktop Toggle Button */
        .desktop-toggle {
          position: absolute;
          right: -16px; /* FIX: Keeps it anchored outside the border */
          top: 24px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 60;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          color: #475569;
          transition: all 0.2s ease;
          transform: translateX(50%); /* FIX: Pushes it cleanly out of the frame */
        }
        .desktop-toggle:hover { color: #FF7A00; border-color: #FF7A00; }

        /* Mobile Breakpoints */
        @media (max-width: 900px) {
          .agri-container { padding: 0 24px; }
          .agri-hero-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; }
          .agri-hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .agri-hero-grid h1 { font-size: clamp(32px, 8vw, 44px) !important; }
          .agri-val-prop-grid { grid-template-columns: 1fr; gap: 16px; }

          .agri-mobile-toggle { display: flex !important; }
          .desktop-toggle { display: none !important; }
          
          /* Mobile Sidebar Override */
          .agri-sidebar-wrapper {
            position: fixed;
            top: 60px;
            left: -300px;
            height: calc(100vh - 60px);
            width: 260px !important;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 4px 0 24px rgba(0,0,0,0.1);
          }
          .agri-sidebar-wrapper.mobile-open { left: 0; }
          .agri-sidebar-wrapper.collapsed .agri-sidebar-inner { opacity: 1; pointer-events: auto; }
          
          .mobile-overlay { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; top: 60px; }
          .agri-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .agri-footer-grid > div:first-child { grid-column: 1 / -1; }
        }

        /* Small Mobile Header Fixes (Shrinking UI to fit) */
        @media (max-width: 600px) {
          .agri-container { padding: 0 16px; }
          .agri-hide-mobile { display: none !important; }
          .agri-topnav { padding: 0 12px !important; gap: 10px !important; }
          
          /* Shinks Back Button */
          .agri-back-btn { padding: 6px 10px !important; font-size: 12px !important; gap: 4px !important; }
          .agri-back-btn svg { width: 14px; height: 14px; }
          
          /* Shrinks Logo slightly to fit next to button */
          .agri-logo-box { width: 26px !important; height: 26px !important; font-size: 11px !important; }
          .agri-logo-text { font-size: 12px !important; }
          .agri-logo-sub { font-size: 9px !important; }
          
          .agri-footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <TopNav
        activePage={activePage}
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
        onExit={onExit}
      />

      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        
        {/* Mobile Background Overlay */}
        {sidebarOpen && (
          <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        <div className={`agri-sidebar-wrapper ${!desktopSidebarOpen ? "collapsed" : ""} ${sidebarOpen ? "mobile-open" : ""}`}>
          <button className="desktop-toggle" onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)} title="Toggle Sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: desktopSidebarOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          <Sidebar activePage={activePage} onNavigate={navigate} />
        </div>

        <main
          ref={mainRef}
          className="agri-main-content"
          style={{ flex: 1, minWidth: 0, animation: "fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          key={activePage}
        >
          {renderPage(activePage)}
          <AgricultureFooter />
        </main>
      </div>
    </div>
  );
}