const topic2_questions = [
  {
    "question": "Where is the array object created by 'int[] arr = new int[500];' allocated in memory?",
    "shortAnswer": "The array object itself is allocated on the JVM Heap Area. The reference variable 'arr' is stored in the Local Variable Table on the current Thread Stack.",
    "explanation": "All arrays in Java are objects and live on the Heap.",
    "hint": "The array object is on the Heap; the reference variable is on the Stack.",
    "level": "Beginner",
    "codeExample": "int[] arr = new int[500]; // Array object on Heap, arr on Stack"
  },
  {
    "question": "Why is it an enterprise best practice to set -Xms equal to -Xmx on production servers?",
    "shortAnswer": "To eliminate GC pauses and OS memory allocation overhead caused by dynamic heap resizing during application traffic spikes.",
    "explanation": "Allocates the complete heap memory footprint upfront at startup.",
    "hint": "Eliminates runtime heap expansion and contraction pauses.",
    "level": "Intermediate",
    "codeExample": "java -Xms4g -Xmx4g -jar production-app.jar"
  }
];

export default topic2_questions;
