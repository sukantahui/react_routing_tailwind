const topic7_questions = [
  {
    "question": "What is the return type of nesting 3 groupingBy collectors inside each other?",
    "shortAnswer": "Map<K1, Map<K2, Map<K3, List<T>>>>, where K1, K2, and K3 are the key types produced by the outer, middle, and innermost classifiers respectively.",
    "explanation": "Each nested groupingBy adds another layer of Map hierarchy.",
    "hint": "Map<K1, Map<K2, Map<K3, List<T>>>>",
    "level": "Intermediate",
    "codeExample": "stream.collect(groupingBy(T::getK1, groupingBy(T::getK2, groupingBy(T::getK3))));"
  },
  {
    "question": "Can you pass a downstream reduction collector (like counting or toSet) into the innermost groupingBy in multi-level grouping?",
    "shortAnswer": "Yes! The innermost groupingBy can take any downstream collector, producing structures like Map<K1, Map<K2, Long>> (counting) or Map<K1, Map<K2, Set<String>>> (mapping to sets).",
    "explanation": "This provides extreme flexibility for complex multi-dimensional analytics.",
    "hint": "The innermost groupingBy accepts any standard downstream reducer.",
    "level": "Advanced",
    "codeExample": "stream.collect(groupingBy(E::getCenter, groupingBy(E::getCourse, counting())));"
  }
];

export default topic7_questions;
