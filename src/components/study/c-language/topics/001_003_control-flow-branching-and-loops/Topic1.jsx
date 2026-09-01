import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";

import cCode from "./topic1_files/PatternAndLoopsDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const projectData = {
  projectCategory: "Module 001_003 · Hands-on C Projects",
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
      projectId: "P3.1",
      title: "Armstrong Number Verifier",
      difficulty: "Intermediate",
      description: "Write a C program that checks whether a given positive integer is an Armstrong number (e.g. 153 = 1^3 + 5^3 + 3^3).",
      exampleText: "Input number: 153",
      exampleOutput: "153 is an ARMSTRONG NUMBER.",
      logicExplanation: "1. Store original number temp = num.\n2. Extract digits using modulo % 10 in a while (temp > 0) loop.\n3. Cube each digit and accumulate sum.\n4. Compare sum with original num.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    int num, originalNum, remainder, result = 0;\n    printf("Enter a three-digit integer: ");\n    if (scanf("%d", &num) != 1) return 1;\n\n    originalNum = num;\n    while (originalNum != 0) {\n        remainder = originalNum % 10;\n        result += remainder * remainder * remainder;\n        originalNum /= 10;\n    }\n\n    if (result == num)\n        printf("%d is an ARMSTRONG NUMBER.\\n", num);\n    else\n        printf("%d is NOT an Armstrong number.\\n", num);\n\n    return 0;\n}`,
      codeExplanation: "Demonstrates digit extraction using modulo (%) and division (/) in a loop."
    },
    {
      projectId: "P3.2",
      title: "Interactive ATM PIN & Menu Simulator",
      difficulty: "Intermediate",
      description: "Simulate an ATM banking menu. Allow up to 3 PIN entry attempts. If PIN is correct (1234), show balance, deposit, withdraw, and exit menu.",
      exampleText: "PIN: 1234, Deposit: 500",
      exampleOutput: "PIN Accepted!\n1. Balance: 1000.00\n2. Deposit 500.00 -> New Balance: 1500.00",
      logicExplanation: "1. Use do-while loop to prompt for PIN up to 3 times.\n2. Upon success, launch switch-case menu loop for transactions.",
      answer: `#include <stdio.h>\n\nint main(void) {\n    int pin, attempts = 0, choice;\n    float balance = 1000.00f, amount;\n\n    do {\n        printf("Enter 4-digit PIN: ");\n        scanf("%d", &pin);\n        attempts++;\n        if (pin == 1234) break;\n        printf("Incorrect PIN. Attempts left: %d\\n", 3 - attempts);\n    } while (attempts < 3);\n\n    if (pin != 1234) {\n        printf("Card Blocked due to 3 failed attempts.\\n");\n        return 1;\n    }\n\n    printf("\\n--- ATM Menu ---\\n1. Check Balance\\n2. Deposit\\n3. Withdraw\\nChoice: ");\n    scanf("%d", &choice);\n    switch(choice) {\n        case 1:\n            printf("Balance: $%.2f\\n", balance);\n            break;\n        case 2:\n            printf("Enter Deposit Amount: ");\n            scanf("%f", &amount);\n            balance += amount;\n            printf("Updated Balance: $%.2f\\n", balance);\n            break;\n        case 3:\n            printf("Enter Withdrawal Amount: ");\n            scanf("%f", &amount);\n            if (amount <= balance) {\n                balance -= amount;\n                printf("Dispensing Cash. Remaining: $%.2f\\n", balance);\n            } else {\n                printf("Insufficient Funds!\\n");\n            }\n            break;\n        default:\n            printf("Invalid Option.\\n");\n    }\n    return 0;\n}`,
      codeExplanation: "Demonstrates secure do-while authentication loops and transaction switch branching."
    }
  ]
};

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 1
          </span>
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Hands-on Projects
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Module 001_003 Projects & Practical Lab
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master control flow algorithms through Armstrong verification and interactive ATM state machine projects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Reference C Code: PatternAndLoopsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="PatternAndLoopsDemo.c" editable={false} />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-indigo-300 border-b border-slate-800 pb-3">
          🚀 Module 001_003 Project Solutions
        </h2>
        <CProjectAnswerTemplate data={projectData} />
      </section>

      <section>
        <FAQTemplate title="Module 001_003 Topic 1 FAQs" questions={questions} />
      </section>

      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic1_note.txt"
        />
      </section>

      <section>
        <Teacher note="Loops and state machines form the core of every interactive CLI application in C! — Sukanta Hui" />
      </section>
    </div>
  );
}
