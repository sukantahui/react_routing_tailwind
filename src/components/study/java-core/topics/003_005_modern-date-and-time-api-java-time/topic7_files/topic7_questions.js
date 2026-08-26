const topic7_questions = [
  {
    question: "What is the crucial difference between 'ZoneId' and 'ZoneOffset' in Java?",
    shortAnswer: "'ZoneOffset' represents a fixed, static numerical hour/minute difference from Greenwich UTC (e.g. '+05:30' or '-04:00'). 'ZoneId' represents a geographical region (e.g. 'America/New_York') that dynamically manages complex Daylight Saving Time (DST) transitions throughout the year.",
    explanation: "Never hardcode fixed offsets for regions observing Daylight Saving Time.",
    hint: "ZoneOffset is a fixed numeric shift; ZoneId is a geographical region with dynamic DST rules.",
    level: "Intermediate",
    codeExample: "ZoneId zone = ZoneId.of(\"Europe/London\"); // Handles GMT and BST automatically"
  }
];

export default topic7_questions;
