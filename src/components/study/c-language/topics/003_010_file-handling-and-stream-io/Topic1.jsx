import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/BinaryFileIODemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 003_010 · Hands-on C Projects",
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
      projectId: "P10.1",
      title: "Persistent File Student Database",
      difficulty: "Advanced",
      description: "Build a C application that appends student records to a binary file 'db.bin' and lists all saved records upon request.",
      exampleText: "Save: Roll 101, Swadeep, 95.0",
      exampleOutput: "Record Saved to db.bin.\nListing Database:\n101 | Swadeep | 95.00",
      logicExplanation: "1. Open file in 'ab+' binary append update mode.\n2. Use fwrite(&student, sizeof(Student), 1, fp) to append.\n3. Rewind with fseek(fp, 0, SEEK_SET) and fread loop to list.",
      answer: `#include <stdio.h>\n\ntypedef struct { int roll; char name[50]; float marks; } Student;\n\nint main(void) {\n    FILE *fp = fopen("db.bin", "wb+");\n    if (!fp) return 1;\n\n    Student s1 = {101, "Swadeep", 95.0f};\n    fwrite(&s1, sizeof(Student), 1, fp);\n\n    rewind(fp);\n    Student readS;\n    while (fread(&readS, sizeof(Student), 1, fp) == 1) {\n        printf("%d | %s | %.2f\\n", readS.roll, readS.name, readS.marks);\n    }\n    fclose(fp);\n    return 0;\n}`,
      codeExplanation: "Demonstrates binary struct serialization with fwrite, rewind, and fread."
    },
    {
      projectId: "P10.2",
      title: "Text Log Counter & Search Engine",
      difficulty: "Intermediate",
      description: "Write a C program that reads a text file line-by-line using fgets and counts total lines containing the word 'ERROR'.",
      exampleText: "log.txt containing 3 ERROR lines",
      exampleOutput: "Total ERROR occurrences: 3",
      logicExplanation: "1. Open text file with fopen(name, 'r').\n2. Loop with while (fgets(buf, 256, fp)).\n3. Use strstr(buf, 'ERROR') to count occurrences.",
      answer: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    FILE *fp = fopen("server.log", "r");\n    if (!fp) return 0;\n    char buf[256];\n    int count = 0;\n    while (fgets(buf, sizeof(buf), fp)) {\n        if (strstr(buf, "ERROR")) count++;\n    }\n    fclose(fp);\n    printf("Total ERROR logs: %d\\n", count);\n    return 0;\n}`,
      codeExplanation: "Demonstrates text log line-by-line stream reading and string searching."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_010 · Topic 1
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 003_010 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master binary student database persistence and log file searching engines.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: BinaryFileIODemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="BinaryFileIODemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 003_010 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 003_010 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_010 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_010_topic1_note.txt"
        />
      </section>

      <Teacher note="Binary struct persistence allows building high-performance local database engines in plain C! — Sukanta Hui" />
    </div>
  );
}
