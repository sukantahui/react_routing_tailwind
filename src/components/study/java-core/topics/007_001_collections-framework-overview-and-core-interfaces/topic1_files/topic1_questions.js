const topic1_questions = [
  {
    "question": "Why does the 'java.util.Map' interface NOT inherit from the root 'java.util.Collection' interface in Java?",
    "shortAnswer": "Because their data models are fundamentally incompatible. 'Collection<E>' represents a collection of individual single elements (1-dimensional sequence or set). 'Map<K, V>' represents key-value pairs (2-dimensional mapping where keys are unique). Core Collection methods like 'add(E)' make no sense for a Map, which requires 'put(K, V)'.",
    "explanation": "Classic architectural interview question on JCF design.",
    "hint": "Collection models single elements (add(E)), while Map models key-value pairs (put(K, V)).",
    "level": "Intermediate",
    "codeExample": "// Collection<E> (1 element) vs Map<K, V> (key-value pair mapping)"
  }
];

export default topic1_questions;