const topic2_questions = [
  {
    "question": "How does 'map.merge(key, value, remappingFunction)' work, and why is it ideal for counting frequencies or aggregating totals?",
    "shortAnswer": "If the specified key is NOT present (or associated with null), 'merge()' associates it with the given 'value'. If the key IS already present, it invokes the 'remappingFunction(oldVal, newVal)' (e.g. 'Integer::sum') and stores the computed result. If the function returns null, the key is removed. This replaces 5 lines of conditional boilerplate with a single atomic-like line.",
    "explanation": "One of the most powerful functional methods introduced in Java 8.",
    "hint": "Inserts initial value if absent, or combines old and new values using remappingFunction if present.",
    "level": "Intermediate",
    "codeExample": "map.merge(word, 1, Integer::sum); // Counts word frequencies in 1 line!"
  }
];

export default topic2_questions;