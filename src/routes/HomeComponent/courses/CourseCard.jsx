// src/routes/HomeComponent/courses/CourseCard.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  imageMap,
  smoothEase,
  whatsappNumber,
  encodeWhatsAppMessage,
} from "./constants.jsx";
import CourseDetails from "./CourseDetails";

const CourseCard = ({ course, groupCategory, index, courseRefs }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => setIsExpanded((prev) => !prev);

  const hasDetails = course.details && Object.keys(course.details).length > 0;

  return (
    <motion.div
      ref={(el) => (courseRefs.current[`${groupCategory}_${index}`] = el)}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.5, ease: smoothEase }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="group relative bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70
                 border border-gray-700/50 rounded-xl p-5 backdrop-blur-sm
                 hover:border-sky-400/50 hover:shadow-[0_8px_30px_rgba(56,189,248,0.15)]
                 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
    >
      {/* Decorative glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/0 via-sky-400/5 to-purple-500/0
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header: Image, Title, Badge */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gray-800/50 border border-gray-700/50
                          flex items-center justify-center p-2 group-hover:border-sky-400/30
                          transition-all duration-300">
            <img
              loading="lazy"
              src={imageMap[course.image] || imageMap.defaultImg}
              alt={`Course: ${course.title}`}
              className="w-full h-full object-contain filter drop-shadow-sm
                         group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sky-300 text-base leading-tight
                             group-hover:text-sky-200 transition-colors duration-300">
                {course.title}
              </h3>
              {course.badge && (
                <span
                  className={`shrink-0 text-[0.6rem] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider
                    ${
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

            <p className="text-gray-400 text-xs mt-1 leading-relaxed line-clamp-2">
              {course.desc}
            </p>
          </div>
        </div>

        {/* Meta Info: Level, Duration, Mode, Fee, Instructor, Rating */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-3">
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30">
            <span className="block text-[0.5rem] text-gray-500 uppercase tracking-wider">Level</span>
            <span className="text-xs font-medium text-gray-300">{course.level || "–"}</span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30">
            <span className="block text-[0.5rem] text-gray-500 uppercase tracking-wider">Duration</span>
            <span className="text-xs font-medium text-gray-300">{course.duration || "–"}</span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30">
            <span className="block text-[0.5rem] text-gray-500 uppercase tracking-wider">Mode</span>
            <span className="text-xs font-medium text-gray-300">{course.mode || "–"}</span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30">
            <span className="block text-[0.5rem] text-gray-500 uppercase tracking-wider">Fee</span>
            <span className="text-xs font-medium text-emerald-300">{course.fee || "–"}</span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30">
            <span className="block text-[0.5rem] text-gray-500 uppercase tracking-wider">Instructor</span>
            <span className="text-xs font-medium text-gray-300">{course.instructor || "–"}</span>
          </div>
          <div className="bg-gray-800/40 rounded-md px-2 py-1 text-center border border-gray-700/30 flex items-center justify-center gap-1">
            {course.rating && (
              <>
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-xs font-medium text-gray-300">{course.rating}</span>
              </>
            )}
            {course.studentsEnrolled && (
              <span className="text-[0.5rem] text-gray-500 ml-1">
                ({course.studentsEnrolled} enrolled)
              </span>
            )}
          </div>
        </div>

        {/* Skills Tags */}
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {course.skills.slice(0, 6).map((skill, i) => (
              <span
                key={i}
                className="text-[0.55rem] bg-gray-800/50 border border-gray-700/40 px-2 py-0.5 rounded-full text-gray-300"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 6 && (
              <span className="text-[0.55rem] text-gray-500">+{course.skills.length - 6} more</span>
            )}
          </div>
        )}

        {/* Merit Discount (if available) */}
        {course.meritDiscount?.available && (
          <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-3 py-1.5">
            <p className="text-[0.6rem] text-emerald-300">
              🎓 Merit discount available up to <strong>{course.meritDiscount.maxDiscountPercent}%</strong> 
              {' '}(actual: {course.meritDiscount.actualDiscountPercent}%) – {course.meritDiscount.criteria}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
          <button
            onClick={toggleDetails}
            className={`w-full sm:w-auto px-4 py-1.5 text-xs font-medium rounded-full
                       transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                       flex items-center justify-center gap-1.5
                       ${
                         isExpanded
                           ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                           : "bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30"
                       }`}
          >
            {isExpanded ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Hide Details
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Show Details
              </>
            )}
          </button>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeWhatsAppMessage(course.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white
                       px-4 py-1.5 rounded-full text-xs font-medium
                       transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                       flex items-center justify-center gap-1.5
                       hover:shadow-[0_4px_20px_rgba(34,197,94,0.3)]"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Ask on WhatsApp
          </a>
        </div>

        {/* Expandable Details */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-gray-700/40">
                {hasDetails ? (
                  <CourseDetails details={course.details} />
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">{course.more}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CourseCard;