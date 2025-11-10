import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "../../data/courses.json";

// Images
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
  const [activeBadge, setActiveBadge] = useState("All");
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
      `Hi, I'm interested in the "${title}" course. Could you please share location and fee details?`
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
        course.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <section
      id="courses"
      className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_60%)]"
      ></motion.div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-400 to-cyan-300 drop-shadow-lg"
        >
          Our Courses
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-10 max-w-2xl mx-auto"
        >
          Browse our categories and find the perfect course for your goals —
          from coding to accounting, tax, and data analytics.
        </motion.p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 w-full md:w-1/2 placeholder-gray-500"
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

                    {/* Expandable Course List */}
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
                                <div>
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
                                  {courseDescExpanded[course.courseID] && (
                                    <p className="text-gray-300 text-xs mt-1 leading-relaxed">
                                      {course.more}
                                    </p>
                                  )}
                                </div>
                              </div>

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
                                    ? "⬆ Hide Description"
                                    : "⬇ Show Description"}
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
