// ===============================================
// Home.jsx - Clean & Lightweight Landing Page
// -----------------------------------------------
// Purpose:
//   Fast, uncluttered homepage showcasing Header,
//   Courses, Advantages, About, Teachers, Contact, and Footer.
// ===============================================

import React from "react";
import { useLocation } from "react-router-dom";
import HomeSeo from "../../seo/HomeSeo";
import Header from "./Header";
import Courses from "./Courses";
import WhyChooseUs from "./WhyChooseUs";
import About from "./About";
import Teachers from "./Teachers";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  const location = useLocation();
  const error = location.state?.error;

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen">
      <HomeSeo />
      <Header />
      <Courses />
      <WhyChooseUs />
      <About />
      <Teachers />
      <Contact />
      <Footer />

      {error && (
        <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl bg-rose-950/90 border border-rose-700 text-rose-200 text-sm shadow-xl">
          {error}
        </div>
      )}
    </div>
  );
}
