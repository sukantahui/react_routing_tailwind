export default [
  {
    question: "What exception is thrown when a Java program attempts to access an array index that is negative or greater than or equal to the array length?",
    options: [
      "ArrayIndexOutOfBoundsException",
      "NullPointerException",
      "ArrayStoreException",
      "IndexNotFoundException"
    ],
    correctAnswer: 0,
    explanation: "Java runtime performs strict bounds checking and throws `java.lang.ArrayIndexOutOfBoundsException` when accessing invalid indices.",
    marks: 1
  },
  {
    question: "Given `int[] arr = new int[5];`, which of the following index accesses will throw an `ArrayIndexOutOfBoundsException`?",
    options: [
      "arr[5] and arr[-1]",
      "arr[0] and arr[4]",
      "arr[2]",
      "arr[arr.length - 1]"
    ],
    correctAnswer: 0,
    explanation: "Valid indices are 0 to 4. Accessing index 5 (which equals length) or index -1 throws ArrayIndexOutOfBoundsException.",
    marks: 1
  },
  {
    question: "Is `ArrayIndexOutOfBoundsException` a checked or unchecked exception in Java?",
    answer: "It is an UNCHECKED (Runtime) exception subclass of `java.lang.RuntimeException`. It is not verified at compile time but thrown at runtime when invalid bounds are accessed.",
    marks: 2,
    hint: "Unchecked runtime exception."
  }
];
