const topic8_questions = [
  {
    "question": "How does the Java compiler transform generic varargs parameter 'T... elements' behind the scenes?",
    "shortAnswer": "The Java compiler converts 'T... elements' into an array of type 'T[] elements'. When calling code passes comma-separated arguments ('createList(1, 2, 3)'), the compiler generates bytecode that allocates a new array, populates it with the arguments, and passes the array reference into the method.",
    "explanation": "Effective Java Item 53 & 32: Understanding the compiler's underlying array creation mechanism.",
    "hint": "Translates 'T...' into an array 'T[]', allocating an array to hold the passed arguments.",
    "level": "Intermediate",
    "codeExample": "public static <T> List<T> of(T... items) { ... }"
  }
];

export default topic8_questions;