export default [
  {
    question: "Given `String str = \"Computer Science\";`, what is the output of `System.out.println(str.substring(0, 8) + \" Application\");`?",
    options: ["Computer Application", "Compute Application", "Computers Application", "Computer Science Application"],
    correctAnswer: 0,
    explanation: "`str.substring(0, 8)` extracts 8 characters from index 0 to 7 (\"Computer\"). Concatenating with \" Application\" yields \"Computer Application\".",
    marks: 2
  },
  {
    question: "What is the output of `System.out.println(\"Java\".equalsIgnoreCase(\"JAVA\"));`?",
    options: ["true", "false", "Compilation error", "-1"],
    correctAnswer: 0,
    explanation: "`equalsIgnoreCase()` ignores case differences, so \"Java\" and \"JAVA\" match and return `true`.",
    marks: 1
  }
];
