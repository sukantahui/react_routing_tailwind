const topic7_questions = [
  {
    "question": "Why is breaking 'Circular Wait' considered the gold standard for deadlock prevention in production Java applications?",
    "shortAnswer": "Breaking Circular Wait does not require sacrificing exclusive write access (Mutual Exclusion), does not require complex all-or-nothing acquisitions (Hold and Wait), and does not require replacing simple 'synchronized' blocks with explicit lock frameworks (No Preemption). By simply enforcing a strict 'Global Lock Ordering' (e.g. always acquiring locks in ascending alphabetical or numeric ID order), cycles in the Resource Allocation Graph become mathematically impossible.",
    "explanation": "Standard production deadlock prevention architecture.",
    "hint": "Enforcing consistent global lock ordering eliminates cycles in the Resource Allocation Graph with zero performance penalty.",
    "level": "Intermediate",
    "codeExample": "// Global Order: Always lock smaller ID first → No cycle possible!"
  }
];

export default topic7_questions;