// src/components/study/python/topics/004_002_performance-optimization/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Best practices for high-throughput Python applications

const questions = [
  {
    question: "What is the Global Interpreter Lock (GIL) in CPython and how does it impact multi-threading?",
    shortAnswer: "The GIL is a mutex that prevents multiple native OS threads from executing Python bytecodes simultaneously within a single CPython process, meaning multi-threading cannot achieve true CPU parallelism on multi-core processors for CPU-bound tasks.",
    explanation: "CPython GIL concurrency constraints and memory management safety.",
    hint: "The GIL allows only one thread to execute Python bytecode at any given moment.",
    level: "basic",
    codeExample: "# CPU-bound multi-threading is constrained by the GIL"
  },
  {
    question: "When should you use 'multiprocessing' instead of 'threading' in high-throughput Python systems?",
    shortAnswer: "Use 'multiprocessing' (or 'ProcessPoolExecutor') for CPU-bound tasks (complex mathematical calculations, image/video compression, data parsing, machine learning inference) because each worker process gets its own separate Python interpreter and GIL.",
    explanation: "Process-based parallelism for CPU-bound workloads.",
    hint: "Use multiprocessing for CPU-bound tasks to bypass the GIL across CPU cores.",
    level: "basic",
    codeExample: "from concurrent.futures import ProcessPoolExecutor\nwith ProcessPoolExecutor() as executor:\n    results = list(executor.map(heavy_calc, chunks))"
  },
  {
    question: "Why is 'threading' or 'asyncio' ideal for I/O-bound applications despite the GIL?",
    shortAnswer: "Because during I/O operations (network socket reads, database queries, disk file operations), CPython explicitly releases the GIL, allowing other threads or asynchronous coroutines to execute concurrently.",
    explanation: "GIL release during native I/O system calls.",
    hint: "CPython releases the GIL during network, socket, and disk I/O.",
    level: "basic",
    codeExample: "from concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=20) as executor:\n    responses = list(executor.map(fetch_api, urls))"
  },
  {
    question: "What is 'memoryview' in Python and how does it enable zero-copy buffer processing?",
    shortAnswer: "'memoryview' allows Python code to access and slice internal byte buffers (like 'bytes', 'bytearray', or socket buffers) directly using C-level pointers without creating intermediate copies of the underlying data in RAM.",
    explanation: "Zero-copy pointer slicing over binary buffer protocols.",
    hint: "memoryview creates pointer slices over existing buffers with zero RAM copying.",
    level: "moderate",
    codeExample: "mv = memoryview(large_binary_data)\nchunk = mv[1024:2048] # Zero-copy pointer slice (O(1) RAM)"
  },
  {
    question: "How does slicing a standard 'bytes' object differ from slicing a 'memoryview'?",
    shortAnswer: "Slicing a 'bytes' object ('data[100:200]') allocates a brand new bytes object in heap memory and copies all 100 bytes; slicing a 'memoryview' ('mv[100:200]') creates a lightweight view descriptor pointing to the original memory without allocating or copying bytes.",
    explanation: "Eager buffer duplication vs lightweight memory window reference.",
    hint: "Standard bytes slice copies data; memoryview slice points to existing buffer.",
    level: "moderate",
    codeExample: "# data[:1000] → Copies 1000 bytes\n# memoryview(data)[:1000] → Zero copies"
  },
  {
    question: "Why should high-throughput API services consider using 'orjson' over the standard 'json' library?",
    shortAnswer: "'orjson' is written in Rust and uses SIMD CPU vectorization, serializing and deserializing JSON 3x to 10x faster than the standard library 'json' and natively serializing dataclasses, UUIDs, and datetimes.",
    explanation: "SIMD-accelerated native JSON serialization.",
    hint: "orjson uses Rust and SIMD vectorization for 3-10x faster JSON parsing.",
    level: "moderate",
    codeExample: "import orjson\nbinary_json = orjson.dumps(student_record) # Ultra-fast serialization"
  },
  {
    question: "What is the danger of loading an entire 5GB CSV or log file into memory with 'file.read()'?",
    shortAnswer: "It causes massive RAM exhaustion, triggers aggressive OS swapping or container Out-Of-Memory (OOM) termination, and puts immense pressure on Python's garbage collector.",
    explanation: "Eager file buffer materialization vs streaming ingestion.",
    hint: "Loading large files all at once causes OOM crashes; stream line-by-line instead.",
    level: "basic",
    codeExample: "# BAD: data = f.read() # 5GB in RAM!\n# GOOD: for line in f: process(line) # O(1) RAM"
  },
  {
    question: "How does batch chunking with 'itertools.islice' improve high-throughput database insertions?",
    shortAnswer: "Grouping individual inserts into chunks of 1,000 to 5,000 records reduces database network round-trips from N down to N/batch_size, leverages multi-row SQL insert optimizations, and keeps memory bounded.",
    explanation: "Bulk batching vs single-record transactional overhead.",
    hint: "Batching turns thousands of network round-trips into a few fast bulk inserts.",
    level: "moderate",
    codeExample: "from itertools import islice\ndef chunker(it, size=1000):\n    iterator = iter(it)\n    while chunk := list(islice(iterator, size)):\n        yield chunk"
  },
  {
    question: "What is 'Connection Pooling' and why is it mandatory for high-throughput databases?",
    shortAnswer: "Connection pooling maintains a warm pool of pre-established database TCP/TLS sockets, avoiding the heavy CPU and network latency of establishing a new handshake, authentication, and teardown for every individual query.",
    explanation: "Socket reuse and TCP handshake amortization.",
    hint: "Reuses pre-authenticated database sockets instead of creating new ones per query.",
    level: "basic",
    codeExample: "# Using connection pool (e.g. psycopg_pool or SQLAlchemy pool)"
  },
  {
    question: "What is the difference between synchronous execution and asynchronous event-loop execution in 'asyncio'?",
    shortAnswer: "Synchronous code blocks the entire thread while waiting for I/O; 'asyncio' uses an event loop to pause the waiting coroutine ('await') and switch execution to other ready coroutines on the same single thread.",
    explanation: "Cooperative single-threaded multitasking via event loops.",
    hint: "asyncio uses a single thread to interleave thousands of waiting I/O coroutines.",
    level: "moderate",
    codeExample: "async def fetch_all(urls):\n    tasks = [fetch(u) for u in urls]\n    return await asyncio.gather(*tasks)"
  },
  {
    question: "Why should you avoid creating a new 'ProcessPoolExecutor' inside a frequently called function?",
    shortAnswer: "Spawning new OS processes has significant startup overhead (forking/spawning Python interpreters, importing modules, allocating process memory); process pools should be initialized once at the application level and reused.",
    explanation: "Process spawning overhead amortization.",
    hint: "Initialize process pools once globally rather than inside per-request functions.",
    level: "moderate",
    codeExample: "# GOOD: Global application executor pool\nEXECUTOR = ProcessPoolExecutor(max_workers=4)"
  },
  {
    question: "How does PyPy achieve higher execution throughput than standard CPython for long-running services?",
    shortAnswer: "PyPy includes a Just-In-Time (JIT) compiler that analyzes bytecode execution at runtime and compiles frequently executed 'hot loops' directly into native machine code, achieving 4x to 7x overall speedups.",
    explanation: "Runtime JIT tracing and native machine code compilation.",
    hint: "PyPy dynamically compiles hot loops into native machine code at runtime.",
    level: "complex",
    codeExample: "# Running standard Python code on PyPy runtime"
  },
  {
    question: "When is multi-threading in Python actually SLOWER than single-threaded execution for CPU-bound tasks?",
    shortAnswer: "When running CPU-bound tasks, multiple threads fight for the GIL, creating constant OS context-switching overhead and lock-contention thrashing without achieving any parallel execution.",
    explanation: "GIL contention thrashing in CPU-bound multi-threading.",
    hint: "Threads fight for the GIL, wasting CPU cycles on lock contention.",
    level: "moderate",
    codeExample: "# 2 threads on CPU-bound math is slower than 1 thread due to GIL contention"
  },
  {
    question: "What is 'Vectorization' and how does it bypass Python interpreter loop overhead?",
    shortAnswer: "Vectorization expresses operations on entire arrays at once using compiled C/Fortran SIMD instructions (via libraries like NumPy), performing computations at hardware register speed without Python per-element loop overhead.",
    explanation: "Hardware SIMD vector instructions vs interpreted loop cycles.",
    hint: "Vectorization performs array calculations in compiled C using SIMD instructions.",
    level: "basic",
    codeExample: "import numpy as np\n# Fast vectorized array calculation (in C):\nsquares = np_array ** 2"
  },
  {
    question: "How do you safely pass data between multiple worker processes in Python?",
    shortAnswer: "Using inter-process communication (IPC) primitives like 'multiprocessing.Queue', 'Pipe', or shared memory ('multiprocessing.shared_memory' / 'multiprocessing.Array').",
    explanation: "IPC queues, pipes, and shared memory buffers.",
    hint: "Use multiprocessing.Queue or multiprocessing.shared_memory.",
    level: "moderate",
    codeExample: "from multiprocessing import Queue, Process\nq = Queue()\np = Process(target=worker, args=(q,))"
  },
  {
    question: "What is 'Backpressure' in high-throughput streaming systems and why is it essential?",
    shortAnswer: "Backpressure is a flow-control mechanism where a downstream consumer signals the upstream producer to slow down or pause ingestion when queues fill up, preventing buffer overflow and memory crashes.",
    explanation: "Flow-control and buffer saturation protection.",
    hint: "Slows down producers when consumers cannot keep up to prevent out-of-memory crashes.",
    level: "complex",
    codeExample: "# Using bounded queue size: queue = asyncio.Queue(maxsize=1000)"
  },
  {
    question: "Why should you prefer 'concurrent.futures.ProcessPoolExecutor.map()' over spawning individual 'multiprocessing.Process' instances for batch workloads?",
    shortAnswer: "'ProcessPoolExecutor.map()' handles worker worker reuse, automatic chunking of iterables, exception propagation, and process lifecycle management cleanly without manual process join/termination code.",
    explanation: "High-level pool abstraction and task chunking.",
    hint: "Pool executors manage process lifecycle, task chunking, and worker reuse automatically.",
    level: "basic",
    codeExample: "with ProcessPoolExecutor() as p:\n    results = list(p.map(func, items, chunksize=500))"
  },
  {
    question: "What role does 'sys.setswitchinterval()' play in CPython multi-threading?",
    shortAnswer: "'sys.setswitchinterval(seconds)' configures how often CPython forces the running thread to release the GIL and allow other threads to acquire it (default is 0.005 seconds / 5 milliseconds).",
    explanation: "CPython thread scheduling timeslice configuration.",
    hint: "Sets the GIL release interval in seconds (default is 5ms).",
    level: "complex",
    codeExample: "import sys\nsys.setswitchinterval(0.01) # 10ms thread timeslice"
  },
  {
    question: "How does 'uvloop' accelerate asynchronous Python web servers (like FastAPI / Uvicorn)?",
    shortAnswer: "'uvloop' is an ultra-fast drop-in replacement for the standard library asyncio event loop written in Cython on top of 'libuv' (the C library powering Node.js), delivering 2x to 4x higher I/O throughput.",
    explanation: "libuv C event loop implementation for Python.",
    hint: "uvloop is a libuv-based drop-in asyncio event loop replacement.",
    level: "moderate",
    codeExample: "import asyncio, uvloop\nasyncio.set_event_loop_policy(uvloop.EventLoopPolicy())"
  },
  {
    question: "What is the ultimate golden rule for building high-throughput Python backend systems?",
    shortAnswer: "Use ProcessPools for CPU-bound computation, asyncio/ThreadPools for I/O, zero-copy buffers ('memoryview') for network/file streams, fast binary serialization ('orjson'), batched database queries with connection pools, and profile continuously.",
    explanation: "The complete enterprise high-throughput architectural blueprint.",
    hint: "ProcessPools for CPU math, asyncio for I/O, zero-copy buffers for streams, and bulk batching.",
    level: "basic",
    codeExample: "# Enterprise High-Throughput Python System Blueprint"
  }
];

export default questions;
