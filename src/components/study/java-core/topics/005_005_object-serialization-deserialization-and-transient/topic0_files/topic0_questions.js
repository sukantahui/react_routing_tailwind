const topic0_questions = [
  {
    "question": "What is 'Object Serialization' in Java and what are the standard 2-byte magic numbers that start every Java serialized byte stream?",
    "shortAnswer": "Object Serialization is the process of converting the in-memory state of a live Java object graph (including all its fields and nested references) into an ordered sequence of binary bytes for disk persistence or network transmission. Every Java serialized stream begins with the 2-byte magic header 0xACED ('STREAM_MAGIC') followed by version 0x0005 ('STREAM_VERSION').",
    "explanation": "Allows serialized objects to be reconstructed in a completely different JVM instance.",
    "hint": "Converts object graph to bytes; starts with 0xACED magic header bytes.",
    "level": "Beginner",
    "codeExample": "oos.writeObject(myObject); // Serializes object graph into byte stream"
  }
];

export default topic0_questions;