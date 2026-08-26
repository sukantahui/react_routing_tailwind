const topic14_questions = [
  {
    "question": "When should you use flatMap() instead of map()?",
    "shortAnswer": "Use flatMap() when the mapping function returns a Stream, Collection, or Optional for each input element and you want to flatten the resulting nested structures into a single continuous stream rather than a stream of streams/collections.",
    "explanation": "map() would yield Stream<Stream<T>> or Stream<List<T>>; flatMap() yields a flat Stream<T>.",
    "hint": "Use flatMap whenever mapping returns a stream or collection to avoid nested streams.",
    "level": "Intermediate",
    "codeExample": "List<Order> orders;\\n// Flatten orders to items:\\norders.stream().flatMap(o -> o.getItems().stream()).toList();"
  },
  {
    "question": "What happens if the function in flatMap() returns an empty stream for a particular element?",
    "shortAnswer": "The empty stream contributes zero elements to the flattened stream. The element is effectively removed/filtered out cleanly without throwing any error.",
    "explanation": "This makes flatMap(Stream::ofNullable) a clean pattern for simultaneous mapping and null-filtering.",
    "hint": "Empty streams contribute 0 elements and disappear during flattening.",
    "level": "Intermediate",
    "codeExample": "stream.flatMap(x -> x.isValid() ? Stream.of(x.data()) : Stream.empty())"
  }
];

export default topic14_questions;
