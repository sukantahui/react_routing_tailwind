const topic15_questions = [
  {
    question: "What class acts as the bridge when converting between legacy 'java.util.Date' and modern 'java.time' classes?",
    shortAnswer: "'java.time.Instant'. In Java 8, 'legacyDate.toInstant()' was added to convert legacy Date to Instant, and 'Date.from(instant)' was added to convert Instant back to legacy Date.",
    explanation: "Essential when working with legacy ORM libraries and legacy SDKs.",
    hint: "java.time.Instant acts as the bridge via toInstant() and Date.from().",
    level: "Intermediate",
    codeExample: "Instant inst = legacyDate.toInstant();\nDate oldDate = Date.from(inst);"
  }
];

export default topic15_questions;