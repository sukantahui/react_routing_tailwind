export default [
  {
    question: "What does the `length()` method of String return in Java?",
    answer: "The `length()` method returns the total count of characters contained within the string as an `int` value, including spaces and punctuation marks.",
    marks: 1,
    hint: "Total number of characters including spaces."
  },
  {
    question: "What is the length of `\"Information Technology\"`?",
    options: ["22", "21", "20", "23"],
    correctAnswer: 0,
    explanation: "\"Information\" has 11 chars, the space is 1 char, and \"Technology\" has 10 chars. 11 + 1 + 10 = 22.",
    marks: 1
  },
  {
    question: "Explain the critical syntax distinction between finding the size of an array versus the size of a String in Java.",
    answer: "An array uses the read-only instance variable `arr.length` (WITHOUT parentheses). A String uses the member method call `str.length()` (WITH parentheses).",
    marks: 2,
    hint: "Array: arr.length (field); String: str.length() (method)."
  }
];
