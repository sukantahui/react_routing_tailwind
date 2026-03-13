// ===============================================
// Home.jsx
// -----------------------------------------------
// Purpose:
//   Homepage for Coder & AccoTax showcasing header,
//   about, courses, teachers, services, contact, and footer.
//
// Features:
// - Centralized SEO metadata for homepage
// ===============================================

import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import Teachers from "./Teachers";
import Courses from "./Courses";
import HomeSeo from "../../seo/HomeSeo"
import LocalSEO from "./LocalSEO";
import Facilities from "./Facilities"
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  const location = useLocation();
  const error = location.state?.error;

  

  return (
    <>
      {/* =============================
          PAGE CONTENT
      ============================== */}
      <HomeSeo />
      <Header />
      <LocalSEO />
      <Facilities />
      <WhyChooseUs />
      <About />
      <Courses />
      <Teachers />
      <Services />
      <Contact />
      <Footer />

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
