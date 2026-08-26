const topic2_questions = [
  {
    "question": "Can a Java Record explicitly extend another class (e.g. record Point(int x) extends Shape)?",
    "shortAnswer": "No! All records implicitly extend java.lang.Record. Because Java does not support multiple class inheritance, a record cannot declare an extends clause.",
    "explanation": "However, records CAN implement any number of interfaces.",
    "hint": "Cannot extend classes (already extends java.lang.Record), but can implement interfaces.",
    "level": "Intermediate",
    "codeExample": "// VALID: record Student(int id) implements Serializable, Comparable<Student> {}"
  },
  {
    "question": "What is the return type of clazz.getRecordComponents()?",
    "shortAnswer": "java.lang.reflect.RecordComponent[], an array containing introspection metadata for each component defined in the record header.",
    "explanation": "Added in Java 16 for reflection and serialization frameworks.",
    "hint": "RecordComponent[]",
    "level": "Intermediate",
    "codeExample": "RecordComponent[] comps = Point.class.getRecordComponents();"
  }
];

export default topic2_questions;
