export default [
  {
    question: "What is the primary difference between an entry-controlled loop and an exit-controlled loop in Java?",
    answer: "In an entry-controlled loop (such as for and while), the test condition is evaluated before executing the loop body; if the condition is false initially, the body does not execute at all. In an exit-controlled loop (such as do-while), the loop body executes first, and the condition is evaluated at the bottom, guaranteeing at least one execution.",
    marks: 2,
    hint: "Think about where the test condition is checked (top vs bottom)."
  },
  {
    question: "Which loop in Java is an exit-controlled loop?",
    options: ["for loop", "while loop", "do-while loop", "enhanced for-each loop"],
    correctAnswer: 2,
    explanation: "The do-while loop is the only exit-controlled loop in Java because its Boolean condition is checked after the execution of the statements in the loop body.",
    marks: 1
  },
  {
    question: "How many times will a while loop execute if its test condition is initially false?",
    options: ["0 times", "1 time", "Infinite times", "Compilation error"],
    correctAnswer: 0,
    explanation: "Because the while loop evaluates its condition at the entry point before running the body, an initially false condition causes zero executions.",
    marks: 1
  },
  {
    question: "How many times will a do-while loop execute if its test condition is initially false?",
    options: ["0 times", "1 time", "2 times", "Infinite times"],
    correctAnswer: 1,
    explanation: "A do-while loop executes the body first before checking the condition at the exit point, so it always executes at least once regardless of the condition.",
    marks: 1
  },
  {
    question: "State the syntax of the while loop and do-while loop in Java.",
    answer: "Syntax of while loop:\nwhile (condition) {\n    // body of loop\n}\n\nSyntax of do-while loop:\ndo {\n    // body of loop\n} while (condition); // Note the mandatory semicolon at the end.",
    marks: 2,
    hint: "Remember the semicolon after while(condition) in do-while."
  },
  {
    question: "What is the output of the following Java snippet?\nint x = 10;\nwhile (x < 10) {\n    System.out.print(x + \" \");\n    x++;\n}",
    options: ["10", "No output is produced", "10 11", "Compilation error"],
    correctAnswer: 1,
    explanation: "The initial condition 10 < 10 is false, so the while loop body is never entered and no output is printed.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nint x = 10;\ndo {\n    System.out.print(x + \" \");\n    x++;\n} while (x < 10);",
    options: ["No output", "10 ", "10 11 ", "Infinite loop"],
    correctAnswer: 1,
    explanation: "The do block executes once, printing '10 ' and incrementing x to 11. Then the condition 11 < 10 is evaluated to false, terminating the loop.",
    marks: 1
  },
  {
    question: "Which of the following loops is best suited when the exact number of iterations is known in advance?",
    options: ["do-while loop", "while loop", "for loop", "infinite loop"],
    correctAnswer: 2,
    explanation: "The for loop is typically used for counter-controlled loops where the number of iterations is fixed and known beforehand.",
    marks: 1
  },
  {
    question: "What happens if you omit the semicolon after while(condition) in a do-while statement?",
    options: ["Runtime exception", "Syntax / Compilation error", "The loop becomes infinite", "It executes normally"],
    correctAnswer: 1,
    explanation: "In Java, the closing while(condition); of a do-while loop requires a terminating semicolon. Omitting it causes a compilation error (';' expected).",
    marks: 1
  },
  {
    question: "What is the role of the loop update expression (increment/decrement)?",
    answer: "The update expression modifies the loop control variable on each iteration, eventually causing the loop condition to evaluate to false and preventing an infinite loop.",
    marks: 2,
    hint: "It moves the loop towards its termination condition."
  },
  {
    question: "What is the minimum number of times an entry-controlled loop executes?",
    options: ["0 times", "1 time", "Depends on JVM", "-1 times"],
    correctAnswer: 0,
    explanation: "An entry-controlled loop (while/for) can execute a minimum of 0 times if the test condition evaluates to false at the start.",
    marks: 1
  },
  {
    question: "What is the minimum number of times an exit-controlled loop executes?",
    options: ["0 times", "1 time", "Infinite times", "2 times"],
    correctAnswer: 1,
    explanation: "An exit-controlled loop (do-while) executes at least 1 time because testing occurs at the exit point.",
    marks: 1
  },
  {
    question: "Predict the output of the following code:\nint a = 1;\nwhile(a <= 5) {\n    if (a == 3) {\n        a += 2;\n        continue;\n    }\n    System.out.print(a + \" \");\n    a++;\n}",
    options: ["1 2 4 5 ", "1 2 5 ", "1 2 ", "1 2 3 4 5 "],
    correctAnswer: 1,
    explanation: "For a=1: prints 1, a becomes 2. For a=2: prints 2, a becomes 3. For a=3: a becomes 5, continue jumps to condition (5 <= 5 true). For a=5: prints 5, a becomes 6. Loop terminates. Output: '1 2 5 '.",
    marks: 2
  },
  {
    question: "Which of the following statements is TRUE regarding while vs do-while?",
    options: [
      "Both while and do-while are entry-controlled loops.",
      "while evaluates the condition at entry; do-while evaluates at exit.",
      "do-while cannot use break or continue statements.",
      "while loop requires a semicolon after the condition."
    ],
    correctAnswer: 1,
    explanation: "The while loop tests at entry, whereas the do-while loop tests at exit.",
    marks: 1
  },
  {
    question: "Explain why menu-driven programs are frequently implemented using do-while loops.",
    answer: "Menu-driven programs require the user interface menu to be displayed at least once for the user to make an initial selection, and then repeat based on the user's choice. Since do-while guarantees at least one execution, it is the ideal control structure for interactive CLI menus.",
    marks: 2,
    hint: "The menu must show up before asking for the first choice."
  }
];
