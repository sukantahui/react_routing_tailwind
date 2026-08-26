const topic1_questions = [
  {
    question: "Where must the 'package' statement be placed in a Java source file?",
    shortAnswer: "The 'package' statement MUST be the very first non-comment statement in the Java source file, preceding all 'import' statements and class/interface declarations.",
    explanation: "Placing any code or import before the package statement results in a compilation error.",
    hint: "Must be the first non-comment statement in the file.",
    level: "Beginner",
    codeExample: "package com.company.app;\nimport java.util.*;"
  }
];

export default topic1_questions;