const questions = [
  {
    question: "What is the purpose of a filter in Java servlets?",
    shortAnswer: "Filters intercept requests and responses to perform cross‑cutting tasks like logging, authentication, and encoding.",
    explanation: "Filters allow pre‑processing and post‑processing of requests without modifying servlet code.",
    hint: "Think of filters as reusable interceptors.",
    level: "basic",
    codeExample: "class MyFilter implements Filter { public void doFilter(...) { ... chain.doFilter(...); } }"
  },
  {
    question: "What method must a filter call to pass the request to the next entity?",
    shortAnswer: "chain.doFilter(request, response)",
    explanation: "Without calling doFilter(), the request processing stops.",
    level: "basic",
    codeExample: "chain.doFilter(request, response);"
  },
  {
    question: "How do you configure a filter without web.xml?",
    shortAnswer: "Use the @WebFilter annotation on the filter class.",
    explanation: "Servlet 3.0+ supports annotations, e.g., @WebFilter(\"/*\").",
    level: "intermediate"
  },
  // ... generate 28 more covering:
  // - Filter lifecycle methods (init, doFilter, destroy)
  // - FilterConfig and init parameters
  // - Filter mapping URL patterns vs servlet names
  // - Order of filter execution (web.xml vs annotations)
  // - Asynchronous filters (Async supported)
  // - Wrapping request/response with HttpServletRequestWrapper
  // - Performance considerations
  // - Common use cases (compression, caching, XSS protection)
  // - Filter vs Interceptor (Spring MVC)
  // - Throwing exceptions in filter
  // - and more – total 30
];

export default questions;