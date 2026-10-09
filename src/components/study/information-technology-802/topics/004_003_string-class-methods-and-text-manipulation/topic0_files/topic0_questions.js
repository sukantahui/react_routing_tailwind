export default [
  {
    question: "What is meant by the immutability of String objects in Java?",
    answer: "Immutability means that once a `String` object is created in memory, its character sequence/contents CANNOT be modified. Any method that appears to modify a String (such as `concat()`, `replace()`, or `toUpperCase()`) actually allocates and returns a completely NEW String object on the heap, leaving the original unchanged.",
    marks: 2,
    hint: "String objects cannot be altered in-place after creation."
  },
  {
    question: "Which package automatically imports the `String` class in Java?",
    options: ["java.lang", "java.util", "java.io", "java.text"],
    correctAnswer: 0,
    explanation: "The String class resides in `java.lang`, which is automatically imported into every Java source file.",
    marks: 1
  },
  {
    question: "What is the output of the following Java snippet?\nString s = \"Java\";\ns.concat(\" 802\");\nSystem.out.println(s);",
    options: ["Java", "Java 802", "802", "Compilation error"],
    correctAnswer: 0,
    explanation: "Because String is immutable, `s.concat(\" 802\")` creates a new string \"Java 802\" but does not reassign it to `s`. Variable `s` still points to \"Java\".",
    marks: 2
  }
];
