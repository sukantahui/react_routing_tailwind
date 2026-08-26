const topic1_questions = [
  {
    "question": "Why is the internal backing array 'transient Object[] elementData' in java.util.ArrayList marked as 'transient'?",
    "shortAnswer": "If 'elementData' were serialized using default Java serialization, all trailing empty buffer slots (e.g. 90 empty null entries in an array of capacity 100 with size 10) would be written to the byte stream, wasting bandwidth and storage. Marking it 'transient' allows ArrayList to provide custom 'writeObject()' and 'readObject()' methods that serialize ONLY the actual active elements ('size').",
    "explanation": "A classic high-performance serialization optimization in the JDK core library.",
    "hint": "Prevents serializing empty unused buffer slots, saving network bandwidth and disk space.",
    "level": "Advanced",
    "codeExample": "transient Object[] elementData; // Custom writeObject serializes only active size"
  }
];

export default topic1_questions;