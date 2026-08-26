const topic0_questions = [
  {
    "question": "What were the 3 severe issues with managing resources (like File and DB streams) using legacy 'finally' blocks in Java?",
    "shortAnswer": "1. Massive nested boilerplate (checking for null and wrapping each 'close()' in its own try-catch). 2. Resource leak cascades: If the first stream's close() threw an exception, the second stream was never closed. 3. Exception masking: A failure during close() in finally completely obliterated the original, more important business exception from the try block.",
    "explanation": "Effective Java Item 9 mandates: Prefer try-with-resources to try-finally.",
    "hint": "Nested boilerplate, leak cascades if first close() throws, and exception masking.",
    "level": "Beginner",
    "codeExample": "// Ugly legacy pattern: finally { if (s!=null) try { s.close(); } catch(e){} }"
  }
];

export default topic0_questions;