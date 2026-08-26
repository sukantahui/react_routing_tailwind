const topic18_questions = [
  {
    "question": "Why is it critical to select 'exclude all phantom/weak/soft references' when finding the Path to GC Roots in MAT?",
    "shortAnswer": "Because Weak, Soft, and Phantom references do not prevent objects from being garbage collected when memory is needed. Filtering them out isolates the strong reference chains that are actually causing the memory leak.",
    "explanation": "Eliminates false leads from cache mechanisms.",
    "hint": "Isolates strong references that actually prevent GC from freeing memory.",
    "level": "Intermediate",
    "codeExample": "MAT -> Path to GC Roots -> Exclude all phantom/weak/soft references"
  },
  {
    "question": "What information does the Path to GC Roots tree reveal about a leaked object?",
    "shortAnswer": "It displays the exact chain of holding references, including the GC Root type (Thread Stack, Static field, JNI), the enclosing classes, the exact field names, and array index positions linking the root to the target object.",
    "explanation": "Provides the exact code path requiring refactoring or nullification.",
    "hint": "Shows GC Root type, class names, field names, and reference chain.",
    "level": "Beginner",
    "codeExample": "GC Root (Thread) -> Class A (field b) -> Class B (field c) -> Leaked Object"
  }
];

export default topic18_questions;
