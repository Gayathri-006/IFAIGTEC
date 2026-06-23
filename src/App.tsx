import React, { useState, useEffect } from "react";
import { GlobalStyles } from "./components/common/GlobalStyles";
import { Navbar } from "./components/layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Footer } from "./components/layout/Footer";

export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        try {
          window.scrollTo(0, 0);
        } catch (err) {}
      }
    }
  }, [page]);

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "white" }}>
      <GlobalStyles />
      {page !== "login" && page !== "register" && (
        <Navbar page={page} setPage={setPage} />
      )}
      {page === "home"     && <HomePage setPage={setPage} />}
      {page === "login"    && <LoginPage setPage={setPage} />}
      {page === "register" && <RegisterPage setPage={setPage} />}
      {page !== "login" && page !== "register" && (
        <Footer setPage={setPage} />
      )}
    </div>
  );
}
