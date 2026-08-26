const topic6_questions = [
  {
    question: "Why does 'Integer a = 100, b = 100; (a == b)' return true, whereas with 200 it returns false?",
    shortAnswer: "The JVM maintains an internal IntegerCache pool for values from -128 to 127. 'Integer.valueOf(100)' returns a cached shared object (same memory reference), whereas 200 exceeds the cache threshold and allocates new distinct Heap objects.",
    explanation: "Can be tuned using JVM flag: -XX:AutoBoxCacheMax=<size>.",
    hint: "JVM caches Integers from -128 to 127; values outside create separate heap objects.",
    level: "Intermediate",
    codeExample: "Integer a = 100, b = 100; // a == b is true\nInteger x = 200, y = 200; // x == y is false"
  }
];

export default topic6_questions;