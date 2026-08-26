const topic2_questions = [
  {
    "question": "Why does an object referenced by a static field never get garbage collected during normal application execution?",
    "shortAnswer": "Because static fields belong to the loaded Class object in Metaspace/Heap, which acts as a permanent GC Root. As long as the ClassLoader that loaded the class remains alive, the static reference keeps the target object alive.",
    "explanation": "Common cause of memory leaks in static collection caches.",
    "hint": "Static fields are GC Roots and remain reachable for the ClassLoader's lifetime.",
    "level": "Beginner",
    "codeExample": "public static final List<Item> CACHE = new ArrayList<>(); // GC Root!"
  },
  {
    "question": "What are the four primary sources of GC Roots in the HotSpot JVM?",
    "shortAnswer": "1. Thread Stack local variables/parameters, 2. Static class variables, 3. JNI native references, and 4. Active synchronization monitor locks.",
    "explanation": "Foundation for all reachability analysis algorithms.",
    "hint": "Stack variables, static fields, JNI references, and synchronization monitors.",
    "level": "Intermediate",
    "codeExample": "GC Roots = Stacks + Statics + JNI + Monitors"
  }
];

export default topic2_questions;
