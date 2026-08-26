const topic2_questions = [
  {
    "question": "What powerful stream navigation feature does 'BufferedInputStream' support that raw 'FileInputStream' does NOT support?",
    "shortAnswer": "'BufferedInputStream' supports 'mark(readlimit)' and 'reset()'. Because it caches data in an internal RAM array, you can mark a stream position, read ahead to inspect/preview headers or magic bytes, and then call 'reset()' to rewind the stream cursor back to the marked position without restarting the stream.",
    "explanation": "bis.markSupported() returns true on BufferedInputStream, whereas FileInputStream returns false.",
    "hint": "Supports mark(readlimit) and reset() for rewindable lookahead parsing.",
    "level": "Intermediate",
    "codeExample": "bis.mark(100); bis.read(header); bis.reset(); // Rewinds to mark"
  }
];

export default topic2_questions;