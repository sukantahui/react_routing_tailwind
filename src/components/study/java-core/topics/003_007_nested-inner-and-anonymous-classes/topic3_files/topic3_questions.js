const topic3_questions = [
  {
    "question": "What is the exact Java syntax to instantiate a non-static member inner class named 'Inner' of class 'Outer' from a static method?",
    "shortAnswer": "You must first create an instance of 'Outer' and then invoke '.new Inner()' on that instance reference: 'Outer outer = new Outer(); Outer.Inner inner = outer.new Inner();' (or shorthand: 'Outer.Inner inner = new Outer().new Inner();').",
    "explanation": "Attempting 'new Outer.Inner()' will cause a compilation error for non-static classes.",
    "hint": "Use 'outerInstance.new InnerClass()'.",
    "level": "Beginner",
    "codeExample": "Outer.Inner inner = new Outer().new Inner();"
  }
];

export default topic3_questions;