const questions = [
  {
    question: "A bank commissions custom software to calculate loan EMI schedules tailored to their specific interest policies. What class of software is this?",
    options: [
      "System Software",
      "System Utility",
      "General Purpose Application Software",
      "Tailor-Made (Customized) Application Software"
    ],
    correctAnswer: 3,
    explanation: "Software developed for a specific organization's proprietary business rules is classified as Tailor-Made (Customized) Application Software."
  },
  {
    question: "Which of the following language processors analyzes the entire source code in one pass, generates a standalone .exe object file, and lists all errors at once?",
    options: [
      "Interpreter",
      "Compiler",
      "Device Driver",
      "Spooler"
    ],
    correctAnswer: 1,
    explanation: "A Compiler scans the entire program in a single batch pass, produces an object file (.exe/.obj), and reports all syntax errors together."
  },
  {
    question: "What is the primary role of a Device Driver in an Operating System?",
    options: [
      "To compile Python scripts into HTML",
      "To translate generic high-level OS commands into device-specific electronic control signals",
      "To format the hard drive partition",
      "To display 3D desktop wallpapers"
    ],
    correctAnswer: 1,
    explanation: "Device drivers act as translators bridging the generic OS kernel system calls and the proprietary hardware interfaces of peripheral devices."
  },
  {
    question: "In Device Management, what does SPOOL stand for?",
    options: [
      "Single Program Operating On-Line",
      "Simultaneous Peripheral Operations On-Line",
      "System Protection Over Operational Limit",
      "Sequential Processing of Optical Lines"
    ],
    correctAnswer: 1,
    explanation: "SPOOL stands for Simultaneous Peripheral Operations On-Line, a technique where I/O jobs are buffered on disk for slow devices."
  },
  {
    question: "Which type of Operating System is mandatory for automotive airbag deployment systems where actions must strictly occur within milliseconds?",
    options: [
      "Single-User Single-Tasking OS",
      "Real-Time Operating System (RTOS)",
      "Time-Sharing OS",
      "Batch Processing OS"
    ],
    correctAnswer: 1,
    explanation: "An RTOS is required for mission-critical systems where deterministic execution within strict time limits (deadlines) is essential for safety."
  },
  {
    question: "Assertion (A): The Operating System runs in Kernel Mode (Ring 0) while user applications run in User Mode (Ring 3).\nReason (R): This privilege separation protects physical hardware and prevents buggy application programs from crashing the entire computer.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Dual-mode CPU architecture prevents unprivileged user programs from issuing raw hardware instructions or modifying kernel memory."
  },
  {
    question: "Which of the following is classified as Free and Open Source Software (FOSS) under the GNU GPL license?",
    options: [
      "Microsoft Windows 11",
      "Apple macOS",
      "GNU/Linux (Ubuntu/Debian)",
      "Apple iOS"
    ],
    correctAnswer: 2,
    explanation: "GNU/Linux is distributed under the GNU General Public License (GPL), making it free and open-source software."
  },
  {
    question: "Which memory management hardware components prevent Process A from accessing or overwriting memory allocated to Process B?",
    options: [
      "Base and Limit Registers",
      "Instruction Registers",
      "Program Counter",
      "Accumulator"
    ],
    correctAnswer: 0,
    explanation: "Base and Limit registers specify the starting address and length of a process's memory space, enforcing hardware-level boundary isolation."
  }
];

export default questions;
