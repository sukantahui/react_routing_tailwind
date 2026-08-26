const topic2_questions = [
  {
    "question": "Why do Virtual Threads render Reactive Programming frameworks (like Spring WebFlux and RxJava) largely redundant for high-throughput I/O services?",
    "shortAnswer": "Reactive programming was developed solely to bypass OS thread limits by chopping code into asynchronous non-blocking event loops (Mono/Flux), which came at the immense cost of unreadable code, fragmented stack traces, impossible debugging, and incompatibility with standard Java libraries. Virtual Threads deliver the exact same non-blocking hardware throughput while allowing developers to write simple, sequential, readable, and debuggable synchronous Java code with standard 'try-catch' blocks and IDE debuggers.",
    "explanation": "Industry paradigm shift comparison between reactive streams and Virtual Threads.",
    "hint": "Virtual Threads provide the high throughput of reactive frameworks with the simplicity of standard synchronous Java code.",
    "level": "Intermediate",
    "codeExample": "// Virtual Thread: User user = fetchUser(); // Simple synchronous code with reactive scale!"
  }
];

export default topic2_questions;