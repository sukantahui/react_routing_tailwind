// src/Teachers.jsx
import React from "react";
import teachers from "../../data/teachers.json";

// ✅ Import teacher images
import teacher1 from "../../assets/teacher1.jpg";
import teacher2 from "../../assets/teacher2.jpg";
import teacher3 from "../../assets/teacher3.jpg";
import teacher4 from "../../assets/teacher4.jpg";
import teacher5 from "../../assets/teacher5.jpg";
import teacher6 from "../../assets/teacher6.jpg";

// ✅ Map filenames to imports
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
    <section
      id="teachers"
      className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 drop-shadow-lg">
          Meet Our Instructors
        </h2>
        <p className="text-center text-gray-400 mb-10 text-sm sm:text-base">
          Our team of experienced mentors are passionate about helping students
          achieve excellence in web development and beyond.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-sky-500/20 transition-all duration-300 p-6 pt-16"
            >
              {/* Circle Image */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-sky-400 shadow-lg">
                <img
                  src={images[teacher.image]}
                  alt={`${teacher.name} - ${teacher.title}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="text-center mt-4">
                <h3 className="text-lg font-semibold text-sky-300">
                  {teacher.name}
                </h3>
                <p className="text-sm text-indigo-300 mb-2">{teacher.title}</p>
                {teacher.email && (
                  <p className="text-sm text-gray-400 mb-3">
                    📧 {teacher.email}
                  </p>
                )}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {teacher.bio}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
