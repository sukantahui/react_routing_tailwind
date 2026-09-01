import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/UnionsAndBitfieldsDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 003_008 · Hands-on C Projects",
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
      projectId: "P8.1",
      title: "Student Management System with Structs",
      difficulty: "Intermediate",
      description: "Write a C program that uses an array of student structures to store roll number, name, and marks. Compute and display top scorer.",
      exampleText: "3 Students entered",
      exampleOutput: "Top Scorer: Swadeep (95.00 marks)",
      logicExplanation: "1. Define typedef struct { int roll; char name[50]; float marks; } Student;\n2. Loop through array to find max marks index.",
      answer: `#include <stdio.h>\n\ntypedef struct {\n    int roll;\n    char name[50];\n    float marks;\n} Student;\n\nint main(void) {\n    Student list[3] = {\n        {101, "Swadeep", 95.0f},\n        {102, "Tuhina", 88.5f},\n        {103, "Abhronila", 92.0f}\n    };\n    int topIdx = 0;\n    for (int i = 1; i < 3; i++) {\n        if (list[i].marks > list[topIdx].marks) topIdx = i;\n    }\n    printf("Top Scorer: %s (%.2f marks)\\n", list[topIdx].name, list[topIdx].marks);\n    return 0;\n}`,
      codeExplanation: "Demonstrates array of structures and field searching."
    },
    {
      projectId: "P8.2",
      title: "Compact Packet Converter with Unions",
      difficulty: "Advanced",
      description: "Use a C union to decompose a 32-bit integer into 4 individual bytes for network inspection.",
      exampleText: "Raw: 0xAABBCCDD",
      exampleOutput: "Byte 0: 0xDD, Byte 1: 0xCC, Byte 2: 0xBB, Byte 3: 0xAA",
      logicExplanation: "1. Define union { uint32_t raw; uint8_t bytes[4]; }.\n2. Access bytes array to inspect endianness.",
      answer: `#include <stdio.h>\n#include <stdint.h>\n\ntypedef union {\n    uint32_t raw;\n    uint8_t bytes[4];\n} Packet;\n\nint main(void) {\n    Packet p;\n    p.raw = 0xAABBCCDD;\n    printf("Byte 0: 0x%02X\\n", p.bytes[0]);\n    printf("Byte 1: 0x%02X\\n", p.bytes[1]);\n    return 0;\n}`,
      codeExplanation: "Demonstrates memory overlay inspectability via unions."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_008 · Topic 1
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 003_008 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master student structure modeling and binary union byte decomposition.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: UnionsAndBitfieldsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="UnionsAndBitfieldsDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 003_008 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 003_008 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_008_topic1_note.txt"
        />
      </section>

      <Teacher note="Unions allow efficient type-punning and protocol parsing in network software! — Sukanta Hui" />
    </div>
  );
}
