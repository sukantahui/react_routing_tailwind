const questions = [
  {
    question: "What does the WIMP acronym stand for in Graphical User Interface (GUI) architecture?",
    options: [
      "Windows, Icons, Menus, Pointer",
      "Wireless, Internal, Memory, Processor",
      "Wide, Input, Multiplexer, Protocol",
      "Web, Interface, Markup, Program"
    ],
    correctAnswer: 0,
    explanation: "WIMP stands for Windows, Icons, Menus, and Pointer, which forms the fundamental foundation of graphical desktop environments."
  },
  {
    question: "Which interface paradigm is ideal for high-speed batch automation scripts and remote server administration with minimal memory overhead?",
    options: [
      "Command Line Interface (CLI)",
      "Graphical User Interface (GUI)",
      "Voice User Interface only",
      "Virtual Reality Headset"
    ],
    correctAnswer: 0,
    explanation: "CLI consumes minimal RAM and CPU, and allows complex operations across hundreds of files to be automated in simple shell scripts."
  },
  {
    question: "Which of the following is a primary disadvantage of a Command Line Interface (CLI) for beginners?",
    options: [
      "It requires excessive GPU memory",
      "It has a steep learning curve because users must memorize exact command names, flags, and syntax",
      "It cannot run Python programs",
      "It cannot connect to the internet"
    ],
    correctAnswer: 1,
    explanation: "CLI requires knowledge and memorization of specific textual commands and switches, making it less intuitive for novice users."
  },
  {
    question: "Assertion (A): Cloud servers and supercomputers frequently run in headless CLI mode without any GUI installed.\nReason (R): Omitting the graphical desktop saves hundreds of megabytes of RAM and processor cycles for computational workloads.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Headless Linux servers run CLI-only environments to dedicate 100% of physical memory and CPU resources to database and web service workloads."
  },
  {
    question: "Which of the following operating environments is classified as a pure Character/Command Line Interface?",
    options: [
      "MS-DOS",
      "macOS Sonoma",
      "Windows 11",
      "Android 14"
    ],
    correctAnswer: 0,
    explanation: "MS-DOS is a classic single-tasking, character-based Command Line Interface operating system."
  }
];

export default questions;
