const topic1_questions = [
  {
    "question": "Why does calling a terminal operation twice on the same Stream instance throw an IllegalStateException?",
    "shortAnswer": "Streams are single-use consumable pipelines designed around lazy evaluation and internal iteration. Once a terminal operation executes, the pipeline lifecycle finishes and its elements are fully consumed, rendering the instance closed.",
    "explanation": "Unlike collections which store elements persistently, streams are transient conduits of data.",
    "hint": "Streams are single-use pipelines, not reusable data structures.",
    "level": "Intermediate",
    "codeExample": "Stream<String> s = list.stream();\\ns.forEach(System.out::println);\\ns.forEach(System.out::println); // Throws IllegalStateException!"
  },
  {
    "question": "Explain the difference between Internal Iteration (Streams) and External Iteration (Collections).",
    "shortAnswer": "External Iteration requires the client code to explicitly pull elements using for-each loops or Iterators, controlling iteration order and state. Internal Iteration delegates traversal to the Stream runtime, enabling automated parallelization and pipeline optimization.",
    "explanation": "Internal iteration allows the JVM to optimize pipeline loops, eliminate redundant passes, and distribute chunks across CPU cores.",
    "hint": "External: you write the loop; Internal: Java manages iteration and optimization.",
    "level": "Beginner",
    "codeExample": "// External:\\nfor (String item : list) { ... }\\n// Internal:\\nlist.stream().forEach(item → ...);"
  }
];

export default topic1_questions;
