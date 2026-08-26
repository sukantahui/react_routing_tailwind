const topic8_questions = [
  {
    "question": "What are the advantages of creating a GenericDao<T, ID> base interface?",
    "shortAnswer": "It standardizes standard CRUD method signatures across all application entities, enforces compile-time type safety for entity and primary key types, and eliminates duplicate interface definitions for common database operations.",
    "explanation": "The foundational abstraction behind Spring Data CrudRepository.",
    "hint": "Standardizes CRUD method signatures and eliminates duplicate interface code.",
    "level": "Intermediate",
    "codeExample": "public interface StudentDao extends GenericDao<Student, Integer> {}"
  },
  {
    "question": "Why should findById(ID id) return Optional<T> instead of null?",
    "shortAnswer": "To explicitly signal to callers that an entity with the requested primary key might not exist in the database, forcing null-safe handling and preventing NullPointerExceptions.",
    "explanation": "Standard modern Java API design practice.",
    "hint": "Signals that a record may not exist, preventing NullPointerExceptions.",
    "level": "Beginner",
    "codeExample": "Optional<T> findById(ID id);"
  }
];

export default topic8_questions;
