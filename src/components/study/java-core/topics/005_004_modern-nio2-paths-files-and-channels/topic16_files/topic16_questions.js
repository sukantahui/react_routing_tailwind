const topic16_questions = [
  {
    "question": "What architectural benefits does Java NIO.2 provide when designing enterprise cloud document storage engines?",
    "shortAnswer": "1. Atomic staged publishing via 'Files.move(..., ATOMIC_MOVE)' to prevent corrupt partial file reads. 2. Lazy stream traversal via 'Files.walk()' and 'Files.find()' to search millions of files without memory exhaustion. 3. Modern, clean one-liner I/O ('readString' / 'writeString') with strict UTF-8 enforcement. 4. Pluggable FileSystem SPI for seamless virtual filesystem integrations.",
    "explanation": "NIO.2 provides the complete enterprise toolkit for cloud storage engines.",
    "hint": "Atomic moves, lazy stream search, clean one-liner I/O, and cross-platform UTF-8 guarantees.",
    "level": "Advanced",
    "codeExample": "Files.move(stage, dest, StandardCopyOption.ATOMIC_MOVE); Files.walk(root)..."
  }
];

export default topic16_questions;