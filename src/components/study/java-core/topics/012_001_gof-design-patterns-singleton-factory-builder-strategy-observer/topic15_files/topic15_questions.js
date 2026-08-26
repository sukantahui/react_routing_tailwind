const topic15_questions = [
  {
    "question": "What is the primary architectural advantage of the Observer pattern?",
    "shortAnswer": "It establishes loose coupling between the subject (publisher) and observers (subscribers); the subject only knows that observers implement the notification interface, allowing new subscribers to be added or removed dynamically without modifying the subject.",
    "explanation": "Enables highly extensible event-driven systems.",
    "hint": "Subject and observers are loosely coupled via interfaces.",
    "level": "Beginner",
    "codeExample": "subject.subscribe(event -> handle(event));"
  },
  {
    "question": "What is the 'Memory Leak' hazard associated with the Observer pattern in Java?",
    "shortAnswer": "The 'Lapsed Listener' problem: if subscribers register with a long-lived subject but forget to unsubscribe when done, the subject's listener collection holds strong references to them, preventing garbage collection and causing memory leaks.",
    "explanation": "Can be mitigated using WeakReferences or explicit unregister lifecycles.",
    "hint": "Subscribers not unsubscribed remain strongly referenced by the subject.",
    "level": "Intermediate",
    "codeExample": "Always call subject.unsubscribe(listener) when tearing down."
  }
];

export default topic15_questions;
