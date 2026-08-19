// ===============================================
// Teachers.jsx - Faculty & Mentors Section
// ===============================================

import React, { useState } from "react";
import teachersData from "../../data/teachers.json";

import teacher1 from "../../assets/teachers/teacher1.jpg";
import teacher2 from "../../assets/teachers/teacher2.jpg";
import teacher3 from "../../assets/teachers/teacher3.jpg";
import teacher4 from "../../assets/teachers/teacher4.jpg";
import teacher5 from "../../assets/teachers/teacher5.jpg";
import teacher6 from "../../assets/teachers/teacher6.jpg";
import teacher7 from "../../assets/teachers/teacher7.jpg";

const imageMap = {
  "teacher1.jpg": teacher1,
  "teacher2.jpg": teacher2,
  "teacher3.jpg": teacher3,
  "teacher4.jpg": teacher4,
  "teacher5.jpg": teacher5,
  "teacher6.jpg": teacher6,
  "teacher7.jpg": teacher7,
};

const TeacherCard = ({ teacher }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const avatar = imageMap[teacher.image] || teacher1;

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300 shadow-xl">
      <div className="flex flex-col items-center text-center">
        {/* Mentor Image with generous spacing */}
        <div className="mb-5 relative">
          <img
            src={avatar}
            alt={teacher.name}
            loading="lazy"
            className="w-24 h-24 rounded-full object-cover border-2 border-sky-400/90 shadow-xl shadow-sky-500/10 bg-slate-800"
          />
        </div>

        {/* Name with proper margin */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1.5">
          {teacher.name}
        </h3>

        {/* Title with distinct styling and generous bottom spacing */}
        <p className="text-xs sm:text-sm text-sky-400 font-medium mb-5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 inline-block">
          {teacher.title}
        </p>

        {/* Bio text with clear separation */}
        {teacher.bio && (
          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/90 pt-4 mb-4 text-left w-full">
            <p className={!showFullBio ? "line-clamp-3" : ""}>
              {teacher.bio}
            </p>
            {teacher.bio.length > 120 && (
              <button
                type="button"
                onClick={() => setShowFullBio(!showFullBio)}
                className="text-sky-400 hover:text-sky-300 text-xs font-semibold mt-2 focus:outline-none block"
              >
                {showFullBio ? "Show Less ↑" : "Read Full Bio →"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Social / Contact Links with proper spacing */}
      <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800/90 w-full mt-2">
        {teacher.email && (
          <a
            href={`mailto:${teacher.email}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-sky-300 text-xs border border-slate-700 transition"
            title={teacher.email}
          >
            <i className="bi bi-envelope text-sky-400"></i>
            <span>Email</span>
          </a>
        )}
        {teacher.github && (
          <a
            href={`https://github.com/${teacher.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 transition"
            title={`GitHub: ${teacher.github}`}
          >
            <i className="bi bi-github text-purple-400"></i>
            <span>GitHub</span>
          </a>
        )}
      </div>
    </div>
  );
};

const Teachers = () => {
  return (
    <section id="teachers" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Faculty
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Meet Our Mentors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Industry professionals offering personalized 1-on-1 mentorship and practical guidance.
          </p>
        </div>

        {/* Mentors Grid with generous gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(teachersData) && teachersData.length > 0 ? (
            teachersData.map((teacher, index) => (
              <TeacherCard key={teacher.name || index} teacher={teacher} />
            ))
          ) : (
            <p className="text-center text-slate-400 col-span-full">
              No mentor information available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Teachers;