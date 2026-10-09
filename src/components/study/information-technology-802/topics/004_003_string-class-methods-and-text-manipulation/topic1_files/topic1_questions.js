export default [
  {
    question: "What are the two ways to concatenate strings in Java?",
    answer: "1. Using the `+` string concatenation operator (e.g. `\"Hello \" + \"World\"`).\n2. Using the `concat()` method of String (e.g. `str.concat(\" for me\")`).",
    marks: 2,
    hint: "+ operator and concat() method."
  },
  {
    question: "What is the difference between `+` and `.concat()` when appending non-string primitives?",
    options: [
      "The `+` operator automatically converts numbers/booleans to strings, whereas `.concat()` accepts ONLY String arguments.",
      "`.concat()` converts all numbers automatically.",
      "The `+` operator cannot join strings.",
      "There is no difference."
    ],
    correctAnswer: 0,
    explanation: "`.concat(String str)` strictly requires a String argument (or compilation error), whereas `\"Age: \" + 18` uses the `+` operator to implicitly convert 18 to String.",
    marks: 1
  },
  {
    question: "Predict the output of `System.out.println(10 + 20 + \"Java\" + 10 + 20);`.",
    options: ["30Java1020", "1020Java1020", "30Java30", "1020Java30"],
    correctAnswer: 0,
    explanation: "Evaluation is left-to-right: 10 + 20 = 30 (integer addition) -> 30 + \"Java\" = \"30Java\" (string concat) -> \"30Java\" + 10 = \"30Java10\" -> \"30Java10\" + 20 = \"30Java1020\".",
    marks: 2
  }
];
