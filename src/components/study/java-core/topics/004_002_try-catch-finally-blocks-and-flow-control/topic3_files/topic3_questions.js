const topic3_questions = [
  {
    "question": "How does the JVM select which 'catch' block to execute when multiple catch blocks are chained after a single 'try'?",
    "shortAnswer": "The JVM checks the catch blocks in TOP-TO-BOTTOM sequential order. It executes the FIRST catch block whose declared exception type matches or is a superclass of the thrown exception object. Only ONE catch block is ever executed per try invocation.",
    "explanation": "Once a matching catch block finishes, all subsequent catch blocks are skipped.",
    "hint": "Evaluated top-to-bottom; exactly one matching catch block executes.",
    "level": "Beginner",
    "codeExample": "try { ... } catch (TypeA a) { ... } catch (TypeB b) { ... }"
  }
];

export default topic3_questions;