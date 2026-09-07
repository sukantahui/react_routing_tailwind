// ============================================================================
// TDSIncomeTaxPage.jsx — Dedicated SEO landing page for TDS & Income Tax course
// Target: "TDS course Barasat", "Income Tax training Sreerampore/Sodepore"
// ============================================================================
import React from "react";
import CoursePage from "./CoursePage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "TDS Deduction & Income Tax Return Filing Course — Barrackpore",
    description:
      "Practical TDS deduction, challan payment, Form 16/26AS, and ITR-1/ITR-4 Income Tax return filing course near Barrackpore, Sodepore, Barasat, Ichapore and Sreerampore (Pin 700122). Hands-on training with real company data.",
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
        name: "What TDS sections are covered in the course near Barrackpore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The TDS course covers deduction under Section 192 (salaries), 194C (contractors), 194J (professionals), 194I (rent), TDS challan payment via NSDL, Form 16 & 16A generation, quarterly TDS returns (24Q/26Q), and 26AS reconciliation.",
        },
      },
      {
        "@type": "Question",
        name: "Which Income Tax return forms are taught — ITR-1, ITR-2, ITR-4?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We cover ITR-1 (salaried individuals), ITR-4 (business/professionals under presumptive taxation), advance tax computation, Form 26AS verification, and online e-filing on the Income Tax portal. ITR-2 overview is also included.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Income Tax course available near Sreerampore, Barasat, Ichapore and Sodepore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) serves students from Sreerampore, Barasat, Ichapore, Sodepore, Nonachandanpukur, Titagarh, Naihati and nearby areas. Online batches are also available.",
        },
      },
    ],
  },
];

export default function TDSIncomeTaxPage() {
  return (
    <CoursePage
      title="TDS Deduction & Income Tax Return Filing Course near Barrackpore, Barasat, Sreerampore | Coder & AccoTax"
      metaDescription="Learn TDS deduction (194C, 194J, 192), challan payment, Form 16, 26AS & Income Tax return filing (ITR-1, ITR-4) near Barrackpore, Sodepore, Barasat, Ichapore & Sreerampore (Pin 700122). ISO certified. 28+ years. Call +91-9432456083."
      metaKeywords="TDS course near Barrackpore, income tax training Barasat, TDS challan filing Sodepore, ITR-1 ITR-4 filing course Sreerampore, income tax return Ichapore, TDS deduction class 700122, TDS income tax institute near me, form 16 26AS training Barrackpore"
      canonical="https://codernaccotax.co.in/courses/tds-income-tax"
      ogImage="https://codernaccotax.co.in/og-courses.png"
      schema={schema}
      heroIcon="🏦"
      heroBadge="Tax Compliance"
      heroColor="from-sky-500 to-indigo-500"
      heroTitle={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
            TDS Deduction
          </span>{" "}
          &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            Income Tax Return
          </span>{" "}
          Filing Course
          <br />
          <span className="text-2xl sm:text-3xl font-semibold text-slate-300">
            near Barrackpore, Barasat &amp; Sreerampore
          </span>
        </>
      }
      heroSubtitle="Hands-on training in TDS deduction under all major sections, challan payment, Form 16/26AS, and Income Tax e-filing (ITR-1, ITR-4) with real salary and business data. Serving Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore — Pin 700122."
      highlights={[
        { icon: "📄", label: "Returns Covered", value: "ITR-1, ITR-4" },
        { icon: "🧮", label: "TDS Sections", value: "192, 194C, J" },
        { icon: "🏅", label: "Certification", value: "ISO Certified" },
        { icon: "⭐", label: "Google Rating", value: "4.9 / 5" },
      ]}
      audience={[
        "Salaried employees filing their own ITR",
        "Business owners & freelancers (ITR-4)",
        "Accountants managing company TDS",
        "Commerce students & B.Com graduates",
        "HR & payroll professionals (TDS on salary)",
        "Anyone near Barasat, Sreerampore, Sodepore seeking tax training",
      ]}
      modules={[
        {
          title: "TDS Basics & Applicability",
          topics: [
            "What is TDS & why it is deducted",
            "TDS vs TCS — key differences",
            "Threshold limits & deduction rates",
            "PAN requirement for TDS",
            "Lower deduction certificate (Form 13)",
          ],
        },
        {
          title: "TDS Sections in Detail",
          topics: [
            "Section 192 — TDS on salary (payroll)",
            "Section 194C — TDS on contractor payments",
            "Section 194J — TDS on professional fees",
            "Section 194I — TDS on rent",
            "Section 194H — commission & brokerage",
            "Section 194A — interest other than bank",
          ],
        },
        {
          title: "TDS Challan, Returns & Certificates",
          topics: [
            "Challan 281 payment on NSDL portal",
            "TRACES portal — registration & usage",
            "Quarterly TDS return 24Q (salary) & 26Q",
            "Form 16 & Form 16A generation",
            "Form 26AS & Annual Information Statement",
            "Correction returns & rectification",
          ],
        },
        {
          title: "Income Tax Fundamentals",
          topics: [
            "Income heads: salary, house property, business, capital gains, other sources",
            "Deductions: 80C, 80D, 80E, HRA, LTA",
            "Old regime vs new tax regime comparison",
            "Advance tax & self-assessment tax",
            "Tax slabs FY 2025–26",
          ],
        },
        {
          title: "ITR-1 & ITR-4 Filing",
          topics: [
            "ITR-1 — salaried & one house property",
            "ITR-4 — presumptive income (44AD, 44ADA)",
            "Pre-filling data from Form 26AS",
            "Online e-filing on incometax.gov.in",
            "Verification via Aadhaar OTP / net banking",
            "Rectification return under Section 139(5)",
          ],
        },
        {
          title: "Practical Filing Lab",
          topics: [
            "Salary TDS computation with Form 16",
            "Filing ITR-1 with real salary data",
            "Filing ITR-4 with business income",
            "TDS challan payment walkthrough",
            "26Q quarterly return filing in TRACES",
            "Common notices & how to respond",
          ],
        },
      ]}
      faqs={[
        {
          q: "What TDS sections are covered in the course?",
          a: "We cover Sections 192 (salary), 194C (contractors), 194J (professionals), 194I (rent), 194H (commission), 194A (interest). Includes TDS challan payment on NSDL, Form 16 & 16A, quarterly 24Q/26Q returns, and 26AS reconciliation.",
        },
        {
          q: "Which Income Tax return forms are taught?",
          a: "We cover ITR-1 (salaried individuals), ITR-4 (business/professionals under presumptive taxation), advance tax computation, Form 26AS verification, and online e-filing on incometax.gov.in. ITR-2 overview is included.",
        },
        {
          q: "Is the course available near Sreerampore, Barasat, Ichapore and Sodepore?",
          a: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) serves students from Sreerampore, Barasat, Ichapore, Sodepore, Nonachandanpukur and nearby areas. Online batches are also available.",
        },
        {
          q: "Can a non-accounting person join this TDS & Income Tax course?",
          a: "Absolutely. The course begins from basics — what income tax is, why TDS is deducted — and builds up to practical filing. No prior accounting knowledge is required.",
        },
        {
          q: "What is the duration and batch timing for the TDS & Income Tax course?",
          a: "The course runs for approximately 2 months with 3 sessions per week. We offer morning, afternoon, and weekend evening batches. Contact us via WhatsApp for current availability.",
        },
      ]}
      whatsappMessage="Hi Coder & AccoTax! I am interested in the TDS Deduction & Income Tax Return Filing course. Please share the syllabus, batch timings, and fees."
    />
  );
}
