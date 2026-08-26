const topic10_questions = [
  {
    "question": "Why is the maximum possible value for -XX:MaxTenuringThreshold capped at 15 in the HotSpot JVM?",
    "shortAnswer": "Because the JVM object header (Mark Word) allocates exactly 4 bits to store the object age counter. The maximum value that can be represented with 4 bits is (2^4 - 1) = 15.",
    "explanation": "Fundamental binary constraint of the 64-bit Mark Word format.",
    "hint": "The object age is stored in a 4-bit field in the Mark Word header.",
    "level": "Advanced",
    "codeExample": "4 bits -> 0000 (0) to 1111 (15)"
  },
  {
    "question": "What is Premature Promotion in the JVM Heap?",
    "shortAnswer": "A situation where short-lived objects are promoted into the Old Generation before dying, usually because the Survivor spaces are too small to hold active survivors, increasing Old Gen GC pressure and pause times.",
    "explanation": "Tuned by increasing Young Gen / Survivor space sizes.",
    "hint": "Short-lived objects promoted to Old Gen due to undersized Survivor spaces.",
    "level": "Intermediate",
    "codeExample": "Premature Promotion -> Excessive Full GC pauses"
  }
];

export default topic10_questions;
