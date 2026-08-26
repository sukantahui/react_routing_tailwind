const topic10_questions = [
  {
    "question": "Why is the Decorator pattern superior to subclass inheritance when adding multiple optional features to an object?",
    "shortAnswer": "Because subclass inheritance leads to a combinatorial explosion of subclasses (e.g. BufferedStream, EncryptedStream, CompressedStream, BufferedAndEncryptedStream, etc.), whereas the Decorator pattern allows wrapping any combination of features dynamically at runtime.",
    "explanation": "Avoids class explosion through dynamic wrapping.",
    "hint": "Prevents a combinatorial explosion of subclasses.",
    "level": "Intermediate",
    "codeExample": "new EncryptionDecorator(new CompressionDecorator(new BaseStream()));"
  },
  {
    "question": "What is the key structural requirement for a Decorator class?",
    "shortAnswer": "It must implement the same interface as the target component and hold a reference to an instance of that component interface.",
    "explanation": "Preserves transparent substitutability.",
    "hint": "Implements the component interface and wraps a component reference.",
    "level": "Beginner",
    "codeExample": "public abstract class Decorator implements Component { protected Component target; }"
  }
];

export default topic10_questions;
