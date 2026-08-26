const topic1_questions = [
  {
    "question": "What are the 4 distinct categories of nested classes available in Java?",
    "shortAnswer": "1. Non-Static Member Inner Class (declared at class level, holds outer 'this' reference). 2. Static Nested Class (declared at class level with 'static', no outer reference). 3. Method-Local Inner Class (declared inside a method body). 4. Anonymous Inner Class (unnamed inline class instantiation).",
    "explanation": "Technically, non-static nested classes are called 'Inner Classes'.",
    "hint": "Member Inner, Static Nested, Method-Local, and Anonymous Inner classes.",
    "level": "Beginner",
    "codeExample": "class Outer { class Inner {} static class StaticN {} void m() { class Local {} } }"
  }
];

export default topic1_questions;