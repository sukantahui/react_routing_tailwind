const questions = [
  {
    question: "Under which licensing model is the core GNU/Linux Operating System distributed?",
    options: [
      "Proprietary Commercial EULA",
      "Free and Open Source Software (GNU General Public License - GPL)",
      "Shareware 30-Day Trial",
      "Apple APSL Restricted License"
    ],
    correctAnswer: 1,
    explanation: "Linux is distributed as Free and Open Source Software under the GNU General Public License (GPL), allowing anyone to view, modify, and redistribute the source code."
  },
  {
    question: "Which operating system powers the vast majority of the world's top 500 supercomputers and cloud data centers?",
    options: [
      "GNU/Linux",
      "Microsoft Windows 98",
      "Apple iOS",
      "MS-DOS"
    ],
    correctAnswer: 0,
    explanation: "GNU/Linux powers virtually 100% of the world's top 500 supercomputers and cloud infrastructure due to its stability, open source flexibility, and performance."
  },
  {
    question: "What is the underlying kernel foundation of Google's Android mobile operating system?",
    options: [
      "Windows NT Kernel",
      "A modified Linux LTS Kernel",
      "MS-DOS Command Kernel",
      "FreeRTOS Kernel"
    ],
    correctAnswer: 1,
    explanation: "Android is built upon a modified version of the Linux kernel, which manages memory, process scheduling, power, and hardware drivers for mobile chipsets."
  },
  {
    question: "Assertion (A): Apple macOS is built on top of a Unix-compliant Darwin / BSD foundation.\nReason (R): This Unix architecture gives macOS a native POSIX-compliant terminal environment for developers alongside Apple's proprietary graphical interface.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "macOS uses the Darwin / XNU hybrid kernel based on BSD Unix, providing full POSIX terminal compatibility with the Aqua desktop interface."
  },
  {
    question: "Which of the following file systems is the default standard for modern Microsoft Windows installations?",
    options: [
      "ext4",
      "NTFS (New Technology File System)",
      "APFS",
      "FAT12"
    ],
    correctAnswer: 1,
    explanation: "NTFS is the default proprietary file system for Microsoft Windows, featuring journaling, access control lists (ACLs), and encryption."
  }
];

export default questions;
