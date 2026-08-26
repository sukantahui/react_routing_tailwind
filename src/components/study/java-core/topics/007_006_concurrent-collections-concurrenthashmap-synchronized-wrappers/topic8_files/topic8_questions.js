const topic8_questions = [
  {
    "question": "Why does 'ConcurrentHashMap' strictly prohibit both null keys and null values (throwing NullPointerException)?",
    "shortAnswer": "Because in a concurrent multi-threaded environment, allowing null values creates an insurmountable race-condition ambiguity. In a single-threaded HashMap, if 'map.get(key)' returns null, the thread can call 'map.containsKey(key)' to distinguish between 'key is absent' vs 'key maps to null'. In a concurrent map, another thread could insert, update, or remove the key between the 'get()' and 'containsKey()' calls, making it impossible to resolve the ambiguity reliably. Doug Lea strictly banned nulls to guarantee deterministic concurrency.",
    "explanation": "Direct design philosophy by Doug Lea (author of java.util.concurrent).",
    "hint": "Prevents race conditions between get() returning null and containsKey() verifying if key was absent.",
    "level": "Intermediate",
    "codeExample": "map.put(null, \"v\"); // Throws NPE! | map.put(\"k\", null); // Throws NPE!"
  }
];

export default topic8_questions;