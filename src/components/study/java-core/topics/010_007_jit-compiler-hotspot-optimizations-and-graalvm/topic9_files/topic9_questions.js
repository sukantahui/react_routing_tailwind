const topic9_questions = [
  {
    "question": "How does Bounds-Check Elimination (BCE) preserve Java's memory safety while achieving C-like array iteration speed?",
    "shortAnswer": "The JIT compiler analyzes the loop bounds upfront. It replaces per-iteration bounds checks inside the loop body with a single verification before loop entry, allowing the inner loop to access array memory directly without branch overhead.",
    "explanation": "Eliminates performance penalties of Java's runtime safety checks.",
    "hint": "Replaces per-iteration checks with a single upfront verification before loop entry.",
    "level": "Intermediate",
    "codeExample": "for (int i=0; i<arr.length; i++) // Zero bounds checks inside native loop"
  },
  {
    "question": "What is Loop Unrolling in JIT compilation?",
    "shortAnswer": "An optimization that duplicates the loop body multiple times per iteration (e.g. processing 4 or 8 elements per cycle), decreasing loop branch instruction overhead and improving CPU pipeline efficiency.",
    "explanation": "Crucial for high-throughput arithmetic arrays.",
    "hint": "Duplicates loop body to reduce branch jumps and counter increments.",
    "level": "Intermediate",
    "codeExample": "Loop unrolled to: arr[i] + arr[i+1] + arr[i+2] + arr[i+3]"
  }
];

export default topic9_questions;
