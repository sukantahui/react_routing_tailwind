const questions = [
  {
    question: "Which language processor translates mnemonic assembly language instructions into machine language?",
    options: [
      "Compiler",
      "Assembler",
      "Interpreter",
      "Linker"
    ],
    correctAnswer: 1,
    explanation: "An Assembler is specialized system software designed to translate assembly language mnemonics (e.g. MOV, ADD) into binary machine code."
  },
  {
    question: "How does a Compiler differ from an Interpreter in handling syntax errors?",
    options: [
      "A Compiler stops at the first error, while an Interpreter displays all errors together",
      "A Compiler reports all syntax errors across the entire program at once, whereas an Interpreter halts execution immediately upon encountering the first error",
      "Neither Compilers nor Interpreters report syntax errors",
      "An Interpreter automatically corrects syntax errors without reporting them"
    ],
    correctAnswer: 1,
    explanation: "Compilers perform full-source batch analysis reporting all errors at once, while Interpreters execute line-by-line and halt at the first faulty statement."
  },
  {
    question: "Does an Interpreter generate a permanent standalone Object Code (.obj or .exe) file?",
    options: [
      "Yes, always",
      "Yes, but only in Python",
      "No, it translates and executes statements on the fly in memory without producing a permanent object file",
      "No, because object files are only created by word processors"
    ],
    correctAnswer: 2,
    explanation: "Interpreters translate instructions in memory directly during runtime without saving a permanent standalone machine code executable on disk."
  },
  {
    question: "Assertion (A): C and C++ programs generally execute faster than pure interpreted Python programs.\nReason (R): Compilers produce pre-translated native machine instructions directly executed by the CPU hardware with zero translation overhead during runtime.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Compiled machine code executes directly on CPU silicon registers without runtime translation delays, yielding superior execution speed."
  },
  {
    question: "Which of the following best describes Python's execution architecture?",
    options: [
      "Pure assembly translation",
      "Pure machine code compilation directly into .exe",
      "A hybrid model: Source (.py) is compiled into Bytecode (.pyc), which is then interpreted by the Python Virtual Machine (PVM)",
      "An uninterpreted text script fed directly into electrical circuits"
    ],
    correctAnswer: 2,
    explanation: "Python uses a hybrid translation model where source code is compiled into platform-independent bytecode and subsequently interpreted line-by-line by the PVM."
  }
];

export default questions;
