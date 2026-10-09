export default [
  {
    question: "What does `Arrays.binarySearch(array, key)` return if the key is found in the array?",
    answer: "It returns the 0-based integer index where the search key is located within the sorted array.",
    marks: 1,
    hint: "The 0-based index of the found element."
  },
  {
    question: "What does `Arrays.binarySearch(array, key)` return if the search key is NOT present in the sorted array?",
    answer: "It returns a negative integer calculated as: `-(insertion_point) - 1`, where `insertion_point` is the index at which the key would be inserted to maintain sorted order.",
    marks: 2,
    hint: "Negative insertion point formula: -(insertion point) - 1."
  },
  {
    question: "Given the sorted array `int[] a = {10, 20, 30, 40, 50};`, what is the return value of `Arrays.binarySearch(a, 30);`?",
    options: ["2", "3", "1", "-3"],
    correctAnswer: 0,
    explanation: "30 is located at index 2 (0-based indexing: a[0]=10, a[1]=20, a[2]=30). Returns 2.",
    marks: 1
  },
  {
    question: "Given `int[] a = {10, 20, 30, 40, 50};`, what is the return value of `Arrays.binarySearch(a, 25);`?",
    options: ["-3", "-2", "2", "-1"],
    correctAnswer: 0,
    explanation: "25 would be inserted at index 2 (between 20 and 30). Formula: -(insertion_point) - 1 = -(2) - 1 = -3.",
    marks: 2
  }
];
