const topic2_questions = [
  {
    "question": "Why does a non-static Member Inner Class instance hold an implicit reference to its enclosing Outer class?",
    "shortAnswer": "Because it is conceptually part of an outer instance. When the Java compiler compiles a member inner class, it secretly injects a hidden final field 'this$0' pointing to the outer instance, enabling transparent access to outer private variables and methods.",
    "explanation": "This hidden reference can cause memory leaks if the inner class outlives the outer class in event listeners.",
    "hint": "The compiler injects a hidden 'this$0' reference to the outer instance.",
    "level": "Intermediate",
    "codeExample": "Outer outer = new Outer();\\nOuter.Inner inner = outer.new Inner();"
  }
];

export default topic2_questions;