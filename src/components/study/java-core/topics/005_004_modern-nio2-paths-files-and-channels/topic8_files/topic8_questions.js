const topic8_questions = [
  {
    "question": "Why is 'StandardCopyOption.ATOMIC_MOVE' crucial for zero-downtime file publishing and database logs?",
    "shortAnswer": "'ATOMIC_MOVE' delegates to the operating system's kernel-level atomic inode/MFT rename syscall. The rename occurs as an instantaneous, all-or-nothing operation. Concurrent reader threads will either see the old version or the complete new version, but will NEVER see a partially written, corrupted intermediate file.",
    "explanation": "Standard pattern for atomic config file updates across microservice architectures.",
    "hint": "Performs kernel-level instantaneous rename, preventing concurrent readers from seeing partial files.",
    "level": "Intermediate",
    "codeExample": "Files.move(staged, live, StandardCopyOption.ATOMIC_MOVE);"
  }
];

export default topic8_questions;