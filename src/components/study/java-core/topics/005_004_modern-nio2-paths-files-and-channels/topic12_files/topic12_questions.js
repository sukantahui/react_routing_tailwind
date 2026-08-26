const topic12_questions = [
  {
    "question": "Why MUST 'Files.lines(path)', 'Files.walk()', and 'Files.list()' be enclosed inside a Try-with-Resources block?",
    "shortAnswer": "Because the returned 'Stream<T>' objects hold open underlying operating system file handles and directory descriptors. If the stream is not explicitly closed (or enclosed in a try-with-resources block), the underlying OS file handle remains leaked until finalization/JVM termination, exhausting OS file descriptor limits.",
    "explanation": "Stream implements AutoCloseable and will close the underlying I/O handle on block exit.",
    "hint": "Streams hold open OS file descriptors that leak if not closed in try-with-resources.",
    "level": "Intermediate",
    "codeExample": "try (Stream<String> lines = Files.lines(path)) { lines.forEach(...); }"
  }
];

export default topic12_questions;