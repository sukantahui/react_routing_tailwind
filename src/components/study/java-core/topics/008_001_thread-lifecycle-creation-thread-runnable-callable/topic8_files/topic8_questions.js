const topic8_questions = [
  {
    "question": "Why is implementing 'java.lang.Runnable' preferred over extending 'java.lang.Thread' in Java?",
    "shortAnswer": "1. 'Preserves Class Inheritance': the domain class can still extend another base business class. 2. 'Separation of Concerns': cleanly decouples the business logic task ('Runnable') from the underlying execution mechanism ('Thread'). 3. 'Resource Sharing & Thread Pools': a single 'Runnable' task instance can be shared across multiple threads or submitted directly to an 'ExecutorService' thread pool for asynchronous worker execution.",
    "explanation": "Standard design pattern and OOP best practice in Java.",
    "hint": "Decouples task from thread, allows class inheritance, and enables ExecutorService thread pools.",
    "level": "Intermediate",
    "codeExample": "Thread t = new Thread(new MyRunnableTask(), \"Worker\"); t.start();"
  }
];

export default topic8_questions;