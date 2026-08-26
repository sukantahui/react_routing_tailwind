const topic11_questions = [
  {
    question: "Why does 'new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))' return false in Java?",
    shortAnswer: "'BigDecimal.equals()' checks both numerical value AND scale factor. Since scale 1 != scale 2, equals() returns false. To compare mathematical values regardless of scale, ALWAYS use 'a.compareTo(b) == 0'.",
    explanation: "This scale sensitivity causes duplicate entries in HashSets and HashMaps.",
    hint: "equals() checks both value and scale; compareTo() checks only numeric value.",
    level: "Intermediate",
    codeExample: "boolean isEqual = (a.compareTo(b) == 0); // Scale-agnostic equality"
  }
];

export default topic11_questions;
