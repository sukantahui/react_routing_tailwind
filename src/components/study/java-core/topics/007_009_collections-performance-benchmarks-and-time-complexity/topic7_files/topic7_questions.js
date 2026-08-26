const topic7_questions = [
  {
    "question": "Which of the following statements regarding the Java Collections Framework is FALSE?",
    "shortAnswer": "D. 'In Java 8+, HashMap converts a collision bucket to a Red-Black tree as soon as the bucket reaches 8 elements, regardless of total table capacity.' (This is FALSE because treeification ALSO requires table capacity &ge; 64; if capacity < 64, it resizes instead).",
    "explanation": "Precise validation of HashMap treeification prerequisites.",
    "hint": "Treeification requires both bucket chain &ge; 8 AND total capacity &ge; 64.",
    "level": "Advanced",
    "codeExample": "static final int MIN_TREEIFY_CAPACITY = 64; static final int TREEIFY_THRESHOLD = 8;"
  },
  {
    "question": "Why does 'ConcurrentHashMap' forbid 'null' keys and values while standard 'HashMap' allows them?",
    "shortAnswer": "In a concurrent environment, if 'map.get(key)' returns 'null', you cannot deterministically verify with 'containsKey(key)' whether the key is missing or mapped to null because another thread could mutate the map between the two calls, creating severe race conditions.",
    "explanation": "Classic concurrency design rule formulated by Doug Lea.",
    "hint": "Prevents race conditions between get() returning null and containsKey() verifying if key was missing.",
    "level": "Intermediate",
    "codeExample": "map.put(null, \"v\"); // Throws NullPointerException in ConcurrentHashMap"
  },
  {
    "question": "Which sorting algorithm is used by 'Collections.sort(List<T>)' for object collections?",
    "shortAnswer": "TimSort (a hybrid adaptive sorting algorithm combining Merge Sort and Insertion Sort that guarantees stable O(n log n) worst-case time and O(n) performance on partially sorted data).",
    "explanation": "TimSort is the default sorting algorithm for all object collections in modern Java.",
    "hint": "TimSort is stable and combines merge sort with insertion sort.",
    "level": "Beginner",
    "codeExample": "Collections.sort(employeeList); // Executed using TimSort"
  }
];

export default topic7_questions;