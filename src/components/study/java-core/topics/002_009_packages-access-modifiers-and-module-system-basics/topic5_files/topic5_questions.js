const topic5_questions = [
  {
    question: "How do you resolve a naming conflict when you need to use two classes with the same simple name (e.g. 'java.util.Date' and 'java.sql.Date') in the same Java file?",
    shortAnswer: "Import one of the classes (or neither) and refer to the other class using its Fully Qualified Class Name (FQCN), such as 'java.sql.Date sqlDate = new java.sql.Date(...);'.",
    explanation: "This eliminates all compiler ambiguity.",
    hint: "Use Fully Qualified Class Name (FQCN) for the conflicting type.",
    level: "Beginner",
    codeExample: "Date d1 = new Date();\njava.sql.Date d2 = new java.sql.Date(ms);"
  }
];

export default topic5_questions;