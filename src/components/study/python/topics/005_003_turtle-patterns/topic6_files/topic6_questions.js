// src/components/study/python/topics/005_003_turtle-patterns/topic6_files/topic6_questions.js

const questions = [
  {
    question: "Why does unoptimized Turtle graphics take minutes to draw 5,000 segments?",
    shortAnswer: "Because default settings animate every individual segment with a timer delay and repaint the canvas and cursor on every step.",
    explanation: "Per-step canvas repaints introduce substantial overhead in large loops.",
    hint: "What causes default Turtle animation slowdown?",
    level: "basic",
    codeExample: "# Unoptimized default delay per step"
  },
  {
    question: "What does `screen.tracer(0)` do?",
    shortAnswer: "Disables automatic canvas screen updates entirely, buffering all drawing in memory.",
    explanation: "Drawing actions execute at pure C/Python CPU memory speeds without intermediate GUI repaints.",
    hint: "What function turns off auto screen refreshes?",
    level: "basic",
    codeExample: "screen.tracer(0)"
  },
  {
    question: "What function must be called to display the buffered drawing when `screen.tracer(0)` is active?",
    shortAnswer: "`screen.update()`.",
    explanation: "`screen.update()` forces an immediate buffer flush and renders the completed artwork on screen.",
    hint: "What function flushes buffered drawings to screen?",
    level: "basic",
    codeExample: "screen.update()"
  },
  {
    question: "Why does `t.hideturtle()` improve rendering performance?",
    shortAnswer: "Because it eliminates the computational cost of rotating, translating, and repainting the turtle cursor sprite on every motion.",
    explanation: "Rendering cursor polygon geometry across thousands of steps wastes CPU cycles.",
    hint: "How does hiding the turtle cursor speed up loops?",
    level: "basic",
    codeExample: "t.hideturtle()"
  },
  {
    question: "What does `screen.tracer(50)` do?",
    shortAnswer: "Refreshes the canvas once every 50 drawing operations.",
    explanation: "Batching draw calls balances live progressive animation with high rendering speed.",
    hint: "How do you update screen every 50 steps?",
    level: "moderate",
    codeExample: "screen.tracer(50)  # Update every 50 draw calls"
  },
  {
    question: "What is the speed difference between `speed(0)` and `screen.tracer(0)`?",
    shortAnswer: "`speed(0)` removes timer delays but still redraws every step; `screen.tracer(0)` disables redraws completely (100x to 1000x faster).",
    explanation: "`tracer(0)` operates at the GUI event loop buffer level, far surpassing `speed(0)`.",
    hint: "Which is faster: speed(0) or screen.tracer(0)?",
    level: "moderate",
    codeExample: "# speed(0) = 0ms delay | tracer(0) = zero redraws"
  },
  {
    question: "Why is creating new `turtle.Turtle()` instances inside an animation loop considered an anti-pattern?",
    shortAnswer: "It causes memory leaks and triggers heavy garbage collector (GC) pauses as thousands of objects are allocated and discarded.",
    explanation: "Object allocation in tight loops exhausts memory and causes frame stutter.",
    hint: "Why should you avoid new Turtle() inside loops?",
    level: "moderate",
    codeExample: "# BAD: for _ in range(100): t = turtle.Turtle()\n# GOOD: Reuse a single t instance"
  },
  {
    question: "What is the difference between `t.clear()` and `t.reset()` in optimization?",
    shortAnswer: "`t.clear()` erases the drawings while preserving pen settings, position, and speed; `t.reset()` restores all default settings and re-centers the turtle.",
    explanation: "`clear()` is much faster for frame-by-frame animations because it preserves configured state.",
    hint: "Which method preserves pen configurations when erasing canvas?",
    level: "moderate",
    codeExample: "t.clear()  # Keeps settings\nt.reset()  # Full factory reset"
  },
  {
    question: "How do you measure execution time of a Turtle pattern accurately in Python?",
    shortAnswer: "Use `time.perf_counter()` before the loop and after `screen.update()`.",
    explanation: "`perf_counter()` provides the highest available resolution monotonic clock for benchmarking.",
    hint: "Which standard library function provides high-resolution timing?",
    level: "basic",
    codeExample: "import time\nt0 = time.perf_counter()\n# ... draw ...\nelapsed = time.perf_counter() - t0"
  },
  {
    question: "What is the Object Pool pattern in computational graphics?",
    shortAnswer: "Pre-allocating a fixed set of reusable graphical objects (e.g. 5 turtles) instead of constantly creating and destroying them.",
    explanation: "Eliminates dynamic memory allocation overhead during live rendering.",
    hint: "What design pattern recycles pre-created objects?",
    level: "advanced",
    codeExample: "# Object pool of reusable turtles"
  },
  {
    question: "How does precomputing trigonometric tables (Look-Up Tables / LUT) optimize math in loops?",
    shortAnswer: "Storing `sin()` and `cos()` in an array before looping avoids recalculating expensive transcendental functions on every step.",
    explanation: "Array lookups are significantly faster than computing trigonometric series repeatedly.",
    hint: "How do precalculated sine tables accelerate rendering?",
    level: "advanced",
    codeExample: "sin_lut = [math.sin(i * rad) for i in range(360)]"
  },
  {
    question: "How do you achieve a stable 60 FPS animation loop in Python Turtle?",
    shortAnswer: "In each frame: `t.clear()`, draw frame, `screen.update()`, and sleep `max(0, 0.0166 - elapsed_time)`.",
    explanation: "Frame delta time compensation caps rendering at 16.6 milliseconds per frame (60 FPS).",
    hint: "What target frame duration corresponds to 60 FPS?",
    level: "advanced",
    codeExample: "time.sleep(1/60)"
  },
  {
    question: "Why should `penup()` and `pendown()` calls be minimized in high-iteration loops?",
    shortAnswer: "Toggling pen state alters internal Tkinter canvas line segment groups, creating extra path management overhead.",
    explanation: "Continuous polyline drawing is more cache-friendly than thousands of disjoint pen toggles.",
    hint: "How does excessive pen state toggling affect performance?",
    level: "moderate",
    codeExample: "# Prefer continuous polylines over fragmented penup/pendown"
  },
  {
    question: "How does list comprehension coordinate generation improve performance over incremental turtle movement?",
    shortAnswer: "Calculating all `(x, y)` tuples in Python byte-code first and calling `t.goto()` directly reduces state transitions.",
    explanation: "Vectorized data-driven geometry is faster than procedural step-by-step turns.",
    hint: "Why is batch coordinate generation faster?",
    level: "advanced",
    codeExample: "pts = [(i*2, math.sin(i)*50) for i in range(500)]"
  },
  {
    question: "What is the memory footprint of 10,000 drawn lines in Tkinter canvas?",
    shortAnswer: "Each line creates a Tkinter canvas item (~100-200 bytes), totaling 1-2 MB of RAM.",
    explanation: "Using `turtle.clearscreen()` releases canvas items from memory.",
    hint: "How does canvas item count impact memory?",
    level: "advanced",
    codeExample: "# 10,000 items in Tk canvas"
  },
  {
    question: "How does Python's GIL (Global Interpreter Lock) affect Turtle Graphics multi-threading?",
    shortAnswer: "Turtle (Tkinter) GUI calls MUST run on the main thread; worker threads can calculate math coordinates but cannot directly invoke `turtle` methods.",
    explanation: "Tkinter is not thread-safe and will crash if called from background worker threads.",
    hint: "Can background threads call Turtle drawing functions directly?",
    level: "expert",
    codeExample: "# Tkinter calls must remain on the main thread"
  },
  {
    question: "What is Spatial Culling in large-scale geometric rendering?",
    shortAnswer: "Skipping drawing operations for shapes that lie completely outside the visible canvas viewport boundaries.",
    explanation: "Discarding off-screen geometry saves CPU and GPU drawing time.",
    hint: "What optimization skips drawing off-screen objects?",
    level: "expert",
    codeExample: "if abs(x) > width/2 or abs(y) > height/2: continue"
  },
  {
    question: "How do you optimize color operations inside tight loops?",
    shortAnswer: "Pre-compute a palette list `palette = [colorsys.hsv_to_rgb(i/N, 1, 1) for i in range(N)]` and index `palette[i]`.",
    explanation: "Table lookups avoid calling `colorsys.hsv_to_rgb()` repeatedly inside the inner drawing loop.",
    hint: "How do precomputed palette arrays avoid repeated color calculations?",
    level: "moderate",
    codeExample: "t.color(cached_palette[i % len(cached_palette)])"
  },
  {
    question: "What is double buffering in screen rendering?",
    shortAnswer: "Rendering into an invisible back-buffer and swapping to the front display buffer in a single atomic operation.",
    explanation: "`screen.tracer(0)` and `screen.update()` implement software double buffering in Turtle.",
    hint: "What technique prevents screen tearing and flickering during animation?",
    level: "moderate",
    codeExample: "# Front-buffer / Back-buffer swapping"
  },
  {
    question: "Why should `print()` statements inside 1,000+ iteration loops be avoided in production?",
    shortAnswer: "Terminal I/O is blocking and extremely slow; thousands of `print()` calls can degrade performance by 10x or more.",
    explanation: "Flushing standard output to console stalls CPU execution pipelines.",
    hint: "Why does excessive console logging kill loop performance?",
    level: "basic",
    codeExample: "# Avoid print() in high-frequency loops"
  },
  {
    question: "How does `turtle.screensize(w, h)` affect canvas memory?",
    shortAnswer: "Larger virtual screen sizes expand the scrollable canvas buffer, increasing memory consumption.",
    explanation: "Keep screensize close to actual window dimensions for optimal memory efficiency.",
    hint: "Does a larger screensize consume more memory?",
    level: "moderate",
    codeExample: "screen.screensize(800, 600)"
  },
  {
    question: "How do you profile memory usage in Python Turtle scripts?",
    shortAnswer: "Use Python's `tracemalloc` standard library module to measure peak memory allocations.",
    explanation: "`tracemalloc.get_traced_memory()` reports current and peak RAM consumption in bytes.",
    hint: "What built-in module tracks Python memory allocation?",
    level: "advanced",
    codeExample: "import tracemalloc\ntracemalloc.start()\n# ... run ...\ncurrent, peak = tracemalloc.get_traced_memory()"
  },
  {
    question: "How can Generator expressions save memory when streaming complex parametric curve coordinates?",
    shortAnswer: "Generators compute coordinates on the fly with O(1) memory instead of storing thousands of points in large lists.",
    explanation: "Lazy evaluation prevents massive memory footprint spikes.",
    hint: "Why do generators use O(1) memory for coordinate streams?",
    level: "advanced",
    codeExample: "def coord_stream(n): for i in range(n): yield (i*2, math.sin(i)*50)"
  },
  {
    question: "What is the computational complexity of drawing N segments with `screen.tracer(0)`?",
    shortAnswer: "O(N) linear time, with minimal per-operation constant factor overhead.",
    explanation: "Eliminating GUI repaints reduces the constant factor `c` in `c * N` from ~20ms to ~0.005ms.",
    hint: "How does tracer(0) reduce the constant factor in O(N)?",
    level: "moderate",
    codeExample: "# O(N) with microsecond constant factor"
  },
  {
    question: "How do you draw 50,000 particles without freezing the GUI window?",
    shortAnswer: "Chunk drawing into batches using `screen.ontimer(draw_next_batch, 1)` to yield control back to the Tk event loop.",
    explanation: "Asynchronous batching allows the window to process click/close events during long renders.",
    hint: "How does screen.ontimer() prevent window freezing during heavy tasks?",
    level: "expert",
    codeExample: "screen.ontimer(draw_batch, 10)"
  },
  {
    question: "How does line thickness `pensize()` affect rasterization speed?",
    shortAnswer: "Thick lines (>10px) require polygon antialiasing and cap tessellation, which is slower than 1px hairline rendering.",
    explanation: "Wide strokes generate more raster fragments during GPU/CPU rasterization.",
    hint: "Why are thin 1px lines faster to render than thick 15px strokes?",
    level: "moderate",
    codeExample: "t.pensize(1)  # Fastest rasterization"
  },
  {
    question: "What is the Garbage Collection threshold in Python?",
    shortAnswer: "The internal counter of allocations vs deallocations across generations 0, 1, and 2 before Python initiates automatic collection.",
    explanation: "`gc.disable()` can temporarily suppress GC during time-critical animation frames.",
    hint: "What standard module controls Python's garbage collector?",
    level: "expert",
    codeExample: "import gc; gc.disable()"
  },
  {
    question: "How does vector math compare between raw Python loops and NumPy arrays for Turtle coordinate preparation?",
    shortAnswer: "NumPy performs vectorized SIMD coordinate transformations 50-100x faster than pure Python loops.",
    explanation: "NumPy calculates trigonometric arrays in compiled C before passing to Turtle.",
    hint: "Why is NumPy faster for computing 10,000 coordinates?",
    level: "expert",
    codeExample: "# NumPy SIMD vectorization"
  },
  {
    question: "What is the recommended benchmark protocol for testing graphical optimizations?",
    shortAnswer: "Run 5 iterations with `time.perf_counter()`, discard the first (warmup), and average the remaining 4 runs.",
    explanation: "Standard statistical benchmarking protocol prevents JIT and cache anomalies.",
    hint: "Why discard the first warmup run in benchmarking?",
    level: "advanced",
    codeExample: "# Average across multiple benchmark iterations"
  },
  {
    question: "What is the ultimate 4-step checklist for maximum Turtle graphics performance?",
    shortAnswer: "1. `screen.tracer(0)` | 2. `t.hideturtle()` | 3. Cache math/palette calculations | 4. Single `screen.update()` at end.",
    explanation: "Applying this 4-step framework guarantees sub-second rendering across complex procedural geometries.",
    hint: "What 4 steps maximize Turtle graphics execution speed?",
    level: "basic",
    codeExample: "# 1. tracer(0) | 2. hideturtle() | 3. cache math | 4. update()"
  }
];

export default questions;
