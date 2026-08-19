// components/HomeComponent/Courses.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
// import coursesData from "../../data/courses.json"; // adjust path if needed
// import coursesData from "../../../../data/courses.json"; // adjust path if needed
import coursesData from "@data/courses.json"; // adjust path if needed

import { renderBold, imageMap, smoothEase } from "./constants.jsx";
import SearchBar from "./SearchBar";
import CourseGroup from "./CourseGroup";

const Courses = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const courseRefs = useRef({});

  const toggleGroup = (category) => {
    setExpandedGroups((prev) => (prev[category] ? {} : { [category]: true }));
  };

  const filteredCourses = (group) =>
    group.courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.more.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const expandedCategory = Object.keys(expandedGroups)[0];
    if (expandedCategory) {
      const ref = courseRefs.current[`${expandedCategory}_1`];
      if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [expandedGroups]);

  return (
    <section
      id="courses"
      className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_60%)]"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300 drop-shadow-lg"
        >
          Explore Our Courses
        </motion.h1>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Empower your career with expert-led training programs and academic
          courses designed to make you <strong>industry ready</strong>.
        </p>

        {/* Search */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Course Groups */}
        <div className="flex flex-wrap gap-8 justify-center">
          {coursesData.map((group) => {
            const visibleCourses = filteredCourses(group);
            if (visibleCourses.length === 0 && searchTerm) return null;
            return (
              <CourseGroup
                key={group.category}
                group={group}
                isExpanded={!!expandedGroups[group.category]}
                toggleGroup={toggleGroup}
                filteredCourses={filteredCourses}
                courseRefs={courseRefs}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;