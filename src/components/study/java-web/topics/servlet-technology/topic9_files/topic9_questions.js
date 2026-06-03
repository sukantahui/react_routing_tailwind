const questions = [
  {
    question: "What is the main purpose of asynchronous servlets?",
    shortAnswer: "To free container threads while long-running operations execute in separate threads, improving scalability.",
    explanation: "Async servlets release the original request thread, allowing it to handle other requests.",
    hint: "Think of a restaurant waiter taking orders and then a chef cooking – the waiter is free to take more orders.",
    level: "basic",
    codeExample: "@WebServlet(asyncSupported=true) ... AsyncContext ctx = request.startAsync();"
  },
  {
    question: "Which annotation attribute enables asynchronous support in a servlet?",
    shortAnswer: "asyncSupported = true in @WebServlet.",
    explanation: "If not set, calling startAsync() throws IllegalStateException.",
    level: "basic"
  },
  {
    question: "What method on HttpServletRequest starts asynchronous processing?",
    shortAnswer: "startAsync()",
    explanation: "It returns an AsyncContext object that controls the async operation.",
    level: "basic"
  },
  {
    question: "What happens if you don't call complete() on AsyncContext?",
    shortAnswer: "The response remains open until timeout, then container completes it with an error.",
    explanation: "You must explicitly complete to send the response.",
    level: "intermediate"
  },
  {
    question: "How do you set a timeout for an asynchronous request?",
    shortAnswer: "asyncContext.setTimeout(milliseconds);",
    explanation: "Default timeout is container-specific (usually 30 seconds).",
    level: "intermediate"
  },
  {
    question: "What is AsyncListener and when would you use it?",
    shortAnswer: "An interface to receive callbacks for async events: onStartAsync, onComplete, onTimeout, onError.",
    explanation: "Used for logging, cleanup, or custom timeout handling.",
    level: "advanced"
  },
  {
    question: "Can you use asynchronous processing with filters?",
    shortAnswer: "Yes, filters must also declare asyncSupported=true and can wrap the request/response.",
    explanation: "Filters with async support can intercept async dispatch.",
    level: "intermediate"
  },
  {
    question: "What is the difference between AsyncContext.start() and using a separate thread directly?",
    shortAnswer: "start() is a convenience to run a task using a container-managed thread (not always recommended).",
    explanation: "Better to use an application-managed executor to control thread pool.",
    level: "advanced"
  },
  {
    question: "Why should you avoid using thread pools that grow unbounded?",
    shortAnswer: "They can cause resource exhaustion and degrade performance.",
    explanation: "Use a fixed thread pool or bounded queue.",
    level: "intermediate"
  },
  {
    question: "Can you forward or include after calling startAsync()?",
    shortAnswer: "Yes, using AsyncContext.dispatch() instead of RequestDispatcher.",
    explanation: "dispatch() allows forwarding to another resource in async mode.",
    level: "advanced"
  },
  {
    question: "What happens to the response if you write to it before calling complete()?",
    shortAnswer: "It's buffered and sent when complete() is called, but you can also write incrementally.",
    explanation: "Premature flushing may commit the response prematurely.",
    level: "intermediate"
  },
  {
    question: "Is asynchronous processing suitable for CPU-bound tasks?",
    shortAnswer: "Not really; it won't improve throughput and may add overhead.",
    explanation: "Async is best for I/O-bound operations waiting on external services.",
    level: "intermediate"
  },
  {
    question: "How does async processing affect session management?",
    shortAnswer: "Session is still available, but be careful with concurrent access.",
    explanation: "Multiple async tasks accessing same session need synchronization.",
    level: "advanced"
  },
  {
    question: "Can you use async servlets with WebSockets?",
    shortAnswer: "Yes, but WebSockets already provide asynchronous messaging; servlet async is more for HTTP long-polling.",
    explanation: "They can be complementary in some architectures.",
    level: "advanced"
  },
  {
    question: "What is the default timeout for an AsyncContext?",
    shortAnswer: "Container-dependent; typical default is 30 seconds.",
    explanation: "Set explicitly for predictable behavior.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of AsyncContext.dispatch()?",
    shortAnswer: "To forward the request to another resource (JSP, servlet) within the same async cycle.",
    explanation: "The dispatched resource will see the same request/response objects.",
    level: "advanced"
  },
  {
    question: "Can multiple async tasks write to the same response?",
    shortAnswer: "No, only one task should call complete() and write the response.",
    explanation: "Concurrent writes lead to unpredictable output.",
    level: "advanced"
  },
  {
    question: "What is the difference between Servlet 3.0 and Servlet 3.1 async features?",
    shortAnswer: "Servlet 3.0 added basic async; 3.1 added non-blocking I/O (ReadListener/WriteListener).",
    explanation: "Non-blocking I/O allows reading/writing request/response data asynchronously.",
    level: "advanced"
  },
  {
    question: "How do you handle errors in an async task?",
    shortAnswer: "Catch exceptions and call asyncContext.complete() with error response or dispatch to error page.",
    explanation: "Uncaught exceptions in worker threads won't propagate to container.",
    level: "intermediate"
  },
  {
    question: "What happens if you call asyncContext.start() from within another async task?",
    shortAnswer: "It starts another async operation, but generally not recommended due to nesting complexity.",
    explanation: "You can chain async operations, but manage carefully.",
    level: "advanced"
  },
  {
    question: "How does async processing affect the number of concurrent requests a server can handle?",
    shortAnswer: "It dramatically increases concurrency by freeing container threads during I/O waits.",
    explanation: "Example: Tomcat with 200 threads can handle 2000+ concurrent slow requests.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of AsyncEvent.getSuppliedRequest()?",
    shortAnswer: "It returns the request object originally supplied to startAsync() (may be wrapped).",
    explanation: "Useful if filters have wrapped the request.",
    level: "advanced"
  },
  {
    question: "Can you reuse the same AsyncContext after complete()?",
    shortAnswer: "No, it becomes invalid; any further calls throw IllegalStateException.",
    explanation: "Once complete, the async cycle ends.",
    level: "intermediate"
  },
  {
    question: "Is it possible to have asynchronous filters?",
    shortAnswer: "Yes, filters with asyncSupported can be called during async dispatch.",
    explanation: "Set <async-supported>true</async-supported> in web.xml.",
    level: "advanced"
  },
  {
    question: "What is the difference between AsyncContext.start() and submitting a task to an ExecutorService?",
    shortAnswer: "start() uses container's managed thread pool; ExecutorService gives you control over thread management.",
    explanation: "For production, prefer ExecutorService to avoid container thread pool exhaustion.",
    level: "advanced"
  },
  {
    question: "How do you pass data from the async task back to the original request?",
    shortAnswer: "Use request.setAttribute() before dispatch or write directly to response.",
    explanation: "Attributes set in async task are visible to dispatched resources.",
    level: "intermediate"
  },
  {
    question: "What happens if a filter without asyncSupported receives an async request?",
    shortAnswer: "The filter is bypassed during async dispatch.",
    explanation: "Filters must declare asyncSupported to participate in async cycles.",
    level: "advanced"
  },
  {
    question: "Can you call startAsync() inside an async task's run() method?",
    shortAnswer: "No, startAsync() must be called from the original container thread or initially from service().",
    explanation: "The request is already in async mode; starting another requires careful handling.",
    level: "advanced"
  },
  {
    question: "What is the typical use case for async servlets in modern web apps?",
    shortAnswer: "Long-polling, server-sent events, or handling slow external API calls.",
    explanation: "Modern alternatives include WebSockets and reactive frameworks.",
    level: "intermediate"
  },
  {
    question: "How do you test async servlets in unit tests?",
    shortAnswer: "Use mock objects (e.g., Mockito) or a lightweight container like embedded Tomcat with async support.",
    explanation: "Testing async requires simulating timeouts and concurrency.",
    level: "advanced"
  }
];

export default questions;