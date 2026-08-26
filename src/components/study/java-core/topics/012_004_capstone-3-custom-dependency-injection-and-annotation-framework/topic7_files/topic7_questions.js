const topic7_questions = [
  {
    "question": "What is the advantage of using Java's built-in com.sun.net.httpserver.HttpServer for microservices and lightweight frameworks?",
    "shortAnswer": "It requires zero external dependencies, has near-instant startup time (<50ms), consumes negligible memory, and is included out-of-the-box in the standard JDK.",
    "explanation": "Built-in lightweight HTTP server in standard Java library.",
    "hint": "Zero external dependencies and instant startup time out of the box.",
    "level": "Beginner",
    "codeExample": "HttpServer.create(new InetSocketAddress(8080), 0);"
  },
  {
    "question": "How does the custom dispatcher servlet map incoming HTTP requests to annotated @GetMapping methods?",
    "shortAnswer": "During startup scanning, the framework creates a Map<String, Method> routing table associating URL paths with controller methods. When an HTTP request arrives, the dispatcher extracts the request URI, looks up the target method, invokes it via reflection, and serializes the return value as JSON.",
    "explanation": "Standard REST dispatcher architecture.",
    "hint": "URL-to-Method routing table invoked via reflection.",
    "level": "Intermediate",
    "codeExample": "Method handler = routeMap.get(exchange.getRequestURI().getPath());"
  }
];

export default topic7_questions;
