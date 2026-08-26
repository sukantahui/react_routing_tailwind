const topic11_questions = [
  {
    "question": "Why does running a parallel stream on a List of 20 elements run slower than a standard for-loop?",
    "shortAnswer": "Because the time required for ForkJoinPool task creation, queue management, thread synchronization, and combining results is far greater than the negligible fraction of a microsecond needed to iterate 20 items sequentially.",
    "explanation": "Parallel coordination introduces a baseline overhead cost.",
    "hint": "Thread management and synchronization overhead dominates computation time.",
    "level": "Beginner",
    "codeExample": "List.of(1..20).parallelStream() // Overkill and slower than sequential loop"
  },
  {
    "question": "What is the recommended heuristic for determining if a collection is large enough for parallel streams?",
    "shortAnswer": "Use Brian Goetz's NQ model: if the product of element count N and CPU operations per element Q exceeds 10,000, parallelization is likely beneficial.",
    "explanation": "Simple arithmetic operations require larger N to justify parallelization.",
    "hint": "N * Q > 10,000",
    "level": "Intermediate",
    "codeExample": "int N = list.size(); int Q = workPerElement; boolean useParallel = (N * Q) > 10000;"
  }
];

export default topic11_questions;
