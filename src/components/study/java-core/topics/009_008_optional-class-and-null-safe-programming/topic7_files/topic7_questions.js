const topic7_questions = [
  {
    "question": "How does orElseThrow(Supplier) fit into modern Spring Boot REST controller architecture?",
    "shortAnswer": "It allows concise 1-line entity retrieval from JPA repositories, immediately throwing a domain exception (like ResourceNotFoundException) if the database query returns Optional.empty(), which an @ExceptionHandler or @ResponseStatus converts to HTTP 404.",
    "explanation": "Eliminates verbose if-null checks in service layers.",
    "hint": "Converts repository Optional.empty() into HTTP 404 domain exceptions.",
    "level": "Intermediate",
    "codeExample": "return repo.findById(id).orElseThrow(() → new ResourceNotFoundException('User ' + id));"
  },
  {
    "question": "Can orElseThrow(Supplier) throw checked exceptions?",
    "shortAnswer": "Yes! Because the generic type is <X extends Throwable>, the supplier can construct and throw checked exceptions as well as unchecked RuntimeExceptions.",
    "explanation": "The calling method must declare the checked exception in its throws clause.",
    "hint": "Yes, supports both checked and unchecked exceptions.",
    "level": "Intermediate",
    "codeExample": "opt.orElseThrow(() → new IOException('File missing'));"
  }
];

export default topic7_questions;
