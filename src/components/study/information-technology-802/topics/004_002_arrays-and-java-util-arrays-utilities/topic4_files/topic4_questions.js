export default [
  {
    question: "Which package must be imported to use the `Arrays` utility class in Java?",
    options: ["java.util.Arrays", "java.lang.Arrays", "java.io.Arrays", "java.arrays.Arrays"],
    correctAnswer: 0,
    explanation: "The Arrays utility class resides in the java.util package (`import java.util.Arrays;`).",
    marks: 1
  },
  {
    question: "Name two commonly tested static methods in `java.util.Arrays` in CBSE IT (802).",
    answer: "1. `Arrays.sort(array)`: Sorts the specified array into ascending numerical/lexicographical order.\n2. `Arrays.binarySearch(array, key)`: Searches for the specified key within a sorted array using binary search.",
    marks: 2,
    hint: "sort() and binarySearch()."
  },
  {
    question: "Are methods in `java.util.Arrays` called on object instances or directly on the class name?",
    options: [
      "Directly on the class name because they are static methods (e.g. `Arrays.sort(arr)`).",
      "On object instances like `arr.sort()`.",
      "Only using the new operator.",
      "Via Java reflection only."
    ],
    correctAnswer: 0,
    explanation: "Methods in java.util.Arrays are static utility methods called using the class name: `Arrays.methodName(array)`.",
    marks: 1
  }
];
