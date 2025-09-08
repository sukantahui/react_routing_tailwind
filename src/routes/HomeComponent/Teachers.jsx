// src/Teachers.jsx
import React from "react";
import teachers from "../../data/teachers.json";

// ✅ Import images manually from src/assets
import teacher1 from "../../assets/teacher1.jpg";
import teacher2 from "../../assets/teacher2.jpg";
import teacher3 from "../../assets/teacher3.jpg";
import teacher4 from "../../assets/teacher4.jpg";
import teacher5 from "../../assets/teacher5.jpg";
import teacher6 from "../../assets/teacher6.jpg";

// ✅ Map JSON image names to actual imports
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
    <section id="teachers" className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl text-center text-amber-800 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500">
          Meet Our Instructors
        </h2>
        <hr className="mb-4 border border-gray-700" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div key={teacher.name} className="">
              <div className="flex justify-center items-center mt-12">
                <div className="relative">
                  {/* Gray Rectangle */}
                  <div className="w-80 h-52 bg-gray-400 rounded-lg flex flex-col justify-end p-2">
                    <h3 className="text-purple-600">
                      <b>{teacher.title}</b>
                    </h3>
                    <h6>{teacher.name}</h6>
                    <p className="text-black text-sm">{teacher.bio}</p>
                  </div>

                  {/* Circle Image */}
                  <div className="absolute -top-16 left-3/4 -translate-x-1/2 w-32 h-32 rounded-full">
                    <img
                      src={images[teacher.image]} // ✅ Resolve filename to import
                      alt={`${teacher.name} - ${teacher.title}`}
                      className="w-full object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
