const topic10_questions = [
  {
    "question": "How do you obtain a reference to the Platform ClassLoader in Java 9+?",
    "shortAnswer": "By calling the static factory method ClassLoader.getPlatformClassLoader().",
    "explanation": "Introduced in Java 9 as part of JPMS.",
    "hint": "ClassLoader.getPlatformClassLoader()",
    "level": "Beginner",
    "codeExample": "ClassLoader pl = ClassLoader.getPlatformClassLoader();"
  },
  {
    "question": "What happened to the jre/lib/ext directory and Extension ClassLoader in Java 9?",
    "shortAnswer": "The extension mechanism and jre/lib/ext directory were completely removed from the JDK, and Extension ClassLoader was replaced by PlatformClassLoader to load non-base modular platform components.",
    "explanation": "Eliminated uncontrolled classpath pollution from external JARs.",
    "hint": "Removed and replaced by PlatformClassLoader.",
    "level": "Intermediate",
    "codeExample": "Extension mechanism was deprecated and removed in Java 9."
  }
];

export default topic10_questions;
