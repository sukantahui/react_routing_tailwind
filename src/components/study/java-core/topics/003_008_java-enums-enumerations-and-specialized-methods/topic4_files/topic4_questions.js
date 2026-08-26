const topic4_questions = [
  {
    "question": "How do you iterate through all constants in a Java enum using a for-each loop and Java Stream API?",
    "shortAnswer": "Invoke the static method 'EnumClass.values()' which returns an array of all enum constants in their exact declaration order. You can iterate over this array directly in an enhanced for-each loop ('for (Day d : Day.values())') or convert it to a Stream ('Arrays.stream(Day.values())').",
    "explanation": "The values() method is synthesized by the Java compiler during compilation.",
    "hint": "Use Enum.values() with an enhanced for-each loop or Arrays.stream().",
    "level": "Beginner",
    "codeExample": "for (Status s : Status.values()) { System.out.println(s); }"
  }
];

export default topic4_questions;