const topic3_questions = [
  {
    "question": "What is the Java Memory Model (JMM / JSR-133) and what core problem does it solve?",
    "shortAnswer": "The Java Memory Model (JMM), completely overhauled under JSR-133 in Java 5, is a formal specification that defines the rules and contracts governing how threads interact through shared memory. It bridges the gap between hardware architectures (like strong-ordered x86 and weakly-ordered ARM/PowerPC) by specifying exactly when a write to a shared variable by one thread is guaranteed to be visible to another thread (Visibility) and when instructions are guaranteed not to be reordered (Ordering).",
    "explanation": "Core Java Language Specification and JSR-133 design rationale.",
    "hint": "Formal specification defining memory visibility and instruction ordering guarantees across different hardware CPU architectures.",
    "level": "Advanced",
    "codeExample": "// JMM provides the Happens-Before specification unifying memory semantics across CPUs."
  }
];

export default topic3_questions;