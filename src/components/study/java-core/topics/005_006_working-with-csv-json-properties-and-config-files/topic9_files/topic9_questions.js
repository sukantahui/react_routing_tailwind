const topic9_questions = [
  {
    "question": "When is manual JSON generation acceptable in Core Java, and when should you use an enterprise library like Jackson (ObjectMapper) or Google Gson?",
    "shortAnswer": "Manual JSON generation is suitable for lightweight, zero-dependency command-line utilities, simple HTTP webhook dispatchers, or micro-benchmarks. For complex enterprise web apps with nested object graphs, polymorphic types, date formats, and bidirectional parsing, industry-standard libraries like Jackson ('ObjectMapper') or Gson are mandatory.",
    "explanation": "Jackson is the default JSON engine integrated into Spring Boot.",
    "hint": "Manual JSON is fine for simple zero-dependency scripts; Jackson/Gson is essential for enterprise web services.",
    "level": "Intermediate",
    "codeExample": "ObjectMapper mapper = new ObjectMapper(); String json = mapper.writeValueAsString(obj);"
  }
];

export default topic9_questions;