const topic10_questions = [
  {
    "question": "How does G1 GC decide which Old Generation regions to collect during a Mixed Collection?",
    "shortAnswer": "G1 uses a 'Garbage-First' heuristic. It calculates the efficiency payoff (most reclaimable garbage with the least time required) and collects the dirtiest regions first to stay within the user-configured MaxGCPauseMillis goal.",
    "explanation": "Maximizes memory reclamation while respecting pause budgets.",
    "hint": "Selects regions containing the highest proportion of garbage first.",
    "level": "Intermediate",
    "codeExample": "-XX:MaxGCPauseMillis=200 (Soft pause-time goal)"
  },
  {
    "question": "What is a 'Humongous Region' in G1 GC terminology?",
    "shortAnswer": "A contiguous sequence of one or more G1 regions used to store a single object whose size exceeds 50% of the standard G1 heap region size (e.g. huge byte arrays).",
    "explanation": "Allocated directly into Old generation memory space.",
    "hint": "Stores single objects larger than 50% of a G1 region.",
    "level": "Advanced",
    "codeExample": "Object size > 50% region -> Allocated in Humongous Region."
  }
];

export default topic10_questions;
