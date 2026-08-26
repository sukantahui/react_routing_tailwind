const topic11_questions = [
  {
    "question": "When should developers use 'Files.readAllBytes(path)' instead of 'Files.readString(path)'?",
    "shortAnswer": "'Files.readAllBytes(path)' is designed specifically for non-text binary files (such as PNG/JPEG images, audio/video clips, compiled .class bytecode files, ZIP archives, and encrypted cryptographic tokens) where character encoding/decoding should NEVER be applied.",
    "explanation": "Attempting to read binary files with readString will corrupt binary bytes due to charset translation.",
    "hint": "Use readAllBytes for binary files (images, audio, PDFs, archives) where charsets do not apply.",
    "level": "Beginner",
    "codeExample": "byte[] pngBytes = Files.readAllBytes(Path.of(\"logo.png\"));"
  }
];

export default topic11_questions;