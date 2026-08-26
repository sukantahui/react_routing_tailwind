const topic14_questions = [
  {
    "question": "What is 'Structured Concurrency' (JEP 453) in modern Java and how does it prevent thread leaks and orphaned subtasks?",
    "shortAnswer": "'Structured Concurrency' treats multiple concurrent subtasks executing in parallel as a single, cohesive unit of work bound to a lexical code block ('try (var scope = new StructuredTaskScope...)'). If one subtask fails (e.g. throwing an exception), the scope automatically cancels all other running sibling subtasks ('ShutdownOnFailure'). Furthermore, the parent thread cannot exit the lexical block until all child threads have completed or been cancelled, completely eliminating orphaned zombie threads, resource leaks, and fragmented error handling.",
    "explanation": "Grand architectural capstone of Module 008_009 and Segment 8.",
    "hint": "Treats subtasks as a single cohesive unit within a lexical scope; auto-cancels sibling subtasks if one fails, eliminating zombie threads.",
    "level": "Advanced",
    "codeExample": "try (var scope = new StructuredTaskScope.ShutdownOnFailure()) { scope.fork(t1); scope.fork(t2); scope.join(); }"
  }
];

export default topic14_questions;