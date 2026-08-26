const topic11_questions = [
  {
    question: "How do modern Java Text Blocks and String.formatted() revolutionize enterprise database and microservice architectures?",
    shortAnswer: "They allow embedding multi-line SQL queries, REST JSON payloads, and HTML email templates directly inside Java classes with pristine readability, natural indentation, and type-safe interpolation, without escaping characters or concatenating strings.",
    explanation: "Standard practice in modern Spring Boot and JDBC repositories.",
    hint: "Provides pristine multi-line readability and zero-escaping template interpolation.",
    level: "Advanced",
    codeExample: "String sql = \"\"\"SELECT * FROM users WHERE id = %d\"\"\".formatted(id);"
  }
];

export default topic11_questions;
