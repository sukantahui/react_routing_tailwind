const topic9_questions = [
  {
    "question": "How does 'Consumer.andThen()' sequence multiple side-effect operations in Java?",
    "shortAnswer": "'Consumer.andThen(after)' returns a composed Consumer that performs the current Consumer's action first, followed immediately by the 'after' Consumer's action on the exact same input argument. If executing either consumer throws an unchecked exception, execution terminates and subsequent consumers in the chain are not invoked. It is ideal for orchestrating multi-stage side-effect pipelines (e.g. log -> save -> notify).",
    "explanation": "Multi-stage pipeline chaining with Consumer.andThen().",
    "hint": "Executes caller action first, then executes the argument action on the same input.",
    "level": "Beginner",
    "codeExample": "Consumer<T> pipeline = c1.andThen(c2).andThen(c3); pipeline.accept(item);"
  }
];

export default topic9_questions;