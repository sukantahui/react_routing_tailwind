const topic6_questions = [
  {
    "question": "What are the three escape states identified by Java's Escape Analysis?",
    "shortAnswer": "1. NoEscape (confined strictly to the allocating method), 2. ArgEscape (passed as parameter but does not escape thread), and 3. GlobalEscape (accessible to other threads or returned to caller).",
    "explanation": "Determines eligibility for scalar replacement and lock elision.",
    "hint": "NoEscape, ArgEscape, and GlobalEscape.",
    "level": "Intermediate",
    "codeExample": "NoEscape -> Candidate for zero-heap stack allocation."
  },
  {
    "question": "What major optimizations does the JIT compiler apply when an object is determined to be NoEscape?",
    "shortAnswer": "Scalar Replacement (deconstructing the object into primitive local variables on stack/registers) and Lock Elision (eliminating synchronized synchronization blocks).",
    "explanation": "Eliminates GC pressure and synchronization overhead entirely.",
    "hint": "Scalar Replacement and Lock Elision.",
    "level": "Intermediate",
    "codeExample": "NoEscape -> Scalar Replacement + Lock Elision"
  }
];

export default topic6_questions;
