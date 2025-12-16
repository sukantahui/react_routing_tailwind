// src/components/study/java/topics/loops-for/Topic6.jsx

import React from "react";

// 🔹 Answer Template
import JavaProjectAnswerTemplate from "../../../JavaProjectAnswerTemplate";

// 🔹 Project JSON
import projectData from "./for-loop-java-projects.json";

export default function Topic6() {
  return (
    <div className="space-y-16">

      {/* ================= TOPIC INTRO ================= */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-sky-300">
          Project Work – For Loop (ICSE Class IX)
        </h2>

        <p className="text-slate-400 text-sm max-w-4xl leading-relaxed">
          This section contains ICSE Class IX Java project work based on
          <b> for loop</b>, covering number-based problems, execution flow,
          and logical reasoning using <b>BlueJ</b>.
        </p>
      </section>

      {/* ================= PROJECT ANSWERS ================= */}
      <JavaProjectAnswerTemplate data={projectData} />

    </div>
  );
}
