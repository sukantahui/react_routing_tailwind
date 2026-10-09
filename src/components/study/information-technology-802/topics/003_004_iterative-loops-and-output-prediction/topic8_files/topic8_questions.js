export default [
  {
    question: "Predict the output of the following Java code:\nint k = 1;\ndo {\n    System.out.print((k * 4) + \" \");\n    k++;\n} while (k <= 4);",
    options: ["4 8 12 16 ", "4 8 12 ", "1 2 3 4 ", "4 8 12 16 20 "],
    correctAnswer: 0,
    explanation: "Pass 1: k=1 -> prints 4, k becomes 2 (2<=4 true).\nPass 2: k=2 -> prints 8, k becomes 3 (3<=4 true).\nPass 3: k=3 -> prints 12, k becomes 4 (4<=4 true).\nPass 4: k=4 -> prints 16, k becomes 5 (5<=4 false).\nOutput: '4 8 12 16 '.",
    marks: 2
  },
  {
    question: "What is the output of the loop below?\nint x = 20;\nwhile (x > 5) {\n    if (x == 14) break;\n    x -= 3;\n}\nSystem.out.println(x);",
    options: ["14", "20", "17", "11"],
    correctAnswer: 0,
    explanation: "x starts at 20 -> 20 != 14, x becomes 17 -> 17 != 14, x becomes 14 -> 14 == 14, break triggers. Loop exits. System.out.println(x) prints 14.",
    marks: 2
  },
  {
    question: "How many times does the statement `System.out.println(\"Hello\");` execute?\nint a = 5;\ndo {\n    System.out.println(\"Hello\");\n    a--;\n} while (a > 5);",
    options: ["1 time", "0 times", "5 times", "Infinite times"],
    correctAnswer: 0,
    explanation: "In do-while, the body executes once first. 'Hello' is printed, a becomes 4. Then 4 > 5 is tested (false). The loop terminates after exactly 1 execution.",
    marks: 1
  },
  {
    question: "What is the output of:\nint sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) continue;\n    sum += i;\n}\nSystem.out.println(sum);",
    options: ["9", "15", "6", "0"],
    correctAnswer: 0,
    explanation: "When i is even (2, 4), continue skips the sum. For odd i (1, 3, 5), sum += i evaluates to 1 + 3 + 5 = 9.",
    marks: 2
  },
  {
    question: "What is the result of the following Java snippet?\nint n = 876;\nint count = 0;\nwhile (n > 0) {\n    count++;\n    n /= 10;\n}\nSystem.out.println(count);",
    options: ["3", "876", "21", "0"],
    correctAnswer: 0,
    explanation: "The loop divides by 10 three times (876 -> 87 -> 8 -> 0), counting the total number of digits, which is 3.",
    marks: 2
  }
];
