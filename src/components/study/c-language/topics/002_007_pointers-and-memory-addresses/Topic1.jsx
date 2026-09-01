import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/FunctionPointersDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 002_007 · Hands-on C Projects",
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
      projectId: "P7.1",
      title: "In-place Array Inverter via Pointers",
      difficulty: "Intermediate",
      description: "Write a C function that reverses an integer array in-place using two pointer addresses (start and end pointers).",
      exampleText: "Array: [10, 20, 30, 40, 50]",
      exampleOutput: "Reversed via Pointers: 50 40 30 20 10",
      logicExplanation: "1. Pass int *start = arr and int *end = arr + n - 1.\n2. Swap *start and *end in a while (start < end) loop.",
      answer: `#include <stdio.h>\n\nvoid reverseArray(int *start, int *end) {\n    while (start < end) {\n        int temp = *start;\n        *start = *end;\n        *end = temp;\n        start++;\n        end--;\n    }\n}\n\nint main(void) {\n    int arr[5] = {10, 20, 30, 40, 50};\n    reverseArray(arr, arr + 4);\n    printf("Reversed Array: ");\n    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);\n    printf("\\n");\n    return 0;\n}`,
      codeExplanation: "Demonstrates in-place pointer arithmetic swapping without array subscript indexing."
    },
    {
      projectId: "P7.2",
      title: "Generic Callback Dispatch Table",
      difficulty: "Advanced",
      description: "Build a dispatch table using function pointers to call math operations dynamically based on user selection.",
      exampleText: "Op: Multiply(10, 5)",
      exampleOutput: "Dispatch Result: 50",
      logicExplanation: "1. Create array of function pointers: int (*ops[])(int, int) = {add, sub, mul, div}.\n2. Invoke ops[choice](a, b).",
      answer: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main(void) {\n    int (*dispatch[])(int, int) = {add, sub, mul};\n    printf("Mul via Dispatch Table: %d\\n", dispatch[2](10, 5));\n    return 0;\n}`,
      codeExplanation: "Demonstrates dynamic function dispatch arrays in C."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_007 · Topic 1
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 002_007 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master in-place pointer array reversal and function pointer dispatch tables.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: FunctionPointersDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="FunctionPointersDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 002_007 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 002_007 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_007 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_002_007_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Function pointer tables allow building object-oriented virtual method tables (vtables) in plain C! — Sukanta Hui" />
      </section>
    </div>
  );
}
