// ============================================================================
// HomeSeo.jsx - Advanced SEO, Local Business & Rich Structured Data (JSON-LD)
// ============================================================================

import React from "react";
import { Helmet } from "react-helmet-async";

export default function HomeSEO() {
  const schemaObjects = [
    // 1. EducationalOrganization + LocalBusiness Schema (with Review Golden Stars & Geo Location)
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "LocalBusiness"],
      name: "Coder & AccoTax",
      alternateName: ["CNAT", "Coder and AccoTax Barrackpore"],
      url: "https://codernaccotax.co.in/",
      logo: "https://codernaccotax.co.in/cnat.ico",
      image: "https://codernaccotax.co.in/og-home.png",
      foundingDate: "1998",
      priceRange: "₹₹",
      telephone: "+91-9432456083",
      email: "sukantahui@codernaccotax.co.in",
      description:
        "Coder & AccoTax is an ISO 9001:2015 certified training institute in Barrackpore offering hands-on courses in Full Stack Web Development, Python, Data Structures (DSA), TallyPrime, GST Compliance, and ICSE/ISC Computer Science.",
      sameAs: [
        "https://www.facebook.com/profile.php?id=61561702110617",
        "https://www.instagram.com/codernaccotax/",
        "https://www.youtube.com/@CodernAccotax",
        "https://github.com/codernaccotax",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ground Floor, 25(10/A) Shibtala Road, P.O - Nona Chandan Pukur",
        addressLocality: "Barrackpore, Kolkata",
        addressRegion: "West Bengal",
        postalCode: "700122",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "22.7667",
        longitude: "88.3667",
      },
      hasMap: "https://maps.google.com/?q=Coder+AccoTax+Barrackpore",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "21:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "171",
        bestRating: "5",
        worstRating: "1",
      },
      founder: [
        {
          "@type": "Person",
          name: "Sukanta Hui",
          jobTitle: "Head of Software Training & Mentorship",
        },
        {
          "@type": "Person",
          name: "Tanusree Hui",
          jobTitle: "Co-Founder & DSA Mentor",
        },
      ],
    },

    // 2. WebSite Schema (with SearchAction)
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

    // 3. Breadcrumb Schema
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
          name: "About Us",
          item: "https://codernaccotax.co.in/#about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Courses",
          item: "https://codernaccotax.co.in/#courses",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Google Reviews",
          item: "https://codernaccotax.co.in/#why-choose-us",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Contact & Campus",
          item: "https://codernaccotax.co.in/#contact",
        },
      ],
    },

    // 4. Featured Course Catalog ItemList
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Professional & Academic Courses at Coder & AccoTax",
      itemListElement: [
        {
          "@type": "Course",
          position: 1,
          name: "Full Stack Web Development",
          description: "Master React, Angular, Node.js, Express, Laravel, MySQL, Prisma ORM, and deployment with live capstone projects.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 2,
          name: "Python Programming (Core to Advance)",
          description: "Learn Python syntax, OOP, Pandas, NumPy, Django Web Framework, and applied Machine Learning foundations.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 3,
          name: "TallyPrime & Practical GST Filing",
          description: "Master corporate bookkeeping, inventory, monthly GSTR-1 & GSTR-3B return filing, ITC reconciliation, and TDS on GST.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 4,
          name: "Data Structures & Algorithms (DSA)",
          description: "Comprehensive problem solving in C/C++/Java covering linked lists, trees, graphs, dynamic programming, and interview prep.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 5,
          name: "Data Analytics with Excel & Power BI",
          description: "Master Advanced Excel formulas, Power Query ETL, DAX measures, and interactive executive dashboards.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
        {
          "@type": "Course",
          position: 6,
          name: "ICSE & ISC Computer Science (Class IX–XII)",
          description: "Board syllabus guidance, OOP Java concepts, trace tables, SQL queries, and practical project files with 95%+ success rate.",
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
          },
        },
      ],
    },

    // 5. FAQPage Schema for Expandable Rich Search Accordions
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the best coding and IT training institute in Barrackpore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Coder & AccoTax (ISO 9001:2015 certified) is widely regarded as the leading IT and computer training institute in Barrackpore, with over 28 years of teaching legacy, 4.9/5.0 Google rating, and 1-on-1 mentorship by industry experts Sukanta Hui and Tanusree Hui.",
          },
        },
        {
          "@type": "Question",
          name: "Are courses available in both Online and Offline modes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Coder & AccoTax offers flexible learning modes including offline classroom lab sessions at the Barrackpore campus and interactive online batches with live doubt clearing.",
          },
        },
        {
          "@type": "Question",
          name: "Are certificates issued by Coder & AccoTax recognized?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all course completion certificates are issued under our ISO 9001:2015 Certified Quality Management System upon successful completion of curriculum projects and lab evaluations.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer practical GST filing and Tally training?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our Accounts & Taxation track covers practical accounting on TallyPrime, live GSTR-1 and GSTR-3B return filing simulation, Input Tax Credit (ITC) reconciliation, and corporate payroll.",
          },
        },
      ],
    },
  ];

  return (
    <Helmet>
      {/* Primary Titles & Description */}
      <title>Best Coding & IT Training Institute in Barrackpore | Coder & AccoTax (ISO 9001:2015)</title>
      <meta
        name="description"
        content="Join Coder & AccoTax, Barrackpore's top-rated ISO 9001:2015 certified training institute. Master Full Stack Web Dev, Python, Data Structures, TallyPrime GST, and ICSE/ISC Computer Science with 1-on-1 mentorship."
      />
      <meta
        name="keywords"
        content="coding institute barrackpore, best computer training centre barrackpore, python classes barrackpore, web development courses kolkata, tally prime gst training, icse java tuition barrackpore, data structures algorithms, coder accotax"
      />
      <meta name="author" content="Coder & AccoTax" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Canonical & Regional Alternates */}
      <link rel="canonical" href="https://codernaccotax.co.in/" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hrefLang="en-in" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hrefLang="x-default" />
      <meta name="theme-color" content="#030712" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Coder & AccoTax" />
      <meta property="og:title" content="Coder & AccoTax | Premier Coding & Accounting Training Institute" />
      <meta
        property="og:description"
        content="Over 28 years of excellence in practical coding, web engineering, accounting compliance, and academic computer science in Barrackpore."
      />
      <meta property="og:url" content="https://codernaccotax.co.in/" />
      <meta property="og:image" content="https://codernaccotax.co.in/og-home.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codernaccotax" />
      <meta name="twitter:title" content="Coder & AccoTax | Premier Coding & IT Training in Barrackpore" />
      <meta
        name="twitter:description"
        content="Learn Full Stack Web Development, Python, Tally GST, and DSA with hands-on projects and ISO 9001:2015 certification."
      />
      <meta name="twitter:image" content="https://codernaccotax.co.in/og-home.png" />

      {/* JSON-LD Schema Graphs */}
      <script type="application/ld+json">{JSON.stringify(schemaObjects)}</script>
    </Helmet>
  );
}
