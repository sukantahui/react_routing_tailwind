const topic0_questions = [
  {
    "question": "Why does inserting 5,000 rows in a standard for-loop with executeUpdate() perform poorly in distributed environments?",
    "shortAnswer": "Because each executeUpdate() requires an independent synchronous network round-trip (RTT) between the Java client and the database server, causing the overall execution time to be dominated by network packet transit latency rather than database processing.",
    "explanation": "Network round-trips multiply with every loop iteration.",
    "hint": "Each loop iteration incurs an individual network round-trip latency.",
    "level": "Beginner",
    "codeExample": "for(Student s : list) { pstmt.executeUpdate(); } // 5,000 network roundtrips!"
  },
  {
    "question": "How does JDBC Batch Processing eliminate the network round-trip bottleneck?",
    "shortAnswer": "By accumulating multiple parameterized SQL statement executions in a local memory buffer and sending them across the network in a single consolidated payload.",
    "explanation": "Reduces thousands of network hops into a handful of batch packets.",
    "hint": "Sends hundreds or thousands of rows in a single network transmission.",
    "level": "Beginner",
    "codeExample": "ps.addBatch(); ... ps.executeBatch();"
  }
];

export default topic0_questions;
