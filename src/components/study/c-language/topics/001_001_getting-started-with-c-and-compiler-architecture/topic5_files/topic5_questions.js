const questions = [
  {
    question: "How do you validate user inputs in CLI C applications?",
    shortAnswer: "Check the return value of scanf against expected match count.",
    explanation: "If scanf fails to match expected specifiers, return code is less than requested match count.",
    hint: "if (scanf(...) != expected_matches) handle error",
    level: "intermediate"
  }
];

export default questions;
