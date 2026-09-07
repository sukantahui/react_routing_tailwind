// ============================================================================
// WebDevelopmentPage.jsx — Dedicated SEO landing page for Web Development course
// Target: "Web development course near Barrackpore", "Full stack Sodepore/Barasat"
// ============================================================================
import React from "react";
import CoursePage from "./CoursePage";

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Full Stack Web Development Course — near Barrackpore",
    description:
      "Full Stack Web Development course near Barrackpore, Sodepore, Ichapore, Barasat and Sreerampore (Pin 700122). Learn HTML, CSS, JavaScript, React, Node.js, Express, MySQL, and deployment with live capstone projects.",
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
        name: "What technologies are covered in the Full Stack Web Development course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The course covers HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js with hooks and router, Node.js, Express.js REST APIs, MySQL with Prisma ORM, Git/GitHub version control, and deployment on cPanel and VPS servers.",
        },
      },
      {
        "@type": "Question",
        name: "Is the web development course available near Sodepore, Barasat and Sreerampore?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is accessible from Sodepore, Barasat, Ichapore, Sreerampore, Titagarh, Naihati and nearby areas. Online web development batches are also available.",
        },
      },
    ],
  },
];

export default function WebDevelopmentPage() {
  return (
    <CoursePage
      title="Full Stack Web Development Course near Barrackpore, Sodepore, Barasat | Coder & AccoTax"
      metaDescription="Learn Full Stack Web Development (React, Node.js, MySQL) near Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore (Pin 700122). Build live projects. ISO 9001:2015 certified institute. 28+ years. Call +91-9432456083."
      metaKeywords="web development course near Barrackpore, full stack course Sodepore, React JS classes Barasat, Node.js training Ichapore, web development institute Sreerampore, coding course 700122, full stack developer course near me, React Node MySQL Barrackpore"
      canonical="https://codernaccotax.co.in/courses/web-development"
      ogImage="https://codernaccotax.co.in/og-courses.png"
      schema={schema}
      heroIcon="💻"
      heroBadge="Web Development"
      heroColor="from-sky-500 to-purple-500"
      heroTitle={
        <>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
            Full Stack Web Development
          </span>{" "}
          Course
          <br />
          <span className="text-slate-300 text-2xl sm:text-3xl font-semibold">
            near Barrackpore, Sodepore &amp; Barasat
          </span>
        </>
      }
      heroSubtitle="Build production-ready web applications with React, Node.js, Express, MySQL and deploy them live. Hands-on project-first approach with GitHub portfolio. Serving Barrackpore, Sodepore, Ichapore, Barasat & Sreerampore — Pin 700122."
      highlights={[
        { icon: "⚛️", label: "Frontend", value: "React.js" },
        { icon: "🟩", label: "Backend", value: "Node.js" },
        { icon: "🗄️", label: "Database", value: "MySQL" },
        { icon: "⭐", label: "Google Rating", value: "4.9 / 5" },
      ]}
      audience={[
        "Complete beginners wanting a tech career",
        "BCA / B.Sc IT / MCA students",
        "Graduates looking for web developer jobs",
        "Business owners wanting a website built",
        "Designers learning to code their designs",
        "Students near Sodepore, Barasat, Ichapore, Sreerampore",
      ]}
      modules={[
        {
          title: "HTML5 & CSS3 Foundations",
          topics: [
            "HTML5 semantic elements & forms",
            "CSS3: box model, flexbox, grid",
            "Responsive design & media queries",
            "Tailwind CSS utility framework",
            "CSS animations & transitions",
          ],
        },
        {
          title: "JavaScript (ES6+)",
          topics: [
            "Variables, functions, arrays, objects",
            "DOM manipulation & events",
            "ES6+: arrow functions, destructuring, spread",
            "Promises, async/await & fetch API",
            "Local storage & session storage",
            "JavaScript modules",
          ],
        },
        {
          title: "React.js — Frontend Framework",
          topics: [
            "Components, JSX & props",
            "State management with useState & useEffect",
            "React Router — multi-page SPA",
            "Context API & custom hooks",
            "Framer Motion animations",
            "React with Vite build tool",
          ],
        },
        {
          title: "Node.js & Express.js Backend",
          topics: [
            "Node.js runtime & npm ecosystem",
            "Express.js server setup & routing",
            "RESTful API design (GET, POST, PUT, DELETE)",
            "JWT authentication & middleware",
            "File upload handling with Multer",
            "Environment variables & dotenv",
          ],
        },
        {
          title: "MySQL & Database Design",
          topics: [
            "Relational database design & normalization",
            "SQL: SELECT, JOIN, GROUP BY, subqueries",
            "MySQL with Prisma ORM",
            "CRUD operations from Node.js",
            "Database migrations & seeding",
            "Transactions & foreign keys",
          ],
        },
        {
          title: "Git, GitHub & Deployment",
          topics: [
            "Git version control — commit, branch, merge",
            "GitHub repository & pull requests",
            "Deploying React app to cPanel/Vercel",
            "Deploying Node.js API to VPS",
            "SSL, domain & .htaccess configuration",
            "Capstone project: full-stack application",
          ],
        },
      ]}
      faqs={[
        {
          q: "What technologies are covered in the Full Stack Web Development course?",
          a: "The course covers HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, Node.js, Express.js REST APIs, MySQL with Prisma ORM, Git/GitHub, and deployment on cPanel and VPS.",
        },
        {
          q: "Is the web development course available near Sodepore, Barasat, and Sreerampore?",
          a: "Yes. Coder & AccoTax at Barrackpore (Pin 700122) is accessible from Sodepore, Barasat, Ichapore, Sreerampore, Titagarh, and Naihati. Online batches are also available.",
        },
        {
          q: "Will I build real projects during the web development course?",
          a: "Yes. The course is project-first. You'll build multiple mini-projects and a final full-stack capstone application (deployed live) that you can showcase on GitHub for job applications.",
        },
        {
          q: "How long does the Full Stack Web Development course take?",
          a: "The complete Full Stack course runs 5–6 months. Shorter focused tracks (Frontend only with React, or Backend with Node.js) are available in 2–3 months. Contact us for current batch schedules.",
        },
        {
          q: "Is job assistance provided after the web development course?",
          a: "Yes. We provide GitHub portfolio building, resume preparation, mock technical interviews, and direct guidance on applying for web developer positions after course completion.",
        },
      ]}
      whatsappMessage="Hi Coder & AccoTax! I am interested in the Full Stack Web Development course. Please share the syllabus, batch timings, and fees."
    />
  );
}
