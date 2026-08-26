const topic12_questions = [
  {
    "question": "What is the primary operational difference between G1 GC and Shenandoah GC during memory compaction (evacuation)?",
    "shortAnswer": "G1 GC performs region evacuation during Stop-The-World pauses, whereas Shenandoah GC evacuates regions concurrently while application threads continue executing.",
    "explanation": "Enables consistent low-latency pauses regardless of heap size.",
    "hint": "Shenandoah performs region evacuation concurrently rather than during STW pauses.",
    "level": "Intermediate",
    "codeExample": "G1: STW Evacuation; Shenandoah: Concurrent Evacuation."
  },
  {
    "question": "What JVM flag enables the Shenandoah Garbage Collector?",
    "shortAnswer": "-XX:+UseShenandoahGC",
    "explanation": "Available in standard OpenJDK builds.",
    "hint": "-XX:+UseShenandoahGC",
    "level": "Beginner",
    "codeExample": "java -XX:+UseShenandoahGC -Xmx8g -jar payment-service.jar"
  }
];

export default topic12_questions;
