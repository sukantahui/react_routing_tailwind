const topic3_questions = [
  {
    "question": "Why does the 'Lapsed Listener Problem' cause memory leaks in Java GUI and event-driven architectures?",
    "shortAnswer": "Because the long-lived event publisher holds a strong reference to the listener callback in its subscriber collection. If the subscriber window or component closes without unregistering, the publisher keeps the entire subscriber object tree pinned in memory.",
    "explanation": "One of the most common causes of client-side and server-side memory leaks.",
    "hint": "Long-lived publisher holds strong references to short-lived subscribers.",
    "level": "Intermediate",
    "codeExample": "publisher.register(subscriber); // Must call publisher.unregister(subscriber)!"
  },
  {
    "question": "How can an event publisher be designed so that listeners are automatically garbage collected without manual unregistration?",
    "shortAnswer": "By storing subscriber callbacks in a WeakReference collection or using a WeakListener wrapper, allowing subscribers to be garbage collected when they lose other strong references.",
    "explanation": "Pioneered in UI frameworks like JavaFX and Swing.",
    "hint": "Use WeakReference listeners in the publisher.",
    "level": "Advanced",
    "codeExample": "List<WeakReference<Listener>> listeners = new ArrayList<>();"
  }
];

export default topic3_questions;
