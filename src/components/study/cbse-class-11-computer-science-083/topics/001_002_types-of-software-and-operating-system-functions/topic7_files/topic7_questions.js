const questions = [
  {
    question: "What is the primary objective of a Multiprogramming Operating System?",
    options: [
      "To maximize CPU utilization by switching to another job whenever the active process halts for an I/O operation",
      "To format disk sectors every 5 minutes",
      "To restrict the computer to only one running program",
      "To prevent any user from logging in without a mouse"
    ],
    correctAnswer: 0,
    explanation: "Multiprogramming keeps multiple programs in RAM and transfers CPU control to another process whenever the current one waits for I/O, eliminating CPU idle time."
  },
  {
    question: "How does a Time-Sharing Operating System differ from a basic Multiprogramming System?",
    options: [
      "Time-sharing systems only run during night hours",
      "Time-sharing allocates fixed rapid time slices (quanta) to multiple interactive users to minimize response time, whereas multiprogramming focuses on maximizing batch CPU utilization",
      "Time-sharing systems do not support RAM",
      "Multiprogramming does not allow files on disk"
    ],
    correctAnswer: 1,
    explanation: "Time-sharing uses preemptive time-slicing so multiple users receive immediate interactive responses, creating the illusion of dedicated system ownership."
  },
  {
    question: "Which of the following is a critical requirement of a Real-Time Operating System (RTOS)?",
    options: [
      "Vibrant 3D desktop animations",
      "Guaranteed execution within strict, deterministic time constraints / deadlines",
      "Unlimited free cloud storage",
      "Compatibility with video game gamepads"
    ],
    correctAnswer: 1,
    explanation: "An RTOS must process events and guarantee responses within rigid time limits (deadlines), making it indispensable for avionics, medical implants, and automotive controls."
  },
  {
    question: "Assertion (A): In a Multi-User operating system like Linux, multiple users can log in simultaneously from different remote terminals without interfering with each other's private files.\nReason (R): The OS enforces rigorous user authentication, process isolation, and file ownership access control permissions.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Multi-user operating systems use UID/GID access control lists and virtual memory isolation to safeguard each user's environment."
  },
  {
    question: "Which of the following Operating Systems is classified as a Single-User Single-Tasking OS?",
    options: [
      "MS-DOS",
      "Ubuntu Linux",
      "Windows 11",
      "macOS"
    ],
    correctAnswer: 0,
    explanation: "MS-DOS is a classic single-user single-tasking operating system capable of executing only one application at a time."
  }
];

export default questions;
