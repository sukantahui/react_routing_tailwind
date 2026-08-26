const topic0_questions = [
  {
    "question": "What are the primary architectural reasons that make raw Java arrays insufficient for complex enterprise application development?",
    "shortAnswer": "1. 'Fixed Capacity': Arrays cannot grow or shrink dynamically after heap allocation. 2. 'No High-Level APIs': Inserting or deleting elements requires manual array reallocation and 'System.arraycopy' shifts. 3. 'Single Dimensional Semantics': Arrays cannot model hash-based uniqueness (Sets), priority heaps (Queues), or key-value indexing (Maps). 4. 'Array Covariance Flaws': Array runtime typing clashes with compile-time generic invariance.",
    "explanation": "Led Sun Microsystems to introduce the Java Collections Framework (JCF) in Java 1.2.",
    "hint": "Fixed size, manual resizing/shifting, lack of Set/Map abstractions, and array covariance issues.",
    "level": "Beginner",
    "codeExample": "List<String> list = new ArrayList<>(); list.add(\"Swadeep\"); // Dynamic resizing"
  }
];

export default topic0_questions;