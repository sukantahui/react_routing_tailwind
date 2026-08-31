const topic11_questions = [
  {
    question: "What is the exact execution sequence when a subclass object is instantiated in Java?",
    shortAnswer: "1. Parent IIBs & field initializers, 2. Parent constructor body, 3. Child IIBs & field initializers, 4. Child constructor body.",
    explanation: "Parent state is established first from top-to-bottom, followed by child state.",
    hint: "Parent IIB → Parent Constructor → Child IIB → Child Constructor.",
    level: "Intermediate",
    codeExample: "// Hierarchy execution flow"
  },
  {
    question: "Why does the Java compiler place IIB execution before the constructor body?",
    shortAnswer: "To guarantee that all default field values and initializers are in place before custom constructor statements execute.",
    explanation: "If the constructor body references fields initialized by IIBs, those fields must be populated beforehand.",
    hint: "Ensures fields are populated before custom constructor logic runs.",
    level: "Intermediate",
    codeExample: "{ this.status = \"ACTIVE\"; }\nStudent() { System.out.println(this.status); }"
  },
  {
    question: "In what order do field initializers and IIBs execute within the same class?",
    shortAnswer: "In the exact top-to-bottom textual order in which they appear in the source code.",
    explanation: "Field initializers and IIBs are treated identically by javac during bytecode assembly.",
    hint: "Exact top-to-bottom source code order.",
    level: "Intermediate",
    codeExample: "int a = 1;\n{ a = 2; }\nint b = a + 5; // b is 7"
  },
  {
    question: "What happens if an IIB throws a RuntimeException?",
    shortAnswer: "The exception aborts constructor execution immediately, the parent/child hierarchy unwinds, and the object is discarded.",
    explanation: "Partially created objects are never returned to the caller.",
    hint: "Aborts creation immediately and discards object.",
    level: "Beginner",
    codeExample: "{ if (true) throw new RuntimeException(\"Failed\"); }"
  },
  {
    question: "Can an IIB call methods of the parent class?",
    shortAnswer: "Yes, because the parent class constructor and parent state have already completed before the child IIB executes.",
    explanation: "Parent methods are safely callable from child IIBs.",
    hint: "Parent methods are accessible because parent is already initialized.",
    level: "Advanced",
    codeExample: "{ super.validateSecurity(); }"
  },
  {
    question: "What is the classroom takeaway by Sukanta Hui for Topic 11?",
    shortAnswer: "Building a house: You lay the ground floor (Parent IIB + Constructor) before you install the upper floor wiring (Child IIB) and arrange the furniture (Child Constructor Body)!",
    explanation: "Foundation and parent infrastructure always precede child customization.",
    hint: "Ground floor before upper floor furniture.",
    level: "Beginner",
    codeExample: "// Orderly construction from ground floor upward"
  }
];

export default topic11_questions;