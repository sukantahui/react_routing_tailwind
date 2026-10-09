export default [
  {
    question: "What is an array in Java, and how is it allocated in memory?",
    answer: "An array in Java is an indexed collection of a fixed number of homogeneous (same data type) elements stored in contiguous (adjacent) memory locations. In Java, all arrays are dynamically allocated objects created on the Heap.",
    marks: 2,
    hint: "Homogeneous elements in contiguous memory allocated on heap."
  },
  {
    question: "What is the index of the first and last element in an array of size `N`?",
    options: ["First is 0, Last is N - 1", "First is 1, Last is N", "First is 0, Last is N", "First is -1, Last is N - 1"],
    correctAnswer: 0,
    explanation: "Java arrays use 0-based indexing. An array of size N has indices from 0 up to N - 1.",
    marks: 1
  },
  {
    question: "How do you find the total number of elements in an array named `marks` in Java?",
    options: ["marks.length", "marks.length()", "marks.size()", "marks.count"],
    correctAnswer: 0,
    explanation: "In Java, array length is accessed via the read-only instance field `marks.length` (without parentheses, unlike String's `str.length()`).",
    marks: 1
  }
];
