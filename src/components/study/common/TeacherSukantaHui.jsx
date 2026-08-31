"use client";
import React from "react";
import TeacherProfileCard from "./TeacherProfileCard";

export default function TeacherSukantaHui({ note, className = "" }) {
  return (
    <div className={`my-6 ${className}`}>
      <TeacherProfileCard teacher={{ bio: note }} />
    </div>
  );
}
