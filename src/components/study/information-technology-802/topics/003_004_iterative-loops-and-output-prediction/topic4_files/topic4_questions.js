export default [
  {
    question: "Predict the exact output of the following Java code:\nint num = 5;\ndo {\n    System.out.println(num + 2);\n    --num;\n} while (num >= 2);",
    options: [
      "7\n6\n5\n4",
      "7\n6\n5\n4\n3",
      "5\n4\n3\n2",
      "7\n6\n5"
    ],
    correctAnswer: 0,
    explanation: "Pass 1: num=5 -> prints 5+2=7 -> num becomes 4 -> 4>=2 (true).\nPass 2: num=4 -> prints 4+2=6 -> num becomes 3 -> 3>=2 (true).\nPass 3: num=3 -> prints 3+2=5 -> num becomes 2 -> 2>=2 (true).\nPass 4: num=2 -> prints 2+2=4 -> num becomes 1 -> 1>=2 (false, loop stops).\nOutput is 7, 6, 5, 4 on new lines.",
    marks: 2
  },
  {
    question: "What is the final value of variable `num` after the loop terminates in:\nint num = 5;\ndo {\n    System.out.println(num + 2);\n    --num;\n} while (num >= 2);",
    options: ["1", "2", "0", "4"],
    correctAnswer: 0,
    explanation: "During the 4th iteration, --num reduces 2 to 1. The test 1 >= 2 fails and the loop ends with num equal to 1.",
    marks: 1
  },
  {
    question: "Predict the output of the following do-while loop:\nint a = 10;\ndo {\n    System.out.print(a + \" \");\n    a -= 3;\n} while (a > 2);",
    options: ["10 7 4 ", "10 7 4 1 ", "10 7 ", "7 4 1 "],
    correctAnswer: 0,
    explanation: "Pass 1: a=10 -> prints 10, a becomes 7 (7>2 true).\nPass 2: a=7 -> prints 7, a becomes 4 (4>2 true).\nPass 3: a=4 -> prints 4, a becomes 1 (1>2 false, terminates).\nOutput: '10 7 4 '.",
    marks: 2
  },
  {
    question: "Predict the output of the following do-while loop with prefix increment:\nint p = 1;\ndo {\n    System.out.print((++p * 2) + \" \");\n} while (p <= 3);",
    options: ["4 6 8 ", "2 4 6 ", "4 6 ", "4 6 8 10 "],
    correctAnswer: 0,
    explanation: "Pass 1: p=1 -> ++p becomes 2 -> prints 2*2=4 -> condition 2<=3 true.\nPass 2: p=2 -> ++p becomes 3 -> prints 3*2=6 -> condition 3<=3 true.\nPass 3: p=3 -> ++p becomes 4 -> prints 4*2=8 -> condition 4<=3 false (terminates).\nOutput: '4 6 8 '.",
    marks: 2
  },
  {
    question: "What is the output if the initial condition in do-while is already false?\nint z = 1;\ndo {\n    System.out.print(z * 5 + \" \");\n    z++;\n} while (z > 10);",
    options: ["5 ", "No output", "5 10 ", "Infinite loop"],
    correctAnswer: 0,
    explanation: "The do body runs once unconditionally, printing 1*5=5 and incrementing z to 2. The test 2 > 10 is false, so it terminates after printing '5 '.",
    marks: 1
  },
  {
    question: "Explain the difference in output between prefix decrement (`--num`) and postfix decrement (`num--`) inside a print statement.",
    answer: "`System.out.print(--num)` decrements `num` by 1 BEFORE passing the value to `print()`. `System.out.print(num--)` passes the CURRENT value of `num` to `print()` first, and decrements `num` by 1 AFTER printing.",
    marks: 2,
    hint: "Prefix = change then use; Postfix = use then change."
  }
];
