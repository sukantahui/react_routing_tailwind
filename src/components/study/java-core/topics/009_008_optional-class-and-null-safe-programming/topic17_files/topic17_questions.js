const topic17_questions = [
  {
    "question": "Why is declaring a field of type Optional<String> in a domain entity considered an anti-pattern?",
    "shortAnswer": "1. java.util.Optional does not implement java.io.Serializable, causing serialization frameworks to fail. 2. It introduces unnecessary object wrapper memory overhead on the heap.",
    "explanation": "Store plain nullable fields and return Optional.ofNullable(field) from the getter instead.",
    "hint": "Not Serializable and wastes heap memory wrapper overhead.",
    "level": "Advanced",
    "codeExample": "// BAD: private Optional<String> code;\\n// GOOD: private String code; public Optional<String> getCode() { return Optional.ofNullable(code); }"
  },
  {
    "question": "Why should you avoid using Optional as a method parameter?",
    "shortAnswer": "It creates clumsy caller boilerplate (requiring callers to write Optional.of(val)) and fails to prevent null pointers if a caller accidentally passes null instead of Optional.empty(). Use method overloading instead.",
    "explanation": "Overloaded methods provide cleaner API ergonomics.",
    "hint": "Forces callers to wrap arguments in Optional and does not protect against raw null parameters.",
    "level": "Intermediate",
    "codeExample": "// BAD: void find(String name, Optional<Integer> age)\\n// GOOD: void find(String name) and void find(String name, int age)"
  }
];

export default topic17_questions;
