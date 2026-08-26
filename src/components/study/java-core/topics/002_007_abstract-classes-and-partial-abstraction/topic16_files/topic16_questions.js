const topic16_questions = [
  {
    question: "How does the DataExporter pattern demonstrate the power of abstract classes over interfaces?",
    shortAnswer: "DataExporter encapsulates the file I/O writing mechanism and destination path state in the abstract base class ('exportToFile()'), while allowing subclasses to strictly focus on reading and formatting dialect-specific strings (JSON, CSV, XML).",
    explanation: "Interfaces cannot encapsulate instance state or provide private helper workflows as cleanly as abstract classes.",
    hint: "Encapsulates file destination state and execution pipeline in base class.",
    level: "Intermediate",
    codeExample: "// Complete DataExporter capstone in Topic 16"
  }
];

export default topic16_questions;