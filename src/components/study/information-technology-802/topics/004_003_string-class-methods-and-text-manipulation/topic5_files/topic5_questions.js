export default [
  {
    question: "What are the return types and purposes of `toUpperCase()` and `toLowerCase()` in Java String?",
    answer: "Both methods return a new `String` object. `toUpperCase()` converts all characters in the calling string to uppercase, and `toLowerCase()` converts all characters to lowercase, without modifying non-alphabetic characters (digits and symbols).",
    marks: 2,
    hint: "Case conversion returning a new String object."
  },
  {
    question: "Given `String str = \"Java 802!\";`, what is the output of `System.out.println(str.toUpperCase());`?",
    options: ["JAVA 802!", "java 802!", "JAVA 802", "Compilation error"],
    correctAnswer: 0,
    explanation: "Letters 'J','a','v','a' become uppercase 'JAVA', while space, numbers, and '!' remain untouched.",
    marks: 1
  }
];
