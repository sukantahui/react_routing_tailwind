const topic6_questions = [
  {
    "question": "How do you declare multiple AutoCloseable resources inside a single Try-with-Resources header?",
    "shortAnswer": "Separate each resource declaration with a semicolon ';' inside the try parentheses: 'try (ResourceA a = new ResourceA(); ResourceB b = new ResourceB()) { ... }'. The trailing semicolon after the final resource is optional.",
    "explanation": "All resources in the header will be closed in reverse order of declaration upon exit.",
    "hint": "Separate declarations using semicolons ';' inside the try parentheses.",
    "level": "Beginner",
    "codeExample": "try (InputStream in = ...; OutputStream out = ...) { ... }"
  }
];

export default topic6_questions;