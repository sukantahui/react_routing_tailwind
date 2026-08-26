const topic8_questions = [
  {
    question: "Why is 'java.time.Instant' considered the industry gold standard for storing timestamps in backend databases?",
    shortAnswer: "'Instant' represents an unambiguous, absolute single point on the global time-line measured in UTC epoch nanoseconds. It has zero timezone ambiguity, making database records ('createdAt', 'updatedAt') universally valid regardless of where client servers are located.",
    explanation: "Corresponds directly to UTC Unix Epoch timestamps in SQL TIMESTAMP WITH TIME ZONE columns.",
    hint: "Represents an absolute point on the UTC timeline without timezone ambiguity.",
    level: "Intermediate",
    codeExample: "Instant auditTimestamp = Instant.now();"
  }
];

export default topic8_questions;