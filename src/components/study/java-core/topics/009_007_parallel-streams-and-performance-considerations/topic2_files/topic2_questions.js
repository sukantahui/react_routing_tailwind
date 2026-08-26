const topic2_questions = [
  {
    "question": "Why is the default parallelism level of ForkJoinPool.commonPool() equal to (availableProcessors - 1)?",
    "shortAnswer": "Because the thread that initiates the parallel stream operation (the caller thread, e.g. main) also actively executes work tasks alongside the worker threads, utilizing all CPU cores fully without oversubscribing.",
    "explanation": "1 caller thread + (N - 1) worker threads = N threads for N cores.",
    "hint": "The calling thread participates in executing stream tasks.",
    "level": "Intermediate",
    "codeExample": "ForkJoinPool.commonPool().getParallelism() === Runtime.getRuntime().availableProcessors() - 1"
  },
  {
    "question": "What is the primary danger of running blocking network I/O inside a parallel stream?",
    "shortAnswer": "Blocking I/O will cause all worker threads in the shared ForkJoinPool.commonPool() to freeze waiting for responses, starving all other parallel streams and async tasks across the entire JVM application.",
    "explanation": "Use dedicated ThreadPoolExecutors or Java 21 Virtual Threads for blocking I/O.",
    "hint": "Starves the shared JVM-wide common pool.",
    "level": "Advanced",
    "codeExample": "// BAD: Blocks common pool threads!\\nlist.parallelStream().map(url -> httpGet(url));"
  }
];

export default topic2_questions;
