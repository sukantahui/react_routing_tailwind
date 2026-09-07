// ============================================================================
// TallyAccountingPage.jsx — Dedicated SEO landing page for Tally & Accounting
// Target: "Tally and GST course near me", "Tally institute near Barrackpore / 700121"
// ============================================================================
import React from "react";
import CoursePage from "./CoursePage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Tally and GST Course | TallyPrime & Practical Accounting — near Barrackpore, 700121",
    description:
      "Comprehensive Tally and GST Course with practical accounting near Barrackpore, Titagarh, Sodepore, Ichapore, Barasat, and Sreerampore (Pin 700122 & 700121). Learn corporate bookkeeping, inventory, payroll, GST in Tally, TDS entries, and final accounts preparation.",
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
        name: "Which is the best Tally and GST course near me?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Coder & AccoTax in Barrackpore (Pin 700122, serving Pin 700121, Titagarh, Sodepore, Barasat) is top-rated with a 4.9/5 rating, providing 100% practical training on TallyPrime bundled with live GST return filing (GSTR-1, GSTR-3B) and TDS entries.",
        },
      },
      {
        "@type": "Question",
        name: "Which version of Tally is taught — TallyPrime or Tally ERP 9?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We teach TallyPrime (the latest version), which includes all features of Tally ERP 9 plus the new Go To command, reports dashboard, and enhanced GST compliance. Students get hands-on practice on TallyPrime with real company data.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Tally and GST course available near Pin 700121, Titagarh, Ichapore, and Barasat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is easily reachable from Pin 700121, Titagarh, Ichapore, Barasat, Sodepore, Sreerampore, and Naihati. We also offer interactive online Tally batches.",
        },
      },
    ],
  },
];

export default function TallyAccountingPage() {
  return (
    <CoursePage
      title="Best Tally and GST Course near me | TallyPrime Classes Barrackpore, 700121 | Coder & AccoTax"
      metaDescription="Looking for the best Tally and GST course near me? Learn TallyPrime & practical accounting near Barrackpore, Titagarh, Sodepore, Barasat (Pin 700121/700122). Covers bookkeeping, inventory, payroll, GST in Tally, TDS & final accounts. Call +91-9432456083."
      metaKeywords="tally and gst course near me, tally gst course 700121, best tally and gst training institute near me, Tally institute near Barrackpore, TallyPrime classes Sodepore, Tally accounting course Ichapore, Tally GST training Barasat, accounting institute Sreerampore, Tally Prime class 700122, practical accounting training near me, Tally bookkeeping Barrackpore"
      canonical="https://codernaccotax.co.in/courses/tally-accounting"
      ogImage="https://codernaccotax.co.in/og-courses.png"
      schema={schema}
      heroIcon="🧮"
      heroBadge="Tally & GST Course"
      heroColor="from-purple-500 to-pink-500"
      heroTitle={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Tally &amp; GST
          </span>{" "}
          Course &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            Accounting
          </span>{" "}
          Training
          <br />
          <span className="text-2xl sm:text-3xl font-semibold text-slate-300">
            near Barrackpore, Titagarh &amp; 700121
          </span>
        </>
      }
      heroSubtitle="Master TallyPrime bookkeeping, inventory management, payroll, live GST return filing (GSTR-1, GSTR-3B) from Tally, TDS entries, and final accounts preparation with real company ledgers. Serving Barrackpore, Titagarh, Sodepore, Barasat & Pin 700121 / 700122."
      highlights={[
        { icon: "📊", label: "Software", value: "TallyPrime" },
        { icon: "🏢", label: "Real Company", value: "Live Data" },
        { icon: "🏅", label: "Certification", value: "ISO Certified" },
        { icon: "⭐", label: "Google Rating", value: "4.9 / 5" },
      ]}
      audience={[
        "B.Com / M.Com graduates entering accounting",
        "Commerce students & Class 11–12 learners",
        "Business owners managing their own accounts",
        "Accountants upgrading from Tally ERP 9 to TallyPrime",
        "Finance professionals near Ichapore, Barasat",
        "Anyone seeking a job-ready accounting skill",
      ]}
      modules={[
        {
          title: "Accounting Fundamentals",
          topics: [
            "Types of accounts: personal, real, nominal",
            "Golden rules of accounting",
            "Journal entries, ledger, trial balance",
            "Trading A/c, P&L, balance sheet",
            "Concepts of debit & credit",
          ],
        },
        {
          title: "TallyPrime — Company Setup & Masters",
          topics: [
            "Creating company & financial year",
            "Ledger creation, groups & categories",
            "Stock items, units, godowns",
            "Currency & multi-currency setup",
            "Voucher types configuration",
          ],
        },
        {
          title: "Day-to-Day Transactions in Tally",
          topics: [
            "Purchase & sales vouchers",
            "Receipt, payment & contra entries",
            "Journal entries & memo vouchers",
            "Debit & credit notes",
            "Bank reconciliation in Tally",
          ],
        },
        {
          title: "Inventory Management",
          topics: [
            "Stock group & category creation",
            "Purchase order & sales order",
            "Delivery note & receipt note",
            "Stock valuation methods (FIFO, avg cost)",
            "Inventory reports & stock summary",
          ],
        },
        {
          title: "GST in TallyPrime",
          topics: [
            "GST configuration — CGST, SGST, IGST",
            "Purchase & sales with GST",
            "GST reports: GSTR-1 & GSTR-3B from Tally",
            "E-way bill from TallyPrime",
            "Exporting GST data to JSON for portal",
          ],
        },
        {
          title: "Payroll, TDS & Final Accounts",
          topics: [
            "Payroll processing in TallyPrime",
            "Salary structure, PF & ESI",
            "TDS deduction & challan entries in Tally",
            "Final accounts: balance sheet in Tally",
            "Tally backup, restore & company data security",
          ],
        },
      ]}
      faqs={[
        {
          q: "Which version of Tally is taught — TallyPrime or Tally ERP 9?",
          a: "We teach TallyPrime (the latest version), which includes all Tally ERP 9 features plus enhanced GST compliance. Students get hands-on practice on TallyPrime with real company data.",
        },
        {
          q: "Is the Tally accounting course available near Ichapore, Barasat, and Sodepore?",
          a: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is easily reachable from Ichapore, Barasat, Sodepore, Sreerampore, Titagarh and Naihati. Online Tally batches are also available.",
        },
        {
          q: "Does the course cover GST filing from TallyPrime?",
          a: "Yes. We cover complete GST configuration in Tally, GSTR-1 & GSTR-3B report generation, e-way bill creation, and exporting GST returns to the government portal — all directly from TallyPrime.",
        },
        {
          q: "Do I need any prior accounting knowledge to join the Tally course?",
          a: "No. We start from basic accounting concepts (journal, ledger, trial balance) before moving to TallyPrime. Both beginners and those with some accounting knowledge can join.",
        },
        {
          q: "What is the duration of the TallyPrime & Accounting course?",
          a: "The full course spans 2.5 to 3 months, covering fundamentals to advanced topics. Shorter, focused GST-in-Tally modules are also available. Contact us for current batch schedules.",
        },
      ]}
      whatsappMessage="Hi Coder & AccoTax! I am interested in the TallyPrime & Practical Accounting course. Please share the syllabus, batch timings, and fees."
    />
  );
}
