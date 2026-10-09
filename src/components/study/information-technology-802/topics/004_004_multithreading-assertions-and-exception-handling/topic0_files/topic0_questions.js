const questions = [
  {
    id: 1,
    question: "What is multithreading in Java?",
    options: [
      "A process of executing multiple threads simultaneously to maximize CPU utilization",
      "A method to run multiple operating systems on one computer",
      "A technique to store data in multiple database tables",
      "A compiler feature that converts Java bytecode to machine code"
    ],
    correctAnswer: 0,
    explanation: "Multithreading in Java is a feature that allows concurrent execution of two or more parts of a program (threads) for maximum utilization of CPU time.",
    marks: 1,
    hint: "Think about executing concurrent lightweight sub-processes within a single application."
  },
  {
    id: 2,
    question: "Which of the following is NOT a state in the Java Thread lifecycle?",
    options: [
      "Compiling",
      "New / Born",
      "Runnable",
      "Terminated / Dead"
    ],
    correctAnswer: 0,
    explanation: "The lifecycle states of a thread are: New (Born), Runnable, Running, Blocked/Waiting/Timed Waiting, and Terminated (Dead). 'Compiling' is a compiler phase, not a thread state.",
    marks: 1,
    hint: "Recall thread lifecycle states: New, Runnable, Blocked, Terminated."
  },
  {
    id: 3,
    question: "What is a thread in Java programming?",
    options: [
      "A lightweight sub-process and the smallest unit of execution within a program",
      "A physical cable connecting the computer to the internet",
      "A data structure used exclusively to store String variables",
      "A database table index"
    ],
    correctAnswer: 0,
    explanation: "A thread is a lightweight sub-process with its own call stack, program counter, and local variables, sharing the common heap memory of the process.",
    marks: 1,
    hint: "Lightweight sub-process with independent execution flow."
  },
  {
    id: 4,
    question: "Which state does a thread enter immediately after being instantiated with 'new MyThread()'?",
    options: [
      "New state",
      "Running state",
      "Runnable state",
      "Blocked state"
    ],
    correctAnswer: 0,
    explanation: "When a Thread object is created using the 'new' operator but before start() is called, it is in the 'New' state.",
    marks: 1,
    hint: "Before start() is invoked, the thread is merely instantiated."
  },
  {
    id: 5,
    question: "What happens when a thread completes the execution of its run() method?",
    options: [
      "It transitions to the Terminated (Dead) state",
      "It restarts automatically from the beginning",
      "It returns to the New state",
      "It throws an IllegalThreadStateException"
    ],
    correctAnswer: 0,
    explanation: "Once the run() method finishes or exits due to an uncaught exception, the thread terminates and moves to the Terminated (Dead) state.",
    marks: 1,
    hint: "Completion of run() means the thread's lifecycle has finished."
  }
];

export default questions;
