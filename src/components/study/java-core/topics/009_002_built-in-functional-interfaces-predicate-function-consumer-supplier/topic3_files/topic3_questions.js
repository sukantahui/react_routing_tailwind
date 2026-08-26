const topic3_questions = [
  {
    "question": "What is 'Function<T, R>' in Java and how does it power data transformations in collections and streams?",
    "shortAnswer": "'Function<T, R>' represents a functional transformation that accepts one argument of type T and produces a result of type R ('R apply(T t)'). It is the underlying functional interface for 'Stream.map()', generic converters, and DTO-to-entity mappers. By passing functions as parameters, algorithms can transform collections of objects from one domain type into another without writing repetitive transformation loops.",
    "explanation": "Core mapping interface in java.util.function.",
    "hint": "Accepts input T and produces output R (T &rarr; R); powers Stream.map() transformations.",
    "level": "Beginner",
    "codeExample": "Function<String, Integer> lengthFunc = str -> str.length(); Integer len = lengthFunc.apply(\"Barrackpore\");"
  }
];

export default topic3_questions;