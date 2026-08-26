const topic4_questions = [
  {
    "question": "Why does Integer a = 127, b = 127; a == b return true, but for 128 it returns false?",
    "shortAnswer": "Autoboxing calls Integer.valueOf(), which caches objects between -128 and 127. Values in this range return the same shared flyweight instance from the cache; for 128, new separate heap objects are created with different memory addresses.",
    "explanation": "Integer cache flyweight optimization in Java.",
    "hint": "Integer.valueOf caches values between -128 and 127.",
    "level": "Beginner",
    "codeExample": "Integer.valueOf(127) == Integer.valueOf(127); // true"
  },
  {
    "question": "Can the upper limit of the Integer cache (127) be modified via JVM arguments?",
    "shortAnswer": "Yes, using the JVM flag -XX:AutoBoxCacheMax=<size> (e.g. -XX:AutoBoxCacheMax=1000). The lower limit of -128 is fixed.",
    "explanation": "Configurable HotSpot JVM property.",
    "hint": "Yes, via -XX:AutoBoxCacheMax=<size>.",
    "level": "Intermediate",
    "codeExample": "-XX:AutoBoxCacheMax=2048"
  }
];

export default topic4_questions;
