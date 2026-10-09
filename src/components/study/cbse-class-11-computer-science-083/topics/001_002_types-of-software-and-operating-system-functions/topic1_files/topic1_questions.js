const questions = [
  {
    question: "Which category of software is responsible for directly managing hardware resources and providing a platform for application programs?",
    options: [
      "Application Software",
      "System Software",
      "Customized Software",
      "General Purpose Software"
    ],
    correctAnswer: 1,
    explanation: "System Software (including the Operating System, Device Drivers, and System Utilities) directly controls and manages hardware resources and provides a runtime foundation for application software."
  },
  {
    question: "What is the primary role of a Device Driver in a computer system?",
    options: [
      "To edit documents and compile Python source code",
      "To act as a translator between the Operating System and specific hardware peripheral devices",
      "To optimize hard drive storage by deleting temporary files",
      "To protect the system from network malware and ransomware"
    ],
    correctAnswer: 1,
    explanation: "A Device Driver translates generic OS read/write commands into proprietary hardware control signals specific to the connected peripheral."
  },
  {
    question: "Which of the following is classified as a System Utility software?",
    options: [
      "VLC Media Player",
      "Adobe Photoshop",
      "Disk Defragmenter",
      "Mozilla Firefox"
    ],
    correctAnswer: 2,
    explanation: "Disk Defragmenter is a system maintenance utility that consolidates fragmented file blocks on storage media to optimize read/write performance."
  },
  {
    question: "Assertion (A): Antivirus software is classified as System Utility software.\nReason (R): It performs maintenance, security upkeep, and protects the operating environment from malicious code.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Antivirus software serves a system maintenance and security purpose rather than solving a direct end-user productivity problem, classifying it as a System Utility."
  },
  {
    question: "Why is a Disk Defragmenter generally NOT required on solid-state drives (SSDs)?",
    options: [
      "SSDs do not store binary data in files",
      "SSDs have near-zero mechanical seek latency and defragmenting causes unnecessary write wear on NAND flash cells",
      "SSDs already contain an operating system inside their controller",
      "SSDs can only store uncompressed text files"
    ],
    correctAnswer: 1,
    explanation: "SSDs access all memory cells in uniform electronic access time with no mechanical head movement; running defragmentation causes premature NAND flash degradation."
  }
];

export default questions;
