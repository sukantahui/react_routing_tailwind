// ============================================================================
// PythonProgrammingPage.jsx — Dedicated SEO landing page for Python course
// Target: "Python classes near Barrackpore", "Python programming Sodepore/Barasat"
// ============================================================================
import React from "react";
import CoursePage from "./CoursePage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Python Programming Course (Core to Advanced) — near Barrackpore",
    description:
      "Comprehensive Python programming course near Barrackpore, Sodepore, Ichapore, Barasat and Sreerampore (Pin 700122). Learn Python syntax, OOP, file handling, NumPy, Pandas, Django, and machine learning fundamentals with live projects.",
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
        name: "Is the Python course suitable for complete beginners near Barrackpore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, absolutely. Our Python course starts from zero — installation, syntax, variables, and data types — and progressively covers OOP, file handling, libraries like NumPy and Pandas, and an intro to Django web framework. No prior coding experience is needed.",
        },
      },
      {
        "@type": "Question",
        name: "Does the Python course prepare students for ICSE/ISC board exams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our Python curriculum aligns with the ISC Class 11 & 12 computer science syllabus. We cover all board-required topics including lists, tuples, dictionaries, functions, file handling, and OOP with Java-to-Python mapping.",
        },
      },
    ],
  },
];

export default function PythonProgrammingPage() {
  return (
    <CoursePage
      title="Python Programming Course near Barrackpore, Sodepore, Barasat | Coder & AccoTax"
      metaDescription="Learn Python programming from basics to advanced near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore (Pin 700122). Covers OOP, NumPy, Pandas, Django, ML foundations. ICSE/ISC board alignment. ISO certified. Call +91-9432456083."
      metaKeywords="Python course near Barrackpore, Python programming classes Sodepore, Python training Barasat, Python institute Ichapore, Python class Sreerampore, Python coding 700122, best Python institute near me, Python Django Barrackpore, ISC Python class 12 tuition"
      canonical="https://codernaccotax.co.in/courses/python-programming"
      ogImage="https://codernaccotax.co.in/og-courses.png"
      schema={schema}
      heroIcon="🐍"
      heroBadge="Programming"
      heroColor="from-yellow-500 to-green-500"
      heroTitle={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
            Python Programming
          </span>{" "}
          Course
          <br />
          <span className="text-slate-300 text-2xl sm:text-3xl font-semibold">
            Core to Advanced — near Barrackpore &amp; Barasat
          </span>
        </>
      }
      heroSubtitle="From Python syntax to OOP, NumPy, Pandas, Django and Machine Learning foundations — with live projects and ICSE/ISC board alignment. Serving Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore — Pin 700122."
      highlights={[
        { icon: "🐍", label: "Language", value: "Python 3.x" },
        { icon: "🚀", label: "Projects", value: "Live Projects" },
        { icon: "📚", label: "Board Aligned", value: "ICSE / ISC" },
        { icon: "⭐", label: "Google Rating", value: "4.9 / 5" },
      ]}
      audience={[
        "Complete beginners with no coding experience",
        "ISC Class 11 & 12 Computer Science students",
        "B.Sc / BCA / MCA students",
        "Data analysis & machine learning aspirants",
        "Web developers learning Django backend",
        "Students near Sodepore, Barasat, Ichapore, Sreerampore",
      ]}
      modules={[
        {
          title: "Python Basics",
          topics: [
            "Installation: Python 3.x, VS Code, PyCharm",
            "Variables, data types, type conversion",
            "Operators: arithmetic, relational, logical",
            "Input/output functions",
            "Conditional statements: if, elif, else",
            "Loops: for, while, break, continue",
          ],
        },
        {
          title: "Data Structures in Python",
          topics: [
            "Lists — indexing, slicing, methods",
            "Tuples — immutability and packing",
            "Dictionaries — key-value operations",
            "Sets — union, intersection, difference",
            "String manipulation & formatting",
            "List comprehensions",
          ],
        },
        {
          title: "Functions & Modules",
          topics: [
            "Defining functions, parameters, return values",
            "Default & keyword arguments",
            "Lambda functions & map/filter",
            "Recursion with examples",
            "Standard library modules: math, random, os, sys",
            "Creating & importing custom modules",
          ],
        },
        {
          title: "OOP (Object-Oriented Python)",
          topics: [
            "Classes & objects",
            "Constructor: __init__",
            "Inheritance & method overriding",
            "Encapsulation & access modifiers",
            "Polymorphism",
            "Special methods: __str__, __len__",
          ],
        },
        {
          title: "File Handling, NumPy & Pandas",
          topics: [
            "Reading & writing text/CSV files",
            "Exception handling: try, except, finally",
            "NumPy arrays — creation, indexing, operations",
            "Pandas DataFrame — read_csv, groupby, merge",
            "Data cleaning & missing values",
            "Matplotlib basic charts",
          ],
        },
        {
          title: "Django & ML Foundations",
          topics: [
            "Django project setup & app structure",
            "URL routing & views",
            "Templates & static files",
            "Django ORM & SQLite",
            "ML concepts: supervised vs unsupervised",
            "Scikit-learn: linear regression intro",
          ],
        },
      ]}
      faqs={[
        {
          q: "Is the Python course suitable for complete beginners?",
          a: "Yes, absolutely. The course starts from installation and basic syntax and progresses through OOP, libraries, and Django. No prior coding experience is needed.",
        },
        {
          q: "Does the Python course prepare students for ICSE/ISC board exams?",
          a: "Yes. Our Python curriculum aligns with ISC Class 11 & 12 computer science syllabus, covering all board-required topics including lists, tuples, dictionaries, functions, file handling, and OOP.",
        },
        {
          q: "Is the Python course available near Sodepore, Barasat, and Ichapore?",
          a: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is accessible from Sodepore, Barasat, Ichapore, Sreerampore, Titagarh, and Naihati. Online Python batches are also available.",
        },
        {
          q: "Will I build real projects during the Python course?",
          a: "Yes. Students build multiple hands-on projects including a student record management system, data analysis dashboard, and a Django web application by the end of the course.",
        },
        {
          q: "What is the duration of the Python programming course?",
          a: "The core-to-advanced Python course spans approximately 3–4 months. Shorter focused modules (Python basics or Python for data analysis) are also available on request.",
        },
      ]}
      whatsappMessage="Hi Coder & AccoTax! I am interested in the Python Programming course. Please share the syllabus, batch timings, and fees."
    />
  );
}
