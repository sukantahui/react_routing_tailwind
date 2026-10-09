export default [
  {
    question: "What is the primary purpose of the Module 003_004 Revision Document?",
    answer: "To provide a consolidated, quick-reference guide on iterative loops (while, do-while), output prediction techniques, dry-run tables, and infinite loop prevention for CBSE Class XII IT (802) students.",
    marks: 2,
    hint: "Think about rapid board examination revision."
  },
  {
    question: "Which loop guarantees that its body is executed at least once regardless of the condition?",
    options: ["do-while loop", "while loop", "for loop", "enhanced for loop"],
    correctAnswer: 0,
    explanation: "The do-while loop evaluates its condition at the bottom (exit point), guaranteeing at least one execution.",
    marks: 1
  },
  {
    question: "Which of the following creates an infinite loop in Java?",
    options: [
      "int i = 5; while (i >= 1) { System.out.print(i); i++; }",
      "int i = 5; while (i >= 1) { System.out.print(i); i--; }",
      "int i = 1; while (i <= 5) { i++; }",
      "for (int i = 0; i < 5; i++) {}"
    ],
    correctAnswer: 0,
    explanation: "Incrementing i when checking i >= 1 moves the value further away from 0, resulting in an infinite loop.",
    marks: 1
  }
];
