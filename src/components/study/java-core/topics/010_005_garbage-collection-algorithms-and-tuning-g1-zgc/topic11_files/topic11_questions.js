const topic11_questions = [
  {
    "question": "How does ZGC manage to compact and relocate heap objects concurrently without stopping application threads?",
    "shortAnswer": "Through Colored Pointers and JIT Load Barriers. When an application thread dereferences an object pointer, the Load Barrier checks the pointer color bits. If the object was relocated, the load barrier reads the forwarding table, repairs the pointer in place (self-healing), and continues execution with zero STW pause.",
    "explanation": "Revolutionary concurrent relocation architecture.",
    "hint": "Uses colored pointer metadata bits and JIT self-healing load barriers.",
    "level": "Advanced",
    "codeExample": "Load Barrier: if (bad_color(ptr)) ptr = heal_and_remap(ptr);"
  },
  {
    "question": "What major enhancement was added to ZGC in Java 21 LTS (JEP 439)?",
    "shortAnswer": "Generational ZGC (-XX:+ZGenerational), which introduced young and old generation separation to ZGC, delivering up to 4x higher throughput and lower CPU overhead while preserving sub-millisecond pauses.",
    "explanation": "Combines generational hypothesis efficiency with ZGC low latency.",
    "hint": "Generational ZGC (JEP 439).",
    "level": "Intermediate",
    "codeExample": "java -XX:+UseZGC -XX:+ZGenerational -jar app.jar"
  }
];

export default topic11_questions;
