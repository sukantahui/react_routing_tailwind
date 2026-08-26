const topic3_questions = [
  {
    "question": "What is the typical recommended batch chunk size for JDBC bulk insertions?",
    "shortAnswer": "500 to 1,000 rows per batch chunk.",
    "explanation": "Provides optimal throughput without overwhelming client JVM RAM or database transaction logs.",
    "hint": "500 to 1,000 rows.",
    "level": "Beginner",
    "codeExample": "int BATCH_SIZE = 1000;"
  },
  {
    "question": "Why is a tail flush necessary when batching records in fixed chunk intervals?",
    "shortAnswer": "Because the total number of records processed may not be an exact multiple of the chunk size (e.g. 2,450 records with a batch size of 1,000 leaves 450 unflushed records in the buffer at the end of the loop).",
    "explanation": "Without a tail flush, the remaining records will never be executed.",
    "hint": "Flushes the remaining records that did not make up a full batch interval.",
    "level": "Beginner",
    "codeExample": "if (count % BATCH_SIZE != 0) pstmt.executeBatch();"
  }
];

export default topic3_questions;
