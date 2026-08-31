const topic16_questions = [
  {
    "question": "Why should a method never return Optional<List<T>> or Optional<Set<T>>?",
    "shortAnswer": "Because collections already have a built-in, universal way to represent absence: an empty collection (List.of() or Collections.emptyList()). Wrapping a collection in an Optional adds unnecessary heap allocation and confusing nested API layers.",
    "explanation": "Always return an empty collection rather than null or Optional<Collection>.",
    "hint": "Return an empty collection (e.g. List.of()) instead of Optional<List<T>>.",
    "level": "Intermediate",
    "codeExample": "// BAD: Optional<List<Student>> findAll()\\n// GOOD: List<Student> findAll() → returns List.of() if empty"
  },
  {
    "question": "What is the benefit of returning Optional<T> from database repository methods?",
    "shortAnswer": "It makes it impossible for calling code to forget that an entity might not exist, allowing seamless chaining with .orElseThrow(), .map(), and .ifPresent().",
    "explanation": "Adopted universally across Spring Data JPA and modern ORMs.",
    "hint": "Guarantees caller handles entity absence at compile time.",
    "level": "Beginner",
    "codeExample": "Optional<User> findById(Long id);"
  }
];

export default topic16_questions;
