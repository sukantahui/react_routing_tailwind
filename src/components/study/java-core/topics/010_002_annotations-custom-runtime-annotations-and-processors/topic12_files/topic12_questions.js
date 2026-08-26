const topic12_questions = [
  {
    "question": "What is the primary performance advantage of compile-time annotation processing (APT) over runtime reflection?",
    "shortAnswer": "APT generates pure, standard Java source code at compile time with zero runtime reflection overhead, resulting in instant application startup, zero reflection overhead during execution, and full compile-time type safety.",
    "explanation": "Pioneered by frameworks like Dagger, MapStruct, and Quarkus.",
    "hint": "Eliminates runtime reflection overhead and enables instant startup times.",
    "level": "Intermediate",
    "codeExample": "Generated code runs as standard direct method calls."
  },
  {
    "question": "What standard Java interface must a custom compile-time annotation processor implement?",
    "shortAnswer": "javax.annotation.processing.Processor (typically extended via javax.annotation.processing.AbstractProcessor).",
    "explanation": "Registered via META-INF/services/javax.annotation.processing.Processor or @AutoService.",
    "hint": "javax.annotation.processing.Processor (or AbstractProcessor).",
    "level": "Advanced",
    "codeExample": "public class MyProcessor extends AbstractProcessor { ... }"
  }
];

export default topic12_questions;
