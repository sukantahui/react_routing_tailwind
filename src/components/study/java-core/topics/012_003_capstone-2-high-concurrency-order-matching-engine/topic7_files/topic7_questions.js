const topic7_questions = [
  {
    "question": "Why is an append-only Write-Ahead Log (WAL) drastically faster than updating relational database tables for every order?",
    "shortAnswer": "Sequential disk I/O requires zero random seeking and minimal disk head movements; appending fixed-size binary records via FileChannel achieves maximum possible physical disk throughput.",
    "explanation": "Fundamental storage engine design pattern (used in Kafka, PostgreSQL, RocksDB).",
    "hint": "Sequential append-only writes eliminate random disk seek latency.",
    "level": "Intermediate",
    "codeExample": "channel.write(buffer); channel.force(false);"
  },
  {
    "question": "What does FileChannel.force(false) do in Java NIO?",
    "shortAnswer": "It forces all buffered updates in the operating system's page cache to be flushed directly to the underlying physical storage hardware (similar to Unix fsync), ensuring crash durability.",
    "explanation": "Guarantees durability without metadata sync overhead.",
    "hint": "Flushes OS page cache buffers to physical storage media.",
    "level": "Advanced",
    "codeExample": "channel.force(false);"
  }
];

export default topic7_questions;
