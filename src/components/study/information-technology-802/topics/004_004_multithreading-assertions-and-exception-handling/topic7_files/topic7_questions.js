const questions = [
  {
    id: 1,
    question: "Which runtime exception is thrown when attempting to invoke a method or access a field on an object reference that points to 'null'?",
    options: [
      "java.lang.NullPointerException",
      "java.lang.ArrayIndexOutOfBoundsException",
      "java.lang.NumberFormatException",
      "java.lang.ArithmeticException"
    ],
    correctAnswer: 0,
    explanation: "A `NullPointerException` occurs when an application attempts to use null in a case where an active object is required (e.g., calling `s.length()` when `s` is `null`).",
    marks: 1,
    hint: "Invoking methods on uninitialized or null reference variables."
  },
  {
    id: 2,
    question: "When is an 'ArrayIndexOutOfBoundsException' thrown in Java?",
    options: [
      "When accessing an array with an illegal index that is either negative or greater than or equal to array.length",
      "When an array contains different data types",
      "When an array is sorted in descending order",
      "When an array has more than 100 elements"
    ],
    correctAnswer: 0,
    explanation: "An `ArrayIndexOutOfBoundsException` is thrown to indicate that an array has been accessed with an illegal index (index < 0 or index >= array.length).",
    marks: 1,
    hint: "Accessing an array outside valid [0, length-1] boundaries."
  },
  {
    id: 3,
    question: "Which method invocation will throw a 'NumberFormatException'?",
    options: [
      "Integer.parseInt(\"abc\")",
      "Integer.parseInt(\"123\")",
      "Double.parseDouble(\"45.67\")",
      "String.valueOf(100)"
    ],
    correctAnswer: 0,
    explanation: "A `NumberFormatException` occurs when attempting to parse a non-numeric string (e.g. \"abc\") into a numeric data type using `Integer.parseInt()` or `Double.parseDouble()`.",
    marks: 1,
    hint: "Parsing invalid non-numeric text into numbers."
  },
  {
    id: 4,
    question: "What exception will the code `int[] arr = new int[5]; System.out.println(arr[5]);` produce?",
    options: [
      "ArrayIndexOutOfBoundsException",
      "NullPointerException",
      "NumberFormatException",
      "Prints 0 without error"
    ],
    correctAnswer: 0,
    explanation: "An array of size 5 has valid indices from 0 to 4. Accessing `arr[5]` is out of bounds and throws `ArrayIndexOutOfBoundsException`.",
    marks: 1,
    hint: "Index 5 exceeds max index (4) for size 5."
  },
  {
    id: 5,
    question: "Are NullPointerException, ArrayIndexOutOfBoundsException, and NumberFormatException checked or unchecked exceptions?",
    options: [
      "Unchecked exceptions (Subclasses of java.lang.RuntimeException)",
      "Checked exceptions (Subclasses of java.io.IOException)",
      "Compiler errors that prevent bytecode compilation",
      "Fatal JVM Errors like OutOfMemoryError"
    ],
    correctAnswer: 0,
    explanation: "All three exceptions are direct or indirect subclasses of `java.lang.RuntimeException` and are classified as unchecked exceptions (the compiler does not force try-catch handling).",
    marks: 1,
    hint: "Subclasses of RuntimeException that do not require mandatory throws declarations."
  }
];

export default questions;
