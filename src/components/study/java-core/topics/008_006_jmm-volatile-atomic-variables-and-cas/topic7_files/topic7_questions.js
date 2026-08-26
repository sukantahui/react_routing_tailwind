const topic7_questions = [
  {
    "question": "How do JMM Memory Barriers (Memory Fences) enforce safe publication when writing and reading volatile variables?",
    "shortAnswer": "The JVM inserts hardware memory barriers around volatile operations: 1. 'Before a volatile write': A 'StoreStore' barrier is emitted to ensure all preceding normal writes (e.g. initializing 'data = 9999') are fully flushed to memory before the volatile variable ('published = true') is updated. 2. 'After a volatile write': A 'StoreLoad' barrier prevents the volatile write from reordering with subsequent reads. 3. 'After a volatile read': A 'LoadLoad' and 'LoadStore' barrier ensures that subsequent reads (e.g. reading 'data') cannot be reordered before the volatile read. This guarantee is known as 'Safe Publication'.",
    "explanation": "Core JMM memory barrier matrix specification (JSR-133 Cookbook).",
    "hint": "StoreStore barriers flush prior writes before volatile writes; LoadLoad/LoadStore barriers prevent reordering after volatile reads.",
    "level": "Advanced",
    "codeExample": "data = 42; // StoreStore fence inserted before: volatileReady = true;"
  }
];

export default topic7_questions;