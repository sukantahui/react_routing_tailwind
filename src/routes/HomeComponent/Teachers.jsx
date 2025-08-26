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
    bio: "Ritaja guides students in lab sessions with patience and precision, helping them gain real-world skills. She encourages hands-on practice and ensures every student is confident with the tools.",
  },
];

const Teachers = () => {
  return (
    <section id="teachers" className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl text-center text-amber-800 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500">Meet Our Instructors</h2>
        <hr className='mb-4  border border-gray-700'></hr>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            // <div key={teacher.name} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col h-full transition hover:shadow-xl">
            <div key={teacher.name} className="">
              <div className="flex justify-center items-center mt-12">
                <div className="relative">
                  {/* Gray Rectangle */}
                  <div className="w-80 h-52 bg-gray-400 rounded-lg flex flex-col justify-end p-2">
                    <h3 className='text-purple-600'><b>{teacher.title}</b></h3>
                    <h6>{teacher.name}</h6>
                    <p className='text-black text-sm'>{teacher.bio}</p>

                  </div>

                  {/* Orange Circle */}
                  <div className="absolute -top-16 left-3/4 -translate-x-1/2 w-32 h-32 rounded-full">
                    <img
                      src={teacher.image}
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
