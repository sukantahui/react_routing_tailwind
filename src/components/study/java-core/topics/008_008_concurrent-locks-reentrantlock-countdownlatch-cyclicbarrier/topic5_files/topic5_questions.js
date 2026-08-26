const topic5_questions = [
  {
    "question": "When is 'ReentrantReadWriteLock' most beneficial and when should it be avoided in favor of 'ConcurrentHashMap' or 'ReentrantLock'?",
    "shortAnswer": "'ReentrantReadWriteLock' provides massive throughput gains in 'Read-Heavy' systems (e.g., 90%+ reads, <10% writes) where operations hold the read lock for non-trivial durations (e.g. searching a cache or parsing a structure). However, in 'Write-Heavy' systems or micro-read operations (retrieving a simple pointer), the internal bookkeeping overhead of managing shared read count bits and write owner locks can degrade performance below that of a plain 'ReentrantLock' or lock-free 'ConcurrentHashMap'.",
    "explanation": "Production profiling criteria for ReadWriteLock.",
    "hint": "Use in read-heavy systems (90%+ reads); avoid in write-heavy systems where bookkeeping overhead slows down throughput.",
    "level": "Intermediate",
    "codeExample": "class Cache { ReadWriteLock rw = new ReentrantReadWriteLock(); ... }"
  }
];

export default topic5_questions;