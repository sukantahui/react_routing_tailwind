const topic4_questions = [
  {
    "question": "How does the JVM handle circular references (e.g. Object A references B, and B references A) during object graph serialization?",
    "shortAnswer": "The JVM's ObjectOutputStream maintains an internal 'Handle Table' (registry of previously serialized object memory addresses). When it encounters an object reference that has already been written to the stream, it does NOT re-serialize the object (preventing infinite recursion loops); instead, it writes a compact numeric back-reference handle (e.g. 0x710001).",
    "explanation": "Ensures cyclic graphs are flattened safely and restores identical object identity on deserialization.",
    "hint": "Uses an internal handle table to write compact back-references, preventing infinite recursion.",
    "level": "Intermediate",
    "codeExample": "oos.writeObject(nodeA); // Handles cyclic nodeA.next = nodeB and nodeB.next = nodeA"
  }
];

export default topic4_questions;