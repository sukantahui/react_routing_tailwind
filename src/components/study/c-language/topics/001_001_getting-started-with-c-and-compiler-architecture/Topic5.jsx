import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic5_files/Module1ProjectsDemo.c?raw";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const projectData = {
  projectCategory: "Module 001_001 · Hands-on C Projects",
  subject: "C Programming",
  board: "WBCHSE / ICSE / BCA / B.Tech",
  class: "UG / High School",
  tools: ["GCC Compiler", "GDB", "VS Code"],
  institute: {
    name: "Coder & AccoTax",
    author: "Sukanta Hui",
    location: "Barrackpore, West Bengal"
  },
  projects: [
    {
      projectId: "P1.1",
      title: "CLI Student Report Generator",
      difficulty: "Beginner",
      description: "Write a C program that prompts the user to enter a student's roll number and total marks scored out of 100. Format the output with clear banners and display whether the student passed (marks >= 40) or needs improvement.",
      exampleText: "Roll Number: 101, Marks: 85.5",
      exampleOutput: "======================================\n Roll Number : 101\n Marks Scored: 85.50 / 100.00\n Status      : PASSED [GOOD JOB]\n======================================",
      logicExplanation: "1. Declare variables: int rollNumber and float marks.\n2. Use printf to prompt user.\n3. Validate scanf return value.\n4. Print formatted status using %.2f specifier.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    int rollNumber;\n    float marks;\n\n    printf("Enter Student Roll Number: ");\n    if (scanf("%d", &rollNumber) != 1) {\n        printf("Invalid input for roll number.\\n");\n        return 1;\n    }\n\n    printf("Enter Total Marks: ");\n    if (scanf("%f", &marks) != 1) {\n        printf("Invalid input for marks.\\n");\n        return 1;\n    }\n\n    printf("\\n--- Student Report ---\\n");\n    printf("Roll Number : %d\\n", rollNumber);\n    printf("Marks Scored: %.2f / 100.00\\n", marks);\n    printf("Status      : %s\\n", (marks >= 40.0f) ? "PASSED" : "NEEDS IMPROVEMENT");\n\n    return 0;\n}`,
      codeExplanation: "Demonstrates formatted console I/O, scanf input validation, and ternary operator status evaluation."
    },
    {
      projectId: "P1.2",
      title: "Interactive Temperature Converter",
      difficulty: "Beginner",
      description: "Create a C application that accepts temperature in Celsius from user and converts it to Fahrenheit (F = C * 9/5 + 32) and Kelvin (K = C + 273.15). Format results cleanly.",
      exampleText: "Celsius input: 37.0",
      exampleOutput: "--- Temperature Conversion ---\nCelsius   : 37.00 °C\nFahrenheit: 98.60 °F\nKelvin    : 310.15 K",
      logicExplanation: "1. Read float celsius with scanf.\n2. Compute float fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;\n3. Compute float kelvin = celsius + 273.15f;\n4. Output formatted float results.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    float celsius, fahrenheit, kelvin;\n\n    printf("Enter Temperature in Celsius: ");\n    if (scanf("%f", &celsius) != 1) {\n        printf("Invalid numeric temperature.\\n");\n        return 1;\n    }\n\n    fahrenheit = (celsius * 9.0f / 5.0f) + 32.0f;\n    kelvin = celsius + 273.15f;\n\n    printf("\\n--- Temperature Conversion ---\\n");\n    printf("Celsius   : %.2f °C\\n", celsius);\n    printf("Fahrenheit: %.2f °F\\n", fahrenheit);\n    printf("Kelvin    : %.2f K\\n", kelvin);\n\n    return 0;\n}`,
      codeExplanation: "Demonstrates floating-point arithmetic expressions and accurate conversion formulas."
    }
  ]
};

export default function Topic5() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 5
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 001_001 Projects &amp; Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Apply C formatting, scanf input validation, and return code management through interactive real-world projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: Module1ProjectsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="Module1ProjectsDemo.c" editable={false} />
      </section>

      {/* Hands-on Projects Section using CProjectAnswerTemplate */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 001_001 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 001_001 Topic 5 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 5 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic5_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always test edge case user inputs (like typing letters into numeric prompts) to verify input validation logic in C! — Sukanta Hui" />
      </section>
    </div>
  );
}
