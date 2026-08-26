const topic5_questions = [
  {
    "question": "Why should library developers apply @Documented to public API annotations?",
    "shortAnswer": "Because without @Documented, the javadoc tool strips the annotations from the generated documentation HTML, preventing developers using the library from knowing that the method or class requires or supports that annotation.",
    "explanation": "Crucial for public contracts like @Transactional or @NonNull.",
    "hint": "Ensures annotations are visible in the generated HTML Javadoc documentation.",
    "level": "Beginner",
    "codeExample": "@Documented public @interface ApiContract {}"
  },
  {
    "question": "Does @Documented have any effect on runtime Reflection or bytecode execution?",
    "shortAnswer": "No. @Documented is strictly a tool directive for the javadoc documentation generator and has zero effect on runtime performance or bytecode execution.",
    "explanation": "Purely a documentation metadata flag.",
    "hint": "Zero effect on runtime execution or bytecode.",
    "level": "Beginner",
    "codeExample": "// Only affects javadoc generation tool"
  }
];

export default topic5_questions;
