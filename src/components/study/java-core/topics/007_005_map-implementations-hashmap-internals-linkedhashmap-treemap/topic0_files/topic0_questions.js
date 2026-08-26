const topic0_questions = [
  {
    "question": "What happens when 'map.put(key, newValue)' is called with a key that already exists in the Map?",
    "shortAnswer": "The Map replaces the old value associated with that key with 'newValue' and returns the PREVIOUS value that was associated with the key (or 'null' if the key was not previously present, or if the previous value was null). The total size of the Map remains unchanged.",
    "explanation": "Core contract of java.util.Map.put().",
    "hint": "Replaces the existing value with newValue and returns the old value.",
    "level": "Beginner",
    "codeExample": "String oldVal = map.put(\"K1\", \"NewVal\"); // Replaces oldVal and returns it"
  }
];

export default topic0_questions;