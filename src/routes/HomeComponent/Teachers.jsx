// src/Teachers.jsx
import React from 'react';
import teacher1 from '../../assets/teacher1.jpg';
import teacher2 from '../../assets/teacher2.jpg';
import teacher3 from '../../assets/teacher3.jpg';
import teacher4 from '../../assets/teacher4.jpg';
import teacher5 from '../../assets/teacher5.jpg';
import teacher6 from '../../assets/teacher6.jpg';

const teachers = [
  {
    name: "Sukanta Hui",
    title: "Senior Web Development Instructor",
    image: teacher1,
    bio: "Sukanta brings 20+ years of full-stack experience and has mentored over 500 developers worldwide.",
  },
  {
    name: "Tanusree Hui",
    title: "Data Structures & Algorithms Mentor",
    image: teacher2,
    bio: "Tanusree is an ex-Google engineer who specializes in competitive programming and interview prep.",
  },
  {
    name: "Chandan Das",
    title: "Data Analytics and Taxation Expert",
    image: teacher3,
    bio: "Chandan has 15+ years of experience in taxation and data analytics for small and large businesses.",
  },
  {
    name: "Sreeparna Das",
    title: "Data Structures and Algorithms",
    image: teacher4,
    bio: "Sreeparna simplifies complex DSA topics and focuses on logic building with hands-on coding sessions.",
  },
  {
    name: "Mounita Bhandari",
    title: "Lab Instructor",
    image: teacher5,
    bio: "Mounita ensures practical knowledge through lab-based learning, supporting students step-by-step.",
  },
  {
    name: "Ritaja Ghosh",
    title: "Lab Instructor",
    image: teacher6,
    bio: "Ritaja guides students in lab sessions with patience and precision, helping them gain real-world skills.",
  },
];

const Teachers = () => {
  return (
    <section id="teachers" className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Instructors</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-full transition hover:shadow-xl">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h5 className="text-xl font-semibold mb-1">{teacher.name}</h5>
                <p className="text-sm text-gray-500 mb-3">{teacher.title}</p>
                <p className="text-gray-700 text-sm">{teacher.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
