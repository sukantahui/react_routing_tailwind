// src/components/study/python/topics/003_003_decorators-generators/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Generators & the yield statement

const questions = [
  {
    question: "What is a Generator Function in Python?",
    shortAnswer: "A function that contains one or more 'yield' statements; when called, it returns a generator iterator object without immediately executing the function body.",
    explanation: "Allows writing iterators using concise function syntax rather than full classes.",
    hint: "A function containing 'yield' that produces values on demand.",
    level: "basic",
    codeExample: "def my_gen():\n    yield 1\n    yield 2"
  },
  {
    question: "What happens when you call a generator function like 'g = my_generator()'?",
    shortAnswer: "The function body does NOT execute; Python immediately constructs and returns a Generator Object in the 'GEN_CREATED' state.",
    explanation: "Execution only starts when next(g) or a for loop is called.",
    hint: "Returns a generator object without executing any lines inside the body.",
    level: "basic",
    codeExample: "g = count_gen()  # No lines executed yet!"
  },
  {
    question: "How does the 'yield' keyword differ from the 'return' keyword?",
    shortAnswer: "'return' terminates the function and destroys its stack frame; 'yield' pauses/freezes the function frame, returns a value to the caller, and retains all local variable state for future resumption.",
    explanation: "The foundation of coroutines and lazy stream processing.",
    hint: "yield pauses and preserves state; return terminates and destroys the frame.",
    level: "basic",
    codeExample: "# yield preserves local variables between calls"
  },
  {
    question: "What are the 4 lifecycle states of a Python generator object?",
    shortAnswer: "1. 'GEN_CREATED' (waiting to start), 2. 'GEN_SUSPENDED' (paused at yield), 3. 'GEN_RUNNING' (actively executing), 4. 'GEN_CLOSED' (exhausted or terminated).",
    explanation: "Inspectable via 'inspect.getgeneratorstate(g)'.",
    hint: "GEN_CREATED, GEN_SUSPENDED, GEN_RUNNING, GEN_CLOSED.",
    level: "moderate",
    codeExample: "import inspect\nstate = inspect.getgeneratorstate(gen)"
  },
  {
    question: "How does a generator function automatically fulfill the Iteration Protocol?",
    shortAnswer: "Every generator object automatically implements both '__iter__()' (returning self) and '__next__()' (advancing to the next yield statement), making it a 100% compliant iterator.",
    explanation: "Eliminates the boilerplate of writing custom __iter__ and __next__ classes.",
    hint: "Python automatically injects __iter__() and __next__() onto generator objects.",
    level: "basic",
    codeExample: "g = my_gen()\nassert hasattr(g, '__iter__') and hasattr(g, '__next__')"
  },
  {
    question: "What happens when a generator function reaches the end of its body or executes 'return'?",
    shortAnswer: "Python raises 'StopIteration' automatically, transitioning the generator to the 'GEN_CLOSED' state and terminating consuming 'for' loops cleanly.",
    explanation: "Standard generator exhaustion behavior.",
    hint: "Raises StopIteration and transitions to GEN_CLOSED.",
    level: "basic",
    codeExample: "# Exiting body triggers StopIteration"
  },
  {
    question: "How does 'return value' behave inside a Python 3.3+ generator function (PEP 380)?",
    shortAnswer: "It attaches 'value' to the 'StopIteration' exception object ('raise StopIteration(value)'), which can be accessed via 'exc.value' or as the result of 'yield from'.",
    explanation: "Enables generators to return final summary data or coroutine return values.",
    hint: "Encapsulates the return value inside StopIteration.value.",
    level: "complex",
    codeExample: "def gen(): yield 1; return 'DONE'\n# StopIteration.value == 'DONE'"
  },
  {
    question: "Why does a generator-based Fibonacci function consume O(1) constant memory?",
    shortAnswer: "Because it only stores two integer variables ('a' and 'b') in its suspended frame, computing and yielding successive terms on demand without maintaining a growing list in memory.",
    explanation: "Can produce trillions of terms without consuming RAM.",
    hint: "Only keeps variables a and b in memory, computing terms on the fly.",
    level: "basic",
    codeExample: "def fib(): a,b = 0,1; while True: yield a; a,b = b, a+b"
  },
  {
    question: "What utility can you use to safely take the first N elements from an infinite generator?",
    shortAnswer: "'itertools.islice(generator, N)' takes the first N items lazily without creating infinite loops or loading unnecessary elements into memory.",
    explanation: "Standard library tool for generator slicing.",
    hint: "Use itertools.islice(gen, N).",
    level: "basic",
    codeExample: "first_10 = list(itertools.islice(fib_gen, 10))"
  },
  {
    question: "Can a generator function contain multiple 'yield' statements in different branches?",
    shortAnswer: "Yes. A generator function can have as many 'yield' statements as needed across if/else branches, loops, and nested blocks.",
    explanation: "Provides complete imperative control over emitted values.",
    hint: "Yes, yield can appear anywhere in loops or conditional branches.",
    level: "basic",
    codeExample: "if cond: yield A\nelse: yield B"
  },
  {
    question: "Can a generator yield values of different data types across successive steps?",
    shortAnswer: "Yes. Python generators are dynamically typed; they can yield strings, integers, dictionaries, custom objects, or even other functions.",
    explanation: "Complete flexibility in emitted data payloads.",
    hint: "Yes, generators can yield any Python data types.",
    level: "basic",
    codeExample: "yield 100; yield 'Success'; yield {'id': 1}"
  },
  {
    question: "What is the 'close()' method on a generator object?",
    shortAnswer: "'gen.close()' raises a 'GeneratorExit' exception inside the suspended generator frame, causing it to exit early, clean up any 'finally' blocks, and transition to 'GEN_CLOSED'.",
    explanation: "Allows consumers to terminate long-running streams safely.",
    hint: "Raises GeneratorExit to terminate the generator and run finally blocks.",
    level: "moderate",
    codeExample: "gen.close()  # Generator is closed immediately"
  },
  {
    question: "What happens if a generator contains a 'try...finally' block and is closed early?",
    shortAnswer: "The 'finally' block is guaranteed to execute when 'close()' is called or when the generator is garbage collected, ensuring resources (files, sockets) are closed safely.",
    explanation: "Essential pattern for resource management in generators.",
    hint: "The finally block executes immediately to clean up resources.",
    level: "moderate",
    codeExample: "try: yield data\nfinally: file.close() # Guaranteed cleanup"
  },
  {
    question: "Can you rewind or restart a generator object once it has yielded items?",
    shortAnswer: "No. Generator objects are strictly single-pass stream consumers; to restart, you must invoke the generator function again to instantiate a fresh generator object.",
    explanation: "Generators cannot move backwards.",
    hint: "No, generators are single-pass; call the generator function again for a new stream.",
    level: "basic",
    codeExample: "g = my_gen(); list(g); list(g) # Second list is []"
  },
  {
    question: "How do generators compare to custom Iterator classes in terms of boilerplate code?",
    shortAnswer: "Generators reduce 20-30 lines of custom class boilerplate (writing '__init__', '__iter__', '__next__', and state management) to a simple 4-line function with 'yield'.",
    explanation: "Dramatic improvement in code readability and maintainability.",
    hint: "Generators replace full __iter__/__next__ class boilerplate with concise yield functions.",
    level: "basic",
    codeExample: "# 4 lines of generator vs 25 lines of class boilerplate"
  },
  {
    question: "What happens if an unhandled exception occurs inside a generator function?",
    shortAnswer: "The exception propagates immediately out of the 'next()' call to the caller, and the generator is abruptly closed (transitions to 'GEN_CLOSED').",
    explanation: "Generators cannot be resumed after an uncaught exception.",
    hint: "The exception bubbles up to next() and the generator is closed.",
    level: "basic",
    codeExample: "# Uncaught exception terminates the generator permanently"
  },
  {
    question: "What is the 'throw()' method on a generator object?",
    shortAnswer: "'gen.throw(ExcType, value)' raises the specified exception at the exact line where the generator is currently suspended, allowing the generator to handle or recover from it.",
    explanation: "Underpins advanced coroutine error handling.",
    hint: "Raises an exception inside the suspended generator frame.",
    level: "complex",
    codeExample: "gen.throw(ValueError, 'Invalid data chunk')"
  },
  {
    question: "How does Python optimize generator frame allocations in CPython?",
    shortAnswer: "CPython allocates a compact 'PyGenObject' structure containing the execution evaluation frame on the heap, allowing it to be suspended and resumed with near-zero overhead (~100 nanoseconds).",
    explanation: "Extremely lightweight compared to operating system threads.",
    hint: "Compact heap frame structure resumed in nanoseconds.",
    level: "complex",
    codeExample: "# Nanosecond suspension and resumption"
  },
  {
    question: "Can you pass arguments into a suspended generator when resuming it?",
    shortAnswer: "Yes. By using the 'gen.send(value)' method; the 'yield' expression evaluates to the sent value (explored further in Coroutines).",
    explanation: "Transforms generators into bidirectional data coroutines.",
    hint: "Yes, using the generator.send(value) method.",
    level: "moderate",
    codeExample: "received = yield result  # received gets value from send()"
  },
  {
    question: "Why should you avoid creating large lists inside a generator function before yielding?",
    shortAnswer: "Because building a large list in memory defeats the primary benefit of generators (lazy evaluation and constant O(1) memory consumption).",
    explanation: "Always stream/yield items one-by-one or in small chunks.",
    hint: "Defeats the O(1) memory purpose; items should be yielded one-by-one.",
    level: "basic",
    codeExample: "# BAD: temp = [huge_data]; for x in temp: yield x\n# GOOD: for x in stream: yield x"
  },
  {
    question: "How do you test a generator function in pytest?",
    shortAnswer: "Instantiate the generator, call 'list(gen)' or use a 'for' loop to verify all yielded items, and assert on expected values and sequence order.",
    explanation: "Standard unit testing pattern for generator streams.",
    hint: "Test items by consuming with list(gen) or next(gen) assertions.",
    level: "basic",
    codeExample: "assert list(my_gen()) == [1, 2, 3]"
  },
  {
    question: "Can a generator function yield from another generator?",
    shortAnswer: "Yes, using the 'yield from sub_generator()' syntax introduced in PEP 380, which transparently delegates iteration to the sub-generator.",
    explanation: "Topic 9 and 11 explore delegation in depth.",
    hint: "Yes, using the 'yield from' delegation syntax.",
    level: "moderate",
    codeExample: "def chain(g1, g2):\n    yield from g1\n    yield from g2"
  },
  {
    question: "What is the 'Lazy Evaluation' paradigm in Python generators?",
    shortAnswer: "Computing values only at the exact moment they are requested by the consumer ('call-by-need'), saving CPU cycles and memory when only a fraction of items are consumed.",
    explanation: "Fundamental design philosophy of functional Python programming.",
    hint: "Values are computed on demand only when requested by the consumer.",
    level: "basic",
    codeExample: "# Compute on demand rather than upfront"
  },
  {
    question: "Why is 'yield' not allowed inside a list comprehension or lambda function directly?",
    shortAnswer: "Because 'yield' turns the enclosing code block into a generator function, which has distinct frame suspension semantics incompatible with single-expression lambdas.",
    explanation: "Use generator expressions '(x for x in seq)' instead.",
    hint: "Lambdas are single expressions; use generator expressions instead.",
    level: "moderate",
    codeExample: "# Use (x for x in seq) instead of lambda with yield"
  },
  {
    question: "What is the ultimate golden rule for Generators and the `yield` statement in Python?",
    shortAnswer: "Use generator functions whenever producing sequences or streaming data to maintain O(1) memory, let 'yield' manage frame state suspension automatically, and leverage 'return' with PEP 380 for completion summaries.",
    explanation: "The bedrock of modern, high-performance Python data engineering.",
    hint: "Use yield for O(1) memory streaming and let Python manage frame state automatically.",
    level: "basic",
    codeExample: "# Python Generator & Yield Mastery"
  }
];

export default questions;
