// src/components/study/python/topics/003_003_decorators-generators/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Creating custom iterator classes

const questions = [
  {
    question: "What 2 dunder methods must a custom Iterator class implement in Python?",
    shortAnswer: "1. '__iter__(self)': returning 'self'. 2. '__next__(self)': returning the next computed/retrieved item or raising 'StopIteration'.",
    explanation: "Fulfills the formal Python Iterator protocol interface.",
    hint: "Must implement __iter__() returning self, and __next__() returning items.",
    level: "basic",
    codeExample: "class MyIter:\n    def __iter__(self): return self\n    def __next__(self): ..."
  },
  {
    question: "Why does standard Python 'range()' not support floating-point steps (e.g. range(1.0, 3.0, 0.5))?",
    shortAnswer: "Because 'range()' is optimized purely for exact integer indexing; floating-point numbers suffer from IEEE-754 binary precision drift (e.g. 0.1 + 0.2 != 0.3), so custom float ranges require explicit rounding.",
    explanation: "A custom FloatRange class solves this limitation.",
    hint: "Standard range() only accepts integers due to float precision drift.",
    level: "basic",
    codeExample: "# TypeError: 'float' object cannot be interpreted as an integer"
  },
  {
    question: "How do you prevent floating-point precision drift in a custom 'FloatRange' iterator?",
    shortAnswer: "By rounding the internal accumulator on each step: 'self._current = round(self._current + self.step, 10)'.",
    explanation: "Eliminates cumulative floating-point rounding errors.",
    hint: "Use round(self._current + self.step, 10) on each increment.",
    level: "moderate",
    codeExample: "self._current = round(self._current + self.step, 10)"
  },
  {
    question: "How does a 'SlidingWindowIterator' work?",
    shortAnswer: "It maintains a cursor over a sequence and yields overlapping sub-tuples of length 'window_size' (e.g. [1,2,3,4] with size 3 yields (1,2,3) then (2,3,4)) until the sequence end.",
    explanation: "Crucial for calculating moving averages in time-series data.",
    hint: "Yields overlapping slices of fixed length as cursor advances.",
    level: "moderate",
    codeExample: "window = tuple(self.data[self.cursor : self.cursor + self.size])"
  },
  {
    question: "How does a 'CircularIterator' wrap around a sequence for round-robin scheduling?",
    shortAnswer: "By using the modulo operator to compute the next element index: 'self._index = (self._index + 1) % len(self._data)'.",
    explanation: "Implements round-robin load balancing and scheduling algorithms.",
    hint: "Uses (index + 1) % len(data) to wrap index back to 0.",
    level: "basic",
    codeExample: "self.index = (self.index + 1) % len(self.data)"
  },
  {
    question: "What is a 'Lazy Database Paginator Iterator'?",
    shortAnswer: "An iterator that fetches records from a database page-by-page (e.g. 50 rows per SQL query) only when its internal buffer is consumed, preventing loading millions of rows into memory at once.",
    explanation: "Eliminates Out-Of-Memory crashes in large-scale backend systems.",
    hint: "Fetches SQL pages on demand only when the local buffer is emptied.",
    level: "complex",
    codeExample: "if self.buffer_idx >= len(self.buffer): self.fetch_next_page()"
  },
  {
    question: "When should you write a full Custom Iterator Class instead of a simple Generator function?",
    shortAnswer: "When you need to attach custom state introspection methods (e.g. 'reset()', 'stats()', 'seek()'), support serializable object state, or manage complex multi-cursor collection architectures.",
    explanation: "Generator functions are simpler; Iterator classes offer richer OOP control.",
    hint: "When you need custom helper methods, state introspection, or complex OOP design.",
    level: "moderate",
    codeExample: "# Iterator class: class MyIter: def seek(self, pos): ..."
  },
  {
    question: "How does 'StopIteration' propagate when nesting custom iterators?",
    shortAnswer: "When an inner iterator raises 'StopIteration', the outer iterator's '__next__()' can catch it to switch streams or re-raise 'StopIteration' to signal total pipeline completion.",
    explanation: "Foundation of chained stream iterators.",
    hint: "Catch StopIteration from inner iterators to advance to the next stream.",
    level: "moderate",
    codeExample: "try: return next(self.inner)\nexcept StopIteration: self.next_stream()"
  },
  {
    question: "How do you make a custom collection class both an Iterable and support 'len()' and 'in' checks?",
    shortAnswer: "By implementing '__iter__()' for iteration, '__len__()' for 'len(obj)', and '__contains__()' for 'item in obj'.",
    explanation: "Full Python Collection protocol implementation.",
    hint: "Implement __iter__(), __len__(), and __contains__().",
    level: "basic",
    codeExample: "def __len__(self): return len(self.items)"
  },
  {
    question: "Can an iterator class accept negative step values (e.g. counting down from 10 to 0)?",
    shortAnswer: "Yes, by checking if 'step < 0' and terminating when 'self._current <= self._stop' instead of '>='.",
    explanation: "Supports bidirectional range stepping.",
    hint: "Check step sign and adjust termination condition accordingly.",
    level: "moderate",
    codeExample: "if self.step < 0 and self.current <= self.stop: raise StopIteration"
  },
  {
    question: "What happens if a custom iterator class raises 'StopIteration' with a message: 'raise StopIteration(\"Done\")'?",
    shortAnswer: "The message is stored in the exception's 'args' attribute, which can be inspected if caught manually; 'for' loops discard the message and cleanly break.",
    explanation: "Standard exception metadata storage.",
    hint: "Message is stored in exc.args; for loops discard it and break cleanly.",
    level: "basic",
    codeExample: "raise StopIteration('Completed 100 items')"
  },
  {
    question: "How do you implement a 'Reverse Iterator' in a custom class?",
    shortAnswer: "By implementing the '__reversed__()' dunder method, which returns an iterator that traverses the collection backwards from the last element to the first.",
    explanation: "Triggered automatically when calling 'reversed(my_collection)'.",
    hint: "Implement the __reversed__() dunder method.",
    level: "moderate",
    codeExample: "def __reversed__(self): return ReverseIterator(self)"
  },
  {
    question: "Why is an Iterator's cursor usually a private attribute (e.g. 'self._cursor')?",
    shortAnswer: "To encapsulate internal iteration state and prevent external code from accidentally corrupting the active stream position during loop execution.",
    explanation: "Standard object-oriented encapsulation practice.",
    hint: "To protect internal stream pointer state from external corruption.",
    level: "basic",
    codeExample: "self._cursor = 0"
  },
  {
    question: "Can an iterator class wrap a network socket or binary file?",
    shortAnswer: "Yes. In '__next__()', it can read bytes from the socket/file and return parsed packet objects, raising 'StopIteration' on EOF or connection close.",
    explanation: "Standard pattern for streaming network protocols.",
    hint: "Yes, read socket bytes in __next__() and raise StopIteration on EOF.",
    level: "complex",
    codeExample: "data = self.sock.recv(1024)\nif not data: raise StopIteration"
  },
  {
    question: "What is the 'Two-Pointer' or 'Peekable Iterator' pattern?",
    shortAnswer: "An iterator wrapper that allows looking ahead at the next item via 'peek()' without advancing the stream cursor.",
    explanation: "Essential for building parsers, lexers, and syntax tokenizers.",
    hint: "Allows inspecting the next element with peek() without consuming it.",
    level: "complex",
    codeExample: "class Peekable:\n    def peek(self): return self._cached_next"
  },
  {
    question: "How does 'itertools.cycle' compare to a custom 'CircularIterator'?",
    shortAnswer: "'itertools.cycle' runs infinitely without bounds; a custom CircularIterator can enforce a finite cycle count ('max_cycles=N') and terminate cleanly.",
    explanation: "Custom iterators allow adding domain-specific boundary constraints.",
    hint: "Custom CircularIterator can terminate after N cycles; itertools.cycle is infinite.",
    level: "moderate",
    codeExample: "# CircularIterator(items, max_cycles=3)"
  },
  {
    question: "What happens if a custom iterator class mutates the underlying collection while iterating?",
    shortAnswer: "It introduces subtle cursor misalignments, skipping or repeating elements; the iterator should either operate on an immutable snapshot or use safe indexing.",
    explanation: "Avoid in-flight mutations during active streaming.",
    hint: "Causes skipped or repeated elements; operate on a snapshot instead.",
    level: "moderate",
    codeExample: "# Work on defensive copy or tuple"
  },
  {
    question: "How can a custom iterator class calculate running statistics (e.g. running mean, standard deviation) on the fly?",
    shortAnswer: "By updating running sum, count, and squared difference accumulators in '__next__()' before returning each element, keeping memory O(1).",
    explanation: "Welford's algorithm for streaming statistical calculation.",
    hint: "Update running accumulator variables inside __next__() on each yield.",
    level: "complex",
    codeExample: "self.running_sum += val\nself.count += 1"
  },
  {
    question: "Can a custom iterator class be pickled / serialized with standard 'pickle'?",
    shortAnswer: "Yes, if all its internal state attributes (data, cursor, flags) are picklable, allowing active iteration state to be saved to disk and resumed later!",
    explanation: "Major advantage of Iterator classes over generator objects.",
    hint: "Yes, top-level Iterator classes with picklable attributes can be saved/resumed.",
    level: "complex",
    codeExample: "import pickle\nsaved_state = pickle.dumps(my_iterator)"
  },
  {
    question: "How do you write a unit test for a custom Iterator class in pytest?",
    shortAnswer: "Instantiate the iterator, assert that successive 'next()' calls produce expected items, and assert that the final 'next()' raises 'pytest.raises(StopIteration)'.",
    explanation: "Verifies both happy-path streaming and clean termination.",
    hint: "Test item values via next() and assert pytest.raises(StopIteration) at the end.",
    level: "basic",
    codeExample: "with pytest.raises(StopIteration):\n    next(it)"
  },
  {
    question: "How does a custom Iterator class implement reset functionality?",
    shortAnswer: "By providing a custom 'reset()' method that resets 'self._cursor = 0' and re-initializes internal state variables.",
    explanation: "Provides rewinding capabilities unavailable on generator functions.",
    hint: "Define a reset() method that resets self._cursor = 0.",
    level: "basic",
    codeExample: "def reset(self):\n    self._cursor = 0"
  },
  {
    question: "What is the memory complexity of a well-designed Custom Iterator class?",
    shortAnswer: "O(1) auxiliary space, as it only stores the current cursor index and reference to data rather than generating intermediate full collections.",
    explanation: "Constant memory efficiency regardless of dataset volume.",
    hint: "O(1) constant auxiliary memory.",
    level: "basic",
    codeExample: "# Memory footprint: ~128 bytes"
  },
  {
    question: "What is the 'Chain Iterator' pattern?",
    shortAnswer: "An iterator that accepts a sequence of multiple iterables and iterates through all elements of the first, then all elements of the second, until all are exhausted.",
    explanation: "Custom implementation of itertools.chain.",
    hint: "Sequentially iterates through multiple distinct collections.",
    level: "moderate",
    codeExample: "class ChainIterator:\n    def __init__(self, *iterables): ..."
  },
  {
    question: "How does a custom iterator handle empty input collections?",
    shortAnswer: "On the very first '__next__()' invocation, it immediately detects 'cursor >= len(data)' (or 0 >= 0) and raises 'StopIteration' without emitting any elements.",
    explanation: "Clean boundary condition handling.",
    hint: "Immediately raises StopIteration on the first next() call.",
    level: "basic",
    codeExample: "if not self.data: raise StopIteration"
  },
  {
    question: "What is the ultimate golden rule for Creating Custom Iterator Classes in Python?",
    shortAnswer: "Implement '__iter__()' returning 'self', manage cursor pointers safely in '__next__()', handle termination conditions precisely by raising 'StopIteration', and maintain O(1) constant memory complexity.",
    explanation: "The blueprint for professional Python data streaming architectures.",
    hint: "Implement __iter__() returning self, manage cursor in __next__(), raise StopIteration.",
    level: "basic",
    codeExample: "# Custom Python Iterator Architecture Mastery"
  }
];

export default questions;
