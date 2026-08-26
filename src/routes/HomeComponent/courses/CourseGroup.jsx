// src/routes/HomeComponent/courses/CourseGroup.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imageMap, smoothEase } from "./constants.jsx";
import CourseCard from "./CourseCard";

const CourseGroup = ({
  group,
  isExpanded,
  toggleGroup,
  filteredCourses,
  courseRefs,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: true }}
      className={`${isExpanded ? "w-full" : "w-full md:w-[48%]"} transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
    >
      <div
        onClick={() => toggleGroup(group.category)}
        className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-md hover:shadow-sky-500/30 overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1 group"
      &gt;
        <div className="p-6 md:p-8">
          {/* Group header */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              loading="lazy"
              src={imageMap[group.groupImage] || imageMap.defaultImg}
              alt={`${group.category} course category icon`}
              className="h-16 w-16 object-contain transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
            />
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h2 className="text-xl font-semibold text-sky-300 mb-0">
                  {group.category}
                </h2>

                {/* 🆕 Styled Batch Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                                 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 
                                 border border-sky-400/30 text-sky-300 
                                 text-[0.65rem] font-medium tracking-wide
                                 shadow-sm shadow-sky-500/10
                                 group-hover:shadow-sky-500/30 group-hover:scale-105
                                 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {group.courses.length} {group.courses.length === 1 ? "Course" : "Courses"}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{group.groupDesc}</p>
            </div>
          </div>

          {/* Course list */}
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.7,
                  ease: smoothEase,
                  staggerChildren: 0.05,
                  staggerDirection: 1,
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                onClick={(e) => e.stopPropagation()}
              &gt;
                {filteredCourses(group).map((course, index) => (
                  <CourseCard
                    key={course.courseID}
                    course={course}
                    groupCategory={group.category}
                    index={index}
                    courseRefs={courseRefs}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <div className="text-right mt-4">
              <span className="text-sky-400 text-sm italic">Click to view courses ⬇</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseGroup;