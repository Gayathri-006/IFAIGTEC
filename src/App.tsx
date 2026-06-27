import { useState, useEffect } from "react";
import { GlobalStyles } from "./components/common/GlobalStyles";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import AgricultureApp from "./pages/agriculture/AgricultureApp";

type MainPage = "home" | "login" | "register" | "agriculture";

export default function App() {
  const [page, setPageState] = useState<MainPage>("home");

  // ── Navigate: update state + push a browser history entry ──
  const setPage = (newPage: MainPage) => {
    setPageState(newPage);
    window.history.pushState({ page: newPage }, "", `#${newPage}`);
  };

  // ── On first load: stamp the current entry so back works from page 1 ──
  useEffect(() => {
    window.history.replaceState({ page: "home" }, "", "#home");
  }, []);

  // ── Browser back / forward arrow ──
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      const p = (e.state?.page as MainPage) ?? "home";
      setPageState(p); // setPageState, NOT setPage — avoids double-push
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // ── Scroll to top on every page change ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleOpenAgriculture = (_agriPage: string) => {
    setPage("agriculture");
  };

  // ── Full takeover: agri app owns its own header/sidebar/footer ──
  if (page === "agriculture") {
    return (
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "white" }}>
        <GlobalStyles />
        <AgricultureApp onExit={() => setPage("home")} />
      </div>
    );
  }

  const isAuthPage = page === "login" || page === "register";

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage setPage={setPage} />;
      case "login":    return <LoginPage setPage={setPage} />;
      case "register": return <RegisterPage setPage={setPage} />;
      default:         return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "white" }}>
      <GlobalStyles />
      {!isAuthPage && <Navbar page={page} setPage={setPage} onOpenAgriculture={handleOpenAgriculture} />}
      {renderPage()}
      {!isAuthPage && <Footer setPage={setPage} />}
    </div>
  );
}