const topic6_questions = [
  {
    "question": "How does Java 21 achieve non-blocking scalability when a Virtual Thread executes a traditional blocking I/O call (like 'socket.read()' or 'Thread.sleep()')?",
    "shortAnswer": "The entire standard JDK I/O library was rewritten under Project Loom. When a Virtual Thread calls a blocking method (like 'socket.read()'), the JDK intercepts the call, registers the underlying file descriptor with the OS kernel's non-blocking poller ('epoll' on Linux, 'kqueue' on macOS, 'IOCP' on Windows), and yields the virtual thread's Continuation. The Virtual Thread unmounts from its OS Carrier Thread immediately. When the OS signals that network data has arrived, the JVM re-mounts the virtual thread onto any available Carrier Thread to continue execution seamlessly.",
    "explanation": "Core non-blocking I/O kernel demultiplexer integration in Project Loom.",
    "hint": "JDK registers the socket with epoll/kqueue, unmounts the virtual thread, and re-mounts it on any available carrier thread when data arrives.",
    "level": "Advanced",
    "codeExample": "// Synchronous looking code: socket.read(); // Automatically unmounts under the hood!"
  }
];

export default topic6_questions;