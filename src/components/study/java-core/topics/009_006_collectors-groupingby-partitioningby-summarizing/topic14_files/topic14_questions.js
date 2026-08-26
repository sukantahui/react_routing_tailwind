const topic14_questions = [
  {
    "question": "What is the primary architectural purpose of Collectors.collectingAndThen()?",
    "shortAnswer": "It adapts an existing Collector by applying an additional post-processing finisher function to its final result before returning it to the caller.",
    "explanation": "Useful for converting collections into immutable views, unwrapping optionals, or applying custom decorators.",
    "hint": "Applies a final transformation function to the collector's output.",
    "level": "Intermediate",
    "codeExample": "stream.collect(collectingAndThen(toList(), Collections::unmodifiableList));"
  },
  {
    "question": "How does collectingAndThen() differ from calling .map() before collecting?",
    "shortAnswer": ".map() transforms individual stream elements one by one during streaming, whereas collectingAndThen() transforms the entire aggregated collection/result container once after all elements have been collected.",
    "explanation": "map is an element-level intermediate step; collectingAndThen is a container-level terminal post-step.",
    "hint": "map transforms individual elements; collectingAndThen transforms the final aggregated container.",
    "level": "Intermediate",
    "codeExample": "stream.map(fn) vs stream.collect(collectingAndThen(collector, finisher))"
  }
];

export default topic14_questions;
