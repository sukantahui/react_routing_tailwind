const questions = [
  {
    question: "What is the primary function of Processor Management in an Operating System?",
    options: [
      "Formatting the hard drive and deleting files",
      "Deciding which process receives CPU execution time and allocating time slices",
      "Writing assembly code for peripheral devices",
      "Converting AC power to DC voltage inside the SMPS"
    ],
    correctAnswer: 1,
    explanation: "Processor Management (CPU Scheduling) manages the allocation of the central processing unit among multiple competing active processes."
  },
  {
    question: "What is Spooling (Simultaneous Peripheral Operations On-Line) primarily used for in Device Management?",
    options: [
      "Compressing JPEG image files",
      "Buffering I/O jobs on disk to prevent fast CPU programs from being blocked by slow devices like printers",
      "Overclocking the GPU clock speed",
      "Translating Python bytecode into Assembly"
    ],
    correctAnswer: 1,
    explanation: "Spooling queues I/O jobs into a temporary disk buffer so applications can resume execution immediately while the slow peripheral processes jobs sequentially."
  },
  {
    question: "How does the Operating System protect memory allocated to Process A from being overwritten by Process B?",
    options: [
      "By shutting down the computer whenever two programs open",
      "Using hardware Base and Limit registers to enforce memory isolation and boundary checks",
      "By converting all data into read-only PDF files",
      "By only allowing one program to exist in storage"
    ],
    correctAnswer: 1,
    explanation: "The OS and CPU hardware use Base (starting address) and Limit (length) registers to ensure a process accesses only its designated memory partition."
  },
  {
    question: "Assertion (A): Spooling allows multiple users on a school network to send print jobs to a single printer simultaneously without program crashes.\nReason (R): The print jobs are queued onto secondary storage (disk buffer) and dispatched sequentially to the printer.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Print spoolers store print requests in a FIFO disk queue, allowing client computers to continue working without waiting for the physical printer."
  },
  {
    question: "Which OS component is responsible for organizing files into folders and enforcing Read/Write/Execute permissions?",
    options: [
      "File Management Subsystem",
      "ALU Multiplexer",
      "Bootstrap Loader",
      "Assembler"
    ],
    correctAnswer: 0,
    explanation: "The File Management Subsystem handles directory hierarchies, file allocation tables, inodes, and user access permissions."
  }
];

export default questions;
