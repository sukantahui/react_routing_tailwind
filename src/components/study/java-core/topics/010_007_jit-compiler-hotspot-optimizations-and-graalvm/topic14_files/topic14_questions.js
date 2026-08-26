const topic14_questions = [
  {
    "question": "Why does GraalVM Native Image achieve sub-10ms startup times compared to several seconds on standard JVM?",
    "shortAnswer": "Because the machine code is already compiled, classes are pre-loaded, and the initial heap is pre-populated at build time, completely eliminating JVM bootstrap, ClassLoader bytecode verification, and JIT interpreter warmup delays.",
    "explanation": "Allows instantaneous request serving from the first millisecond.",
    "hint": "Eliminates JVM bootstrap, class loading, and JIT warmup delays.",
    "level": "Beginner",
    "codeExample": "Native Image boot time: ~5-10ms."
  },
  {
    "question": "Which major modern Java frameworks provide native GraalVM AOT compilation support out of the box?",
    "shortAnswer": "Spring Boot 3.x, Quarkus, Micronaut, and Oracle Helidon.",
    "explanation": "All provide build plugins that generate GraalVM native images automatically.",
    "hint": "Spring Boot 3, Quarkus, Micronaut, Helidon.",
    "level": "Beginner",
    "codeExample": "./mvnw native:compile -Pnative"
  }
];

export default topic14_questions;
