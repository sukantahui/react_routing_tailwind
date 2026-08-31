const topic19_questions = [
  {
    "question": "Why should filter() always precede map() and sorted() in a production stream pipeline?",
    "shortAnswer": "Placing filter() early eliminates irrelevant elements upfront, saving CPU cycles from performing unnecessary mapping transformations and reducing the buffer size required for expensive stateful sorting operations.",
    "explanation": "Sorting 1,000 filtered items is orders of magnitude faster and consumes much less memory than sorting 1,000,000 unfiltered items.",
    "hint": "Early filtering drastically reduces downstream processing and memory buffers.",
    "level": "Intermediate",
    "codeExample": "// Good: filter then map\\nstream.filter(s → s.isActive()).map(s → heavyDtoTransform(s))"
  },
  {
    "question": "What is a 'Pipeline Barrier' in stream execution architecture?",
    "shortAnswer": "A pipeline barrier occurs at a stateful operation (like sorted() or distinct()) that cannot emit its first output element until it has processed and buffered all upstream input elements.",
    "explanation": "Pipeline barriers break vertical loop fusion and require intermediate memory buffers.",
    "hint": "A point in the pipeline where streaming pauses until all upstream elements are buffered.",
    "level": "Advanced",
    "codeExample": "stream.filter(...).sorted().map(...) // sorted() forms a barrier where all items must be buffered before map begins"
  }
];

export default topic19_questions;
