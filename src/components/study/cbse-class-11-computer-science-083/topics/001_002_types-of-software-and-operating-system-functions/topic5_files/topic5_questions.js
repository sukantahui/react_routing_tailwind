const questions = [
  {
    question: "Why is the Operating System often termed an 'Extended Machine' or 'Virtual Machine'?",
    options: [
      "Because it physically enlarges the computer's motherboard chassis",
      "Because it abstracts messy electronic hardware complexities into clean, high-level system calls like read() and write()",
      "Because it allows computers to run without electricity",
      "Because it only runs inside web browsers"
    ],
    correctAnswer: 1,
    explanation: "The OS presents a simplified, abstract, and user-friendly virtual interface (Extended Machine) hiding underlying electrical and register-level complexities."
  },
  {
    question: "In which CPU execution mode do normal user application programs (like Python or web browsers) run to prevent unauthorized hardware access?",
    options: [
      "Kernel / Supervisor Mode (Ring 0)",
      "User Mode (Ring 3)",
      "BIOS Bootstrap Mode",
      "Overclocked Mode"
    ],
    correctAnswer: 1,
    explanation: "User Mode is unprivileged; application programs are restricted from directly issuing hardware I/O commands or accessing other memory partitions."
  },
  {
    question: "What hardware mechanism transitions the CPU from User Mode to Kernel Mode when an application requires an OS service (e.g., writing to a disk)?",
    options: [
      "A Software Interrupt / System Call Trap",
      "Rebooting the computer power supply",
      "Formatting the primary hard drive",
      "Compiling Python into Assembly"
    ],
    correctAnswer: 0,
    explanation: "A System Call Trap triggers a controlled hardware context switch, elevating the CPU privilege level to Kernel Mode to safely execute the requested operation."
  },
  {
    question: "Assertion (A): As a Resource Manager, the OS employs both Time Multiplexing and Space Multiplexing.\nReason (R): Time multiplexing shares the CPU over time intervals, whereas space multiplexing divides physical RAM and disk sectors among multiple programs.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Time multiplexing (time-slicing CPU) and Space multiplexing (allocating partitions in memory and disk) are the dual foundations of resource management."
  },
  {
    question: "What would happen if an application program in User Mode directly attempted to execute a privileged CPU instruction?",
    options: [
      "The CPU hardware generates an exception / general protection fault, and the OS terminates the offending program",
      "The hardware speeds up the processor clock",
      "The program is immediately translated to C++",
      "The computer deletes the user's hard drive"
    ],
    correctAnswer: 0,
    explanation: "CPU hardware enforces privilege levels; unauthorized attempts to execute kernel instructions in user mode trigger a fault, and the OS terminates the offending process."
  }
];

export default questions;
