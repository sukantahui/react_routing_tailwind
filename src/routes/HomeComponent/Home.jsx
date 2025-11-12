// ===============================================
// Home.jsx
// -----------------------------------------------
// Purpose:
//   Homepage for Coder & AccoTax showcasing header,
//   about, courses, teachers, services, contact, and footer.
//
// Features:
// - Centralized SEO metadata for homepage
// - Advanced JSON-LD schemas (Organization, WebSite, Breadcrumb, Courses)
// - Full Open Graph & Twitter metadata
// - Consistent with conditional-Helmet setup on other pages
// ===============================================

import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Services from "./Services";
import Teachers from "./Teachers";
import Courses from "./Courses";

export default function Home() {
  const location = useLocation();
  const error = location.state?.error;

  const schemaObjects = [
    // ✅ Organization / EducationalOrganization
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Coder & AccoTax",
      url: "https://codernaccotax.co.in/",
      logo: "https://codernaccotax.co.in/cnat.ico",
      foundingDate: "1998",
      description:
        "Coder & AccoTax is an ISO 9001:2015 certified training institute offering hands-on professional courses in web development, Python, accounting, taxation, and data analysis.",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61561702110617",
        "https://www.instagram.com/codernaccotax/",
        "https://www.youtube.com/@CodernAccotax",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9432456083",
          contactType: "Admissions",
          areaServed: "IN",
          availableLanguage: ["English", "Bengali"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Ground Floor, 25(10/A) Shibtala Road, P.O - Nona Chandan Pukur, Barrackpore",
        addressLocality: "Kolkata",
        postalCode: "700122",
        addressCountry: "IN",
      },
      founder: {
        "@type": "Person",
        name: "Sukanta Hui",
      },
    },

    // ✅ Website Schema (for Sitelink Search Box)
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Coder & AccoTax",
      url: "https://codernaccotax.co.in/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://codernaccotax.co.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },

    // ✅ Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://codernaccotax.co.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Courses",
          item: "https://codernaccotax.co.in/courses",
        },
      ],
    },

    // ✅ Course Listings (simplified sample)
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Courses Offered by Coder & AccoTax",
      itemListElement: [
        {
          "@type": "Course",
          position: 1,
          name: "Full Stack Web Development",
          description:
            "Learn HTML, CSS, JavaScript, React, and Node.js with hands-on projects.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 2,
          name: "Accounting & Taxation",
          description:
            "Master accounting with Tally, GST, and income tax filing.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
      ],
    },

    // ✅ WebPage (primary topic)
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Coder & AccoTax | Learn Coding, Accounts & Data Analysis",
      primaryImageOfPage: "https://codernaccotax.co.in/og-home.png",
      datePublished: "2025-01-01",
      dateModified: "2025-11-12",
      about: {
        "@type": "EducationalOrganization",
        name: "Coder & AccoTax",
        url: "https://codernaccotax.co.in/",
      },
    },
  ];

  return (
    <>
      {/* =============================
          ✅ SEO METADATA
      ============================== */}
      <Helmet>
        <title>
          Coder & AccoTax | Learn Coding, Accounts & Data Analysis Online
        </title>
        <meta
          name="description"
          content="Join Coder & AccoTax to master Web Development, Python, Accounting, and Data Analysis. Learn from certified instructors, earn ISO-recognized certifications, and become job-ready with live projects."
        />
        <meta
          name="keywords"
          content="coding courses, accounting training, web development, python programming, data analysis, full stack developer, taxation classes, online learning India, coder accotax"
        />
        <meta name="author" content="Coder & AccoTax" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta httpEquiv="Content-Language" content="en" />

        {/* Canonical & hreflang */}
        <link rel="canonical" href="https://codernaccotax.co.in/" />
        <link
          rel="alternate"
          href="https://codernaccotax.co.in/"
          hreflang="en-in"
        />
        <link
          rel="alternate"
          href="https://codernaccotax.co.in/"
          hreflang="x-default"
        />
        <link rel="icon" href="/cnat.ico" />
        <meta name="theme-color" content="#0ea5e9" />

        {/* =============================
            ✅ OPEN GRAPH
        ============================== */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Coder & AccoTax" />
        <meta
          property="og:title"
          content="Coder & AccoTax | Learn Coding, Accounts & Data Analysis Online"
        />
        <meta
          property="og:description"
          content="Build your career in Coding and Compliance with Coder & AccoTax. Learn Web Development, Accounting, and Data Analytics from expert trainers."
        />
        <meta property="og:url" content="https://codernaccotax.co.in/" />
        <meta
          property="og:image"
          content="https://codernaccotax.co.in/og-home.png"
        />
        <meta
          property="og:image:alt"
          content="Students learning coding and accounting at Coder & AccoTax"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_IN" />
        <meta
          property="og:see_also"
          content="https://www.youtube.com/@CodernAccotax"
        />

        {/* =============================
            ✅ TWITTER CARD
        ============================== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codernaccotax" />
        <meta name="twitter:creator" content="@codernaccotax" />
        <meta
          name="twitter:title"
          content="Coder & AccoTax | Learn Coding, Accounts & Data Analysis Online"
        />
        <meta
          name="twitter:description"
          content="Learn Web Development, Python, Accounting & Data Analytics online with live projects, mentorship, and ISO-certified certification."
        />
        <meta
          name="twitter:image"
          content="https://codernaccotax.co.in/og-home.png"
        />
        <meta
          name="twitter:image:alt"
          content="Coder & AccoTax homepage banner showing students and coding visuals"
        />

        {/* =============================
            ✅ STRUCTURED DATA
        ============================== */}
        <script type="application/ld+json">
          {JSON.stringify(schemaObjects)}
        </script>
      </Helmet>

      {/* =============================
          PAGE CONTENT
      ============================== */}
      <Header />
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
