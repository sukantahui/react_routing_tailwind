// ===============================================
// Courses.jsx - Modern Dark Glassmorphism Course Explorer
// -----------------------------------------------
// Features:
// - Category quick filter pills + Search with glow ring
// - Frosted glass category cards with expand/collapse
// - Detailed course modules with WhatsApp direct inquiry
// ===============================================

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "../../data/courses.json";

// Course & Group Images
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

const filterCategories = [
  "All",
  "Programming",
  "Web Development",
  "Accounting & Tax",
  "School & College",
  "Data & AI",
];

const Courses = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [courseDescExpanded, setCourseDescExpanded] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const whatsappNumber = "919432456083";
  const courseRefs = useRef({});

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
      const ref = courseRefs.current[`${expandedCategory}_0`];
      if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [expandedGroups]);

  const filteredCourses = (group) =>
    group.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.more && c.more.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const isGroupMatchingFilter = (categoryName) => {
    if (selectedFilter === "All") return true;
    const cat = categoryName.toLowerCase();
    if (selectedFilter === "Programming") return cat.includes("program") || cat.includes("java") || cat.includes("python") || cat.includes("c ");
    if (selectedFilter === "Web Development") return cat.includes("web") || cat.includes("react") || cat.includes("frontend") || cat.includes("full stack");
    if (selectedFilter === "Accounting & Tax") return cat.includes("account") || cat.includes("tally") || cat.includes("tax") || cat.includes("gst");
    if (selectedFilter === "School & College") return cat.includes("icse") || cat.includes("isc") || cat.includes("student") || cat.includes("academic") || cat.includes("class");
    if (selectedFilter === "Data & AI") return cat.includes("data") || cat.includes("analysis") || cat.includes("sql") || cat.includes("database");
    return true;
  };

  const encodeMessage = (title) =>
    encodeURIComponent(
      `Hi Coder & AccoTax! I am interested in the "${title}" course. Could you please share the syllabus, schedule, and admission details?`
    );

  return (
    <section
      id="courses"
      className="relative py-16 bg-slate-950 text-slate-100 border-b border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
            Course Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Explore Our Courses & Programs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Hands-on training designed for beginners, high-school students, and job seekers.
          </p>
        </div>

        {/* 🌟 Search Bar & Category Filters */}
        <div className="max-w-4xl mx-auto mb-12 space-y-5">
          {/* Search Box */}
          <div className="relative">
            <i className="bi bi-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search by course name, topic, or technology (e.g. React, Python, Tally, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none transition-all shadow-inner backdrop-blur-xl"
              aria-label="Search courses"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 🌟 Course Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {coursesData
            .filter((group) => isGroupMatchingFilter(group.category))
            .map((group) => {
              const isExpanded = expandedGroups[group.category];
              const visibleCourses = filteredCourses(group);
              if (visibleCourses.length === 0 && searchTerm) return null;

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`${isExpanded ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <div
                    onClick={() => toggleGroup(group.category)}
                    className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/90 hover:border-sky-500/40 p-6 sm:p-7 cursor-pointer transition-all duration-300 shadow-xl shadow-black/20 group hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-sky-500/40 transition-all duration-300">
                          <img
                            loading="lazy"
                            src={imageMap[group.groupImage] || imageMap.defaultImg}
                            alt={`${group.category} icon`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2">
                            <span>{group.category}</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                              {group.courses.length} courses
                            </span>
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 line-clamp-1">{group.groupDesc}</p>
                        </div>
                      </div>

                      {/* Expand Chevron */}
                      <div className="w-9 h-9 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-sky-400 group-hover:border-sky-500/40 transition-all">
                        <i className={`bi bi-chevron-${isExpanded ? "up" : "down"} text-sm transition-transform duration-300`}></i>
                      </div>
                    </div>

                    {/* Expandable Course Items */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {visibleCourses.map((course, index) => (
                            <motion.div
                              key={course.courseID}
                              ref={(el) => (courseRefs.current[`${group.category}_${index}`] = el)}
                              className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-start gap-3.5 mb-3">
                                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center flex-shrink-0">
                                    <img
                                      loading="lazy"
                                      src={imageMap[course.image] || imageMap.defaultImg}
                                      alt={`Course: ${course.title}`}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-bold text-white text-base">{course.title}</h4>
                                      {course.badge && (
                                        <span
                                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                            course.badge === "New"
                                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                              : course.badge === "Popular"
                                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                              : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                          }`}
                                        >
                                          {course.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">{course.desc}</p>
                                  </div>
                                </div>

                                {/* Expanded More Details */}
                                {courseDescExpanded[course.courseID] && course.more && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="my-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed"
                                  >
                                    <strong className="text-sky-400 block mb-1">Topics Covered:</strong>
                                    {course.more}
                                  </motion.div>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/80">
                                {course.more && (
                                  <button
                                    onClick={() => toggleCourseDescription(course.courseID)}
                                    className="flex-1 text-xs font-semibold py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                                  >
                                    {courseDescExpanded[course.courseID] ? "Hide Syllabus" : "View Syllabus"}
                                  </button>
                                )}

                                <a
                                  href={`https://wa.me/${whatsappNumber}?text=${encodeMessage(course.title)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition"
                                >
                                  <i className="bi bi-whatsapp"></i>
                                  <span>Inquire on WhatsApp</span>
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="flex items-center justify-end gap-1 text-sky-400 text-xs font-semibold mt-3">
                        <span>Click to view {group.courses.length} courses</span>
                        <i className="bi bi-arrow-right"></i>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
