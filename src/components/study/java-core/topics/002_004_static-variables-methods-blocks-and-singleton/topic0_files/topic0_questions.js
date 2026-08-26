const topic0_questions = [
  {
    question: "What does the 'static' keyword signify in Java?",
    shortAnswer: "'static' binds a member (variable, method, block, or nested class) directly to the Class itself in Metaspace, rather than to individual object instances on the Heap.",
    explanation: "Static members exist as a single shared entity per ClassLoader, accessible without creating any object instance.",
    hint: "Binds member to the Class in Metaspace, not individual Heap objects.",
    level: "Beginner",
    codeExample: "public class Config { public static String HUB = \"Barrackpore\"; }"
  }
];

export default topic0_questions;