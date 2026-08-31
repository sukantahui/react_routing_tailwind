const topic6_questions = [
  {
    "question": "Where were the String Constant Pool and static class variables relocated when PermGen was removed?",
    "shortAnswer": "They were relocated directly into the main Java Heap Area, allowing unreferenced strings and static objects to be garbage collected normally by standard Young/Old GC cycles.",
    "explanation": "String pool moved in Java 7; static variables moved in Java 8.",
    "hint": "Moved to the main Java Heap Area.",
    "level": "Intermediate",
    "codeExample": "String Pool & Statics → Java Heap; Class Bytecode → Metaspace"
  },
  {
    "question": "What happens if a Java application running on Java 8+ does not specify -XX:MaxMetaspaceSize?",
    "shortAnswer": "Metaspace has no upper limit by default and can dynamically expand until all available physical RAM and virtual swap memory on the host operating system are exhausted.",
    "explanation": "Setting -XX:MaxMetaspaceSize is recommended in containerized environments (Docker/K8s).",
    "hint": "It can expand indefinitely up to available host OS RAM.",
    "level": "Intermediate",
    "codeExample": "-XX:MaxMetaspaceSize=512m prevents host memory starvation."
  }
];

export default topic6_questions;
