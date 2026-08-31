const topic13_questions = [
  {
    "question": "How does Java 8+ redistribute bucket elements during HashMap resizing without recomputing hash codes?",
    "shortAnswer": "When capacity doubles (e.g. from 16 to 32), the bitmask expands by exactly 1 higher bit (bit 4, representing 16). Java tests this single bit using '(e.hash & oldCap)'. If the bit is 0 ('(hash & oldCap) == 0'), the node remains at its original bucket index ('j'). If the bit is 1, the node moves to 'j + oldCap' (e.g. 5 + 16 = 21). This splits the bucket into two clean lists without recomputing any hash arithmetic.",
    "explanation": "Masterpiece bitwise algorithm inside java.util.HashMap.resize().",
    "hint": "If (e.hash & oldCap) == 0 → stays at index j; otherwise → moves to index j + oldCap.",
    "level": "Advanced",
    "codeExample": "if ((e.hash & oldCap) == 0) { /* stays at j */ } else { /* moves to j + oldCap */ }"
  }
];

export default topic13_questions;