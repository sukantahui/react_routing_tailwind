import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "../../data/courses.json";

// Image imports
import javaImg from "../../assets/course-images/java-logo.svg";
import reactImg from "../../assets/course-images/react-logo.svg";
import pythonImg from "../../assets/course-images/python-logo.svg";
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

  const toggleGroup = (category) => {
    setExpandedGroups((prev) => {
      const isSameGroup = prev[category];
      return isSameGroup ? {} : { [category]: true };
    });
    setCourseDescExpanded({});
  };

  const toggleCourseDescription = (courseID) => {
    setCourseDescExpanded((prev) => ({
      ...prev,
      [courseID]: !prev[courseID],
    }));
  };

  const encodeMessage = (title) =>
    encodeURIComponent(
      `Hi, I'm interested in the "${title}" course. Could you please share duration, fee details, and admission info?`
    );

  useEffect(() => {
    const expandedCategory = Object.keys(expandedGroups)[0];
    if (expandedCategory) {
      const ref = courseRefs.current[`${expandedCategory}_1`];
      if (ref) ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [expandedGroups]);

  const filteredCourses = (group) => {
    return group.courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.more.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <section
      id="courses"
      className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
    >
      {/* Soft Animated Background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_60%)]"
      ></motion.div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300 drop-shadow-lg"
        >
          Explore Our Courses
        </motion.h2>

        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Empower your future with our wide range of skill-based and academic
          courses designed to make you industry-ready.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="🔍 Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-3 w-full md:w-1/2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-sky-400 focus:outline-none placeholder-gray-500"
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
                className={`${
                  isExpanded ? "w-full" : "w-full md:w-[48%]"
                } transition-all duration-700`}
              >
                {/* Group Card */}
                <div
                  onClick={() => toggleGroup(group.category)}
                  className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-md hover:shadow-sky-500/30 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 group"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <img
                        src={imageMap[group.groupImage] || imageMap.defaultImg}
                        alt={group.category}
                        className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="text-center md:text-left">
                        <h4 className="text-xl font-semibold text-sky-300 mb-1 flex items-center gap-2">
                          {group.category}
                          <span className="text-xs text-gray-400">
                            ({group.courses.length})
                          </span>
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
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
                                  src={
                                    imageMap[course.image] || imageMap.defaultImg
                                  }
                                  alt={course.title}
                                  className="h-16 w-16 object-contain"
                                />
                                <div className="flex-1">
                                  <h6 className="font-semibold text-sky-300 text-[1.1rem] flex items-center gap-2">
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
                                  </h6>
                                  <p className="text-gray-400 text-xs">
                                    {course.desc}
                                  </p>

                                  {/* Ratings & Info */}
                                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
                                    {course.rating && (
                                      <span className="text-amber-400">
                                        ⭐ {course.rating} ({course.studentsEnrolled || 0}+)
                                      </span>
                                    )}
                                    {course.duration && (
                                      <span className="text-sky-300">
                                        ⏳ {course.duration}
                                      </span>
                                    )}
                                    {course.level && (
                                      <span className="text-gray-300">
                                        🎓 {course.level}
                                      </span>
                                    )}
                                    {course.mode && (
                                      <span className="text-green-300">
                                        💻 {course.mode}
                                      </span>
                                    )}
                                  </div>

                                  {/* Skills */}
                                  {course.skills && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {course.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="text-[0.7rem] bg-sky-600/20 text-sky-300 px-2 py-1 rounded-full"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {courseDescExpanded[course.courseID] && (
                                    <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                                      {course.more}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Instructor & Fee */}
                              <div className="flex justify-between text-xs text-gray-400 mt-3">
                                {course.instructor && (
                                  <span>👩‍🏫 {course.instructor}</span>
                                )}
                                {course.fee && (
                                  <span className="text-green-400 font-semibold">
                                    💰 {course.fee}
                                  </span>
                                )}
                              </div>

                              {/* 🟢 Merit Discount Section */}
                              {course.meritDiscount?.available && (
                                <div className="mt-3 text-xs bg-sky-900/30 border border-sky-600/30 rounded-lg p-2 text-sky-300">
                                  <p className="font-semibold flex items-center gap-2">
                                    🎓 Merit Discount Available
                                  </p>
                                  <p>
                                    Up to{" "}
                                    <span className="text-sky-200 font-semibold">
                                      {course.meritDiscount.maxDiscountPercent}%
                                    </span>{" "}
                                    off (Currently{" "}
                                    <span className="text-green-300 font-semibold">
                                      {course.meritDiscount.actualDiscountPercent}%
                                    </span>
                                    )
                                  </p>
                                  <p className="text-gray-400 mt-1 italic">
                                    {course.meritDiscount.criteria}
                                  </p>
                                </div>
                              )}

                              {/* Buttons */}
                              <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCourseDescription(course.courseID);
                                  }}
                                  className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                                    courseDescExpanded[course.courseID]
                                      ? "bg-red-600 text-white hover:bg-red-700"
                                      : "bg-sky-600 text-white hover:bg-sky-700"
                                  }`}
                                >
                                  {courseDescExpanded[course.courseID]
                                    ? "⬆ Hide Details"
                                    : "⬇ Show Details"}
                                </button>

                                <a
                                  href={`https://wa.me/${whatsappNumber}?text=${encodeMessage(
                                    course.title
                                  )}`}
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
  );
};

export default Courses;
