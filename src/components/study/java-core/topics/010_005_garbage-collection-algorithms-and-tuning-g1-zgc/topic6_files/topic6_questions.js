const topic6_questions = [
  {
    "question": "What is the difference in scope between a Minor GC and a Full GC?",
    "shortAnswer": "A Minor GC cleans only the Young Generation (Eden and Survivor spaces), while a Full GC cleans the entire JVM memory space, including Young Generation, Old Generation, and Metaspace.",
    "explanation": "Minor GC is ultra-fast; Full GC requires sweeping the entire process memory.",
    "hint": "Minor GC = Young Gen only; Full GC = Young + Old + Metaspace.",
    "level": "Beginner",
    "codeExample": "Minor GC: 2ms pause; Full GC: 2000ms pause."
  },
  {
    "question": "What is a Promotion Failure in JVM Garbage Collection?",
    "shortAnswer": "An event where a Minor GC attempts to promote surviving objects from Survivor space into Old Gen, but the Old Gen does not have sufficient contiguous free space, forcing the JVM to immediately trigger an emergency Full GC.",
    "explanation": "Indicates Old Gen fragmentation or undersized Old Gen capacity.",
    "hint": "Old Gen lacks sufficient contiguous space to receive promoted survivor objects.",
    "level": "Advanced",
    "codeExample": "Promotion Failure -> Emergency Stop-The-World Full GC."
  }
];

export default topic6_questions;
