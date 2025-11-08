import React, { useState } from "react";
import { motion } from "framer-motion";
import teachers from "../../data/teachers.json";

import teacher1 from "../../assets/teacher1.jpg";
import teacher2 from "../../assets/teacher2.jpg";
import teacher3 from "../../assets/teacher3.jpg";
import teacher4 from "../../assets/teacher4.jpg";
import teacher5 from "../../assets/teacher5.jpg";
import teacher6 from "../../assets/teacher6.jpg";

const images = {
  "teacher1.jpg": teacher1,
  "teacher2.jpg": teacher2,
  "teacher3.jpg": teacher3,
  "teacher4.jpg": teacher4,
  "teacher5.jpg": teacher5,
  "teacher6.jpg": teacher6,
};

const Teachers = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-3xl rounded-full opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-300 drop-shadow-lg"
        >
          Meet Our Instructors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-14 max-w-2xl mx-auto"
        >
          Learn from industry experts who bring years of real-world experience,
          creativity, and mentorship to every class.
        </motion.p>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.name} teacher={teacher} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeacherCard = ({ teacher, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      className="relative group bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-lg p-8 pt-20 transition-all duration-500 hover:shadow-sky-500/30 hover:-translate-y-1"
    >
      {/* Floating circle image */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-sky-400/60 transition-all duration-500"
        >
          <img
            src={images[teacher.image]}
            alt={teacher.name}
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-sky-400 group-hover:shadow-[0_0_25px_6px_rgba(56,189,248,0.6)] transition-all duration-500"></div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="text-center mt-4 space-y-2">
        <h3 className="text-xl font-semibold text-sky-300">{teacher.name}</h3>
        <p className="text-sm text-indigo-300">{teacher.title}</p>
        {teacher.email && (
          <p className="text-sm text-gray-400">
            <span className="text-sky-400">📧</span> {teacher.email}
          </p>
        )}
      </div>

      {/* Bio Section with ellipsis and smooth expand */}
      <div
        className={`relative text-gray-300 text-sm mt-4 text-center leading-relaxed transition-all duration-500 ease-in-out ${
          expanded ? "max-h-60" : "max-h-16"
        } overflow-hidden`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: expanded ? "unset" : "3",
        }}
      >
        {teacher.bio}

        {/* Fade overlay with dots */}
        {!expanded && (
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-900 to-transparent flex justify-center items-end pb-2 text-gray-400 text-sm">
            ...
          </div>
        )}
      </div>

      {teacher.bio.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="block mx-auto text-sky-400 hover:text-sky-300 text-sm mt-2 underline underline-offset-4 transition-colors duration-300"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default Teachers;
