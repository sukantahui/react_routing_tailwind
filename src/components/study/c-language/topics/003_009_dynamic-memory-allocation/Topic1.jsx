import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/DynamicVectorDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 003_009 · Hands-on C Projects",
  subject: "C Programming",
  board: "WBCHSE / ICSE / BCA / B.Tech",
  class: "UG / High School",
  tools: ["GCC Compiler", "Valgrind", "VS Code"],
  institute: {
    name: "Coder & AccoTax",
    author: "Sukanta Hui",
    location: "Barrackpore, West Bengal"
  },
  projects: [
    {
      projectId: "P9.1",
      title: "Dynamic Resizable Vector Engine",
      difficulty: "Advanced",
      description: "Build a dynamic integer vector in C that doubles its heap buffer capacity when full.",
      exampleText: "Push 10, 20, 30 into capacity 2 vector",
      exampleOutput: "Resized Capacity: 4, Size: 3, Elements: 10 20 30",
      logicExplanation: "1. Structure: typedef struct { int *data; size_t size, capacity; } Vector;\n2. realloc(v->data, v->capacity * 2 * sizeof(int)) when full.",
      answer: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int *data;\n    size_t size;\n    size_t capacity;\n} Vector;\n\nint main(void) {\n    Vector v;\n    v.data = malloc(2 * sizeof(int));\n    v.size = 0;\n    v.capacity = 2;\n\n    v.data[v.size++] = 100;\n    v.data[v.size++] = 200;\n    if (v.size == v.capacity) {\n        v.capacity *= 2;\n        v.data = realloc(v.data, v.capacity * sizeof(int));\n    }\n    v.data[v.size++] = 300;\n    printf("Size: %zu, Capacity: %zu\\n", v.size, v.capacity);\n    free(v.data);\n    return 0;\n}`,
      codeExplanation: "Demonstrates dynamic array capacity doubling with realloc and memory safety."
    },
    {
      projectId: "P9.2",
      title: "Heap-Allocated Dynamic 2D Matrix",
      difficulty: "Advanced",
      description: "Allocate a 2D integer matrix dynamically on the heap using an array of pointers (int **matrix).",
      exampleText: "Rows: 3, Cols: 3",
      exampleOutput: "Dynamic Matrix Allocated & Released without leaks.",
      logicExplanation: "1. int **mat = malloc(rows * sizeof(int*));\n2. For each row: mat[i] = malloc(cols * sizeof(int));\n3. Free each row first, then free main pointer.",
      answer: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int rows = 3, cols = 3;\n    int **mat = malloc(rows * sizeof(int *));\n    for (int i = 0; i < rows; i++) {\n        mat[i] = malloc(cols * sizeof(int));\n    }\n\n    // Free memory safely\n    for (int i = 0; i < rows; i++) free(mat[i]);\n    free(mat);\n    printf("Dynamic 2D Matrix Memory Released Cleanly.\\n");\n    return 0;\n}`,
      codeExplanation: "Demonstrates two-level heap allocation and deallocation for dynamic 2D matrices."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 1
          </span>
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 003_009 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master dynamic vector engines and dynamic 2D matrix allocation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: DynamicVectorDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="DynamicVectorDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 003_009 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 003_009 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always free dynamic memory allocations in reverse order of allocation! — Sukanta Hui" />
      </section>
    </div>
  );
}
