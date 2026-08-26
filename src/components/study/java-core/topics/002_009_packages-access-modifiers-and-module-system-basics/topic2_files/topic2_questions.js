const topic2_questions = [
  {
    question: "Why does standard Java convention recommend using Reverse Domain Names (e.g. 'com.company.project') for packages?",
    shortAnswer: "Because internet domain names are globally unique, reversing the domain name (e.g. 'com.google', 'org.apache', 'com.coderaccotax') guarantees that your package names will never clash with packages developed by other organizations worldwide.",
    explanation: "All package names should be written in lowercase to avoid conflicts with class names.",
    hint: "Guarantees global uniqueness across all software organizations worldwide.",
    level: "Beginner",
    codeExample: "package com.coderaccotax.javatutorial;"
  }
];

export default topic2_questions;