import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/MacroMetaprogrammingDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 004_011 · Hands-on C Projects",
  subject: "C Programming",
  board: "WBCHSE / ICSE / BCA / B.Tech",
  class: "UG / High School",
  tools: ["GCC Compiler", "VS Code"],
  institute: {
    name: "Coder & AccoTax",
    author: "Sukanta Hui",
    location: "Barrackpore, West Bengal"
  },
  projects: [
    {
      projectId: "P11.1",
      title: "Cross-Platform Logging Macro Suite",
      difficulty: "Advanced",
      description: "Build a logging macro framework using __FILE__, __LINE__, and variadic macros (##__VA_ARGS__).",
      exampleText: "LOG_INFO(\"System Ready\")",
      exampleOutput: "[INFO] [main.c:12 in main()] System Ready",
      logicExplanation: "1. Define #define LOG_INFO(msg) printf('[INFO] [%s:%d] %s\\n', __FILE__, __LINE__, msg).",
      answer: `#include <stdio.h>\n\n#define LOG_INFO(msg) printf("[INFO] [%s:%d in %s()] %s\\n", __FILE__, __LINE__, __func__, msg)\n\nint main(void) {\n    LOG_INFO("Server started on port 8080");\n    return 0;\n}`,
      codeExplanation: "Demonstrates predefined compiler macros and variadic macro logging."
    },
    {
      projectId: "P11.2",
      title: "Conditional Platform Diagnostics",
      difficulty: "Intermediate",
      description: "Use #ifdef _WIN32 vs #ifdef __linux__ to build a cross-platform compilation block.",
      exampleText: "Compile on host OS",
      exampleOutput: "Running on Linux Kernel Environment.",
      logicExplanation: "1. Evaluate OS macros to conditionally compile system-specific code blocks.",
      answer: `#include <stdio.h>\n\nint main(void) {\n#ifdef _WIN32\n    printf("Target OS: Microsoft Windows\\n");\n#elif defined(__linux__)\n    printf("Target OS: Linux Operating System\\n");\n#else\n    printf("Target OS: Generic POSIX\\n");\n#endif\n    return 0;\n}`,
      codeExplanation: "Demonstrates conditional compilation across OS targets."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 004_011 · Topic 1
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 004_011 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master macro logging frameworks and cross-platform compilation targets.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: MacroMetaprogrammingDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="MacroMetaprogrammingDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 004_011 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 004_011 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 004_011 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_004_011_topic1_note.txt"
        />
      </section>

      <Teacher note="Preprocessor logging macros give instantaneous traceability into stack trace location without debugger overhead! — Sukanta Hui" />
    </div>
  );
}
