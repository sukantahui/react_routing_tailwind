"use client";
import React from "react";
import TeacherProfileCard, { defaultTeacher } from "./TeacherProfileCard";

const sukantaTeacherData = {
  ...defaultTeacher,
  name: "Sukanta Hui",
  designation: "Senior Software Architect · Lead Educator & Tech Mentor",
  organization: "Founder, Coder & AccoTax",
  location: "Barrackpore, West Bengal, India",
  photo: "/teachers/sukantahui.jpg"
};

export default function TeacherSukantaHui({ note, className = "" }) {
  const teacherObj = note
    ? { ...sukantaTeacherData, bio: note }
    : sukantaTeacherData;

  return (
    <div className={`my-6 ${className}`}>
      <TeacherProfileCard teacher={teacherObj} />
    </div>
  );
}
