const topic9_questions = [
  {
    question: "What is the subtle restriction when accessing a 'protected' member from a subclass located in a different package?",
    shortAnswer: "The foreign-package subclass can access the protected member ONLY through its own inherited reference ('this.field' or 'super.field'). It CANNOT access it through an explicit instance of the parent class ('Parent p = new Parent(); p.protectedField').",
    explanation: "This prevents foreign subclasses from tampering with instances of other sibling classes.",
    hint: "Accessible only via inheritance (this/super), not via parent object references.",
    level: "Advanced",
    codeExample: "// Valid: this.protectedMember; Invalid: parentObj.protectedMember;"
  }
];

export default topic9_questions;