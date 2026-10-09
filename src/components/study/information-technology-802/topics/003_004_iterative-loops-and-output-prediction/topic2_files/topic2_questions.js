export default [
  {
    question: "What is indefinite iteration, and why is the `while` loop ideal for it?",
    answer: "Indefinite iteration refers to a scenario where the exact number of loop repetitions cannot be predetermined before execution, but depends dynamically on a runtime state or user input (e.g., reading data until end-of-file or until the user enters -1). The `while` loop is ideal because it repeats strictly based on a boolean condition rather than a fixed step counter.",
    marks: 2,
    hint: "Think about scenarios like reading until a sentinel value like -1 is entered."
  },
  {
    question: "What is the syntax of a standard `while` loop in Java?",
    answer: "while (boolean_expression) {\n    // statements in loop body\n    // update statement\n}",
    marks: 2,
    hint: "Notice that while does not take a terminating semicolon after its parentheses."
  },
  {
    question: "What happens if a semicolon is placed immediately after the `while` condition, such as `while (x < 10);`?",
    options: [
      "The loop body becomes an empty statement (null statement); if x is not updated inside the condition, it creates an infinite loop.",
      "It causes a compilation syntax error.",
      "It runs normally and ignores the semicolon.",
      "The program immediately terminates with code 0."
    ],
    correctAnswer: 0,
    explanation: "A semicolon after while(cond); terminates the while statement with an empty body. If cond is true and x is not updated, it loops infinitely on the empty statement.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nint count = 1;\nwhile (count <= 4) {\n    System.out.print(count * 2 + \" \");\n    count += 2;\n}",
    options: ["2 6 ", "2 4 6 8 ", "2 6 10 ", "Compilation error"],
    correctAnswer: 0,
    explanation: "For count=1: prints 2, count becomes 3. For count=3: prints 6, count becomes 5. 5 <= 4 is false. Loop terminates. Output: '2 6 '.",
    marks: 2
  },
  {
    question: "What is a sentinel value in while loop programming?",
    options: [
      "A special designated input value used to signal the termination of loop processing (e.g. entering -1 to stop entering marks).",
      "A syntax error thrown by the Java compiler.",
      "The initial starting value of a loop variable.",
      "A reserved keyword in Java like goto."
    ],
    correctAnswer: 0,
    explanation: "A sentinel value is a dummy value (like -1 or 999) entered by the user to indicate that no more data is to be processed.",
    marks: 1
  },
  {
    question: "Predict the output of the following code:\nint n = 5432;\nint sum = 0;\nwhile (n > 0) {\n    sum += n % 10;\n    n = n / 10;\n}\nSystem.out.println(sum);",
    options: ["14", "10", "2345", "5432"],
    correctAnswer: 0,
    explanation: "In each iteration, n % 10 extracts the last digit (2, 3, 4, 5) and n / 10 removes it. The sum of digits = 2 + 3 + 4 + 5 = 14.",
    marks: 2
  },
  {
    question: "Which loop construct is best used when processing elements until a boolean condition turns false?",
    options: ["while loop", "switch case", "if-else statement", "break statement"],
    correctAnswer: 0,
    explanation: "The while loop is the fundamental pre-test boolean-driven loop designed for indefinite conditional repetition.",
    marks: 1
  },
  {
    question: "What is the result of the following while loop?\nint i = 0;\nwhile (i < 5) {\n    System.out.print(i + \" \");\n}",
    options: [
      "Prints '0 ' infinitely because variable 'i' is never updated inside the loop.",
      "Prints '0 1 2 3 4 '",
      "Prints '0 ' once and terminates.",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because i is never incremented, i remains 0 forever, keeping 0 < 5 permanently true and resulting in an infinite loop.",
    marks: 1
  },
  {
    question: "Write a while loop in Java to reverse an integer number `num = 1234`.",
    answer: "int num = 1234, rev = 0;\nwhile (num != 0) {\n    int digit = num % 10;\n    rev = (rev * 10) + digit;\n    num = num / 10;\n}\nSystem.out.println(\"Reversed: \" + rev);",
    marks: 3,
    hint: "Use % 10 to get the last digit and * 10 to shift places."
  },
  {
    question: "Can a while loop have multiple conditions in its header?",
    options: [
      "Yes, conditions can be combined using logical operators (&&, ||, !).",
      "No, while loop only supports a single relational operator.",
      "Yes, but only with commas separating conditions.",
      "No, only for loops allow logical operators."
    ],
    correctAnswer: 0,
    explanation: "Any valid boolean expression, including compound expressions with && and ||, is valid in the while condition header.",
    marks: 1
  }
];
