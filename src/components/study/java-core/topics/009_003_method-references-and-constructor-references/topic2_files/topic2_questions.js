const topic2_questions = [
  {
    "question": "Enumerate and classify the 4 kinds of Method References supported in Java.",
    "shortAnswer": "1. 'Static Method Reference': 'ClassName::staticMethodName' (e.g. 'Math::max'). 2. 'Bound Instance Method Reference': 'instanceRef::instanceMethodName' on a specific pre-existing object (e.g. 'System.out::println'). 3. 'Unbound Instance Method Reference': 'ClassName::instanceMethodName' where the first parameter of the SAM becomes the target receiver object (e.g. 'String::toUpperCase', 'Student::getMarks'). 4. 'Constructor Reference': 'ClassName::new' (e.g. 'ArrayList::new', 'String[]::new').",
    "explanation": "Complete taxonomy of the 4 method reference types in Java 8.",
    "hint": "1. Static (ClassName::staticMethod), 2. Bound (obj::method), 3. Unbound (ClassName::instanceMethod), 4. Constructor (Class::new).",
    "level": "Intermediate",
    "codeExample": "Math::max; System.out::println; String::toLowerCase; ArrayList::new;"
  }
];

export default topic2_questions;