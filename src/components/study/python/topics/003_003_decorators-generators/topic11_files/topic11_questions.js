// src/components/study/python/topics/003_003_decorators-generators/topic11_files/topic11_questions.js
// Comprehensive Master Review Questions for Topic 11: Infinite streams and large data processing with generators

const questions = [
  {
    question: "What is an Infinite Stream Generator in Python?",
    shortAnswer: "A generator function containing an infinite loop ('while True: yield item') that continuously produces an unbounded sequence of elements on demand.",
    explanation: "Provides infinite streams (timestamps, IoT telemetry, IDs) with constant O(1) memory.",
    hint: "A generator with while True: yield item that produces values indefinitely.",
    level: "basic",
    codeExample: "def counter():\n    i = 0\n    while True:\n        yield i\n        i += 1"
  },
  {
    question: "What happens if you pass an infinite generator to 'list()' or 'sum()' without a bounding condition?",
    shortAnswer: "The program enters an infinite loop, continuously consuming CPU and allocating memory until the operating system crashes or raises 'MemoryError'.",
    explanation: "Eager collectors must never be called directly on infinite generators.",
    hint: "Causes an infinite loop / program freeze / Out-Of-Memory crash.",
    level: "basic",
    codeExample: "# DANGEROUS: list(infinite_generator())  # Freezes Python!"
  },
  {
    question: "How does 'itertools.islice(gen, N)' safely consume items from an infinite stream?",
    shortAnswer: "It acts as a lazy bounding iterator, consuming and yielding only the first 'N' elements before raising 'StopIteration', leaving the remaining infinite stream intact.",
    explanation: "The standard tool for safe consumption of infinite streams.",
    hint: "Yields only the first N items from the generator safely.",
    level: "basic",
    codeExample: "for event in itertools.islice(infinite_stream, 10): pass"
  },
  {
    question: "How does 'itertools.takewhile(predicate, gen)' differ from 'itertools.islice'?",
    shortAnswer: "'itertools.islice' bounds by element count; 'itertools.takewhile' bounds by condition, yielding elements as long as 'predicate(item)' evaluates to True and stopping permanently on the first False.",
    explanation: "Conditional stream bounding based on live telemetry data.",
    hint: "Consumes items as long as predicate is True; stops on the first False.",
    level: "moderate",
    codeExample: "safe_events = itertools.takewhile(lambda e: e.temp < 100, sensor_gen)"
  },
  {
    question: "How do Python generators naturally solve the 'Backpressure' problem in data streaming?",
    shortAnswer: "Because Python generators are 'pull-based' (lazy); data is produced only when the consumer explicitly calls 'next()', automatically pacing data generation to match consumption speed.",
    explanation: "Prevents memory buffer overflows in high-throughput data pipelines.",
    hint: "Pull-based model produces data only when the consumer asks for it.",
    level: "complex",
    codeExample: "# Consumer drives production speed via next()"
  },
  {
    question: "How do you ensure open file handles or network sockets are safely closed inside an infinite/large stream generator?",
    shortAnswer: "By wrapping stream iteration in a 'try...finally' block inside the generator; the 'finally' block is guaranteed to execute when the generator is exhausted, closed via 'gen.close()', or garbage collected.",
    explanation: "Essential pattern for leak-free file and socket streaming.",
    hint: "Use a try...finally block around the generator loop.",
    level: "moderate",
    codeExample: "try:\n    for line in file: yield parse(line)\nfinally:\n    file.close()"
  },
  {
    question: "What exception does 'gen.close()' raise inside the generator frame?",
    shortAnswer: "'gen.close()' raises the 'GeneratorExit' exception at the current suspension point, triggering 'finally' blocks and closing the generator.",
    explanation: "GeneratorExit does not inherit from Exception, but from BaseException.",
    hint: "Raises GeneratorExit to trigger finally cleanup blocks.",
    level: "moderate",
    codeExample: "gen.close()  # Raises GeneratorExit inside gen"
  },
  {
    question: "How does 'collections.deque(maxlen=N)' enable memory-efficient sliding windows over infinite streams?",
    shortAnswer: "When an element is appended to a full deque, the oldest element is automatically discarded in O(1) time, ensuring the buffer size never exceeds N regardless of stream length.",
    explanation: "Eliminates list reallocation overhead in rolling window calculations.",
    hint: "Automatically discards oldest items so buffer size never exceeds N.",
    level: "moderate",
    codeExample: "window = collections.deque(maxlen=5)\nwindow.append(new_metric)"
  },
  {
    question: "How do you read a 100 GB CSV file in Python without running out of RAM?",
    shortAnswer: "By using a generator function that iterates over the file object line-by-line ('for line in f: yield parse(line)'), consuming ~1 line in memory (~1 KB) at any given instant.",
    explanation: "Keeps memory usage strictly O(1) across gigabyte/terabyte files.",
    hint: "Stream line-by-line using a generator instead of read() or readlines().",
    level: "basic",
    codeExample: "def stream_csv(path):\n    with open(path) as f:\n        for line in f: yield line.strip()"
  },
  {
    question: "Why is 'for line in f:' more memory efficient than 'f.readlines()'?",
    shortAnswer: "'f.readlines()' reads the entire file into memory as a list of strings (O(N) RAM); 'for line in f:' uses an internal C-level buffer iterator yielding 1 line at a time (O(1) RAM).",
    explanation: "Fundamental file I/O best practice in Python.",
    hint: "f.readlines() loads everything in RAM; for line in f: streams line-by-line.",
    level: "basic",
    codeExample: "# BAD: for l in f.readlines(): ...\n# GOOD: for l in f: ..."
  },
  {
    question: "How can you chunk a large binary file into 64KB blocks using 'iter()'?",
    shortAnswer: "'iter(lambda: file.read(65536), b\"\")' creates a sentinel iterator yielding 64KB chunks until EOF (empty bytes).",
    explanation: "Standard recipe for chunked binary file streaming.",
    hint: "Use iter(lambda: f.read(65536), b'').",
    level: "complex",
    codeExample: "for chunk in iter(lambda: f.read(65536), b''):\n    process(chunk)"
  },
  {
    question: "What is 'itertools.cycle' and how is it used in infinite stream processing?",
    shortAnswer: "'itertools.cycle(iterable)' endlessly repeats elements of the given iterable in order, commonly used for round-robin server routing and repeating test fixtures.",
    explanation: "Infinite round-robin rotator.",
    hint: "Endlessly repeats elements of a sequence in a loop.",
    level: "basic",
    codeExample: "rotator = itertools.cycle(['node1', 'node2', 'node3'])"
  },
  {
    question: "What is 'itertools.count(start, step)'?",
    shortAnswer: "An infinite iterator that generates numbers starting from 'start' and incrementing by 'step' on each 'next()' call.",
    explanation: "Standard infinite sequence counter.",
    hint: "Generates infinite numbers starting at start with step increments.",
    level: "basic",
    codeExample: "for i in itertools.count(100, 5): pass  # 100, 105, 110..."
  },
  {
    question: "What is the danger of catching 'BaseException' or 'GeneratorExit' inside a generator's try block?",
    shortAnswer: "If you catch 'GeneratorExit' and attempt to yield another value with 'yield', Python raises 'RuntimeError: generator ignored GeneratorExit'.",
    explanation: "GeneratorExit must only be caught to perform cleanup and exit.",
    hint: "Catching GeneratorExit and yielding another value raises RuntimeError.",
    level: "complex",
    codeExample: "try: yield\nexcept GeneratorExit: pass # MUST NOT yield here!"
  },
  {
    question: "How do you calculate moving standard deviation over an infinite stream in O(1) space?",
    shortAnswer: "Using Welford's algorithm or maintaining rolling sum and rolling sum of squares inside a fixed-size deque.",
    explanation: "Streaming statistical metrics calculation.",
    hint: "Maintain rolling sum and squared sums in a fixed deque.",
    level: "complex",
    codeExample: "# Welford's online algorithm for streaming variance"
  },
  {
    question: "How can you implement an 'Infinite Telemetry Heartbeat' daemon with generators?",
    shortAnswer: "A generator function yielding timestamped health metrics inside a 'while True' loop, coupled with consumer timers or socket emitters.",
    explanation: "Standard backend server health heartbeat pattern.",
    hint: "while True loop yielding heartbeat dictionaries with timestamps.",
    level: "moderate",
    codeExample: "def heartbeat():\n    while True: yield {'time': time.time(), 'status': 'OK'}"
  },
  {
    question: "What is 'itertools.dropwhile(predicate, gen)'?",
    shortAnswer: "It drops elements from the stream as long as 'predicate(item)' is True, and yields all remaining elements once the predicate becomes False.",
    explanation: "Skips unwanted stream preambles (e.g. log headers).",
    hint: "Discards initial items as long as predicate is True, then streams the rest.",
    level: "moderate",
    codeExample: "logs = itertools.dropwhile(lambda l: l.startswith('#'), log_gen)"
  },
  {
    question: "Can multiple consumers share the same infinite generator stream?",
    shortAnswer: "Yes, but they will pull items cooperatively (each 'next()' call consumes an item from the single stream), or you can use 'itertools.tee' to create independent copies.",
    explanation: "itertools.tee creates independent split iterators from a single stream.",
    hint: "Use itertools.tee(gen, 2) to duplicate stream streams independently.",
    level: "moderate",
    codeExample: "s1, s2 = itertools.tee(stream, 2)"
  },
  {
    question: "What is the memory risk when using 'itertools.tee' on divergent consumers?",
    shortAnswer: "If one consumer advances far ahead of the other, 'itertools.tee' must cache all intermediate unconsumed items in RAM, leading to memory growth.",
    explanation: "Divergent consumers cause itertools.tee memory buffers to expand.",
    hint: "Caches unconsumed items in memory if one consumer is much faster.",
    level: "complex",
    codeExample: "# Keep tee consumers synchronized to avoid RAM buffers"
  },
  {
    question: "How do you batch items from an infinite stream into fixed-size chunks of N items?",
    shortAnswer: "Using 'itertools.islice(gen, N)' inside a generator function: 'while True: chunk = list(itertools.islice(gen, N)); if not chunk: break; yield chunk'. (In Python 3.12+, 'itertools.batched').",
    explanation: "Standard stream batching idiom.",
    hint: "Use itertools.batched(gen, N) or while chunk: yield chunk.",
    level: "moderate",
    codeExample: "for batch in itertools.batched(infinite_stream, 50): ..."
  },
  {
    question: "How do you rate-limit or throttle an infinite generator stream?",
    shortAnswer: "By inserting 'time.sleep(interval)' inside the generator loop or consumer before each yield, controlling the emission frequency.",
    explanation: "Prevents consuming CPU at 100% in polling loops.",
    hint: "Add time.sleep() between yields to throttle emission rate.",
    level: "basic",
    codeExample: "while True:\n    yield get_reading()\n    time.sleep(0.1)"
  },
  {
    question: "How do you profile memory consumption of an infinite stream generator pipeline?",
    shortAnswer: "Using the standard library 'tracemalloc' module or 'memory_profiler' to verify that peak memory remains flat/constant over millions of processed records.",
    explanation: "Verifies O(1) memory invariance in production pipelines.",
    hint: "Use tracemalloc to verify that peak allocated RAM remains constant.",
    level: "moderate",
    codeExample: "import tracemalloc\ntracemalloc.start()"
  },
  {
    question: "Can an infinite generator stream be converted into an asynchronous generator?",
    shortAnswer: "Yes. By declaring 'async def my_stream(): while True: await asyncio.sleep(1); yield data', supporting non-blocking concurrency with 'async for'.",
    explanation: "Asynchronous stream generators for modern web frameworks.",
    hint: "Declare with async def and use await inside the loop.",
    level: "complex",
    codeExample: "async def ticker():\n    while True:\n        await asyncio.sleep(1)\n        yield time.time()"
  },
  {
    question: "What happens if a generator encounters an unhandled exception during infinite stream processing?",
    shortAnswer: "The exception propagates to the consumer, terminating the generator frame and closing the stream permanently.",
    explanation: "Always wrap volatile external operations in try...except.",
    hint: "Terminates the generator and propagates the exception to the caller.",
    level: "basic",
    codeExample: "try:\n    item = next(stream)\nexcept Exception as exc: ..."
  },
  {
    question: "What is the ultimate golden rule for Infinite Streams and Large Data Processing in Python?",
    shortAnswer: "Always stream data with generators to ensure O(1) memory, bound infinite streams safely using 'itertools.islice' or conditional breaks, protect resources with 'try...finally', and use 'collections.deque' for sliding window aggregations.",
    explanation: "The master architectural pattern for enterprise data engineering in Python.",
    hint: "Use generators for O(1) RAM, itertools.islice for bounding, and try...finally for cleanup.",
    level: "basic",
    codeExample: "# Python Infinite Stream & Large Data Processing Mastery"
  }
];

export default questions;
