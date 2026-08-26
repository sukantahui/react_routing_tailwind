const topic0_questions = [
  {
    "question": "What is the fundamental mathematical contract guaranteed by the 'java.util.Set<E>' interface in Java?",
    "shortAnswer": "The 'java.util.Set<E>' interface guarantees mathematical set semantics: it contains no duplicate elements (no two elements 'e1' and 'e2' exist such that 'e1.equals(e2)'), permits at most one null element, and models collection membership rather than positional index sequences.",
    "explanation": "Core contract defined in JLS and JCF specification.",
    "hint": "Forbids duplicate elements based on equals() and permits at most one null element.",
    "level": "Beginner",
    "codeExample": "Set<String> set = new HashSet<>(); set.add(\"A\"); set.add(\"A\"); // size is 1"
  }
];

export default topic0_questions;