const topic7_questions = [
  {
    question: "What does the 'compareTo(String anotherString)' method return in Java?",
    shortAnswer: "It returns an integer: negative (< 0) if this string lexicographically precedes the argument, zero (0) if they are equal, and positive (> 0) if this string follows the argument. 'compareToIgnoreCase()' performs the same check ignoring case.",
    explanation: "Powers sorting algorithms in Collections.sort() and Arrays.sort().",
    hint: "Returns < 0 for before, 0 for equal, > 0 for after.",
    level: "Beginner",
    codeExample: "int diff = \"Apple\".compareTo(\"Banana\"); // Returns negative number"
  }
];

export default topic7_questions;
