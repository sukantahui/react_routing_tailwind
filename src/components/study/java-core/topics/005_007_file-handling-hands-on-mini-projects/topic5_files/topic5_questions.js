const topic5_questions = [
  {
    "question": "What makes the 'BranchLedgerConsolidator' solution resilient, fast, and atomic for enterprise ledger processing?",
    "shortAnswer": "1. 'Files.lines()' lazily streams each branch ledger line-by-line without heap bloat. 2. '.distinct()' ensures duplicate student entries are filtered out in stream memory. 3. Writes initially to a temporary staging file before performing an atomic 'Files.move(..., ATOMIC_MOVE)' to ensure consumers never read a partially written file.",
    "explanation": "Production pattern used across batch ETL and data warehouse pipeline processors.",
    "hint": "Combines lazy streaming, in-memory deduplication, and atomic staging moves for maximum reliability.",
    "level": "Advanced",
    "codeExample": "Files.move(tempStage, finalDest, StandardCopyOption.ATOMIC_MOVE);"
  }
];

export default topic5_questions;