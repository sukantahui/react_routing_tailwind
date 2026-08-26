const topic8_questions = [
  {
    "question": "When is Serial GC (-XX:+UseSerialGC) the recommended collector choice in modern architectures?",
    "shortAnswer": "In single-CPU cloud containers, small serverless functions (AWS Lambda with 128MB–256MB RAM), CLI utilities, and embedded IoT devices where multi-threaded GC overhead wastes memory and CPU.",
    "explanation": "Eliminates multi-threaded coordination overhead on single-core environments.",
    "hint": "Single-core containers, serverless functions, and small CLI tools.",
    "level": "Beginner",
    "codeExample": "java -XX:+UseSerialGC -Xmx128m -jar lambda-app.jar"
  },
  {
    "question": "What algorithm does Serial GC use for Young Generation and Old Generation collections?",
    "shortAnswer": "It uses a single-threaded Copying algorithm for Young Gen (Eden/Survivors) and a single-threaded Mark-Sweep-Compact algorithm for the Old Generation.",
    "explanation": "Standard single-threaded generational collection.",
    "hint": "Copying for Young Gen; Mark-Sweep-Compact for Old Gen.",
    "level": "Intermediate",
    "codeExample": "Young: Copying; Old: Mark-Sweep-Compact"
  }
];

export default topic8_questions;
