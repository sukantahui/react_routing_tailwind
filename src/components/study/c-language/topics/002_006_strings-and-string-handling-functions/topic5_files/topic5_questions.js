const questions = [
  {
    question: "How do you avoid copying strings repeatedly during sorting algorithms?",
    shortAnswer: "Store strings as an array of character pointers (char *arr[]) and swap the 8-byte pointer addresses instead of copying character buffers.",
    explanation: "Pointer swapping takes O(1) time and avoids calling strcpy(), speeding up string sorting by several orders of magnitude.",
    hint: "Swap pointer addresses.",
    level: "basic"
  }
];

export default questions;
