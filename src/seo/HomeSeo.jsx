// ===============================================
// HomeSEO.jsx
// -----------------------------------------------
// Purpose:
//   Centralized SEO metadata + structured data
//   for the Home ("/") route of Coder & AccoTax.
//
// Features:
// - Fully optimized <Helmet> block for SEO
// - Open Graph + Twitter Card
// - Canonical tags + hreflang
// - JSON-LD schemas (Organization, WebSite,
//   BreadcrumbList, ItemList, WebPage)
// - Clean, professional, future-proof
// ===============================================

import { Helmet } from "react-helmet";

export default function HomeSEO() {
  const schemaObjects = [
    // =====================================================
    // 1. Organization / EducationalOrganization Schema
    // =====================================================
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

    // =====================================================
    // 2. WebSite Schema (Search Box)
    // =====================================================
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

    // =====================================================
    // 3. Breadcrumb Schema
    // =====================================================
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

    // =====================================================
    // 4. Featured Courses List
    // =====================================================
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

    // =====================================================
    // 5. WebPage Schema (Primary Page)
    // =====================================================
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
    <Helmet>
      {/* =====================================================
          1. BASIC SEO
      ====================================================== */}
      <title>Best Coding Institute in Barrackpore | Coder & AccoTax</title>

      <meta
        name="description"
        content="Join Coder & AccoTax,the best coding institute in Barrackpore, to master Web Development, Python, Accounting, GST and Data Analysis. Learn from certified instructors, earn ISO-recognized certifications, and become job-ready with hands-on projects."
      />
      {/* IMPORTANT SEO CRAWLER DIRECTIVES */}
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="robots" content="index, follow" />

      <meta
        name="keywords"
        content="coding institute barrackpore, coding courses, accounting training, web development, python programming, data analysis, full stack developer, taxation classes, online learning India, coder accotax"
      />

      <meta name="author" content="Coder & AccoTax" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="theme-color" content="#0ea5e9" />

      {/* =====================================================
          2. CANONICAL + HREFLANG
      ====================================================== */}
      <link rel="canonical" href="https://codernaccotax.co.in/" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hreflang="en-in" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hreflang="x-default" />
      <link rel="icon" href="/cnat.ico" />

      {/* =====================================================
          3. OPEN GRAPH (Facebook, LinkedIn)
      ====================================================== */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Coder & AccoTax" />

      <meta
        property="og:title"
        content="Coder & AccoTax | Learn Coding, Accounts & Data Analysis Offline & Online"
      />

      <meta
        property="og:description"
        content="Build your career in Coding and Compliance with Coder & AccoTax. Learn Web Development, Accounting, and Data Analytics from expert trainers."
      />

      <meta property="og:url" content="https://codernaccotax.co.in/" />
      <meta property="og:image" content="https://codernaccotax.co.in/og-home.png" />
      <meta
        property="og:image:alt"
        content="Students learning coding and accounting at Coder & AccoTax"
      />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* =====================================================
          4. TWITTER CARD
      ====================================================== */}
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

      <meta name="twitter:image" content="https://codernaccotax.co.in/og-home.png" />
      <meta
        name="twitter:image:alt"
        content="Coder & AccoTax homepage banner showing students and coding visuals"
      />

      {/* =====================================================
          5. JSON-LD STRUCTURED DATA
      ====================================================== */}
      <script type="application/ld+json">{JSON.stringify(schemaObjects)}</script>
    </Helmet>
  );
}
