const topic6_questions = [
  {
    "question": "Which collection families in standard Java provide 'Fail-Fast' iterators, and what is the underlying philosophy?",
    "shortAnswer": "All standard general-purpose collections in 'java.util' (including 'ArrayList', 'LinkedList', 'Vector', 'HashSet', 'LinkedHashSet', 'TreeSet', 'HashMap', 'LinkedHashMap', 'TreeMap') provide Fail-Fast iterators. The philosophy is: 'fail immediately and cleanly (throwing ConcurrentModificationException)' upon detecting structural corruption, rather than risking arbitrary, non-deterministic bugs or silent data loss later during execution.",
    "explanation": "Standard design philosophy across java.util collection classes.",
    "hint": "Standard collections in java.util are fail-fast: they fail immediately on structural change to prevent silent corruption.",
    "level": "Intermediate",
    "codeExample": "Iterator it = list.iterator(); list.add(\"item\"); it.next(); // Throws CME immediately"
  }
];

export default topic6_questions;