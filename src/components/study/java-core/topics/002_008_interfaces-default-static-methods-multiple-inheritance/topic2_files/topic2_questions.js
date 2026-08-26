const topic2_questions = [
  {
    question: "Why MUST an overriding method in an implementing class be explicitly declared 'public'?",
    shortAnswer: "Because interface methods are implicitly 'public'. If the implementing class omits 'public', it receives default (package-private) access, which narrows the access privileges and triggers a compile-time error.",
    explanation: "'cannot assign weaker access privileges; was public' is a very common beginner compilation error in Java.",
    hint: "Interface methods are public; child cannot reduce access to default/package.",
    level: "Beginner",
    codeExample: "// Mandatory: public void methodName() { ... }"
  }
];

export default topic2_questions;