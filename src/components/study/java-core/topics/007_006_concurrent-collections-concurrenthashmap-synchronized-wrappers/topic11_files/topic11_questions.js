const topic11_questions = [
  {
    "question": "How is 'CopyOnWriteArraySet' implemented internally, and what is its primary use case?",
    "shortAnswer": "'CopyOnWriteArraySet' is backed internally by an instance of 'CopyOnWriteArrayList'. When an element is added, it calls 'addIfAbsent(e)' on the backing list to enforce Set uniqueness. Reads and iterations access an immutable array snapshot without locking. It is designed for small, read-heavy sets where modifications are rare but thread-safe iterations are frequent (such as event listener registries and security permission sets).",
    "explanation": "Core thread-safe set implementation in java.util.concurrent.",
    "hint": "Backed by CopyOnWriteArrayList using addIfAbsent; ideal for read-heavy listener registries.",
    "level": "Intermediate",
    "codeExample": "Set<Listener> listeners = new CopyOnWriteArraySet<>(); // Thread-safe observer registry"
  }
];

export default topic11_questions;