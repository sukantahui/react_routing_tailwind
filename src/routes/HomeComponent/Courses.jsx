// ===============================================
// Courses.jsx
// -----------------------------------------------
// Displays all available course categories and their
// respective courses. Includes search, expand/collapse,
// and WhatsApp inquiry integration.
// -----------------------------------------------
// SEO Optimized: Conditional Helmet + JSON-LD schema
// ===============================================

import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "../../data/courses.json";

// 🔹 Course & Group Images
import javaImg from "../../assets/course-images/java-logo.svg";
import reactImg from "../../assets/course-images/react-logo.svg";
import pythonImg from "../../assets/course-images/python-logo.svg";
import clanguage from "../../assets/course-images/clanguage.svg";
import dsa from "../../assets/course-images/dsa.svg";
import sql from "../../assets/course-images/sql.svg";
import mysql from "../../assets/course-images/mysql.svg";
import databaselabs from "../../assets/course-images/database-labs.svg";
import databaseServer from "../../assets/course-images/databaseServer.svg";
import defaultImg from "../../assets/course-images/default-logo.svg";
import webDevImg from "../../assets/group-images/webdev.logo.svg";
import codeImg from "../../assets/group-images/code.logo.svg";
import excelImg from "../../assets/group-images/excel.logo.svg";
import taxImg from "../../assets/group-images/tax.logo.svg";
import hardwareImg from "../../assets/group-images/hardware.logo.svg";
import programmingImg from "../../assets/group-images/programming.logo.svg";
import accountsImg from "../../assets/group-images/accounts.logo.svg";
import dataanalysisImg from "../../assets/group-images/dataanalysis.logo.svg";
import studentImg from "../../assets/group-images/student.logo.svg";

const imageMap = {
  javaImg,
  reactImg,
  pythonImg,
  clanguage,
  dsa,
  sql,
  mysql,
  databaselabs,
  databaseServer,
  defaultImg,
  webDevImg,
  codeImg,
  excelImg,
  taxImg,
  hardwareImg,
  programmingImg,
  accountsImg,
  dataanalysisImg,
  studentImg,
};

const Courses = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [courseDescExpanded, setCourseDescExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const whatsappNumber = "919432456083";
  const courseRefs = useRef({});
  const location = useLocation();
  const isStandalone = location.pathname === "/courses"; // ✅ conditional helmet

  // -----------------------------------------------
  // Toggle logic and scrolling
  // -----------------------------------------------
  const toggleGroup = (category) => {
    setExpandedGroups((prev) => (prev[category] ? {} : { [category]: true }));
    setCourseDescExpanded({});
  };

  const toggleCourseDescription = (courseID) => {
    setCourseDescExpanded((prev) => ({
      ...prev,
      [courseID]: !prev[courseID],
    }));
  };

  useEffect(() => {
    const expandedCategory = Object.keys(expandedGroups)[0];
    if (expandedCategory) {
      const ref = courseRefs.current[`${expandedCategory}_1`];
      if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [expandedGroups]);

  // Filter and encode WhatsApp message
  const filteredCourses = (group) =>
    group.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.more.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const encodeMessage = (title) =>
    encodeURIComponent(
      `Hi, I'm interested in the "${title}" course. Could you please share duration, fee details, and admission info?`
    );

  // -----------------------------------------------
  // 🧾 Schema Markup
  // -----------------------------------------------
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Coder & AccoTax Courses",
    description:
      "A curated list of industry-oriented coding and accounting courses by Coder & AccoTax.",
    itemListElement: coursesData.flatMap((group) =>
      group.courses.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          name: course.title,
          description: course.desc,
          provider: {
            "@type": "EducationalOrganization",
            name: "Coder & AccoTax",
            url: "https://codernaccotax.co.in",
          },
        },
      }))
    ),
  };

  const breadcrumbSchema = {
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
  };

  // -----------------------------------------------
  // 🌐 Render
  // -----------------------------------------------
  return (
    <>
      {/* ✅ Conditional Helmet: only active on /courses route */}
      {isStandalone && (
        <Helmet>
          <title>Courses | Coder & AccoTax</title>
          <meta
            name="description"
            content="Explore practical, industry-focused courses in Web Development, Python, Java, Accounting, and Data Analysis. Learn from expert instructors at Coder & AccoTax."
          />
          <meta
            name="keywords"
            content="coding courses, full stack, python, java, accounting, taxation, react, web development, online training"
          />
          <meta name="author" content="Coder & AccoTax" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Language" content="en" />
          <link rel="canonical" href="https://codernaccotax.co.in/courses" />

          {/* Open Graph */}
          <meta property="og:title" content="Courses | Coder & AccoTax" />
          <meta
            property="og:description"
            content="Hands-on courses to make you industry-ready. Learn web development, accounting, and data analysis from experts."
          />
          <meta
            property="og:image"
            content="https://codernaccotax.co.in/og-courses.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://codernaccotax.co.in/courses" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:site_name" content="Coder & AccoTax" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Courses | Coder & AccoTax" />
          <meta
            name="twitter:description"
            content="Explore hands-on courses in coding, accounting, and data analysis. Learn job-ready skills with Coder & AccoTax."
          />
          <meta
            name="twitter:image"
            content="https://codernaccotax.co.in/og-courses.png"
          />
          <meta
            name="twitter:image:alt"
            content="Coder & AccoTax Courses Banner"
          />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>
      )}

      {/* =========================
          COURSES SECTION
      ========================== */}
      <section
        id="courses"
        className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_60%)]"
        ></motion.div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300 drop-shadow-lg"
          >
            Explore Our Courses
          </motion.h1>

          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Empower your career with expert-led training programs and academic
            courses designed to make you <strong>industry ready</strong>.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center mb-10">
            <input
              type="text"
              placeholder="🔍 Search for a course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-5 py-3 w-full md:w-1/2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-sky-400 focus:outline-none placeholder-gray-500"
              aria-label="Search courses"
            />
          </div>

          {/* Course Groups */}
          <div className="flex flex-wrap gap-8 justify-center">
            {coursesData.map((group) => {
              const isExpanded = expandedGroups[group.category];
              const visibleCourses = filteredCourses(group);
              if (visibleCourses.length === 0 && searchTerm) return null;

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className={`${isExpanded ? "w-full" : "w-full md:w-[48%]"} transition-all duration-700`}
                >
                  <div
                    onClick={() => toggleGroup(group.category)}
                    className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-md hover:shadow-sky-500/30 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 group"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <img
                          loading="lazy"
                          src={imageMap[group.groupImage] || imageMap.defaultImg}
                          alt={`${group.category} course category icon`}
                          className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="text-center md:text-left">
                          <h2 className="text-xl font-semibold text-sky-300 mb-1 flex items-center gap-2">
                            {group.category}
                            <span className="text-xs text-gray-400">
                              ({group.courses.length})
                            </span>
                          </h2>
                          <p className="text-gray-400 text-sm">
                            {group.groupDesc}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Courses */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {visibleCourses.map((course, index) => (
                              <motion.div
                                key={course.courseID}
                                ref={(el) =>
                                  (courseRefs.current[
                                    `${group.category}_${index}`
                                  ] = el)
                                }
                                whileHover={{ scale: 1.03 }}
                                className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 hover:border-sky-400/40 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-500"
                              >
                                <div className="flex items-center gap-4">
                                  <img
                                    loading="lazy"
                                    src={imageMap[course.image] || imageMap.defaultImg}
                                    alt={`Course: ${course.title}`}
                                    className="h-16 w-16 object-contain"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-sky-300 text-[1.1rem] flex items-center gap-2">
                                      {course.title}
                                      {course.badge && (
                                        <span
                                          className={`text-[0.7rem] px-2 py-0.5 rounded-full ${
                                            course.badge === "New"
                                              ? "bg-green-600/40 text-green-300"
                                              : course.badge === "Popular"
                                              ? "bg-amber-600/40 text-amber-300"
                                              : "bg-purple-600/40 text-purple-300"
                                          }`}
                                        >
                                          {course.badge}
                                        </span>
                                      )}
                                    </h3>
                                    <p className="text-gray-300 text-xs">
                                      {course.desc}
                                    </p>
                                  </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCourseDescription(course.courseID);
                                    }}
                                    className={`px-3 py-1 text-xs rounded-full ${
                                      courseDescExpanded[course.courseID]
                                        ? "bg-red-600 text-white"
                                        : "bg-sky-600 text-white"
                                    } transition-all duration-300`}
                                  >
                                    {courseDescExpanded[course.courseID]
                                      ? "⬆ Hide Details"
                                      : "⬇ Show Details"}
                                  </button>

                                  <a
                                    href={`https://wa.me/${whatsappNumber}?text=${encodeMessage(course.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-full text-xs transition-all duration-300 flex items-center justify-center gap-1"
                                  >
                                    <i className="bi bi-whatsapp text-sm"></i> Ask
                                    on WhatsApp
                                  </a>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!isExpanded && (
                        <div className="text-right mt-4">
                          <span className="text-sky-400 text-sm italic">
                            Click to view courses ⬇
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
