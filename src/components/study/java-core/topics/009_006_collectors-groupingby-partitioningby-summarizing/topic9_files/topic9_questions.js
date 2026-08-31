const topic9_questions = [
  {
    "question": "What is the return type of Collectors.groupingBy(Function, Collectors.counting())?",
    "shortAnswer": "Map<K, Long>, where K is the key type returned by the classifier function and values are 64-bit Long counts.",
    "explanation": "Collectors.counting() always produces a Long count.",
    "hint": "Map<K, Long>",
    "level": "Beginner",
    "codeExample": "Map<String, Long> map = stream.collect(groupingBy(Word::text, counting()));"
  },
  {
    "question": "How can you sort the resulting frequency map by count descending?",
    "shortAnswer": "By streaming the map.entrySet(), sorting with Map.Entry.comparingByValue(Comparator.reverseOrder()), and collecting into a LinkedHashMap.",
    "explanation": "Preserves the sorted order in a newly collected map.",
    "hint": "Stream entrySet, sort by comparingByValue().reversed(), collect to LinkedHashMap.",
    "level": "Intermediate",
    "codeExample": "map.entrySet().stream().sorted(Map.Entry.<String, Long>comparingByValue().reversed()).collect(toMap(Entry::getKey, Entry::getValue, (e1, e2) → e1, LinkedHashMap::new));"
  }
];

export default topic9_questions;
