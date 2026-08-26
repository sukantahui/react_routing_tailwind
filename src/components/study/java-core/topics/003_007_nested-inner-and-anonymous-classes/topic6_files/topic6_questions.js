const topic6_questions = [
  {
    "question": "Why is the Builder Pattern implemented using a 'public static class Builder' rather than a non-static inner class?",
    "shortAnswer": "Because the Builder must be instantiated BEFORE the target outer object exists (e.g. 'new Student.Builder()'). A non-static inner class would require an existing outer object first, defeating the purpose of a constructor helper.",
    "explanation": "Static nested classes are also used for Map.Entry and LinkedList.Node.",
    "hint": "The builder constructs the outer object, so it cannot depend on an outer instance existing first.",
    "level": "Intermediate",
    "codeExample": "Student s = new Student.Builder().setName(\"Swadeep\").build();"
  }
];

export default topic6_questions;