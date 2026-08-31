const topic4_questions = [
  {
    "question": "What is 'Consumer<T>' in Java, what is its SAM method, and where is it predominantly used?",
    "shortAnswer": "'Consumer<T>' represents an operation that accepts a single input argument of type T and returns no result ('void accept(T t)'). Because it returns void, it is designed exclusively to execute side-effects, such as logging data, saving records to a database, emitting network messages, or printing to the console. It is the primary target type for 'Iterable.forEach(consumer)' and 'Stream.peek(consumer)'.",
    "explanation": "Core side-effect functional interface in java.util.function.",
    "hint": "Accepts input T, returns void; used for side-effects like printing, logging, and database saves in forEach().",
    "level": "Beginner",
    "codeExample": "Consumer<String> log = msg → logger.info(msg); log.accept(\"Hello\");"
  }
];

export default topic4_questions;