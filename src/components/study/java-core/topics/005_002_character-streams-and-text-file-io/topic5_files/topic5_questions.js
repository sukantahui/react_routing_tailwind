const topic5_questions = [
  {
    "question": "Why is 'UTF-8' the undisputed global standard for character encoding on the Web and in enterprise systems?",
    "shortAnswer": "1. Variable-length encoding (1 to 4 bytes) that is 100% backward-compatible with 7-bit ASCII. 2. Extremely memory-efficient for ASCII/English text (1 byte per char) while supporting all 150,000+ Unicode characters across all world languages. 3. Endianness-neutral (no byte-order-mark ambiguity across different CPU architectures).",
    "explanation": "Powers over 98% of all websites and modern data formats (JSON, XML, HTML, REST APIs).",
    "hint": "Variable-length, backward-compatible with ASCII, supports all Unicode languages, and endian-neutral.",
    "level": "Beginner",
    "codeExample": "byte[] b = str.getBytes(StandardCharsets.UTF_8);"
  }
];

export default topic5_questions;