const topic10_questions = [
  {
    "question": "What is De-optimization in the HotSpot Virtual Machine?",
    "shortAnswer": "The mechanism by which the JVM safely rolls back JIT-compiled native machine code and resumes execution in the Interpreter when a speculative runtime assumption (such as class hierarchy or branch frequency) is invalidated.",
    "explanation": "Allows the JIT to make aggressive speculative optimizations with total safety.",
    "hint": "Safely reverts compiled machine code back to the Interpreter when assumptions fail.",
    "level": "Intermediate",
    "codeExample": "Assumption broken → Uncommon Trap → De-optimize to Interpreter."
  },
  {
    "question": "What triggers an 'Uncommon Trap' in JIT-compiled code?",
    "shortAnswer": "Events that violate speculative assumptions, such as loading a new subclass that turns a monomorphic call site into a polymorphic one, encountering a null pointer where none was ever seen during profiling, or taking an untaken branch.",
    "explanation": "Ensures seamless execution continuity.",
    "hint": "Loading new classes, unexpected nulls, or taking previously untaken branches.",
    "level": "Advanced",
    "codeExample": "New subclass loaded → Invalidation of speculatively inlined call."
  }
];

export default topic10_questions;
