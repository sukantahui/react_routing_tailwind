const topic6_questions = [
  {
    "question": "Why can you NOT pass a primitive array (e.g. 'int[]') to a generic method defined as '<T> void printArray(T[] arr)'?",
    "shortAnswer": "In Java Generics, type parameter 'T' can only be instantiated with reference types extending 'java.lang.Object'. A primitive 'int' is not an Object. While 'int[]' is an Object, it is NOT an array of Objects ('Object[]' or 'T[]'). To pass numeric arrays to generic methods, you must use boxed wrapper arrays like 'Integer[]' or 'Double[]'.",
    "explanation": "Generics in Java operate exclusively on reference types due to type erasure.",
    "hint": "Primitive 'int' is not an Object; wrapper arrays ('Integer[]') must be used.",
    "level": "Intermediate",
    "codeExample": "Integer[] arr = {1, 2, 3}; printArray(arr); // Valid (int[] fails compilation)"
  }
];

export default topic6_questions;