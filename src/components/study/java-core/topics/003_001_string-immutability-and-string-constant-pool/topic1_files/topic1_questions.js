const topic1_questions = [
  {
    question: "What is the memory difference between 'String s = \"Java\";' and 'String s = new String(\"Java\");'?",
    shortAnswer: "'String s = \"Java\";' places the string literal in the String Constant Pool (SCP) and reuses it across multiple references. 'String s = new String(\"Java\");' forces the creation of a brand-new object on the general Heap, wasting memory.",
    explanation: "Always use string literals unless you specifically need distinct heap instances.",
    hint: "Literal uses/reuses SCP; 'new String()' creates an extra object in the regular Heap.",
    level: "Beginner",
    codeExample: "String s1 = \"Java\"; // SCP pool\nString s2 = new String(\"Java\"); // Heap instance"
  }
];

export default topic1_questions;
