const topic14_questions = [
  {
    "question": "Why does Eclipse MAT generate multiple index files (.index, .domTree, etc.) when opening a .hprof file for the first time?",
    "shortAnswer": "To build optimized graph data structures and dominator trees on disk, allowing fast querying, filtering, and path-to-root traversals across multi-gigabyte heaps with minimal RAM usage.",
    "explanation": "Enables analyzing 32GB dumps on an 8GB developer laptop.",
    "hint": "Builds disk-based graph indexes for fast querying of large heaps.",
    "level": "Intermediate",
    "codeExample": "Indexes: .index, .domTree, .inbound, .outbound"
  },
  {
    "question": "What is the first report Eclipse MAT prompts you to generate upon opening a heap dump?",
    "shortAnswer": "The 'Leak Suspects Report', which automatically scans the object graph and generates a pie chart identifying object groups that consume an unusually large percentage of the total heap.",
    "explanation": "Fast-tracks finding the root cause of 90% of memory leaks.",
    "hint": "The Leak Suspects Report.",
    "level": "Beginner",
    "codeExample": "MAT -> Run 'Leak Suspects Report'"
  }
];

export default topic14_questions;
