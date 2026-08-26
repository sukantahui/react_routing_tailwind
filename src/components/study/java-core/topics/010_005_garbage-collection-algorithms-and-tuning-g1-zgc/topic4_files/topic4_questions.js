const topic4_questions = [
  {
    "question": "What is a Card Table in the HotSpot JVM and what size memory region does each card represent?",
    "shortAnswer": "A Card Table is a byte array in memory where each byte corresponds to a 512-byte chunk (card) of Old Generation heap memory, tracking which cards contain references pointing into the Young Generation.",
    "explanation": "Standard 512-byte card size in HotSpot.",
    "hint": "A byte array where 1 byte represents 512 bytes of Old Gen heap.",
    "level": "Advanced",
    "codeExample": "Card size = 512 bytes (2^9 bytes, indexed via address >> 9)"
  },
  {
    "question": "What is a Write Barrier in the context of JVM Garbage Collection?",
    "shortAnswer": "A tiny snippet of JIT-compiled machine instructions executed automatically whenever an object reference field is updated, responsible for marking the corresponding card dirty in the Card Table.",
    "explanation": "Maintains cross-generational pointer tracking in real time.",
    "hint": "A JIT-injected instruction that marks cards dirty on reference mutations.",
    "level": "Intermediate",
    "codeExample": "oldObj.field = newYoungObj; // Triggers JIT write barrier"
  }
];

export default topic4_questions;
