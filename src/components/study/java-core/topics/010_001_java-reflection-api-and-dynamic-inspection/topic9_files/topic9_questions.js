const topic9_questions = [
  {
    "question": "Why is MethodHandle.invokeExact() faster than Method.invoke()?",
    "shortAnswer": "MethodHandle operates directly with the JVM's invokedynamic bytecode instructions, performs type checks once at lookup time, avoids primitive boxing/unboxing, and allows full JIT compiler method inlining.",
    "explanation": "Method.invoke creates Object[] arrays and boxes primitives on every call.",
    "hint": "Avoids boxing, eliminates array allocation, and enables JIT inlining.",
    "level": "Advanced",
    "codeExample": "MethodHandle mh = lookup.findVirtual(Target.class, 'method', methodType);"
  },
  {
    "question": "How can enterprise frameworks mitigate the performance cost of Reflection on application startup?",
    "shortAnswer": "By caching Method and Field objects in static lookup maps, using bytecode generation (ByteBuddy/ASM), or adopting Ahead-Of-Time (AOT) compile-time reflection indexing (GraalVM, Micronaut, Quarkus).",
    "explanation": "AOT frameworks eliminate runtime reflection entirely.",
    "hint": "Cache reflection metadata or use compile-time AOT code generation.",
    "level": "Intermediate",
    "codeExample": "private static final Map<String, Method> METHOD_CACHE = new ConcurrentHashMap<>();"
  }
];

export default topic9_questions;
