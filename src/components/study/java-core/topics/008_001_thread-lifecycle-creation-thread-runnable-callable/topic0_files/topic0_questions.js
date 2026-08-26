const topic0_questions = [
  {
    "question": "What is the fundamental difference between 'Concurrency' and 'Parallelism' in computing?",
    "shortAnswer": "'Concurrency' is about 'structure'—managing multiple tasks by interleaving their execution over time (such as time-slicing via OS context switching on a single CPU core). 'Parallelism' is about 'execution'—physically running multiple computations simultaneously at the exact same instant across multiple distinct hardware CPU cores.",
    "explanation": "Classic computer systems distinction formulated famously by Rob Pike.",
    "hint": "Concurrency is dealing with many tasks (interleaved time-slicing); Parallelism is executing many tasks simultaneously on multiple cores.",
    "level": "Beginner",
    "codeExample": "int cores = Runtime.getRuntime().availableProcessors(); // Enables hardware parallelism"
  }
];

export default topic0_questions;