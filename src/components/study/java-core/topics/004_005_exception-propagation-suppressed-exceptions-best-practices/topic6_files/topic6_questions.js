const topic6_questions = [
  {
    "question": "Why is 'Log and Throw' (logging an exception in a catch block and then immediately rethrowing it) considered a severe anti-pattern?",
    "shortAnswer": "Because if every method layer in a call stack logs and rethrows the exception, a single failure produces duplicate 50-line stack traces in log files at every layer (DAO, Service, Controller). This floods log storage, clutters debugging, and triggers duplicate alert storms in monitoring systems like Splunk or Datadog.",
    "explanation": "The golden rule is: 'Handle or Propagate, Never Both'.",
    "hint": "Causes duplicate log spam across multiple layers and triggers false monitoring alerts.",
    "level": "Intermediate",
    "codeExample": "// BAD: catch(Ex e) { log.error(e); throw e; } // Logged multiple times!"
  }
];

export default topic6_questions;