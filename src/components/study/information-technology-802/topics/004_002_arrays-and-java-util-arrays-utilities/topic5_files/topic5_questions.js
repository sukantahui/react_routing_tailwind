export default [
  {
    question: "In what order does `Arrays.sort(array)` arrange elements in Java?",
    options: ["Ascending order (smallest to largest)", "Descending order", "Random order", "Reverse insertion order"],
    correctAnswer: 0,
    explanation: "By default, `Arrays.sort()` arranges elements in ascending natural order (numerical order for numbers, alphabetical lexicographical order for strings).",
    marks: 1
  },
  {
    question: "Given `int[] arr = {45, 12, 85, 32, 10};`, what are the contents of `arr` after executing `Arrays.sort(arr);`?",
    options: [
      "{10, 12, 32, 45, 85}",
      "{85, 45, 32, 12, 10}",
      "{12, 45, 85, 32, 10}",
      "{10, 12, 45, 32, 85}"
    ],
    correctAnswer: 0,
    explanation: "Elements are sorted into ascending order: 10, 12, 32, 45, 85.",
    marks: 2
  },
  {
    question: "Does `Arrays.sort()` modify the original array in-place or create a new array?",
    answer: "It modifies the original array in-place. The existing array elements are rearranged directly in heap memory.",
    marks: 2,
    hint: "In-place modification vs new array."
  }
];
