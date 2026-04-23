import React from "react";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic16_files/topic16_questions";

import clean from "./topic16_files/clean.py?raw";
import docstring from "./topic16_files/docstring.py?raw";
import singleResponsibility from "./topic16_files/single_responsibility.py?raw";
import bestReal from "./topic16_files/best_real.py?raw";

export default function Topic16() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12 bg-gray-900 text-gray-100">
      <section className="space-y-6 reveal-fade-up">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ✅ Best Practices: Writing Clean and Reusable Functions
        </h1>
        <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
          <ul className="list-disc list-inside text-gray-300">
            <li>Use descriptive names: `calculate_average` not `calc`.</li>
            <li>Keep functions small (≤20 lines).</li>
            <li>Single responsibility: one function does one thing.</li>
            <li>Add docstrings.</li>
            <li>Avoid global variables.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-8 reveal-fade-up">
        <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">💻 Examples</h2>
        <div><PythonFileLoader fileModule={clean} title="clean.py" /></div>
        <div><PythonFileLoader fileModule={docstring} title="docstring.py" /></div>
        <div><PythonFileLoader fileModule={singleResponsibility} title="single_responsibility.py" /></div>
        <div><PythonFileLoader fileModule={bestReal} title="best_real.py" /></div>
      </section>

      <section className="reveal-fade-up"><FAQTemplate title="Best Practices FAQs" questions={questions} /></section>
      <section className="reveal-fade-up"><Teacher note={"Code is read more often than written. Teach students to write functions as if the next maintainer is a violent psychopath who knows where you live. Clarity over cleverness."} /></section>
    </div>
  );
}