const topic3_questions = [
  {
    "question": "What happens if primitives and objects are read from 'ObjectInputStream' in a different order than they were written to 'ObjectOutputStream'?",
    "shortAnswer": "The deserialization process fails immediately, throwing 'java.io.StreamCorruptedException', 'java.io.OptionalDataException', or 'java.lang.ClassCastException'. The binary stream is sequential; attempting to read an Object when the stream cursor is positioned over a primitive int will corrupt stream pointer deserialization.",
    "explanation": "Strict FIFO sequence must be preserved when reading mixed primitive/object streams.",
    "hint": "Throws StreamCorruptedException or ClassCastException; items must be read in exact FIFO order.",
    "level": "Intermediate",
    "codeExample": "oos.writeInt(1); oos.writeObject(obj); -> ois.readInt(); (MyObj) ois.readObject();"
  }
];

export default topic3_questions;