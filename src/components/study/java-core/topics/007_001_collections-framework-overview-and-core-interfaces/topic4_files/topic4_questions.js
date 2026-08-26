const topic4_questions = [
  {
    "question": "Why is 'collection.toArray(new String[0])' the recommended modern idiom over 'collection.toArray(new String[collection.size()])' in Java?",
    "shortAnswer": "In modern JVM versions, passing an empty pre-sized array ('new String[0]') is faster and more memory-efficient. The JVM's HotSpot JIT compiler heavily optimizes zero-length array allocation via internal intrinsics, avoiding the overhead of sizing and allocating a large throwaway array before passing it to toArray.",
    "explanation": "Standard optimization benchmarked by Aleksey Shipilëv (Oracle JVM performance architect).",
    "hint": "toArray(new String[0]) is heavily optimized by HotSpot JIT intrinsics over pre-sized arrays.",
    "level": "Intermediate",
    "codeExample": "String[] arr = list.toArray(new String[0]); // Modern idiomatic pattern"
  }
];

export default topic4_questions;