const topic2_questions = [
  {
    "question": "What is the purpose of the 'private static final Object PRESENT' constant in java.util.HashSet?",
    "shortAnswer": "Because 'HashMap' requires both a key and a value ('put(K, V)'), but 'HashSet' only cares about elements (keys), HashSet defines a single dummy dummy object 'private static final Object PRESENT = new Object();'. Every entry stored in the backing HashMap uses the set element as the key and this shared static 'PRESENT' object as the value, minimizing heap allocation.",
    "explanation": "Internal design of java.util.HashSet.",
    "hint": "A static shared dummy Object used as the value for all keys in the backing HashMap.",
    "level": "Intermediate",
    "codeExample": "private static final Object PRESENT = new Object(); // Shared dummy value"
  }
];

export default topic2_questions;