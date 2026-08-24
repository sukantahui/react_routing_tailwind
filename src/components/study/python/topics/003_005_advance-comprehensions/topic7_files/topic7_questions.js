// src/components/study/python/topics/003_005_advance-comprehensions/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Building clean data transformation pipelines

const questions = [
  {
    question: "What is a 'Generator Pipeline' in Python?",
    shortAnswer: "A data architecture where multiple generator functions are chained together ('stage3(stage2(stage1(source)))'), allowing data records to stream one-by-one from source to destination with constant O(1) memory.",
    explanation: "Chained generator streaming conveyor architecture.",
    hint: "Chaining generator functions where each stage consumes and yields items lazily.",
    level: "basic",
    codeExample: "pipeline = stage3(stage2(stage1(data_stream)))"
  },
  {
    question: "What is the difference between 'Pull-Based Streaming' (generators) and 'Push-Based Processing'?",
    shortAnswer: "In pull-based streaming, the consumer at the end of the pipeline requests the next item ('next(pipeline)'), pulling one record through each stage on demand; in push-based processing, the producer pushes batches forward.",
    explanation: "Demand-driven streaming execution.",
    hint: "Pull streams one item on demand from consumer; push forces batches forward.",
    level: "moderate",
    codeExample: "for item in pipeline: # Consumer pulls items one-by-one"
  },
  {
    question: "Why do composed generator pipelines maintain constant O(1) memory during multi-gigabyte transformations?",
    shortAnswer: "Because no intermediate collections or lists are allocated in RAM; each item is generated, transformed through all stages, consumed, and garbage-collected before the next item is processed.",
    explanation: "Zero-copy streaming memory efficiency.",
    hint: "Only one record exists in memory at any point in time.",
    level: "basic",
    codeExample: "# Constant 100 bytes RAM processing a 50 GB log file"
  },
  {
    question: "What is a 'Fluent Pipeline Builder' in Python?",
    shortAnswer: "A class wrapper that encapsulates generator iterators, providing method chaining like '.filter().map().take().collect()' for clean, expressive, and readable functional pipelines.",
    explanation: "Method-chaining domain-specific language.",
    hint: "A wrapper class that enables chaining methods like .filter().map().collect().",
    level: "basic",
    codeExample: "FluentPipeline.from_iterable(data).filter(...).map(...).collect()"
  },
  {
    question: "What is the difference between 'Intermediate Operations' and 'Terminal Operations' in a pipeline?",
    shortAnswer: "Intermediate operations (like '.map()' and '.filter()') return a new lazy iterator without executing any loops; terminal operations (like '.collect()', '.reduce()', or 'for' loops) trigger the actual computation.",
    explanation: "Lazy evaluation triggers in data pipelines.",
    hint: "Intermediate ops are lazy; terminal ops trigger execution and materialize data.",
    level: "moderate",
    codeExample: "# Intermediate: .map(), .filter(); Terminal: .collect(), .reduce()"
  },
  {
    question: "What is a 'Dead-Letter Queue' (DLQ) in data pipeline engineering?",
    shortAnswer: "A quarantine storage mechanism where malformed, corrupt, or schema-invalid records are routed for inspection and alerting, preventing a single dirty record from crashing the entire streaming pipeline.",
    explanation: "Production pipeline error resilience.",
    hint: "A quarantine location for corrupt records that fail parsing or validation.",
    level: "basic",
    codeExample: "dlq.append({'payload': raw, 'error': 'Invalid fee format'})"
  },
  {
    question: "How do you handle type conversion errors gracefully inside a streaming pipeline stage?",
    shortAnswer: "Wrap the type conversion in a 'try...except' block within the generator loop; yield valid records and divert exceptions to a DLQ or logger instead of allowing unhandled exceptions to crash the process.",
    explanation: "Safe inline error quarantine.",
    hint: "Use try...except inside the generator stage and route failures to DLQ.",
    level: "basic",
    codeExample: "try: fee = float(r['fee']); yield r\nexcept ValueError: dlq.append(r)"
  },
  {
    question: "How do you split a single generator stream into two separate streams (e.g. valid vs invalid)?",
    shortAnswer: "Using 'itertools.tee(stream, 2)' combined with complementary filters, or iterating through the stream once and partitioning into two destination queues.",
    explanation: "Stream branching techniques.",
    hint: "Use itertools.tee() or partition during iteration.",
    level: "moderate",
    codeExample: "s1, s2 = itertools.tee(stream, 2)"
  },
  {
    question: "Why should you avoid reading an entire file into memory before passing it to a pipeline?",
    shortAnswer: "Calling 'file.readlines()' or 'file.read()' loads the entire file into RAM, destroying the O(1) memory benefit; iterate directly over the file object ('for line in file: yield line').",
    explanation: "Streaming file I/O fundamentals.",
    hint: "Iterate over the file object directly to stream lines with O(1) RAM.",
    level: "basic",
    codeExample: "def file_stream(path): with open(path) as f: yield from f"
  },
  {
    question: "What is 'Pipeline Idempotency'?",
    shortAnswer: "A pipeline is idempotent if running it multiple times on the same input dataset produces the exact same output without duplicate side-effects, corrupted balances, or repeated records.",
    explanation: "Safe retryability and fault-tolerance.",
    hint: "Running the pipeline repeatedly on the same data produces identical results safely.",
    level: "moderate",
    codeExample: "# Idempotent pipeline with deduplication keys"
  },
  {
    question: "How do you batch a generator stream into chunks of N records using itertools?",
    shortAnswer: "Using 'iter = iter(stream)' and repeatedly calling 'list(itertools.islice(iter, N))' until the chunk is empty (or 'itertools.batched()' in Python 3.12+).",
    explanation: "Stream batching for bulk database updates.",
    hint: "Use itertools.batched(stream, n) in Python 3.12+ or islice in older versions.",
    level: "moderate",
    codeExample: "import itertools\nfor batch in itertools.batched(stream, 100): process_batch(batch)"
  },
  {
    question: "How do you implement pipeline telemetry and metrics tracking?",
    shortAnswer: "Maintain a lightweight metrics dictionary (e.g. '{'ingested': 0, 'cleared': 0, 'quarantined': 0}') updated as records pass through intermediate validation filters.",
    explanation: "Real-time pipeline observability.",
    hint: "Increment telemetry counters as records pass through stages.",
    level: "basic",
    codeExample: "metrics['processed'] += 1"
  },
  {
    question: "What is 'Backpressure' in data streaming pipelines?",
    shortAnswer: "A flow-control mechanism where the rate of data production is regulated by the processing capacity of downstream consumers, preventing memory buffers from overflowing.",
    explanation: "Streaming backpressure management.",
    hint: "Downstream consumers regulate upstream production rate to prevent buffer overflow.",
    level: "complex",
    codeExample: "# Pull-based generators have automatic native backpressure!"
  },
  {
    question: "Why do Python generator pipelines naturally provide 'Automatic Backpressure'?",
    shortAnswer: "Because upstream generators ONLY produce the next item when downstream consumers call 'next()'; if the consumer is slow, upstream stages pause execution automatically.",
    explanation: "Inherent flow-control of Python generator iterators.",
    hint: "Upstream pauses automatically until downstream consumer calls next().",
    level: "moderate",
    codeExample: "# Automatic pull-based backpressure in Python generators"
  },
  {
    question: "How do you inject external configurations (like tax rates or discount percentages) into pipeline stages cleanly?",
    shortAnswer: "Use default keyword arguments in generator functions or 'functools.partial' to bind configuration parameters prior to pipeline construction.",
    explanation: "Configuration parameterization for pipeline stages.",
    hint: "Pass configuration as default arguments or use functools.partial.",
    level: "basic",
    codeExample: "def apply_tax(stream, tax_rate=0.18): ..."
  },
  {
    question: "How do you profile the memory consumption of a generator pipeline versus a list comprehension pipeline?",
    shortAnswer: "Using the 'tracemalloc' standard library module to measure peak memory allocation ('tracemalloc.get_traced_memory()').",
    explanation: "Memory profiling in Python.",
    hint: "Use tracemalloc.start() and tracemalloc.get_traced_memory().",
    level: "moderate",
    codeExample: "import tracemalloc\ntracemalloc.start(); current, peak = tracemalloc.get_traced_memory()"
  },
  {
    question: "How do you chain multiple transformation functions dynamically from a configuration list?",
    shortAnswer: "Using 'functools.reduce(lambda stream, func: func(stream), stages_list, initial_stream)'.",
    explanation: "Dynamic pipeline assembly via functional reduction.",
    hint: "Use functools.reduce to fold functions over the data stream.",
    level: "complex",
    codeExample: "pipeline = functools.reduce(lambda s, f: f(s), [stage1, stage2, stage3], source)"
  },
  {
    question: "What is the 'Decorator Pattern' applied to pipeline stages?",
    shortAnswer: "Wrapping individual stage generators with logging, timing, or metrics decorators without modifying the internal data transformation logic.",
    explanation: "Cross-cutting concerns in pipeline architecture.",
    hint: "Using decorators to add timing, metrics, and error logging to pipeline stages.",
    level: "moderate",
    codeExample: "@log_pipeline_stage\ndef stage_clean(stream): ..."
  },
  {
    question: "How do you ensure resources (like open database connections or file handles) are closed properly in streaming pipelines?",
    shortAnswer: "Use context managers ('with open(...) as f:') within the generator, or use 'generator.close()' and 'try...finally' blocks inside generator definitions.",
    explanation: "Resource lifecycle safety in streaming generators.",
    hint: "Use context managers or try...finally blocks inside generator functions.",
    level: "moderate",
    codeExample: "def stream(path): with open(path) as f: for l in f: yield l"
  },
  {
    question: "How do you write unit tests for individual pipeline stages in isolation?",
    shortAnswer: "Pass a small static list to the stage function and assert on the materialized list of output items: 'assert list(stage_clean([mock_record])) == [expected_record]'.",
    explanation: "Isolated unit testing of generator stages.",
    hint: "Pass a mock list to the generator stage and assert on list(stage_func(mock_data)).",
    level: "basic",
    codeExample: "assert list(stage_tax([{'fee': 100}])) == [{'fee': 100, 'tax': 18}]"
  },
  {
    question: "What is the difference between 'Data Enrichment' and 'Data Filtering' in a pipeline?",
    shortAnswer: "Data Filtering removes non-qualifying records based on predicates (reducing stream length); Data Enrichment adds or modifies attributes without changing record count.",
    explanation: "Core ETL transformation categories.",
    hint: "Filtering selects records; enrichment appends or calculates new fields.",
    level: "basic",
    codeExample: "# Filter: if x['valid']: yield x; Enrich: yield {**x, 'tax': x['fee']*0.18}"
  },
  {
    question: "How do you convert a synchronous generator pipeline into an asynchronous streaming pipeline?",
    shortAnswer: "Use 'async def' and 'async for' to build an 'AsyncIterator' pipeline that yields data over network sockets without blocking the asyncio event loop.",
    explanation: "Asynchronous stream processing with asyncio.",
    hint: "Use async def and async for to yield items asynchronously.",
    level: "complex",
    codeExample: "async def async_stage(stream): async for item in stream: yield item"
  },
  {
    question: "Why should you avoid catching broad 'Exception' without logging or quarantining in pipeline stages?",
    shortAnswer: "Silently ignoring exceptions masks bugs, swallows fatal syntax/logic errors, and creates phantom data loss where records vanish without audit trails.",
    explanation: "Anti-pattern of silent exception suppression.",
    hint: "Always log or quarantine caught exceptions to prevent silent data loss.",
    level: "basic",
    codeExample: "# BAD: except: pass -> GOOD: except Exception as e: dlq.append({'err': str(e)})"
  },
  {
    question: "How do you implement schema normalization for inconsistent field names (e.g. 'student_name' vs 'Name')?",
    shortAnswer: "Use an aliasing lookup map in the ingestion stage to map all alternative key names to standard canonical schema keys.",
    explanation: "Schema normalization in ETL pipelines.",
    hint: "Map alternative key names to canonical field names in ingestion stage.",
    level: "basic",
    codeExample: "name = r.get('name') or r.get('student_name') or r.get('Name')"
  },
  {
    question: "What is the ultimate golden rule for building clean data transformation pipelines in Python?",
    shortAnswer: "Compose modular, single-responsibility generator stages that stream with O(1) memory, intercept errors gracefully via Dead-Letter Queues (DLQs), use pure functions for transformations, and maintain comprehensive telemetry.",
    explanation: "The complete enterprise guideline for production data transformation pipelines in Python.",
    hint: "Modular O(1) generator stages, DLQ error resilience, pure functions, and telemetry metrics.",
    level: "basic",
    codeExample: "# Python Data Transformation Pipeline Mastery"
  }
];

export default questions;
