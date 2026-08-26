const topic3_questions = [
  {
    "question": "What is the difference between Stream.of() and Arrays.stream() when passing an array of primitive ints?",
    "shortAnswer": "Arrays.stream(int[]) returns an optimized primitive IntStream, whereas Stream.of(int[]) treats the entire primitive array as a single object element producing a Stream<int[]> of size 1 instead of unpacking individual integers!",
    "explanation": "To create a Stream of individual integers from primitive int[], use Arrays.stream(int[]) or IntStream.of(int[]).",
    "hint": "Watch out for generics treating primitive arrays as single Object references in Stream.of()!",
    "level": "Intermediate",
    "codeExample": "int[] arr = {1, 2, 3};\\nIntStream s1 = Arrays.stream(arr); // 3 elements\\nStream<int[]> s2 = Stream.of(arr); // 1 element containing the array!"
  },
  {
    "question": "When should you use Stream.builder() instead of Stream.of()?",
    "shortAnswer": "Stream.builder() is ideal when elements are produced dynamically across multiple conditional branches or loops before the stream is finalized and built.",
    "explanation": "Stream.of() requires all elements to be known and present at invocation time as varargs.",
    "hint": "Use builder pattern when incrementally constructing a stream pipeline.",
    "level": "Beginner",
    "codeExample": "Stream.Builder<String> b = Stream.builder();\\nif (condition) b.add('Val1');\\nStream<String> s = b.build();"
  }
];

export default topic3_questions;
