const topic2_questions = [
  {
    "question": "In what exact execution order does the JVM invoke 'close()' relative to 'catch' and 'finally' blocks in a Try-with-Resources statement?",
    "shortAnswer": "The resource's 'close()' method is executed FIRST, immediately upon leaving the try block, BEFORE any matching 'catch' block or 'finally' block is entered. This guarantees that resources are closed before exception handlers attempt error recovery.",
    "explanation": "A critical architectural sequence that guarantees clean state during catch recovery.",
    "hint": "Resource close() executes BEFORE catch and finally blocks run.",
    "level": "Intermediate",
    "codeExample": "// Order: try_body -> resource.close() -> catch_block -> finally_block"
  }
];

export default topic2_questions;