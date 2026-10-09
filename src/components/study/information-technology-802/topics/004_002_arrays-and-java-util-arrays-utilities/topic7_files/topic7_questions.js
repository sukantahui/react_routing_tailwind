export default [
  {
    question: "What is the mandatory prerequisite before calling `Arrays.binarySearch(array, key)` on an array?",
    answer: "The array MUST be sorted in ascending order (typically using `Arrays.sort(array)`) prior to calling `Arrays.binarySearch()`. If the array is unsorted, the binary search results are undefined and unpredictable.",
    marks: 2,
    hint: "Array must be sorted in ascending order."
  },
  {
    question: "What happens if you invoke `Arrays.binarySearch()` on an UNSORTED array in Java?",
    options: [
      "The result is undefined and may fail to find elements that actually exist in the array.",
      "The Java compiler automatically sorts the array first.",
      "A compilation error occurs.",
      "It throws an UnsortedArrayException at runtime."
    ],
    correctAnswer: 0,
    explanation: "Binary search relies on sorted partition logic ($middle < key$). In an unsorted array, it discards the wrong half, producing undefined/wrong results.",
    marks: 1
  }
];
