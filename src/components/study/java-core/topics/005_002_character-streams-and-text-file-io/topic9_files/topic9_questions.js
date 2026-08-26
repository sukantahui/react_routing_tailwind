const topic9_questions = [
  {
    "question": "When should a developer use 'CharArrayReader' and 'CharArrayWriter' in Java?",
    "shortAnswer": "'CharArrayReader' and 'CharArrayWriter' are used for in-memory character stream processing. They are ideal for unit testing (mocking Readers/Writers without disk I/O) and in-memory text manipulation where data needs to be buffered into a dynamic character array before being sent across a network or written to disk.",
    "explanation": "Memory-based streams have no underlying OS file descriptors and closing them has no effect.",
    "hint": "Used for in-memory character stream processing, dynamic buffering, and unit test mocking.",
    "level": "Intermediate",
    "codeExample": "CharArrayWriter caw = new CharArrayWriter(); caw.write(\"Hello\"); char[] arr = caw.toCharArray();"
  }
];

export default topic9_questions;