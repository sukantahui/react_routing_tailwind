const topic5_questions = [
  {
    "question": "What specific exception class is thrown by JDBC when one or more statements in a batch fail to execute?",
    "shortAnswer": "java.sql.BatchUpdateException",
    "explanation": "Specialized SQLException subclass containing partial batch results.",
    "hint": "java.sql.BatchUpdateException",
    "level": "Beginner",
    "codeExample": "catch (BatchUpdateException bue) { int[] counts = bue.getUpdateCounts(); }"
  },
  {
    "question": "How can you determine which specific statements succeeded prior to the failure when a BatchUpdateException is caught?",
    "shortAnswer": "By calling bue.getUpdateCounts(), which returns an int[] array indicating the execution outcome for each statement executed before the error was encountered.",
    "explanation": "Provides granular post-mortem analysis of batch executions.",
    "hint": "Call bue.getUpdateCounts() and inspect the returned array.",
    "level": "Intermediate",
    "codeExample": "int[] counts = bue.getUpdateCounts();"
  }
];

export default topic5_questions;
