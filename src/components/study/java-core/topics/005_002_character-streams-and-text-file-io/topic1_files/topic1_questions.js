const topic1_questions = [
  {
    "question": "What interfaces are implemented by the abstract base classes 'java.io.Reader' and 'java.io.Writer'?",
    "shortAnswer": "'java.io.Reader' implements 'java.lang.Readable', 'java.io.Closeable', and 'java.lang.AutoCloseable'. 'java.io.Writer' implements 'java.lang.Appendable', 'java.io.Closeable', 'java.io.Flushable', and 'java.lang.AutoCloseable'.",
    "explanation": "Because both implement AutoCloseable, all Readers and Writers work seamlessly with Try-with-Resources.",
    "hint": "Reader implements Readable and Closeable; Writer implements Appendable, Closeable, and Flushable.",
    "level": "Beginner",
    "codeExample": "public abstract class Reader implements Readable, Closeable { ... }"
  }
];

export default topic1_questions;