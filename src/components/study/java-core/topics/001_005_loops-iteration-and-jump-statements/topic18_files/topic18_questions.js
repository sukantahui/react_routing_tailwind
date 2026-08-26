/**
 * Module 001_005: Topic 18: Loop performance best practices: avoiding expensive method calls in termination conditions
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is 'Loop Invariant Code Motion' (Loop Hoisting)?",
    shortAnswer: "A compiler and design optimization that moves computations whose results do not change across iterations OUT of the loop body or termination condition.",
    explanation: "Prevents recalculating the same value on every cycle.",
    hint: "Moving invariant computations outside the loop.",
    level: "basic",
    codeExample: "int len = list.size(); for (int i = 0; i < len; i++) { }"
  },
  {
    question: "Why is writing `for (int i = 0; i < list.size(); i++)` considered a performance anti-pattern in large loops?",
    shortAnswer: "Because `list.size()` is invoked and evaluated on EVERY single iteration ($N$ times); if the list size is static, caching it in the header (`int len = list.size()`) evaluates it only once.",
    explanation: "Eliminates $N-1$ redundant method calls.",
    hint: "Evaluates list.size() N times instead of once.",
    level: "basic",
    codeExample: "for (int i = 0, len = list.size(); i < len; i++) { }"
  },
  {
    question: "What is HotSpot JIT 'Bounds Check Elimination' (BCE)?",
    shortAnswer: "An optimization where the C2 JIT compiler mathematically proves that array index $i$ cannot exceed `arr.length - 1`, completely removing CPU boundary check instructions from machine code.",
    explanation: "Boosts array traversal throughput to peak hardware speed.",
    hint: "Compiler eliminates runtime array boundary checks when bounds are provably safe.",
    level: "advanced",
    codeExample: "for (int i = 0; i < arr.length; i++) sum += arr[i]; // JIT removes bounds check!"
  },
  {
    question: "What is HotSpot JIT 'Loop Unrolling'?",
    shortAnswer: "An optimization where the compiler duplicates the loop body statements multiple times per iteration (e.g. processing 4 or 8 elements at once), reducing loop jump and counter increment instructions.",
    explanation: "Maximizes CPU pipeline efficiency and branch prediction.",
    hint: "Duplicating loop body statements to reduce jump instruction overhead.",
    level: "advanced",
    codeExample: "// Unrolled 4x: sum += a[i] + a[i+1] + a[i+2] + a[i+3]; i += 4;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee reconciliation engine, how is loop hoisting demonstrated?",
    shortAnswer: "By processing 100,000 student tuition entries, comparing repeated `size()` calls against cached `len = size()` and primitive array benchmarks in Indian Rupees (₹).",
    explanation: "Demonstrates enterprise high-volume batch optimization.",
    hint: "Compares 100,000 transaction iterations with and without hoisting in ₹.",
    level: "basic",
    codeExample: "for (int i=0, len=batch.size(); i<len; i++) process(batch.get(i));"
  },
  {
    question: "Why should database queries, REST API calls, or file reads NEVER be placed inside loop termination conditions?",
    shortAnswer: "Because network and disk I/O take milliseconds ($10^6$ nanoseconds) per call, causing quadratic or catastrophic network latency slowdowns.",
    explanation: "Always batch fetch data into memory before the loop.",
    hint: "I/O calls take milliseconds per iteration, destroying application throughput.",
    level: "basic",
    codeExample: "// BAD: for (int i = 0; i < db.getStudentCount(); i++) // NEVER DO THIS!"
  },
  {
    question: "What is 'Loop Inversion' in compiler optimization?",
    shortAnswer: "Transforming a pre-test `while` loop into a conditional jump followed by a post-test `do-while` loop, reducing the number of unconditional jumps executed per iteration.",
    explanation: "Standard compiler loop transformation.",
    hint: "Transforming while loops into conditional jumps with do-while structures.",
    level: "advanced",
    codeExample: "// Compiler converts while into: if(c) do { ... } while(c);"
  },
  {
    question: "How does Primitive Array iteration compare to `ArrayList<Double>` iteration in micro-benchmarks?",
    shortAnswer: "Primitive `double[]` arrays are 5x to 10x faster because they store values contiguously in CPU L1/L2 cache lines without object reference chasing or autounboxing overhead.",
    explanation: "Eliminates cache misses and heap dereferencing.",
    hint: "Primitive arrays avoid heap dereferencing and autounboxing.",
    level: "intermediate",
    codeExample: "double[] fees; // Much faster than List<Double>"
  },
  {
    question: "What is 'Loop Peeling' in compiler optimization?",
    shortAnswer: "Executing the first (or last) iteration of a loop separately outside the loop body to simplify the loop condition or optimize special boundary conditions.",
    explanation: "Eliminates conditional branches inside the main loop body.",
    hint: "Executing the first iteration separately to remove conditional checks.",
    level: "advanced",
    codeExample: "// Peels first element to avoid if (i == 0) checks inside loop"
  },
  {
    question: "Why is `String.length()` relatively inexpensive compared to custom method calls in loop conditions?",
    shortAnswer: "Because `String.length()` is a simple memory field read of an immutable `byte[]` value; however, hoisting it is still best practice for uniform clean code.",
    explanation: "Field reads are fast, but hoisting maintains consistent style.",
    hint: "String.length() is a field read, but hoisting is still recommended.",
    level: "intermediate",
    codeExample: "for (int i = 0, len = str.length(); i < len; i++) { }"
  },
  {
    question: "What is the 'Safepoint Poll' overhead in long-running Java loops?",
    shortAnswer: "The JVM inserts safepoint polling checks into non-counted loops to allow Garbage Collection and deoptimization; modern JVMs (Java 10+) optimize counted loops with Loop Safepoints.",
    explanation: "HotSpot GC pause coordination mechanism.",
    hint: "JVM checks for GC coordination during long-running loops.",
    level: "expert",
    codeExample: "// Counted loops (int i=0; i<N; i++) have optimized safepoint polls"
  },
  {
    question: "How does Java 8 Stream `.parallel()` compare to standard iterative loops for simple CPU additions?",
    shortAnswer: "For simple primitive additions on small-to-medium arrays, standard iterative loops are significantly faster due to the thread coordination and fork-join pool overhead of parallel streams.",
    explanation: "Parallel streams only benefit heavy, independent computations on very large datasets.",
    hint: "Standard iterative loops beat parallel streams on small-to-medium datasets.",
    level: "intermediate",
    codeExample: "// Iterative loops have zero thread coordination overhead"
  },
  {
    question: "What is SIMD (Single Instruction, Multiple Data) Vectorization in HotSpot C2?",
    shortAnswer: "The C2 JIT compiler automatically combines multiple scalar arithmetic operations in a loop into single 256-bit or 512-bit AVX CPU vector instructions (Superword optimization).",
    explanation: "Hardware parallelization within a single CPU core.",
    hint: "JIT uses CPU vector registers (AVX) to process multiple elements per clock cycle.",
    level: "expert",
    codeExample: "// HotSpot C2 automatically vectorizes primitive addition loops"
  },
  {
    question: "Why should developers avoid allocating objects (`new MyObject()`) inside tight high-frequency loops?",
    shortAnswer: "Because rapid heap allocations generate young-generation memory pressure, triggering frequent Young Garbage Collection (Minor GC) pauses and cache thrashing.",
    explanation: "Promotes object reuse and zero-allocation architectures.",
    hint: "Causes memory churn and frequent Minor Garbage Collection pauses.",
    level: "intermediate",
    codeExample: "// Reuse reusable buffer objects outside the loop"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the #1 rule taught for loop performance?",
    shortAnswer: "Keep the loop body focused, hoist invariants, avoid redundant method calls in headers, and measure performance with JMH (Java Microbenchmark Harness) rather than naive wall-clock timers.",
    explanation: "Scientific performance engineering discipline.",
    hint: "Hoist invariants and benchmark with JMH.",
    level: "basic",
    codeExample: "// Benchmark with JMH for accurate JVM performance numbers"
  },
  {
    question: "What is the JMH (Java Microbenchmark Harness) tool in the Java ecosystem?",
    shortAnswer: "The official OpenJDK toolkit for building, running, and analyzing nanosecond-accurate microbenchmarks, accounting for JVM warmup, JIT compilation, and dead-code elimination.",
    explanation: "Standard tool for JVM performance engineering.",
    hint: "Official OpenJDK tool for microbenchmarking and JVM performance analysis.",
    level: "advanced",
    codeExample: "@Benchmark\npublic void testLoop(Blackhole bh) { ... }"
  },
  {
    question: "What is 'Dead Code Elimination' (DCE) by the JIT compiler during loop benchmarking?",
    shortAnswer: "If a benchmark loop computes a value but never uses or returns it, the JIT compiler completely deletes the entire loop from machine code, showing a misleading 0 ns duration!",
    explanation: "Why JMH `Blackhole.consume()` is required in benchmarks.",
    hint: "JIT deletes unused loops; use JMH Blackhole to prevent elimination.",
    level: "advanced",
    codeExample: "blackhole.consume(total); // Prevents dead code elimination"
  },
  {
    question: "How does Row-Major order in 2D array nested loops prevent CPU cache line thrashing?",
    shortAnswer: "CPUs load memory in 64-byte Cache Lines; traversing `arr[r][c]` accesses sequential contiguous bytes in the loaded cache line, whereas `arr[c][r]` misses the cache on every jump.",
    explanation: "Hardware L1/L2 data cache architecture.",
    hint: "Row-major order accesses memory sequentially within 64-byte cache lines.",
    level: "advanced",
    codeExample: "for (int r=0; r<R; r++) for (int c=0; c<C; c++) arr[r][c]; // Cache friendly"
  },
  {
    question: "What is 'Branch Misprediction Penalty' in loop conditions?",
    shortAnswer: "When CPU speculative execution predicts the wrong branch in a loop, it must flush its instruction pipeline, costing 15-20 wasted CPU clock cycles per misprediction.",
    explanation: "Why sorting data before filtering loops often dramatically improves speed.",
    hint: "CPU pipeline flush cost when branch prediction fails.",
    level: "advanced",
    codeExample: "// Sorted arrays improve branch predictor accuracy"
  },
  {
    question: "Why does `for (int i = 0, len = list.size(); i < len; i++)` prevent ConcurrentModificationException when reading `ArrayList`?",
    shortAnswer: "It uses direct indexed access rather than an `Iterator`, though if the list size shrinks during iteration it will throw `IndexOutOfBoundsException`.",
    explanation: "Trade-offs between indexed access and Iterator fail-fast safety.",
    hint: "Avoids Iterator allocation, but must ensure list size is stable.",
    level: "intermediate",
    codeExample: "// Direct indexed loop avoids Iterator allocation"
  },
  {
    question: "What is 'False Sharing' in concurrent multi-threaded loops?",
    shortAnswer: "When two threads in separate loops write to different variables that happen to share the same 64-byte CPU cache line, forcing continuous cache invalidations between CPU cores.",
    explanation: "Critical multi-core performance bottleneck.",
    hint: "Independent variables sharing the same 64-byte CPU cache line causing cache invalidations.",
    level: "expert",
    codeExample: "// @Contended annotation prevents false sharing"
  },
  {
    question: "How does the `final` keyword on local variables assist the JIT compiler in loop optimization?",
    shortAnswer: "It explicitly proves immutability to the compiler, allowing the JIT to aggressively constant-fold and hoist variables with zero runtime checks.",
    explanation: "Compiler optimization hint.",
    hint: "Enables aggressive constant-folding and hoisting by the JIT.",
    level: "intermediate",
    codeExample: "final int limit = calculateLimit();\nfor (int i = 0; i < limit; i++) { }"
  },
  {
    question: "What is 'Escape Analysis' (EA) and how does it optimize objects created inside loops?",
    shortAnswer: "If the HotSpot JIT compiler proves that an object instantiated in a loop never escapes that method, it eliminates heap allocation entirely and replaces the object with scalar CPU registers (Scalar Replacement).",
    explanation: "High-performance JVM optimization.",
    hint: "JIT replaces non-escaping loop objects with scalar registers, avoiding heap allocation.",
    level: "expert",
    codeExample: "// Scalar replacement eliminates heap allocation for local objects"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking auditor, why is loop hoisting critical for tax calculations?",
    shortAnswer: "Because tax brackets and GST rates are invariant across 100,000 ledger rows; hoisting rate lookups out of the loop saves 100,000 redundant database/memory lookups in Indian Rupees (₹).",
    explanation: "Demonstrates practical enterprise financial performance tuning.",
    hint: "Hoists invariant GST tax rates outside the reconciliation loop in ₹.",
    level: "basic",
    codeExample: "final double gstRate = getGSTRate(); for (Invoice inv : list) total += inv.amount * gstRate;"
  },
  {
    question: "What is the recommended loop construct for maximum performance when index is NOT needed and collection is `ArrayList`?",
    shortAnswer: "Enhanced `for-each` or standard hoisted indexed `for` loop; both compile to identical peak assembly instructions under JIT C2.",
    explanation: "Clean code and high performance converge in modern Java.",
    hint: "Enhanced for-each and hoisted for loops compile to identical peak assembly.",
    level: "basic",
    codeExample: "for (Transaction tx : batch) process(tx);"
  },
  {
    question: "Why should developers avoid calling `Math.sin()`, `Math.cos()`, or `Math.pow()` inside loop termination conditions?",
    shortAnswer: "Trigonometric and transcendental functions execute hundreds of native floating-point CPU instructions; evaluating them per iteration slows down loops by orders of magnitude.",
    explanation: "Always pre-calculate and cache transcendental function results.",
    hint: "Transcendental math functions take hundreds of CPU cycles; hoist them outside!",
    level: "basic",
    codeExample: "double threshold = Math.sin(angle); for (int i = 0; i < threshold; i++) { }"
  },
  {
    question: "What is 'Prefetching' in CPU hardware cache controllers during loop execution?",
    shortAnswer: "CPU hardware automatically detects linear sequential memory access patterns in loops and pre-loads upcoming cache lines into L1 cache before the loop instruction requests them.",
    explanation: "Why sequential linear array traversals are virtually instantaneous.",
    hint: "Hardware pre-loads upcoming cache lines before instructions request them.",
    level: "advanced",
    codeExample: "// Hardware prefetcher accelerates linear array iterations"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 18 for Java developers?",
    shortAnswer: "High-performance loops hoist invariant expressions, cache collection sizes (`len = list.size()`), leverage primitive arrays for CPU cache locality, avoid allocations in hot paths, and rely on HotSpot JIT unrolling and bounds check elimination.",
    explanation: "The pinnacle of performance engineering in Java core loops.",
    hint: "Hoist invariants, cache sizes, leverage CPU cache locality, and let JIT unroll.",
    level: "basic",
    codeExample: "// Summary: for (int i = 0, len = size; i < len; i++) { /* Hot path */ }"
  },
  {
    question: "What is the milestone completed with Module 001_005 Topic 18?",
    shortAnswer: "100% COMPLETION of Java Core Module 001_005: Loops, Iteration Statements & Jump Controls across all 19 topics (Topics 0 through 18)!",
    explanation: "Comprehensive mastery of all iteration, nesting, pattern, number theory, and performance mechanics in Java.",
    hint: "100% completion of Module 001_005 across all 19 topics!",
    level: "basic",
    codeExample: "// Module 001_005 100% COMPLETE!"
  },
  {
    question: "What is the next Module in the Java Core roadmap?",
    shortAnswer: "Module 001_006: Arrays and Varargs (Single-dimensional arrays, multi-dimensional matrices, ragged arrays, varargs methods, Arrays utility class).",
    explanation: "The next segment module exploring array data structures and variable-length argument lists in Java.",
    hint: "Module 001_006: Arrays and Varargs.",
    level: "basic",
    codeExample: "// Next: Module 001_006 Arrays and Varargs"
  }
];

export default questions;
