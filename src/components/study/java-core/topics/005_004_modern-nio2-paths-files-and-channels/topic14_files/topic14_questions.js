const topic14_questions = [
  {
    "question": "How do Memory-Mapped Files ('MappedByteBuffer') achieve unmatched I/O performance compared to standard streams?",
    "shortAnswer": "'MappedByteBuffer' maps a physical disk file directly into the operating system kernel's Virtual Memory page cache ('mmap' syscall). Reading or writing memory-mapped bytes accesses hardware RAM pages directly at memory bus speeds with ZERO intermediate buffer copying ('Zero-Copy Architecture'). The OS paging system handles background disk flushing via DMA.",
    "explanation": "Foundational architecture powering Apache Kafka, Lucene/Elasticsearch, and Cassandra.",
    "hint": "Maps disk files directly to OS virtual memory pages, enabling zero-copy RAM speed access.",
    "level": "Advanced",
    "codeExample": "MappedByteBuffer mbb = channel.map(MapMode.READ_WRITE, 0, 1024*1024);"
  }
];

export default topic14_questions;