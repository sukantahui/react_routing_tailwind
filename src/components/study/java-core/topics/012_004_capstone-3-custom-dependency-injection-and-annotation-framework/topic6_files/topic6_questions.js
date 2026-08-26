const topic6_questions = [
  {
    "question": "How does JDK Dynamic Proxy enable Aspect-Oriented Programming (AOP) without modifying source code?",
    "shortAnswer": "The proxy generates an in-memory bytecode implementation of the target interface at runtime that intercepts all method calls, executing cross-cutting concerns (e.g. logging, transactions) before and after delegating to the target object.",
    "explanation": "Core mechanism of Spring AOP and Java dynamic proxies.",
    "hint": "Generates runtime interface wrapper executing cross-cutting advice before and after delegation.",
    "level": "Intermediate",
    "codeExample": "Proxy.newProxyInstance(loader, new Class<?>[]{MyInterface.class}, handler);"
  },
  {
    "question": "Why does standard JDK Dynamic Proxy require the target class to implement an interface?",
    "shortAnswer": "Because Proxy.newProxyInstance() generates a subclass of java.lang.reflect.Proxy, and since Java does not support multiple class inheritance, it can only implement additional interfaces rather than extending concrete classes (CGLIB is used for concrete classes).",
    "explanation": "Fundamental limitation of JDK Dynamic Proxies.",
    "hint": "Java single inheritance means the generated proxy already extends java.lang.reflect.Proxy.",
    "level": "Advanced",
    "codeExample": "new Class<?>[]{AccountService.class}"
  }
];

export default topic6_questions;
