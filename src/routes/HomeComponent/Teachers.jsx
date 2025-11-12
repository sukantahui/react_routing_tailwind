// ===============================================
// Teachers.jsx
// -----------------------------------------------
// Purpose:
//   Showcase instructor profiles with photos, bios, and contact details.
// Features:
// - Interactive cards (expandable bios)
// - Framer Motion animations
// - Conditional Helmet for SEO (only on /teachers)
// - JSON-LD structured data for rich results
// - Accessibility & responsive design
// ===============================================

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import teachers from "../../data/teachers.json";

// 🔹 Local image imports
import teacher1 from "../../assets/teacher1.jpg";
import teacher2 from "../../assets/teacher2.jpg";
import teacher3 from "../../assets/teacher3.jpg";
import teacher4 from "../../assets/teacher4.jpg";
import teacher5 from "../../assets/teacher5.jpg";
import teacher6 from "../../assets/teacher6.jpg";

// 🔹 Image mapping
const images = {
  "teacher1.jpg": teacher1,
  "teacher2.jpg": teacher2,
  "teacher3.jpg": teacher3,
  "teacher4.jpg": teacher4,
  "teacher5.jpg": teacher5,
  "teacher6.jpg": teacher6,
};

const Teachers = () => {
  const location = useLocation();
  const isStandalone = location.pathname === "/teachers"; // ✅ detect page mode

  // 🧾 JSON-LD Schema (Instructor Listing)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: teachers.map((teacher, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Person",
        name: teacher.name,
        jobTitle: teacher.title,
        description: teacher.bio,
        email: teacher.email ? `mailto:${teacher.email}` : undefined,
        worksFor: {
          "@type": "Organization",
          name: "Coder & AccoTax",
          url: "https://codernaccotax.co.in",
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://codernaccotax.co.in/" },
      { "@type": "ListItem", "position": 2, "name": "Teachers", "item": "https://codernaccotax.co.in/teachers" }
    ]
  };

  return (
    <>
      {/* ==============================
          🧠 Conditional SEO (Helmet)
      ============================== */}
      {isStandalone && (
        <Helmet>
          <title>Our Instructors | Coder & AccoTax</title>
          <meta
            name="description"
            content="Meet the expert instructors at Coder & AccoTax — experienced professionals in coding, finance, and data analysis, dedicated to helping you achieve your goals."
          />
          <meta
            name="keywords"
            content="coder accotax teachers, coding mentors, programming instructors, accounting tutors, web development faculty"
          />
          <meta name="author" content="Coder & AccoTax" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Language" content="en" />
          <link rel="canonical" href="https://codernaccotax.co.in/teachers" />

          {/* Open Graph */}
          <meta property="og:title" content="Our Instructors | Coder & AccoTax" />
          <meta
            property="og:description"
            content="Learn from certified and experienced educators at Coder & AccoTax — leaders in coding, web development, and finance education."
          />
          <meta
            property="og:image"
            content="https://codernaccotax.co.in/og-teachers.png"
          />
          <meta property="og:url" content="https://codernaccotax.co.in/teachers" />
          <meta property="og:type" content="website" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Team of instructors at Coder & AccoTax" />
          <meta property="og:site_name" content="Coder & AccoTax" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Our Instructors | Coder & AccoTax" />
          <meta
            name="twitter:description"
            content="Meet our professional teaching team — Coder & AccoTax instructors guiding you toward a successful career."
          />
          <meta
            name="twitter:image"
            content="https://codernaccotax.co.in/og-teachers.png"
          />
          <meta
            name="twitter:image:alt"
            content="Team of instructors at Coder & AccoTax"
          />

          {/* Structured Data */}
          <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
          <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        </Helmet>
      )}

      {/* ===============================================
          TEACHERS SECTION
      =============================================== */}
      <section
        id="teachers"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-300 drop-shadow-lg"
          >
            Meet Our Instructors
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-14 max-w-2xl mx-auto"
          >
            Learn from <strong className="text-sky-400">industry experts</strong> with years
            of hands-on experience and mentorship. Our instructors combine practical
            knowledge with passion for teaching.
          </motion.p>

          {/* Instructor Grid */}
          <div
            className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="List of instructors"
          >
            {teachers.map((teacher, index) => (
              <TeacherCard key={teacher.name} teacher={teacher} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ===============================================
// TeacherCard Component
// -----------------------------------------------
const TeacherCard = ({ teacher, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="relative group bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-lg p-8 pt-20 transition-all duration-500 hover:shadow-sky-500/30 hover:-translate-y-1"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Image */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-sky-400/60 transition-all duration-500"
        >
          <img
            src={images[teacher.image]}
            alt={`Instructor ${teacher.name}`}
            loading="lazy"
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-sky-400 group-hover:shadow-[0_0_25px_6px_rgba(56,189,248,0.6)] transition-all duration-500"></div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="text-center mt-4 space-y-2">
        <h2 className="text-xl font-semibold text-sky-300" itemProp="name">
          {teacher.name}
        </h2>
        <p className="text-sm text-indigo-300" itemProp="jobTitle">
          {teacher.title}
        </p>
        {teacher.email && (
          <p className="text-sm">
            <span className="text-sky-400 mr-1">📧</span>
            <a
              href={`mailto:${teacher.email}`}
              itemProp="email"
              className="text-gray-300 hover:text-sky-400 transition-colors duration-300 underline underline-offset-2"
            >
              {teacher.email}
            </a>
          </p>
        )}
      </div>

      {/* Expandable Bio */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : "4rem" }}
        transition={{ duration: 0.5 }}
        className="relative text-gray-300 text-sm mt-4 text-left leading-relaxed overflow-hidden"
        itemProp="description"
      >
        <div className="pr-2">{teacher.bio}</div>

        {!expanded && teacher.bio.length > 100 && (
          <span
            className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black to-transparent flex items-end justify-start text-gray-400 text-sm"
            aria-hidden="true"
          >
            ...
          </span>
        )}
      </motion.div>

      {teacher.bio.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="block mx-auto text-sky-400 hover:text-sky-300 text-sm mt-2 underline underline-offset-4 transition-colors duration-300"
          aria-expanded={expanded}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </motion.article>
  );
};

export default Teachers;
