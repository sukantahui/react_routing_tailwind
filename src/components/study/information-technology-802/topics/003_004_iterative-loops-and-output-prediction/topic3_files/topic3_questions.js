export default [
  {
    question: "Write the complete Java code using a `while` loop to print numbers from N down to 1, where N is taken as user input.",
    answer: "import java.util.Scanner;\npublic class ReverseCount {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter N: \");\n        int n = sc.nextInt();\n        int i = n;\n        while (i >= 1) {\n            System.out.print(i + \" \");\n            i--;\n        }\n    }\n}",
    marks: 4,
    hint: "Initialize i = n, condition i >= 1, decrement i-- inside loop."
  },
  {
    question: "Which package must be imported in Java to use the `Scanner` class?",
    options: ["java.util.Scanner", "java.io.Scanner", "java.lang.Scanner", "java.net.Scanner"],
    correctAnswer: 0,
    explanation: "The Scanner class resides in the java.util utility package.",
    marks: 1
  },
  {
    question: "Which Scanner method is used to read an integer from the standard console input?",
    options: ["scanner.nextInt()", "scanner.readInt()", "scanner.getInteger()", "scanner.parseInteger()"],
    correctAnswer: 0,
    explanation: "nextInt() is the standard method in java.util.Scanner to read integer tokens.",
    marks: 1
  },
  {
    question: "If user inputs N = 5, what is the output of the decrementing while loop `int i = n; while(i >= 1) { System.out.print(i + \" \"); i--; }`?",
    options: ["5 4 3 2 1 ", "1 2 3 4 5 ", "5 4 3 2 1 0 ", "4 3 2 1 "],
    correctAnswer: 0,
    explanation: "The loop starts at 5, prints 5 4 3 2 1 and stops when i becomes 0 (0 >= 1 is false).",
    marks: 1
  },
  {
    question: "What will happen if the loop decrement statement `i--;` is omitted in the N down to 1 program?",
    options: [
      "The program will print N repeatedly in an infinite loop because variable i never decreases.",
      "The loop will terminate after 1 execution.",
      "A compilation syntax error will occur.",
      "Variable i will automatically decrease by default."
    ],
    correctAnswer: 0,
    explanation: "Without i--, variable i retains its initial value, keeping i >= 1 permanently true and resulting in an infinite loop.",
    marks: 1
  },
  {
    question: "What happens if the user inputs a negative number (e.g. N = -5) in `int i = n; while (i >= 1) { ... }`?",
    options: [
      "The loop body executes 0 times and produces no output because -5 >= 1 is false initially.",
      "The program crashes with NegativeInputException.",
      "It prints numbers down to -infinity.",
      "It prints -5."
    ],
    correctAnswer: 0,
    explanation: "Because while is an entry-controlled loop, the condition -5 >= 1 is false at the first check, skipping the body entirely.",
    marks: 1
  },
  {
    question: "How can you modify the loop to print only EVEN numbers from N down to 2?",
    answer: "int i = (n % 2 == 0) ? n : n - 1;\nwhile (i >= 2) {\n    System.out.print(i + \" \");\n    i -= 2;\n}",
    marks: 2,
    hint: "Start at the highest even integer <= N, and step down by 2 (i -= 2)."
  },
  {
    question: "What is the difference between `System.out.print()` and `System.out.println()` in Java loops?",
    options: [
      "print() outputs on the same line, while println() appends a newline character after printing.",
      "println() only accepts strings, print() only accepts numbers.",
      "print() cannot be used inside loops.",
      "There is no difference."
    ],
    correctAnswer: 0,
    explanation: "System.out.print() keeps the console cursor on the same line, while System.out.println() moves the cursor to the beginning of the next line.",
    marks: 1
  }
];
