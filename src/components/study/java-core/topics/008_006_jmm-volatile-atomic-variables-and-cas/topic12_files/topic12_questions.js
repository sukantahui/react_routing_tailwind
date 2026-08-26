const topic12_questions = [
  {
    "question": "What is 'AtomicReference<V>' in Java and how does it enable lock-free state machines?",
    "shortAnswer": "'AtomicReference<V>' encapsulates an object reference and provides atomic, lock-free operations using hardware CAS. It allows threads to atomically update an entire immutable domain state object (e.g. replacing an old configuration or user profile with a new instance) via 'compareAndSet(expectedReference, newReference)'. If another thread updated the reference first, CAS fails and the caller can re-read the latest state and retry, enabling lock-free concurrent data structures (like Treiber Stacks and Michael-Scott Queues).",
    "explanation": "Core advanced atomic wrapper in java.util.concurrent.atomic.",
    "hint": "Wraps object references for atomic CAS swaps; powers lock-free data structures.",
    "level": "Intermediate",
    "codeExample": "AtomicReference<User> userRef = new AtomicReference<>(user); userRef.compareAndSet(oldUser, newUser);"
  }
];

export default topic12_questions;