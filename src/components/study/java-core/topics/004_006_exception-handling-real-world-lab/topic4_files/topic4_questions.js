const topic4_questions = [
  {
    "question": "How do custom rollback exceptions preserve transaction atomicity when processing bulk data batches?",
    "shortAnswer": "When an individual item inside a batch loop fails, the catch block intercepts the item error, executes compensatory rollback operations on previously processed items in that batch, and throws a specialized 'BatchRollbackException' carrying the list of rolled-back items and root cause for supervisory auditing.",
    "explanation": "Standard pattern in bulk payroll, batch invoice processing, and ETL pipelines.",
    "hint": "Reverts previous batch items upon error and throws a BatchRollbackException carrying audit metadata.",
    "level": "Intermediate",
    "codeExample": "catch (Exception e) { rollbackAll(processedList); throw new BatchRollbackEx(e); }"
  }
];

export default topic4_questions;