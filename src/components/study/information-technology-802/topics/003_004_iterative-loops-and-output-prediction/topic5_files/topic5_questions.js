export default [
  {
    question: "What is the primary difference between `break` and `continue` statements inside a Java loop?",
    answer: "The `break` statement immediately terminates the entire loop and transfers control to the statement following the loop. In contrast, the `continue` statement skips only the remaining statements of the current iteration and jumps directly to the loop's next iteration (evaluating the update/condition).",
    marks: 2,
    hint: "Break ends the entire loop; continue skips only the current pass."
  },
  {
    question: "What is the output of the following Java snippet?\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        break;\n    }\n    System.out.print(i + \" \");\n}",
    options: ["1 2 ", "1 2 4 5 ", "1 2 3 ", "3 4 5 "],
    correctAnswer: 0,
    explanation: "When i becomes 3, the break statement executes, terminating the loop immediately. Output is '1 2 '.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) {\n        continue;\n    }\n    System.out.print(i + \" \");\n}",
    options: ["1 2 4 5 ", "1 2 ", "1 2 3 4 5 ", "3 "],
    correctAnswer: 0,
    explanation: "When i is 3, continue skips the print statement and jumps to i++ (i becomes 4). 3 is omitted. Output: '1 2 4 5 '.",
    marks: 1
  },
  {
    question: "Where does the `continue` statement jump to in a `while` loop versus a `for` loop?",
    answer: "In a `for` loop, `continue` jumps to the loop update expression (e.g., `i++`). In a `while` loop, `continue` jumps directly to the Boolean test condition header `while(condition)`.",
    marks: 2,
    hint: "Think about where the counter increment is located in while vs for."
  },
  {
    question: "What danger exists when using `continue` inside a `while` loop?",
    options: [
      "If the increment statement (e.g. `i++`) is placed after `continue`, it is skipped, resulting in an accidental infinite loop.",
      "The program immediately throws a NullPointerException.",
      "The continue statement is illegal in while loops.",
      "It terminates the JVM."
    ],
    correctAnswer: 0,
    explanation: "If variable incrementation is placed below continue inside a while body, jumping over it leaves the variable unchanged, causing an infinite loop.",
    marks: 1
  },
  {
    question: "Which keyword can be used to exit both loops and `switch` statements?",
    options: ["break", "continue", "return", "exit"],
    correctAnswer: 0,
    explanation: "The break keyword is valid in both loop constructs (for, while, do-while) and switch-case blocks.",
    marks: 1
  },
  {
    question: "Predict the output of the nested loop:\nfor (int r = 1; r <= 2; r++) {\n    for (int c = 1; c <= 3; c++) {\n        if (c == 2) break;\n        System.out.print(r + \"\" + c + \" \");\n    }\n}",
    options: ["11 21 ", "11 12 21 22 ", "11 22 ", "11 12 13 "],
    correctAnswer: 0,
    explanation: "When c == 2, break terminates the INNER loop only. For r=1: prints 11, breaks. For r=2: prints 21, breaks. Output: '11 21 '.",
    marks: 2
  }
];
