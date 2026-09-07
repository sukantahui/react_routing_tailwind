// ============================================================================
// HomeSeo.jsx - Advanced SEO, Local Business & Rich Structured Data (JSON-LD)
// Updated: Full GST, TDS, Income Tax, Tally + Local area coverage
// Target areas: Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore, 700122
// ============================================================================

import React from "react";
import { Helmet } from "react-helmet-async";

export default function HomeSEO() {
  const schemaObjects = [
    // 1. EducationalOrganization + LocalBusiness Schema (with areaServed, Review Stars & Geo)
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "LocalBusiness"],
      name: "Coder & AccoTax",
      alternateName: [
        "CNAT",
        "Coder and AccoTax Barrackpore",
        "GST TDS Training Barrackpore",
        "Tally Institute near Sodepore",
        "Accounting Classes Barasat",
      ],
      url: "https://codernaccotax.co.in/",
      logo: "https://codernaccotax.co.in/cnat.ico",
      image: "https://codernaccotax.co.in/og-home.png",
      foundingDate: "1998",
      priceRange: "₹₹",
      telephone: "+91-9432456083",
      email: "sukantahui@codernaccotax.co.in",
      description:
        "Coder & AccoTax is an ISO 9001:2015 certified training institute near Barrackpore, Sodepore, Ichapore, Barasat and Sreerampore (Pin 700122). We offer expert hands-on courses in GST Filing, TDS Returns, Income Tax, TallyPrime, Accounting, Full Stack Web Development, Python, and ICSE/ISC Computer Science.",
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
      areaServed: [
        { "@type": "City", name: "Barrackpore" },
        { "@type": "City", name: "Sodepore" },
        { "@type": "City", name: "Ichapore" },
        { "@type": "City", name: "Barasat" },
        { "@type": "City", name: "Sreerampore" },
        { "@type": "City", name: "Nonachandanpukur" },
        { "@type": "City", name: "Titagarh" },
        { "@type": "City", name: "Shyamnagar" },
        { "@type": "City", name: "Naihati" },
        { "@type": "City", name: "Palta" },
        { "@type": "City", name: "Agarpara" },
        { "@type": "PostalAddress", postalCode: "700122", addressCountry: "IN" },
      ],
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

    // 2. Service Schema for Accounting & Tax (GST, TDS, Income Tax, Tally)
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "GST, TDS, Income Tax & Tally Accounting Training",
      serviceType: "Accounting & Tax Training",
      provider: {
        "@type": "EducationalOrganization",
        name: "Coder & AccoTax",
        url: "https://codernaccotax.co.in/",
      },
      description:
        "Practical GST return filing (GSTR-1, GSTR-3B), TDS deduction & challan, Income Tax return preparation (ITR-1, ITR-4), and TallyPrime bookkeeping with real company ledgers.",
      areaServed: [
        { "@type": "City", name: "Barrackpore" },
        { "@type": "City", name: "Sodepore" },
        { "@type": "City", name: "Ichapore" },
        { "@type": "City", name: "Barasat" },
        { "@type": "City", name: "Sreerampore" },
        { "@type": "City", name: "Nonachandanpukur" },
        { "@type": "PostalAddress", postalCode: "700122", addressCountry: "IN" },
      ],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    },

    // 3. Service Schema for Programming & Coding
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Programming & Coding Training — Python, Java, C, Web Development",
      serviceType: "IT & Computer Training",
      provider: {
        "@type": "EducationalOrganization",
        name: "Coder & AccoTax",
        url: "https://codernaccotax.co.in/",
      },
      description:
        "Expert programming classes in Python, Java, C, React, Full Stack Web Development, and Data Structures & Algorithms for students and professionals near Barrackpore, Sodepore, Barasat, and Sreerampore.",
      areaServed: [
        { "@type": "City", name: "Barrackpore" },
        { "@type": "City", name: "Sodepore" },
        { "@type": "City", name: "Ichapore" },
        { "@type": "City", name: "Barasat" },
        { "@type": "City", name: "Sreerampore" },
        { "@type": "PostalAddress", postalCode: "700122", addressCountry: "IN" },
      ],
    },

    // 4. WebSite Schema (with SearchAction)
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

    // 5. Breadcrumb Schema
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
          name: "Courses — GST, TDS, Tally, Coding",
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

    // 6. Featured Course Catalog ItemList
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Professional & Academic Courses at Coder & AccoTax — near Barrackpore, Sodepore, Barasat",
      itemListElement: [
        {
          "@type": "Course",
          position: 1,
          name: "GST Filing & Compliance Training",
          description:
            "Practical GSTR-1 and GSTR-3B return filing, Input Tax Credit (ITC) reconciliation, e-way bill, GST audit, and GST on TDS. Available near Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 2,
          name: "TDS & Income Tax Return Filing",
          description:
            "Learn TDS deduction under various sections (194C, 194J, etc.), TDS challan payment, Form 16, 26AS, ITR-1 and ITR-4 filing. Expert coaching near Barasat, Sreerampore, Ichapore, 700122.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 3,
          name: "TallyPrime & Practical Accounting",
          description:
            "Corporate bookkeeping in TallyPrime, inventory management, payroll, balance sheet, profit & loss, and integration with GST/TDS. Best Tally institute near Barrackpore and Sodepore.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 4,
          name: "Full Stack Web Development",
          description:
            "Master React, Angular, Node.js, Express, Laravel, MySQL, Prisma ORM, and deployment with live capstone projects.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 5,
          name: "Python Programming (Core to Advance)",
          description:
            "Learn Python syntax, OOP, Pandas, NumPy, Django Web Framework, and applied Machine Learning foundations.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 6,
          name: "Data Structures & Algorithms (DSA)",
          description:
            "Comprehensive problem solving in C/C++/Java covering linked lists, trees, graphs, dynamic programming, and interview prep.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 7,
          name: "Data Analytics with Excel & Power BI",
          description:
            "Master Advanced Excel formulas, Power Query ETL, DAX measures, and interactive executive dashboards.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
        {
          "@type": "Course",
          position: 8,
          name: "ICSE & ISC Computer Science (Class IX–XII)",
          description:
            "Board syllabus guidance, OOP Java concepts, trace tables, SQL queries, and practical project files with 95%+ success rate.",
          provider: { "@type": "EducationalOrganization", name: "Coder & AccoTax" },
        },
      ],
    },

    // 7. FAQPage Schema — expanded with locality + GST/TDS/Income Tax Q&As
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the best GST and TDS training institute near Barrackpore and Sodepore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Coder & AccoTax (ISO 9001:2015 certified, Pin 700122) is the top-rated institute near Barrackpore and Sodepore for practical GST filing (GSTR-1, GSTR-3B), TDS deduction, challan payment, and Income Tax return filing. We have 28+ years of legacy and a 4.9/5 Google rating.",
          },
        },
        {
          "@type": "Question",
          name: "Is Income Tax return filing course available near Sreerampore, Barasat, and Ichapore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Coder & AccoTax, located in Barrackpore (Pin 700122), serves students from Sreerampore, Barasat, Ichapore, Sodepore, Nonachandanpukur, and surrounding areas. Our Income Tax course covers ITR-1, ITR-4, Form 16, 26AS, advance tax, and TDS certificates with hands-on practice.",
          },
        },
        {
          "@type": "Question",
          name: "Which is the best Tally and Accounting institute near Ichapore and Barasat (pin 700122)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Coder & AccoTax is the leading TallyPrime and practical accounting training institute near Ichapore, Barasat, and Barrackpore (pin 700122). Our course includes GST in Tally, TDS entries, inventory, payroll, final accounts, and GSTR filing directly from Tally software.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I learn programming and coding near Barrackpore, Sodepore, or Barasat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Coder & AccoTax at Barrackpore (pin 700122) offers programming courses in Python, Java, C, React.js, and Full Stack Web Development. Students from Sodepore, Barasat, Ichapore, Sreerampore, Titagarh, and Naihati regularly attend our hands-on coding batches.",
          },
        },
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
            text: "Yes, Coder & AccoTax offers flexible learning modes including offline classroom lab sessions at the Barrackpore campus and interactive online batches with live doubt clearing for students from Barasat, Sreerampore, Sodepore, Ichapore and beyond.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer practical GST filing and Tally training?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our Accounts & Taxation track covers practical accounting on TallyPrime, live GSTR-1 and GSTR-3B return filing simulation, Input Tax Credit (ITC) reconciliation, TDS entries in Tally, Income Tax basics, and corporate payroll.",
          },
        },
      ],
    },
  ];

  return (
    <Helmet>
      {/* Primary Titles & Description */}
      <title>Best GST, TDS, Tally, Income Tax & Coding Institute near Barrackpore, Sodepore, Barasat | Coder & AccoTax</title>
      <meta
        name="description"
        content="Coder & AccoTax — ISO 9001:2015 certified institute near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore (Pin 700122). Expert courses in GST Filing, TDS Returns, Income Tax, Tally Prime, Accounting, Full Stack Web Dev, Python & Coding. 28+ years. Call +91-9432456083."
      />
      <meta
        name="keywords"
        content="GST training institute near Barrackpore, TDS return filing course Sodepore, Income Tax course near Barasat, Tally Prime accounting classes Ichapore, accounting institute Sreerampore, coding institute 700122, GST TDS accounting Barrackpore, income tax training Nonachandanpukur, python programming near Barrackpore, web development courses Kolkata, best coding institute near me, tally gst institute near Barasat, TDS challan filing near Sodepore, income tax return near Sreerampore, coder accotax"
      />
      <meta name="author" content="Coder & AccoTax" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="geo.region" content="IN-WB" />
      <meta name="geo.placename" content="Barrackpore, West Bengal" />
      <meta name="geo.position" content="22.7667;88.3667" />
      <meta name="ICBM" content="22.7667, 88.3667" />

      {/* Canonical & Regional Alternates */}
      <link rel="canonical" href="https://codernaccotax.co.in/" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hrefLang="en-in" />
      <link rel="alternate" href="https://codernaccotax.co.in/" hrefLang="x-default" />
      <meta name="theme-color" content="#030712" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Coder & AccoTax" />
      <meta property="og:title" content="Coder & AccoTax | GST, TDS, Income Tax, Tally & Coding Training near Barrackpore" />
      <meta
        property="og:description"
        content="Learn GST Filing, TDS Returns, Income Tax, Tally Prime, Accounting, Python & Full Stack Web Dev near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore (Pin 700122). ISO 9001:2015 certified. 28+ years legacy."
      />
      <meta property="og:url" content="https://codernaccotax.co.in/" />
      <meta property="og:image" content="https://codernaccotax.co.in/og-home.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@codernaccotax" />
      <meta name="twitter:title" content="Coder & AccoTax | GST, TDS, Tally, Income Tax & Coding near Barrackpore" />
      <meta
        name="twitter:description"
        content="Expert GST filing, TDS returns, Income Tax, Tally Prime & coding courses near Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore — Pin 700122."
      />
      <meta name="twitter:image" content="https://codernaccotax.co.in/og-home.png" />

      {/* JSON-LD Schema Graphs */}
      <script type="application/ld+json">{JSON.stringify(schemaObjects)}</script>
    </Helmet>
  );
}
