const topic3_questions = [
  {
    "question": "What is the primary role of Level 3 compilation in HotSpot's Tiered Compilation model?",
    "shortAnswer": "To provide fast native execution while injecting full profiling probes (MethodDataObjects - MDO) to collect runtime telemetry (branch probabilities, type feedback, nullness) required for Level 4 C2 optimization.",
    "explanation": "Acts as the profiling bridge between interpreted code and C2.",
    "hint": "Compiles natively while collecting MDO profiling telemetry for C2.",
    "level": "Intermediate",
    "codeExample": "Level 3: Full C1 compilation with MDO profiling."
  },
  {
    "question": "What is 'Type Feedback' gathered during Level 3 execution?",
    "shortAnswer": "Information recorded by profiling probes about the actual runtime classes of objects passed to polymorphic call sites (e.g. discovering that 99.9% of calls to 'payment.pay()' are Monomorphic and invoke 'CreditCardPayment').",
    "explanation": "Enables speculative devirtualization and method inlining in C2.",
    "hint": "Records concrete runtime classes passed to polymorphic call sites.",
    "level": "Advanced",
    "codeExample": "Discovers monomorphic call sites for speculative inlining."
  }
];

export default topic3_questions;
