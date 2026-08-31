const topic6_questions = [
  {
    "question": "Why does failing to call ThreadLocal.remove() cause severe memory leaks in web servers like Tomcat?",
    "shortAnswer": "Because Tomcat reuses worker threads from a long-lived thread pool. If ThreadLocal.remove() is omitted, the Thread's internal ThreadLocalMap retains the request object (and its ClassLoader) across thousands of subsequent requests for the entire JVM lifetime.",
    "explanation": "Causes both Heap memory exhaustion and ClassLoader Metaspace leaks.",
    "hint": "Pooled worker threads never terminate, keeping ThreadLocalMap entries alive.",
    "level": "Intermediate",
    "codeExample": "try { tl.set(ctx); } finally { tl.remove(); }"
  },
  {
    "question": "What modern Java 21 feature provides a safer, automatic alternative to ThreadLocal for request-scoped variables?",
    "shortAnswer": "Scoped Values (JEP 446 / JEP 481), which are immutable, automatically bound to a lexical code scope, and automatically cleared when the scope exits.",
    "explanation": "Designed specifically to replace ThreadLocal in Virtual Thread architectures.",
    "hint": "Scoped Values (ScopedValue.where(...).run(...)).",
    "level": "Advanced",
    "codeExample": "ScopedValue.where(USER_CTX, user).run(() → { ... });"
  }
];

export default topic6_questions;
