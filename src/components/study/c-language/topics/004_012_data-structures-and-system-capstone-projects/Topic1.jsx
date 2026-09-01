import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/CapstoneSystemDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 004_012 · Systems Capstone Projects",
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
      projectId: "P12.1",
      title: "CLI File Word Counter Utility",
      difficulty: "Advanced",
      description: "Write a command-line C utility that accepts a filename via argv[1] and counts total lines, words, and characters in the file (similar to wc command).",
      exampleText: "./mywc sample.txt",
      exampleOutput: "Lines: 4 | Words: 24 | Chars: 152",
      logicExplanation: "1. Verify argc >= 2.\n2. Open file argv[1] with fopen.\n3. Loop through chars with fgetc: count newlines, spaces, and total chars.",
      answer: `#include <stdio.h>\n#include <ctype.h>\n\nint main(int argc, char *argv[]) {\n    if (argc < 2) {\n        printf("Usage: %s <filename>\\n", argv[0]);\n        return 1;\n    }\n    FILE *fp = fopen(argv[1], "r");\n    if (!fp) {\n        perror("File Open Error");\n        return 1;\n    }\n    int ch, lines = 0, words = 0, chars = 0, inWord = 0;\n    while ((ch = fgetc(fp)) != EOF) {\n        chars++;\n        if (ch == '\\n') lines++;\n        if (isspace(ch)) {\n            inWord = 0;\n        } else if (!inWord) {\n            inWord = 1;\n            words++;\n        }\n    }\n    fclose(fp);\n    printf("Lines: %d | Words: %d | Chars: %d\\n", lines, words, chars);\n    return 0;\n}`,
      codeExplanation: "Demonstrates command-line argument processing and stream word counting."
    },
    {
      projectId: "P12.2",
      title: "Singly Linked List Inventory System Capstone",
      difficulty: "Expert",
      description: "Build a complete C inventory management system using dynamic Singly Linked List nodes with insert, delete, display, and memory deallocation.",
      exampleText: "Insert Item 101, Item 102",
      exampleOutput: "[ID: 101, Name: Keyboard] -> [ID: 102, Name: Mouse] -> NULL",
      logicExplanation: "1. Structure Node { int id; char name[30]; struct Node *next; }.\n2. Implement insertEnd and freeList functions.",
      answer: `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\ntypedef struct Item {\n    int id;\n    char name[30];\n    struct Item *next;\n} Item;\n\nvoid insertItem(Item **head, int id, const char *name) {\n    Item *newItem = malloc(sizeof(Item));\n    newItem->id = id;\n    strcpy(newItem->name, name);\n    newItem->next = NULL;\n    if (*head == NULL) {\n        *head = newItem;\n        return;\n    }\n    Item *curr = *head;\n    while (curr->next) curr = curr->next;\n    curr->next = newItem;\n}\n\nint main(void) {\n    Item *inventory = NULL;\n    insertItem(&inventory, 101, "Keyboard");\n    insertItem(&inventory, 102, "Mouse");\n\n    Item *curr = inventory;\n    while (curr) {\n        printf("[ID: %d, Name: %s] -> ", curr->id, curr->name);\n        curr = curr->next;\n    }\n    printf("NULL\\n");\n\n    // Free inventory\n    while (inventory) {\n        Item *tmp = inventory;\n        inventory = inventory->next;\n        free(tmp);\n    }\n    return 0;\n}`,
      codeExplanation: "Demonstrates capstone linked list inventory manager with complete dynamic memory cleanup."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 004_012 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 004_012 Systems Capstone Projects
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master command-line file utilities and pure C linked list inventory capstones.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: CapstoneSystemDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="CapstoneSystemDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 004_012 Capstone Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 004_012 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 004_012 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_004_012_topic1_note.txt"
        />
      </section>

      <Teacher note="Congratulations on completing the C Programming Master Roadmap! You now possess deep systems intuition, pointer mastery, and memory engineering capabilities! — Sukanta Hui" />
    </div>
  );
}
