const topic6_questions = [
  {
    question: "Why can't classes in a named package import a class from the default (unnamed) package?",
    shortAnswer: "Java syntax does not support importing from an unnamed package ('import ClassName' is invalid syntax). Therefore, classes placed in the default package are invisible and inaccessible to all packaged code.",
    explanation: "Production Java applications must always declare explicit package names.",
    hint: "Cannot import classes from the default package into packaged code.",
    level: "Intermediate",
    codeExample: "// Always declare: package com.company.app;"
  }
];

export default topic6_questions;