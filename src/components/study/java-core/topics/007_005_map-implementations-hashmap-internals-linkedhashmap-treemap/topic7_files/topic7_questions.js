const topic7_questions = [
  {
    "question": "Why does 'HashMap' use the bit-shift XOR spreading function '((h = key.hashCode()) ^ (h >>> 16))' instead of using 'key.hashCode()' directly?",
    "shortAnswer": "Because table capacities are typically small powers of two (e.g. 16, 32, 64), meaning bucket indexing '(n - 1) & hash' inspects only the lowest 4 to 6 bits of the 32-bit hash. If two distinct keys differ only in their upper 16 bits, they would collide in the exact same bucket. Shifting the upper 16 bits right ('h >>> 16') and XORing them with the lower 16 bits spreads the entropy of the upper bits into the lower bits, dramatically minimizing bucket collisions.",
    "explanation": "Core bit-level engineering optimization in java.util.HashMap.",
    "hint": "Folds high-order 16 bits into low-order 16 bits so high bits participate in small table bitmasking.",
    "level": "Advanced",
    "codeExample": "static final int hash(Object key) { int h; return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16); }"
  }
];

export default topic7_questions;