const topic15_questions = [
  {
    "question": "What is the purpose of 'WatchKey.reset()' when monitoring folders with 'WatchService'?",
    "shortAnswer": "When an event occurs, the registered 'WatchKey' is transitioned into a 'signaled' state and no further events for that directory will be queued. Calling 'key.reset()' resets the key back to the 'ready' state, allowing the WatchService to resume queuing subsequent file events.",
    "explanation": "If key.reset() is omitted, the watcher stops receiving notifications after the first event.",
    "hint": "Resets the key from signaled state back to ready state so subsequent events can be captured.",
    "level": "Intermediate",
    "codeExample": "boolean valid = key.reset(); if (!valid) break; // Directory no longer accessible"
  }
];

export default topic15_questions;