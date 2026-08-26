const topic7_questions = [
  {
    "question": "Why should you prefer 'Comparator.comparingDouble()' over 'Comparator.comparing()' when comparing primitive double fields?",
    "shortAnswer": "'Comparator.comparing(keyExtractor)' requires the keyExtractor to return an Object reference (or uses Comparable), forcing the JVM to auto-box primitive 'double' values into heap-allocated 'Double' wrapper objects on every comparison. In contrast, 'Comparator.comparingDouble()' takes a 'ToDoubleFunction' primitive lambda and compares raw primitives directly via 'Double.compare()', eliminating all auto-boxing and heap garbage collection overhead.",
    "explanation": "Standard Java performance tuning guideline for stream and collection sorting.",
    "hint": "comparingDouble avoids auto-boxing primitive double to Double, eliminating heap allocation.",
    "level": "Intermediate",
    "codeExample": "list.sort(Comparator.comparingDouble(Employee::getSalary)); // Zero auto-boxing"
  }
];

export default topic7_questions;