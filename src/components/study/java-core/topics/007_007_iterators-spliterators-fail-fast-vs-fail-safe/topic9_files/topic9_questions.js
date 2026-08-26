const topic9_questions = [
  {
    "question": "What is 'java.util.Spliterator' and why was it introduced in Java 8 alongside the Streams API?",
    "shortAnswer": "'Spliterator' (short for 'Splittable Iterator') is an interface introduced in Java 8 to traverse and partition sequences of elements. Unlike standard sequential iterators, Spliterators are designed specifically for parallel execution: they can recursively split off a portion of their elements into a new independent Spliterator via 'trySplit()', allowing ForkJoinPool worker threads to process chunks concurrently without locking.",
    "explanation": "Core parallel engine powering Java 8 Streams.",
    "hint": "Splittable Iterator; designed for parallel streams to divide data into chunks via trySplit().",
    "level": "Intermediate",
    "codeExample": "Spliterator<T> split = list.spliterator(); Spliterator<T> prefix = split.trySplit();"
  }
];

export default topic9_questions;