const topic5_questions = [
  {
    "question": "Why is Method Inlining considered the most important optimization performed by the JIT compiler?",
    "shortAnswer": "Because in addition to eliminating the CPU overhead of method call instructions and stack frame management, inlining brings the caller and callee code into the same optimization scope, enabling downstream optimizations like Escape Analysis, Constant Folding, Loop Unrolling, and Dead Code Elimination.",
    "explanation": "Unlocks the full power of global compiler optimizations.",
    "hint": "Eliminates call overhead and enables all other downstream optimizations.",
    "level": "Intermediate",
    "codeExample": "Inlining merges caller and callee scopes together."
  },
  {
    "question": "What is the default bytecode size limit for frequently executed 'hot' methods to be inlined by HotSpot?",
    "shortAnswer": "325 bytes of bytecode, configured via -XX:FreqInlineSize=325 (while non-frequent small methods are capped at 35 bytes via -XX:MaxInlineSize=35).",
    "explanation": "Keeping small helper methods below 35 bytes guarantees aggressive inlining.",
    "hint": "325 bytes for hot methods (-XX:FreqInlineSize).",
    "level": "Advanced",
    "codeExample": "-XX:FreqInlineSize=325 -XX:MaxInlineSize=35"
  }
];

export default topic5_questions;
