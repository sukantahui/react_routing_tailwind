const topic4_questions = [
  {
    "question": "What is the key difference between 'java.lang.AutoCloseable' and 'java.io.Closeable' in Java?",
    "shortAnswer": "'java.io.Closeable' is a sub-interface of 'java.lang.AutoCloseable' retrofitted in Java 7. Its 'close()' method declares 'throws IOException' (narrower than AutoCloseable's 'throws Exception') and strictly requires idempotent closing. It is intended specifically for I/O streams.",
    "explanation": "Closeable extends AutoCloseable for backward compatibility with pre-Java 7 I/O classes.",
    "hint": "Closeable extends AutoCloseable and narrows the throws clause to IOException.",
    "level": "Intermediate",
    "codeExample": "public interface Closeable extends AutoCloseable { void close() throws IOException; }"
  }
];

export default topic4_questions;