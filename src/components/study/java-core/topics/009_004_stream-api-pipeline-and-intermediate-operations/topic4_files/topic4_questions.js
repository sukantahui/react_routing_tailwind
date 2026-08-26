const topic4_questions = [
  {
    "question": "Why does Map<K,V> not have a direct .stream() method?",
    "shortAnswer": "Map is not a sub-interface of java.util.Collection because it models key-value pair associations rather than a single sequence of elements. To stream a map, developers choose between map.entrySet().stream(), map.keySet().stream(), or map.values().stream().",
    "explanation": "The separation allows clear intent regarding whether keys, values, or entries are being processed.",
    "hint": "Map does not extend Collection; use entrySet(), keySet(), or values().",
    "level": "Beginner",
    "codeExample": "map.entrySet().stream().filter(e -> e.getValue() > 50).forEach(e -> System.out.println(e.getKey()));"
  },
  {
    "question": "Does calling list.stream() modify or lock the underlying list?",
    "shortAnswer": "No, calling list.stream() creates a transient Spliterator over the list without modifying, copying, or locking the list. However, structurally modifying the list while streaming will trigger a ConcurrentModificationException.",
    "explanation": "Non-interference is a core rule of the Stream API.",
    "hint": "Stream does not copy or lock the collection, but concurrent modification must be avoided.",
    "level": "Intermediate",
    "codeExample": "// Avoid modifying source during stream execution:\\nlist.stream().forEach(x -> list.add('new')); // Throws ConcurrentModificationException!"
  }
];

export default topic4_questions;
