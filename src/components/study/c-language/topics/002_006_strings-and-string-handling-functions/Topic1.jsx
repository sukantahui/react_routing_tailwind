import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/CustomStringLibDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 002_006 · Hands-on C Projects",
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
      projectId: "P6.1",
      title: "Text Palindrome & Anagram Verifier",
      difficulty: "Intermediate",
      description: "Build a C application that checks if an input string is a palindrome (reads same forwards and backwards).",
      exampleText: "Input: madam",
      exampleOutput: "'madam' is a PALINDROME.",
      logicExplanation: "1. Find string length len = strlen(str).\n2. Compare str[i] with str[len - 1 - i] for i from 0 to len/2.\n3. If all match, it is a palindrome.",
      answer: `#include <stdio.h>\n#include <string.h>\n\nint isPalindrome(const char *str) {\n    int len = strlen(str);\n    for (int i = 0; i < len / 2; i++) {\n        if (str[i] != str[len - 1 - i]) return 0;\n    }\n    return 1;\n}\n\nint main(void) {\n    char word[100];\n    printf("Enter word: ");\n    if (scanf("%99s", word) != 1) return 1;\n\n    if (isPalindrome(word))\n        printf("'%s' is a PALINDROME.\\n", word);\n    else\n        printf("'%s' is NOT a palindrome.\\n", word);\n    return 0;\n}`,
      codeExplanation: "Demonstrates palindrome verification logic using character comparisons."
    },
    {
      projectId: "P6.2",
      title: "Custom String Concatenation & Length Engine",
      difficulty: "Intermediate",
      description: "Implement custom versions of strlen (my_strlen) and strcat (my_strcat) without using string.h.",
      exampleText: "Str1: Hello, Str2: World",
      exampleOutput: "Combined: Hello World",
      logicExplanation: "1. my_strlen counts chars until '\\0'.\n2. my_strcat appends dest pointer to source until '\\0' and adds final '\\0'.",
      answer: `#include <stdio.h>\n\nvoid my_strcat(char *dest, const char *src) {\n    while (*dest != '\\0') dest++;\n    while (*src != '\\0') {\n        *dest = *src;\n        dest++;\n        src++;\n    }\n    *dest = '\\0';\n}\n\nint main(void) {\n    char buffer[100] = "Coder & ";\n    my_strcat(buffer, "AccoTax");\n    printf("Combined Result: %s\\n", buffer);\n    return 0;\n}`,
      codeExplanation: "Demonstrates pointer traversal for string concatenation without standard headers."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 002_006 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master palindrome verification and custom string library algorithms.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: CustomStringLibDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="CustomStringLibDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 002_006 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 002_006 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_002_006_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Always ensure destination char buffers are allocated with sufficient room for the trailing '\\0'! — Sukanta Hui" />
      </section>
    </div>
  );
}
