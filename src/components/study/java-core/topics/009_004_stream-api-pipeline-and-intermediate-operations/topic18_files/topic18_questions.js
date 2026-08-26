const topic18_questions = [
  {
    "question": "How do limit() and skip() combine to implement in-memory pagination?",
    "shortAnswer": "By skipping the offset elements (page - 1) * pageSize and then applying limit(pageSize), exactly one page chunk of data is extracted from the stream.",
    "explanation": "Equivalent to SQL OFFSET and LIMIT clauses.",
    "hint": "skip((page - 1) * size).limit(size)",
    "level": "Beginner",
    "codeExample": "stream.skip((page - 1) * pageSize).limit(pageSize).toList();"
  },
  {
    "question": "Why is limit() considered a short-circuiting operation while skip() is not?",
    "shortAnswer": "limit() can terminate the upstream pipeline early as soon as the requested count is reached, allowing infinite streams to terminate. skip() cannot terminate early because it must consume the first N elements before letting subsequent elements through.",
    "explanation": "limit() halts downstream pulling once maxSize is met.",
    "hint": "limit stops pulling once quota is met; skip must discard first N items before continuing.",
    "level": "Intermediate",
    "codeExample": "Stream.generate(Math::random).limit(5) // Terminates cleanly!"
  }
];

export default topic18_questions;
