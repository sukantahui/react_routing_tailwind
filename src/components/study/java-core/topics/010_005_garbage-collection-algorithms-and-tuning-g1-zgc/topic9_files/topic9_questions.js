const topic9_questions = [
  {
    "question": "Why is Parallel GC known as the 'Throughput Collector'?",
    "shortAnswer": "Because it focuses on maximizing the percentage of total CPU time dedicated to executing application code rather than minimizing individual pause times, using all available CPU threads in parallel during pauses.",
    "explanation": "Ideal when overall batch completion speed is prioritized over latency.",
    "hint": "Maximizes the percentage of CPU time devoted to application computation.",
    "level": "Beginner",
    "codeExample": "-XX:GCTimeRatio=19 (95% application compute time)"
  },
  {
    "question": "What does the -XX:GCTimeRatio=19 tuning flag configure in Parallel GC?",
    "shortAnswer": "It configures the target throughput ratio: GC time should not exceed 1 / (1 + 19) = 1/20 = 5% of total application execution time.",
    "explanation": "Calculated as 1 / (1 + N).",
    "hint": "Sets target GC time to 1/(1+N) of total running time.",
    "level": "Intermediate",
    "codeExample": "-XX:GCTimeRatio=19 -> 5% GC time, 95% app time."
  }
];

export default topic9_questions;
