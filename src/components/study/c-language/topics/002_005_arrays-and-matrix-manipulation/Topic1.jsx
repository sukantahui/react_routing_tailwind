import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/SortingSearchingDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 002_005 · Hands-on C Projects",
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
      projectId: "P5.1",
      title: "Matrix Multiplication Engine",
      difficulty: "Intermediate",
      description: "Write a C program that multiplies two 2x2 matrices A and B and prints the product matrix C.",
      exampleText: "A = [[1, 2], [3, 4]], B = [[2, 0], [1, 2]]",
      exampleOutput: "Product Matrix C:\n4 4\n10 8",
      logicExplanation: "1. Perform triple nested loops: for i, for j, for k.\n2. C[i][j] += A[i][k] * B[k][j].",
      answer: `#include <stdio.h>\n\nint main(void) {\n    int A[2][2] = {{1, 2}, {3, 4}};\n    int B[2][2] = {{2, 0}, {1, 2}};\n    int C[2][2] = {0};\n    int i, j, k;\n\n    for (i = 0; i < 2; i++) {\n        for (j = 0; j < 2; j++) {\n            for (k = 0; k < 2; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n\n    printf("Product Matrix C:\\n");\n    for (i = 0; i < 2; i++) {\n        for (j = 0; j < 2; j++) {\n            printf("%d ", C[i][j]);\n        }\n        printf("\\n");\n    }\n    return 0;\n}`,
      codeExplanation: "Demonstrates 2D matrix dot-product multiplication algorithm."
    },
    {
      projectId: "P5.2",
      title: "Class Marksheet Ranker & Statistics",
      difficulty: "Intermediate",
      description: "Sort an array of student marks in descending order using Selection Sort and calculate class average, max, and min marks.",
      exampleText: "Marks: [55, 92, 78, 88, 42]",
      exampleOutput: "Highest: 92\nLowest: 42\nAverage: 71.00\nRanked Marks: 92 88 78 55 42",
      logicExplanation: "1. Loop through array to find max and min.\n2. Apply Selection Sort algorithm in descending order.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    int marks[5] = {55, 92, 78, 88, 42};\n    int n = 5, i, j, maxIdx, temp, sum = 0;\n\n    for (i = 0; i < n; i++) sum += marks[i];\n\n    for (i = 0; i < n - 1; i++) {\n        maxIdx = i;\n        for (j = i + 1; j < n; j++) {\n            if (marks[j] > marks[maxIdx]) maxIdx = j;\n        }\n        temp = marks[maxIdx];\n        marks[maxIdx] = marks[i];\n        marks[i] = temp;\n    }\n\n    printf("Class Average: %.2f\\n", (float)sum / n);\n    printf("Ranked Marks: ");\n    for (i = 0; i < n; i++) printf("%d ", marks[i]);\n    printf("\\n");\n    return 0;\n}`,
      codeExplanation: "Demonstrates Selection Sort in descending order and simple array statistics."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 002_005 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master matrix multiplication and statistical array sorting through hands-on projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: SortingSearchingDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="SortingSearchingDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 002_005 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 002_005 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_002_005_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Multi-dimensional arrays pass base element pointers to functions—always pass row and column dimensions alongside! — Sukanta Hui" />
      </section>
    </div>
  );
}
