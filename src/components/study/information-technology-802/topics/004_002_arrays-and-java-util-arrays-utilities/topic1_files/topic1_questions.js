export default [
  {
    question: "How do you declare and initialize an array in a single line using array literal notation in Java?",
    answer: "Using curly braces with comma-separated literal values, for example:\n`double[] Marks = {93.0, 87.5, 97.5, 65.0, 70.0};`\nor\n`int[] primes = {2, 3, 5, 7, 11};`",
    marks: 2,
    hint: "Use curly braces {} with comma-separated values."
  },
  {
    question: "Which of the following array declarations is VALID in Java?",
    options: [
      "double[] Marks = {93.0, 87.5, 97.5, 65.0, 70.0};",
      "double Marks[] = new double[5]{93.0, 87.5, 97.5, 65.0, 70.0}; (Cannot specify size inside brackets with initializers)",
      "double[5] Marks = {93.0, 87.5, 97.5, 65.0, 70.0};",
      "Marks double[] = {93.0, 87.5, 97.5, 65.0, 70.0};"
    ],
    correctAnswer: 0,
    explanation: "In Java, array literal initialization does not require specifying dimension size inside brackets.",
    marks: 1
  },
  {
    question: "What is the length of the array `String[] subjects = {\"IT\", \"Physics\", \"Chemistry\", \"Maths\"};`?",
    options: ["4", "3", "5", "0"],
    correctAnswer: 0,
    explanation: "There are 4 string literals enclosed in the initializer list, so `subjects.length` is 4.",
    marks: 1
  }
];
