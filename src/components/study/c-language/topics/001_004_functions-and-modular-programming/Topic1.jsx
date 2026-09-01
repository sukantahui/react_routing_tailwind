import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/RecursionDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 001_004 · Hands-on C Projects",
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
      projectId: "P4.1",
      title: "Recursive GCD & Fibonacci Toolkit",
      difficulty: "Intermediate",
      description: "Write a modular C program with recursive functions for Greatest Common Divisor (Euclidean algorithm) and Fibonacci sequence generation.",
      exampleText: "GCD of 48 & 18",
      exampleOutput: "GCD (Euclidean Recursion): 6\nFibonacci Term 7: 13",
      logicExplanation: "1. Recursive GCD: if (b == 0) return a; else return gcd(b, a % b).\n2. Recursive Fibonacci: if (n <= 1) return n; else return fib(n-1) + fib(n-2).",
      answer: `#include <stdio.h>\n\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n\nint fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nint main(void) {\n    int a = 48, b = 18, n = 7;\n    printf("GCD of %d and %d: %d\\n", a, b, gcd(a, b));\n    printf("Fibonacci term %d: %d\\n", n, fibonacci(n));\n    return 0;\n}`,
      codeExplanation: "Demonstrates clean base-case termination in recursive algorithms."
    },
    {
      projectId: "P4.2",
      title: "Modular Scientific Calculator Engine",
      difficulty: "Intermediate",
      description: "Decompose a calculator into isolated modular functions: add, subtract, multiply, divide, power, and factorial.",
      exampleText: "Power 2^5",
      exampleOutput: "2 ^ 5 = 32.00",
      logicExplanation: "1. Declare clean prototypes for each operation.\n2. Implement functions and invoke from main menu.",
      answer: `#include <stdio.h>\n\nfloat add(float a, float b) { return a + b; }\nfloat subtract(float a, float b) { return a - b; }\nfloat multiply(float a, float b) { return a * b; }\nfloat divide(float a, float b) { return (b != 0) ? a / b : 0.0f; }\n\nint main(void) {\n    printf("10 + 5 = %.2f\\n", add(10, 5));\n    printf("10 / 2 = %.2f\\n", divide(10, 2));\n    return 0;\n}`,
      codeExplanation: "Demonstrates modular functional decomposition."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_004 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 001_004 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master recursive solvers and modular API architecture through real-world projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: RecursionDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="RecursionDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 001_004 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 001_004 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_004_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always ensure every recursive function path hits a valid base case to prevent call stack exhaustion! — Sukanta Hui" />
      </section>
    </div>
  );
}
