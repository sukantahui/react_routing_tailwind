import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/BitwiseOperatorsDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 001_002 · Hands-on C Projects",
  subject: "C Programming",
  board: "WBCHSE / ICSE / BCA / B.Tech",
  class: "UG / High School",
  tools: ["GCC Compiler", "GDB"],
  institute: {
    name: "Coder & AccoTax",
    author: "Sukanta Hui",
    location: "Barrackpore, West Bengal"
  },
  projects: [
    {
      projectId: "P2.1",
      title: "Bill Splitter & Tax Calculator",
      difficulty: "Beginner",
      description: "Build a C program that calculates total restaurant bill with 18% GST tax, 5% tip, and splits the final total evenly among N friends.",
      exampleText: "Base bill: 1200.00, Friends: 4",
      exampleOutput: "Base Amount: 1200.00\nGST Tax (18%): 216.00\nTip (5%)    : 60.00\nTotal Bill  : 1476.00\nPer Person  : 369.00",
      logicExplanation: "1. Prompt for base bill amount and number of friends.\n2. Compute tax = base * 0.18f and tip = base * 0.05f;\n3. Compute total = base + tax + tip and perPerson = total / numFriends;\n4. Print using %.2f formatting.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    float baseBill, tax, tip, total, perPerson;\n    int numFriends;\n\n    printf("Enter Base Bill Amount: ");\n    scanf("%f", &baseBill);\n    printf("Enter Number of Friends: ");\n    scanf("%d", &numFriends);\n\n    tax = baseBill * 0.18f;\n    tip = baseBill * 0.05f;\n    total = baseBill + tax + tip;\n    perPerson = total / numFriends;\n\n    printf("\\n--- Bill Splitter Summary ---\\n");\n    printf("Base Amount  : %.2f\\n", baseBill);\n    printf("GST Tax (18%%): %.2f\\n", tax);\n    printf("Tip (5%%)     : %.2f\\n", tip);\n    printf("Total Bill   : %.2f\\n", total);\n    printf("Per Person   : %.2f\\n", perPerson);\n\n    return 0;\n}`,
      codeExplanation: "Demonstrates basic arithmetic expressions, percentage math, and formatted float output."
    },
    {
      projectId: "P2.2",
      title: "Bitwise Status Register Inspector",
      difficulty: "Intermediate",
      description: "Write a C program that takes an unsigned 8-bit integer status register value and tests individual bit flags (Bit 0: Power, Bit 1: Error, Bit 2: Sensor Ready).",
      exampleText: "Status Input: 5 (00000101 binary)",
      exampleOutput: "Status: 0x05\nBit 0 (Power) : ACTIVE\nBit 1 (Error) : INACTIVE\nBit 2 (Sensor): ACTIVE",
      logicExplanation: "1. Read uint8_t status.\n2. Mask Bit 0 using status & 1.\n3. Mask Bit 1 using status & (1 << 1).\n4. Mask Bit 2 using status & (1 << 2).",
      answer: `#include <stdio.h>\n#include <stdint.h>\n\nint main(void) {\n    uint8_t status;\n    printf("Enter Status Register Value (0-255): ");\n    scanf("%hhu", &status);\n\n    printf("\\n--- Status Register Breakdown ---\\n");\n    printf("Raw Value: 0x%02X\\n", status);\n    printf("Bit 0 (Power) : %s\\n", (status & (1 << 0)) ? "ACTIVE" : "INACTIVE");\n    printf("Bit 1 (Error) : %s\\n", (status & (1 << 1)) ? "ACTIVE" : "INACTIVE");\n    printf("Bit 2 (Sensor): %s\\n", (status & (1 << 2)) ? "ACTIVE" : "INACTIVE");\n\n    return 0;\n}`,
      codeExplanation: "Demonstrates bitwise bit shifts and bitwise AND masking for register analysis."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 001_002 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master bitwise register masking and arithmetic calculations through real-world C projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: BitwiseOperatorsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="BitwiseOperatorsDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 001_002 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 001_002 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Bitwise masking is the foundation of device drivers and binary networking protocols! — Sukanta Hui" />
      </section>
    </div>
  );
}
