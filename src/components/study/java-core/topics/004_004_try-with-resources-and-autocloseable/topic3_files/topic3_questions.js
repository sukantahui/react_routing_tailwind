const topic3_questions = [
  {
    "question": "What is the single method declared in 'java.lang.AutoCloseable' and what is its exception signature?",
    "shortAnswer": "'void close() throws Exception;'. Because it declares 'throws Exception', custom implementers are encouraged to narrow this throws clause to a specific exception (e.g. 'throws IOException') or omit throws entirely if close() cannot fail.",
    "explanation": "Implementations of close() should be idempotent (calling close() again has no side effects).",
    "hint": "Declared in java.lang with method 'void close() throws Exception'.",
    "level": "Beginner",
    "codeExample": "public class MyResource implements AutoCloseable { public void close() {} }"
  }
];

export default topic3_questions;