const topic17_questions = [
  {
    "question": "Why do 'byte[]' and 'java.lang.String' almost always have the highest Shallow Heap in a memory dump histogram, even when they are not the root cause of a leak?",
    "shortAnswer": "Because Strings and byte arrays are the primary data payload containers used by business objects, JSON payloads, and network buffers. The root cause is the collection or service object retaining references to those strings/arrays (which shows high Retained Heap).",
    "explanation": "byte[] is the victim payload; the holding collection is the criminal.",
    "hint": "They are payload containers; the container object has high Retained Heap.",
    "level": "Intermediate",
    "codeExample": "Shallow: byte[] = 80%; Retained: StudentCache = 80%"
  },
  {
    "question": "What is the difference between Retained Heap and Deep Heap?",
    "shortAnswer": "Deep Heap is the sum of sizes of all objects reachable from an object (regardless of whether others reference them), whereas Retained Heap includes ONLY objects that are exclusively reachable from this object and will be freed if it is garbage collected.",
    "explanation": "Retained Heap accurately reflects reclaimable memory.",
    "hint": "Retained Heap counts only exclusively reachable objects that will be freed upon collection.",
    "level": "Advanced",
    "codeExample": "Retained Heap = Exclusively dominated objects."
  }
];

export default topic17_questions;
