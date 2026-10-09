export default [
  {
    question: "Why is the `do-while` loop classified as an exit-controlled loop in Java?",
    answer: "The `do-while` loop is classified as an exit-controlled (or post-test) loop because the test condition is evaluated at the bottom of the loop body (exit point). Therefore, the body of the loop executes unconditionally at least once before the condition is ever checked.",
    marks: 2,
    hint: "Recall where the boolean condition appears in the do-while syntax."
  },
  {
    question: "What is guaranteed when using a `do-while` loop in Java?",
    options: [
      "The loop will execute at least once.",
      "The loop will never produce an infinite loop.",
      "The loop runs faster than a for loop.",
      "The loop does not require loop control variables."
    ],
    correctAnswer: 0,
    explanation: "Because condition evaluation occurs at the exit point, a do-while loop is guaranteed to execute at least one time under all circumstances.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nint n = 100;\ndo {\n    System.out.println(\"Executed!\");\n} while (n < 10);",
    options: [
      "Executed! (printed once)",
      "No output",
      "Compilation error",
      "Infinite loop"
    ],
    correctAnswer: 0,
    explanation: "The body prints 'Executed!' first, and then checks 100 < 10 (which is false), terminating the loop after 1 execution.",
    marks: 1
  },
  {
    question: "State the mandatory syntax requirement at the end of a `do-while` loop that is NOT required for a `while` loop.",
    answer: "A do-while loop requires a terminating semicolon (;) after the closing parenthesis of the while condition: `do { ... } while (condition);`. Omitting this semicolon causes a compile-time syntax error.",
    marks: 2,
    hint: "Think about the punctuation mark at the very end of do-while."
  },
  {
    question: "Which real-world application is the prime candidate for a `do-while` loop?",
    options: [
      "Iterating through fixed array indexes from 0 to N-1",
      "Interactive menu-driven programs where the options menu must be shown at least once to the user",
      "Infinite server listener with no user prompt",
      "Matrix multiplication"
    ],
    correctAnswer: 1,
    explanation: "Interactive menu-driven systems require displaying the menu at least once before receiving the user's choice, making do-while the natural design choice.",
    marks: 1
  },
  {
    question: "What error occurs if the semicolon at the end of `while(condition)` in a do-while loop is omitted?",
    options: [
      "Syntax / Compile-time error: ';' expected",
      "NullPointerException",
      "ArrayIndexOutOfBoundsException",
      "Logic warning but code runs"
    ],
    correctAnswer: 0,
    explanation: "The Java compiler strictly requires a semicolon to terminate a do-while statement.",
    marks: 1
  },
  {
    question: "Predict the output of the code:\nint c = 1;\ndo {\n    System.out.print(c * 3 + \" \");\n    c++;\n} while (c <= 3);",
    options: ["3 6 9 ", "3 6 ", "1 2 3 ", "3 6 9 12 "],
    correctAnswer: 0,
    explanation: "Iteration 1: prints 1*3=3, c becomes 2 (2<=3 true). Iteration 2: prints 2*3=6, c becomes 3 (3<=3 true). Iteration 3: prints 3*3=9, c becomes 4 (4<=3 false). Output: '3 6 9 '.",
    marks: 2
  },
  {
    question: "Can a `do-while` loop contain a `break` statement?",
    options: [
      "Yes, `break` immediately terminates the do-while loop.",
      "No, `break` is only allowed in switch statements.",
      "No, `break` only works in while loops.",
      "Yes, but only if inside an inner for loop."
    ],
    correctAnswer: 0,
    explanation: "A break statement inside a do-while loop immediately exits the loop, transferring control to the first statement following the loop.",
    marks: 1
  },
  {
    question: "Convert the following while loop into an equivalent do-while loop:\nint x = 5;\nwhile (x > 0) {\n    System.out.println(x);\n    x--;\n}",
    answer: "int x = 5;\nif (x > 0) {\n    do {\n        System.out.println(x);\n        x--;\n    } while (x > 0);\n}\n(Note: When converting a while loop that might not run if initially false, enclosing in an if check guarantees identical behavior; when the initial state is known to be true (x=5), the plain do-while is:\nint x = 5;\ndo {\n    System.out.println(x);\n    x--;\n} while (x > 0);)",
    marks: 3,
    hint: "Pay attention to initial variable value validity."
  },
  {
    question: "How does Java execute a do-while loop step-by-step?",
    answer: "1. Control enters the loop directly without checking any condition.\n2. All statements inside the loop body are executed.\n3. The Boolean expression in while(condition) is evaluated.\n4. If true, control jumps back to the top of the do block.\n5. If false, the loop terminates and execution continues after the semicolon.",
    marks: 3,
    hint: "List the sequence from entry to condition evaluation."
  }
];
