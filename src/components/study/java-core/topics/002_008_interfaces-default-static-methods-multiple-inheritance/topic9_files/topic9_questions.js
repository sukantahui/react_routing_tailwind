const topic9_questions = [
  {
    question: "How are 'static' methods in an interface invoked in Java, and are they inherited by implementing classes?",
    shortAnswer: "Static interface methods must be invoked strictly using the interface name: 'InterfaceName.staticMethodName()'. They are NOT inherited by implementing classes or instances.",
    explanation: "Eliminates the need for separate companion utility classes (e.g. Collections vs Collection).",
    hint: "Invoked only via InterfaceName.staticMethod(); NOT inherited by implementing classes.",
    level: "Intermediate",
    codeExample: "boolean ok = FeeValidator.isValidAdmissionFee(15000);"
  }
];

export default topic9_questions;