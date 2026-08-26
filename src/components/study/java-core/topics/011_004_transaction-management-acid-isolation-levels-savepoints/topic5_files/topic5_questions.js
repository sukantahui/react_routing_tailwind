const topic5_questions = [
  {
    "question": "What is Write-Ahead Logging (WAL) and how does it ensure Durability in database systems?",
    "shortAnswer": "WAL is an append-only logging technique where changes are flushed sequentially to a persistent log file on disk before the main data pages in memory are updated. If the server crashes, the database replays the WAL on startup to restore all committed transactions.",
    "explanation": "Fast sequential disk I/O provides crash recovery guarantees.",
    "hint": "Changes are written sequentially to a log file on disk before committing.",
    "level": "Intermediate",
    "codeExample": "WAL / Redo Log: Append-only disk journal guaranteeing durability."
  },
  {
    "question": "What is the purpose of the ARIES crash recovery algorithm during database reboot?",
    "shortAnswer": "It performs three passes: 1. Analysis pass (identifies dirty pages and in-flight transactions), 2. Redo pass (replays committed changes from WAL), and 3. Undo pass (rolls back uncommitted transactions from the time of crash).",
    "explanation": "Standard database recovery algorithm.",
    "hint": "Analysis, Redo (committed work), and Undo (uncommitted work).",
    "level": "Advanced",
    "codeExample": "ARIES Recovery: Analysis -> Redo -> Undo."
  }
];

export default topic5_questions;
