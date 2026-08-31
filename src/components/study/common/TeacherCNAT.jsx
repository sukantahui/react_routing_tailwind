"use client";

import React from "react";
import TeacherProfileCard from "./TeacherProfileCard";

const cnatTeacherData = {
  name: "Mr. CNAT",
  designation: "Lead Educator & Corporate Financial Modeling Trainer",
  organization: "CNAT Academy",
  location: "Barrackpore, West Bengal, India",
  photo: "/teachers/cnat.jpg",
  bio: "Lead Financial Modeling & TallyPrime Specialist with extensive training expertise in Commercial Accounting, Double-Entry Bookkeeping, GST, TDS/TCS Compliance, Inventory Control, and Corporate Financial Reporting.",
  social: {
    linkedin: "https://www.linkedin.com/in/cnat-academy/",
    twitter: "https://twitter.com/cnat_academy",
    website: "https://www.cnatacademy.in",
    github: "https://github.com/cnat-academy",
    email: "contact@cnatacademy.in",
    phone: "+917003756860",
    whatsapp: "+917003756860"
  }
};

export default function TeacherCNAT({ note, className = "" }) {
  const teacherObj = note
    ? { ...cnatTeacherData, bio: note }
    : cnatTeacherData;

  return (
    <div className={`my-6 ${className}`}>
      <TeacherProfileCard teacher={teacherObj} />
    </div>
  );
}
