const topic11_questions = [
  {
    "question": "Why does groupingBy(classifier, maxBy(comp)) return Map<K, Optional<T>> instead of Map<K, T>?",
    "shortAnswer": "Because maxBy() is a general reduction collector that must return Optional<T> to safely handle the possibility of an empty stream in its group.",
    "explanation": "Even though groupingBy only creates groups for present elements, the collector's signature statically returns Optional<T>.",
    "hint": "maxBy() statically returns an Optional<T> type.",
    "level": "Intermediate",
    "codeExample": "Map<String, Optional<Employee>> topByDept = list.stream().collect(groupingBy(Employee::getDept, maxBy(comp)));"
  },
  {
    "question": "How do you eliminate the Optional<T> wrapper to get Map<K, T> directly?",
    "shortAnswer": "By wrapping maxBy inside Collectors.collectingAndThen(maxBy(comp), Optional::get) or Optional::orElseThrow.",
    "explanation": "collectingAndThen applies an immediate post-processing finisher function.",
    "hint": "Use Collectors.collectingAndThen(maxBy(comp), Optional::orElseThrow).",
    "level": "Advanced",
    "codeExample": "groupingBy(E::getDept, collectingAndThen(maxBy(comp), Optional::orElseThrow))"
  }
];

export default topic11_questions;
