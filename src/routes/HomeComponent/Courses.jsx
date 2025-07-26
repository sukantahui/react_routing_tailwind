// src/Courses.jsx
import React, { useEffect, useRef, useState } from 'react';
import coursesData from '../../data/courses.json';

// Images
import javaImg from '../../assets/course-images/java-logo.svg';
import reactImg from '../../assets/course-images/react-logo.svg';
import pythonImg from '../../assets/course-images/python-logo.svg';
import defaultImg from '../../assets/course-images/default-logo.svg';
import webDevImg from '../../assets/group-images/webdev.logo.svg';
import codeImg from '../../assets/group-images/code.logo.svg';
import excelImg from '../../assets/group-images/excel.logo.svg';
import taxImg from '../../assets/group-images/tax.logo.svg';
import hardwareImg from '../../assets/group-images/hardware.logo.svg';
import programmingImg from '../../assets/group-images/programming.logo.svg';
import accountsImg from '../../assets/group-images/accounts.logo.svg';
import dataanalysisImg from '../../assets/group-images/dataanalysis.logo.svg';
import studentImg from '../../assets/group-images/student.logo.svg';

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
    encodeURIComponent(`Hi, I'm interested in the "${title}" course. Could you please share location and fee details?`);

  useEffect(() => {
    const expandedCategory = Object.keys(expandedGroups)[0];
    if (expandedCategory) {
      const ref = courseRefs.current[`${expandedCategory}_1`];
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [expandedGroups]);

  return (
    <section id="courses" className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-10">🎓 Our Courses</h2>

        <div className="flex flex-wrap gap-6 justify-center">
          {coursesData.map((group) => {
            const isExpanded = expandedGroups[group.category];

            return (
              <div
                key={group.category}
                className={`${isExpanded ? 'w-full' : 'w-full md:w-[48%]'} transition-all duration-1500`}
              >
                <div
                  onClick={() => toggleGroup(group.category)}
                  className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg cursor-pointer overflow-hidden transition duration-300 hover:-translate-y-1"
                >
                  <div className="p-4">
                    <div className={`flex flex-col md:flex-row items-center gap-4 text-center md:text-left ${isExpanded ? 'w-full md:w-3/5 mx-auto' : ''}`}>
                      <img
                        src={imageMap[group.groupImage] || imageMap.defaultImg}
                        alt={group.category}
                        className="h-12 w-12 object-contain"
                      />
                      <div>
                        <h4 className="text-lg font-semibold text-blue-600">{group.category} ({group.courses.length})</h4>
                        <p className="text-sm text-gray-600 text-justify">{group.groupDesc}</p>
                      </div>
                    </div>

                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {group.courses.map((course, index) => (
                        <div
                          key={course.courseID}
                          ref={(el) => (courseRefs.current[`${group.category}_${index}`] = el)}
                        >
                          <div className="border rounded-lg p-3 flex flex-col h-full bg-gray-50 hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center gap-4">
                              <img
                                src={imageMap[course.image] || imageMap.defaultImg}
                                alt={course.title}
                                className="h-20 object-contain"
                              />
                              <div className="flex-1">
                                <h6 className="font-semibold text-sm mb-1 text-[1.2rem]">{course.title}</h6>
                                <p className="text-gray-500 text-xs mb-1">{course.desc}</p>
                                {courseDescExpanded[course.courseID] && (
                                  <p className="text-gray-700 text-xs mb-2">{course.more}</p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col mt-3 items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCourseDescription(course.courseID);
                                }}
                                className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition-all duration-300
                                ${courseDescExpanded[course.courseID]
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                                `}
                              >
                                {courseDescExpanded[course.courseID] ? '⬆ Hide Description' : '⬇ Show Description'}
                              </button>


                              <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeMessage(course.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition"
                              >
                                📱 Ask on WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {!isExpanded && (
                      <div className="text-right mt-4">
                        <span className="text-blue-500 text-sm">Click to view courses ⬇</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
