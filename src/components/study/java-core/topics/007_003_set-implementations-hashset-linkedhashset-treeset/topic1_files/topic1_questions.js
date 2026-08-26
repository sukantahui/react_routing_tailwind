const topic1_questions = [
  {
    "question": "What underlying data structure is used by 'java.util.HashSet' internally to store elements?",
    "shortAnswer": "'java.util.HashSet' is backed internally by an instance of 'java.util.HashMap'. In the JDK source code, HashSet declares 'private transient HashMap<E,Object> map;'. Every element added to the HashSet is stored as a KEY in the backing HashMap.",
    "explanation": "Classic architectural reuse pattern in the Java standard library.",
    "hint": "HashSet is backed internally by a HashMap where set elements serve as map keys.",
    "level": "Intermediate",
    "codeExample": "public boolean add(E e) { return map.put(e, PRESENT) == null; }"
  }
];

export default topic1_questions;