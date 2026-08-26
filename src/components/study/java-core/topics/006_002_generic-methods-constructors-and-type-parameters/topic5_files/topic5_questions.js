const topic5_questions = [
  {
    "question": "Can a non-generic class have a generic constructor, and what is its declaration syntax?",
    "shortAnswer": "YES. A non-generic class can define a generic constructor by declaring the type parameter '<T>' immediately before the constructor name: 'public <T> MyClass(T input)'. This allows the constructor to accept and process polymorphic arguments independently while the class itself remains non-generic.",
    "explanation": "Useful for converting heterogeneous inputs into standard internal representations.",
    "hint": "Yes; declared as 'public <T> ClassName(T arg)' immediately before the constructor name.",
    "level": "Intermediate",
    "codeExample": "public class Entry { public <T> Entry(T value) { ... } }"
  }
];

export default topic5_questions;