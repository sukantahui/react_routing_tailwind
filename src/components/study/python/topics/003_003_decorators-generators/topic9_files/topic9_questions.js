// src/components/study/python/topics/003_003_decorators-generators/topic9_files/topic9_questions.js
// Comprehensive Master Review Questions for Topic 9: Generator functions vs regular functions

const questions = [
  {
    question: "What is the core philosophical difference between Regular Functions and Generator Functions?",
    shortAnswer: "Regular functions use 'Eager Evaluation' (computing the entire collection in RAM upfront before returning); Generator functions use 'Lazy Evaluation' (computing items one at a time on demand).",
    explanation: "Eager computation trades memory for instant random access; lazy evaluation optimizes for constant O(1) memory.",
    hint: "Eager evaluation upfront vs lazy evaluation on demand.",
    level: "basic",
    codeExample: "# Regular: return [1, 2, 3]\n# Generator: yield 1; yield 2; yield 3"
  },
  {
    question: "How does the memory complexity of a Generator compare to a List of 1,000,000 integers?",
    shortAnswer: "A List of 1,000,000 integers occupies ~8 MB of RAM in CPython; a Generator generating the same 1,000,000 integers occupies only ~112 bytes of constant O(1) heap memory.",
    explanation: "Generators eliminate Out-Of-Memory (OOM) failures on massive datasets.",
    hint: "List takes ~8MB (O(N)); Generator takes ~112 bytes (O(1)).",
    level: "basic",
    codeExample: "# sys.getsizeof(gen) == 112 bytes regardless of stream length"
  },
  {
    question: "What is 'First-Item Latency' and why are generators superior in streaming pipelines?",
    shortAnswer: "First-Item Latency is the time delay before the consumer receives the first element. Regular functions have high latency (must finish computing all N items); generators have near-zero latency (yield first item immediately).",
    explanation: "Critical for streaming UI responses and live network feeds.",
    hint: "Generators emit the first item immediately without waiting for the entire batch.",
    level: "moderate",
    codeExample: "# Generators provide immediate first-item availability"
  },
  {
    question: "What does the 'yield from' syntax do in Python (PEP 380)?",
    shortAnswer: "It delegates iteration transparently to a sub-generator or iterable, establishing a direct bidirectional channel between the caller and the sub-generator for values, return values, exceptions, and signals.",
    explanation: "Replaces boilerplate 'for item in subgen: yield item' loops.",
    hint: "Delegates iteration directly to a sub-generator.",
    level: "moderate",
    codeExample: "def chain(a, b):\n    yield from a\n    yield from b"
  },
  {
    question: "How does 'yield from' capture the return value of a sub-generator?",
    shortAnswer: "The 'yield from sub_generator()' expression directly evaluates to the sub-generator's return value: 'sub_result = yield from sub_generator()'.",
    explanation: "Allows subgenerators to report metadata, counts, or exit statuses to delegators.",
    hint: "result = yield from subgen() assigns the return value of subgen.",
    level: "complex",
    codeExample: "total_count = yield from process_branch_stream()"
  },
  {
    question: "What is the purpose of the 'gen.send(value)' method?",
    shortAnswer: "It resumes a suspended generator and injects 'value' into the generator frame as the result of the active 'yield' expression, enabling bidirectional coroutine communication.",
    explanation: "Turns generators into stateful data-consuming coroutines.",
    hint: "Sends data into a generator; the yield expression evaluates to that value.",
    level: "moderate",
    codeExample: "received = yield emitted_val  # received gets arg from send()"
  },
  {
    question: "Why must a generator/coroutine be 'primed' before calling 'gen.send(val)' with a non-None value?",
    shortAnswer: "Because when a generator is created ('GEN_CREATED'), it hasn't reached its first 'yield' statement yet; Python requires calling 'next(gen)' or 'gen.send(None)' first to advance to the initial yield point.",
    explanation: "Calling gen.send('data') on a fresh generator raises TypeError: can't send non-None value to a just-started generator.",
    hint: "Must advance to the first yield with next(gen) or gen.send(None) first.",
    level: "moderate",
    codeExample: "# Priming: next(gen) or gen.send(None)"
  },
  {
    question: "What does calling 'gen.close()' do on a generator object?",
    shortAnswer: "It raises a 'GeneratorExit' exception at the current suspension point inside the generator, triggering any 'finally' cleanup blocks and closing the generator.",
    explanation: "Safely terminates infinite streams and releases held file descriptors.",
    hint: "Raises GeneratorExit to trigger finally blocks and terminate the stream.",
    level: "basic",
    codeExample: "gen.close()"
  },
  {
    question: "What does calling 'gen.throw(ExcType, value)' do?",
    shortAnswer: "It raises the specified exception at the exact line where the generator is currently suspended, giving the generator an opportunity to handle or recover via 'try...except'.",
    explanation: "Provides remote error injection into running coroutines.",
    hint: "Raises an exception inside the suspended generator frame.",
    level: "complex",
    codeExample: "gen.throw(ValueError, 'Corrupted data stream')"
  },
  {
    question: "When should you choose a Regular Function returning a List over a Generator?",
    shortAnswer: "When you need random access (indexing e.g. 'data[42]'), need to know the length upfront ('len(data)'), need to iterate multiple times without re-running, or need to serialize the complete dataset immediately.",
    explanation: "Lists provide O(1) random access; generators provide O(1) memory streaming.",
    hint: "When you need indexing, len(), multiple passes, or instant random access.",
    level: "basic",
    codeExample: "# Use List when data[i] indexing or len() is mandatory"
  },
  {
    question: "What is a 'Pipeline Architecture' using chained generators?",
    shortAnswer: "A design where multiple generator functions are chained together in series (e.g. 'clean(filter(parse(read_stream())))'), streaming data from source to sink with zero intermediate memory buffers.",
    explanation: "The hallmark of Unix-like composable data engineering in Python.",
    hint: "Connecting generators in series where output of one feeds the input of the next.",
    level: "moderate",
    codeExample: "pipeline = sum(x * 2 for x in read_numbers() if x > 0)"
  },
  {
    question: "Can a generator function be recursive?",
    shortAnswer: "Yes. A recursive generator function uses 'yield from recursive_func()' to yield items from child sub-trees (e.g. traversing binary trees or nested directory hierarchies).",
    explanation: "Provides elegant O(1) memory traversal of nested tree structures.",
    hint: "Yes, by using 'yield from' for recursive sub-tree calls.",
    level: "complex",
    codeExample: "def traverse(node):\n    yield node.val\n    for child in node.children:\n        yield from traverse(child)"
  },
  {
    question: "How does 'sys.getsizeof()' report memory for a Generator object?",
    shortAnswer: "It reports the static size of the 'PyGenObject' heap struct (~112 to 128 bytes in 64-bit CPython), which remains fixed regardless of whether the generator yields 10 items or 10 billion items.",
    explanation: "Shows that memory does not scale with dataset volume.",
    hint: "Reports constant ~112-128 bytes regardless of stream length.",
    level: "basic",
    codeExample: "assert sys.getsizeof(gen) < 200"
  },
  {
    question: "What happens if a generator function raises an unhandled exception inside a 'yield from' pipeline?",
    shortAnswer: "The exception propagates transparently through the 'yield from' delegation chain up to the top-level caller, closing all participating sub-generators.",
    explanation: "Exception transparency guaranteed by PEP 380.",
    hint: "The exception bubbles up through all yield from layers to the caller.",
    level: "moderate",
    codeExample: "# Exception propagates cleanly across delegation chain"
  },
  {
    question: "Can a generator function be decorated with standard function decorators?",
    shortAnswer: "Yes. A decorator wrapping a generator function receives the generator object upon invocation and can intercept yielded values, measure throughput, or log execution events.",
    explanation: "Combines Decorator and Generator paradigms seamlessly.",
    hint: "Yes, decorators can wrap and intercept generator objects.",
    level: "moderate",
    codeExample: "@log_stream\ndef my_gen(): yield 1"
  },
  {
    question: "What is the 'Coroutine Coroutine Trampoline' pattern?",
    shortAnswer: "A loop that continuously drives multiple cooperating generators by taking values yielded by one generator and sending them into another, acting as a lightweight task scheduler.",
    explanation: "The historical predecessor to Python's asyncio event loop.",
    hint: "A scheduler loop driving cooperative generators via next() and send().",
    level: "complex",
    codeExample: "# Event loop trampoline driving generators"
  },
  {
    question: "Why does calling 'len(my_generator)' raise a TypeError?",
    shortAnswer: "Because generators produce values lazily on demand and cannot know their total length without consuming and exhausting the entire stream.",
    explanation: "Generators do not implement __len__.",
    hint: "Generators do not know their length upfront without being consumed.",
    level: "basic",
    codeExample: "# TypeError: object of type 'generator' has no len()"
  },
  {
    question: "How can you count the total number of items in a generator without building a full list in memory?",
    shortAnswer: "Using 'sum(1 for _ in my_generator)' consumes the generator lazily while maintaining O(1) memory complexity.",
    explanation: "Memory-efficient generator item counting idiom.",
    hint: "Use sum(1 for _ in gen) for O(1) memory counting.",
    level: "basic",
    codeExample: "total_items = sum(1 for _ in stream)"
  },
  {
    question: "What is the difference between 'yield' and 'yield from' in terms of performance?",
    shortAnswer: "'yield from' delegates at the CPython C-interpreter level, bypassing bytecode evaluation loops for each element and resulting in ~15-20% faster execution compared to manual 'for x in sub: yield x'.",
    explanation: "CPython optimizes yield from directly in the ceval loop.",
    hint: "yield from is optimized in CPython C code, executing faster than manual for loops.",
    level: "moderate",
    codeExample: "# yield from sub is faster than for x in sub: yield x"
  },
  {
    question: "How does the 'contextlib.contextmanager' decorator utilize generator functions?",
    shortAnswer: "It wraps a generator with a single 'yield': code before 'yield' runs on '__enter__', the yielded value is bound to the 'as' variable, and code after 'yield' runs on '__exit__'.",
    explanation: "Elegant synthesis of Context Managers and Generators.",
    hint: "Code before yield runs on enter; code after yield runs on exit.",
    level: "complex",
    codeExample: "@contextmanager\ndef open_db():\n    db = connect()\n    try: yield db\n    finally: db.close()"
  },
  {
    question: "Can a generator function return multiple times?",
    shortAnswer: "No. The first 'return' statement encountered raises 'StopIteration' and closes the generator immediately; any code after that return is unreachable.",
    explanation: "Standard return semantics apply.",
    hint: "No, return immediately terminates the generator with StopIteration.",
    level: "basic",
    codeExample: "return 'Done'  # Terminates generator permanently"
  },
  {
    question: "What happens if a generator function is garbage collected while in 'GEN_SUSPENDED' state?",
    shortAnswer: "CPython automatically calls 'gen.close()', which raises 'GeneratorExit' inside the frame to allow any 'finally' blocks to clean up open files or sockets.",
    explanation: "Guaranteed resource reclamation upon garbage collection.",
    hint: "CPython calls gen.close() automatically, executing finally blocks.",
    level: "moderate",
    codeExample: "# finally block is guaranteed to execute on GC"
  },
  {
    question: "How do you filter a generator stream using standard Python built-ins?",
    shortAnswer: "Using the built-in 'filter(predicate, gen)' or generator expressions '(x for x in gen if condition)' maintains lazy streaming without allocating memory.",
    explanation: "Pure lazy stream transformations.",
    hint: "Use filter(func, gen) or (x for x in gen if cond).",
    level: "basic",
    codeExample: "evens = (x for x in stream if x % 2 == 0)"
  },
  {
    question: "Why should you never execute slow network I/O inside a synchronous generator during time-critical UI loops?",
    shortAnswer: "Because synchronous 'next()' calls block the entire Python thread until the network I/O completes, freezing UI responsiveness; use asynchronous generators ('async def' with 'async for') instead.",
    explanation: "Preserves concurrency and UI smoothness.",
    hint: "Synchronous next() blocks the thread; use async generators for non-blocking I/O.",
    level: "moderate",
    codeExample: "# Use async def for non-blocking stream I/O"
  },
  {
    question: "What is the ultimate golden rule for choosing between Generator Functions and Regular Functions?",
    shortAnswer: "Use Regular Functions when you require random indexing, multiple iterations, or len(); use Generator Functions when streaming data, processing large/infinite datasets, or chaining multi-stage pipelines with O(1) memory.",
    explanation: "The architectural dividing line in professional Python software engineering.",
    hint: "Regular for indexing/len/multi-pass; Generators for streaming/O(1) memory/pipelines.",
    level: "basic",
    codeExample: "# Python Function vs Generator Engineering Mastery"
  }
];

export default questions;
