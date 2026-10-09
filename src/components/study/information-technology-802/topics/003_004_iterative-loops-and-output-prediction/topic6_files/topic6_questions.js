export default [
  {
    question: "What causes an infinite loop in Java?",
    answer: "An infinite loop occurs when the loop's test condition remains permanently true because the loop control variable is either never updated, updated in the wrong direction (e.g. incrementing when decrementing is needed), or when the termination condition is mathematically impossible to reach.",
    marks: 2,
    hint: "Think about why a condition never becomes false."
  },
  {
    question: "Which of the following creates an infinite loop in Java?",
    options: [
      "int i = 1; while (i > 0) { i++; }",
      "for (int i = 10; i >= 1; i--) { System.out.print(i); }",
      "int k = 5; do { k--; } while (k > 0);",
      "while (false) { System.out.print(\"Hi\"); }"
    ],
    correctAnswer: 0,
    explanation: "With i=1 and i++, i is 1, 2, 3... which is always > 0, creating an infinite loop (until integer overflow).",
    marks: 1
  },
  {
    question: "What happens if you write `while (true)` in Java without a `break` statement?",
    options: [
      "The loop runs indefinitely until the program is forcefully terminated.",
      "The program generates a compile-time error.",
      "The JVM automatically terminates it after 1000 iterations.",
      "It throws an OutOfMemoryError immediately."
    ],
    correctAnswer: 0,
    explanation: "`while(true)` creates an intentional indefinite loop that executes endlessly unless an internal break, return, or exception interrupts it.",
    marks: 1
  },
  {
    question: "Predict the output of the code:\nint x = 10;\nwhile (x >= 4) {\n    System.out.print(x + \" \");\n    x -= 3;\n}",
    options: ["10 7 4 ", "10 7 4 1 ", "10 7 ", "Infinite loop"],
    correctAnswer: 0,
    explanation: "Pass 1: prints 10, x becomes 7. Pass 2: prints 7, x becomes 4. Pass 3: prints 4, x becomes 1. 1 >= 4 is false. Loop ends. Output: '10 7 4 '.",
    marks: 2
  },
  {
    question: "What is an unreachable code compile error in Java loops?",
    answer: "If a loop condition is a constant compile-time false, such as `while (false) { ... }`, the Java compiler flags any statements inside the body as 'unreachable code' and refuses to compile.",
    marks: 2,
    hint: "Java compiler detects code that can never possibly run."
  }
];
