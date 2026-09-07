// ============================================================================
// GSTFilingPage.jsx — Dedicated SEO landing page for GST Filing course
// Target: "GST course near Barrackpore", "GST filing training Sodepore/Barasat"
// ============================================================================
import React from "react";
import CoursePage from "./CoursePage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "GST Filing & Compliance Training — Barrackpore",
    description:
      "Practical GST return filing course near Barrackpore, Sodepore, Ichapore, Barasat and Sreerampore. Learn GSTR-1, GSTR-3B, ITC reconciliation, e-way bill and GST audit in TallyPrime with real company data.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Coder & AccoTax",
      url: "https://codernaccotax.co.in/",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25(10/A) Shibtala Road, Nona Chandan Pukur",
        addressLocality: "Barrackpore",
        addressRegion: "West Bengal",
        postalCode: "700122",
        addressCountry: "IN",
      },
    },
    educationalLevel: "Beginner to Advanced",
    courseMode: ["Blended", "Onsite", "Online"],
    availableLanguage: ["English", "Bengali"],
    offers: { "@type": "Offer", priceCurrency: "INR", availability: "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is covered in the GST filing course at Coder & AccoTax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The GST course covers GST registration, GSTR-1 outward supply returns, GSTR-3B monthly summary filing, Input Tax Credit (ITC) matching, e-way bill generation, GST on TDS, GST audit, and practical filing in TallyPrime with real company data.",
        },
      },
      {
        "@type": "Question",
        name: "Is this GST course available near Sodepore and Barasat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Coder & AccoTax is located at Barrackpore (Pin 700122), conveniently accessible from Sodepore, Ichapore, Barasat, Sreerampore, Titagarh, Naihati and surrounding areas. Online batches are also available.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an accounting background to join the GST course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No prior accounting background is required. We start from the basics of GST law and progress to practical filing. Commerce students, business owners, and working professionals can all join.",
        },
      },
    ],
  },
];

export default function GSTFilingPage() {
  return (
    <CoursePage
      title="GST Filing & Compliance Course near Barrackpore, Sodepore, Barasat | Coder & AccoTax"
      metaDescription="Join Coder & AccoTax for practical GST filing training near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore (Pin 700122). Learn GSTR-1, GSTR-3B, ITC reconciliation, e-way bill & GST audit. ISO 9001:2015 certified. Call +91-9432456083."
      metaKeywords="GST filing course near Barrackpore, GST training Sodepore, GST return filing Barasat, GSTR-1 GSTR-3B course Ichapore, GST compliance training Sreerampore, GST institute 700122, practical GST tally training, GST filing class near me"
      canonical="https://codernaccotax.co.in/courses/gst-filing"
      ogImage="https://codernaccotax.co.in/og-courses.png"
      schema={schema}
      heroIcon="🧾"
      heroBadge="Accounting & Tax"
      heroColor="from-emerald-500 to-teal-500"
      heroTitle={
        <>
          Practical{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            GST Filing
          </span>{" "}
          & Compliance Training
          <br />
          <span className="text-2xl sm:text-3xl font-semibold text-slate-300">
            near Barrackpore, Sodepore &amp; Barasat
          </span>
        </>
      }
      heroSubtitle="Master GSTR-1, GSTR-3B, ITC reconciliation, e-way bill, and GST audit with real company data in TallyPrime. Available near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore — Pin 700122."
      highlights={[
        { icon: "📋", label: "Returns Covered", value: "GSTR-1, 3B" },
        { icon: "✅", label: "Mode", value: "Offline + Online" },
        { icon: "🏅", label: "Certification", value: "ISO Certified" },
        { icon: "⭐", label: "Google Rating", value: "4.9 / 5" },
      ]}
      audience={[
        "Commerce graduates & B.Com students",
        "Business owners managing their own GST",
        "Accountants upgrading to GST compliance",
        "Working professionals near Barasat, Sodepore",
        "Tax practitioners and CA article clerks",
        "Anyone filing GSTR-1 & GSTR-3B returns",
      ]}
      modules={[
        {
          title: "GST Fundamentals",
          topics: [
            "GST law overview — CGST, SGST, IGST, UTGST",
            "GST registration process & GSTIN",
            "Invoice formats under GST",
            "Types of supply: taxable, exempt, zero-rated",
            "Time of supply & place of supply rules",
          ],
        },
        {
          title: "GSTR-1 Outward Supply Filing",
          topics: [
            "B2B, B2C, export, NIL-rated returns",
            "HSN/SAC code selection & reporting",
            "Credit/debit notes in GSTR-1",
            "Filing GSTR-1 on the GST portal",
            "Monthly vs quarterly filing selection",
          ],
        },
        {
          title: "GSTR-3B & Payment",
          topics: [
            "GSTR-3B monthly summary return",
            "ITC claim & eligibility rules",
            "GST tax payment via challan (PMT-06)",
            "Interest & late fee calculation",
            "Nil GSTR-3B filing",
          ],
        },
        {
          title: "ITC Reconciliation & Compliance",
          topics: [
            "GSTR-2B auto-populated ITC statement",
            "ITC reconciliation with books of accounts",
            "Blocked credits under Section 17(5)",
            "Annual return GSTR-9 overview",
            "GST audit under Section 35",
          ],
        },
        {
          title: "GST in TallyPrime",
          topics: [
            "GST configuration in TallyPrime",
            "Purchase & sales entries with GST",
            "GST return reports in Tally",
            "E-way bill generation from Tally",
            "Exporting data to GST portal",
          ],
        },
        {
          title: "Advanced GST Topics",
          topics: [
            "Composition scheme filing (GSTR-4)",
            "GST on imports & RCM (Reverse Charge)",
            "E-invoice & e-way bill system",
            "GST on TDS (Section 51)",
            "GST notices & response procedures",
          ],
        },
      ]}
      faqs={[
        {
          q: "What is covered in the GST filing course at Coder & AccoTax?",
          a: "The course covers GST registration, GSTR-1 outward supply returns, GSTR-3B monthly summary filing, ITC matching & reconciliation, e-way bill generation, GST on TDS, GST audit, and practical filing in TallyPrime with real company data.",
        },
        {
          q: "Is this GST course available near Sodepore, Ichapore, and Barasat?",
          a: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is easily accessible from Sodepore, Ichapore, Barasat, Sreerampore, Titagarh, and Naihati. We also offer online batches for students from farther areas.",
        },
        {
          q: "Do I need an accounting background to join the GST course?",
          a: "No prior accounting background required. We start from the basics of GST law and progress to practical portal filing. Commerce students, business owners, and professionals at all levels can join.",
        },
        {
          q: "Will I get a certificate after completing the GST course?",
          a: "Yes. Upon successful completion of curriculum projects and practical evaluations, you receive an ISO 9001:2015 certified course completion certificate from Coder & AccoTax.",
        },
        {
          q: "What is the batch timing and duration for the GST course?",
          a: "We offer flexible weekday morning, afternoon, and weekend evening batches. The GST Filing & Compliance course typically spans 2–3 months with hands-on lab sessions. Contact us on WhatsApp for current batch schedules.",
        },
      ]}
      whatsappMessage="Hi Coder & AccoTax! I am interested in the GST Filing & Compliance course. Please share the syllabus, batch timings, and fees."
    />
  );
}
