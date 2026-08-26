const topic6_questions = [
  {
    "question": "What static factory and default combinator methods were added to 'java.util.Comparator' in Java 8?",
    "shortAnswer": "Java 8 added static factory methods: 'comparing()', 'comparingInt()', 'comparingLong()', 'comparingDouble()', 'naturalOrder()', 'reverseOrder()', 'nullsFirst()', and 'nullsLast()'. It also added default combinator methods: 'thenComparing()', 'thenComparingInt()', and 'reversed()', enabling declarative, multi-level fluent sorting pipelines.",
    "explanation": "Modern functional additions to java.util.Comparator.",
    "hint": "Factory methods (comparing, naturalOrder, nullsFirst) and combinators (thenComparing, reversed).",
    "level": "Intermediate",
    "codeExample": "Comparator.comparing(Person::getLastName).thenComparing(Person::getAge).reversed();"
  }
];

export default topic6_questions;