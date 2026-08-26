const topic4_questions = [
  {
    "question": "When should you use @MethodSource over @ValueSource in JUnit 5?",
    "shortAnswer": "Use @MethodSource when tests require complex objects, dynamically generated streams of arguments (Stream<Arguments>), or multi-parameter combinations that cannot be expressed as simple compile-time literals.",
    "explanation": "Method source provides dynamic stream of Arguments.",
    "hint": "For complex objects or multi-argument combinations beyond simple literals.",
    "level": "Intermediate",
    "codeExample": "static Stream<Arguments> provideData() { return Stream.of(Arguments.of(1, 2)); }"
  },
  {
    "question": "What dependency is required in Maven pom.xml to use @ParameterizedTest?",
    "shortAnswer": "junit-jupiter-params (org.junit.jupiter:junit-jupiter-params).",
    "explanation": "JUnit 5 parameterized tests artifact.",
    "hint": "junit-jupiter-params artifact.",
    "level": "Beginner",
    "codeExample": "<artifactId>junit-jupiter-params</artifactId>"
  }
];

export default topic4_questions;
