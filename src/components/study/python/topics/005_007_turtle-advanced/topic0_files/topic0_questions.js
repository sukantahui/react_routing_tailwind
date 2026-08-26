// src/components/study/python/topics/005_007_turtle-advanced/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is Recursion in computer programming?",
    shortAnswer: "A technique where a function solves a problem by calling a smaller instance of itself until reaching a base termination condition.",
    explanation: "Recursion breaks complex problems down into identical smaller subproblems.",
    hint: "What is a function calling itself called?",
    level: "basic",
    codeExample: "def draw(size):\n    if size < 5: return\n    t.forward(size)\n    draw(size * 0.8)"
  },
  {
    question: "What is the Base Case in a recursive function?",
    shortAnswer: "The terminating condition that stops further recursive calls and begins unwinding the call stack.",
    explanation: "Without a base case, recursion runs infinitely until memory is exhausted.",
    hint: "What stops recursion from running forever?",
    level: "basic",
    codeExample: "if depth <= 0: return  # Base Case"
  },
  {
    question: "What is Self-Similarity in fractal geometry?",
    shortAnswer: "The property where a small subsection of a shape looks identical or statistically similar to the whole overall structure.",
    explanation: "Self-similarity is the mathematical hallmark of fractals like trees, ferns, and snowflakes.",
    hint: "What term describes shapes containing smaller copies of themselves?",
    level: "basic",
    codeExample: "# Fractals exhibit infinite self-similarity"
  },
  {
    question: "What happens if a recursive function forgets its base case in Python?",
    shortAnswer: "Python raises `RecursionError: maximum recursion depth exceeded` when the call stack reaches its limit (~1000 frames).",
    explanation: "Python prevents stack overflow crashes by capping maximum recursion depth.",
    hint: "What error occurs when recursion has no base case in Python?",
    level: "basic",
    codeExample: "# RecursionError: maximum recursion depth exceeded"
  },
  {
    question: "What is the Call Stack in computer memory?",
    shortAnswer: "A LIFO (Last-In, First-Out) memory stack that stores active function call frames, local variables, and return addresses.",
    explanation: "Each recursive call pushes a new frame onto the top of the call stack.",
    hint: "What data structure manages active function invocations in memory?",
    level: "moderate",
    codeExample: "# Call Stack: Frame 3 -> Frame 2 -> Frame 1 -> Main"
  },
  {
    question: "What is the Winding Phase vs Unwinding Phase in recursion?",
    shortAnswer: "Winding is when calls dive deeper, pushing frames onto the stack; unwinding is when returns bubble back up after reaching the base case.",
    explanation: "Understanding winding vs unwinding enables advanced post-order drawing algorithms.",
    hint: "What are the two phases of diving into and returning from recursion?",
    level: "moderate",
    codeExample: "# Winding: pre-order draw | Unwinding: post-order cleanup"
  },
  {
    question: "How do you ensure a recursive graphical function always terminates?",
    shortAnswer: "Pass a shrinking parameter (e.g. `size * 0.7` or `depth - 1`) that strictly approaches the base case threshold.",
    explanation: "Monotonic reduction toward the base condition guarantees termination.",
    hint: "How must recursive arguments change on each successive call?",
    level: "basic",
    codeExample: "draw_shape(size * 0.75, depth - 1)"
  },
  {
    question: "What is Tree Recursion vs Linear Recursion?",
    shortAnswer: "Linear recursion makes 1 recursive call per frame (e.g. spiral); tree recursion makes 2 or more recursive calls per frame (e.g. fractal tree, branching 2^N).",
    explanation: "Tree recursion exhibits exponential call graph branching.",
    hint: "How does branching into 2 child calls differ from a single linear call?",
    level: "moderate",
    codeExample: "# Tree Recursion:\ndraw_branch(left)\ndraw_branch(right)"
  },
  {
    question: "What is the total number of function calls in a binary tree recursion of depth `N`?",
    shortAnswer: "`2^(N+1) - 1` total calls (e.g., depth 5 makes 63 calls, depth 10 makes 2047 calls).",
    explanation: "Exponential geometric growth dictates recursive computational cost.",
    hint: "What is the formula for total nodes in a full binary tree of depth N?",
    level: "advanced",
    codeExample: "# Total calls = 2^(N+1) - 1"
  },
  {
    question: "What is the default recursion depth limit in standard Python?",
    shortAnswer: "1000 frames (inspectable via `sys.getrecursionlimit()`).",
    explanation: "Can be adjusted with `sys.setrecursionlimit(n)` if needed.",
    hint: "What is Python's default recursion limit?",
    level: "moderate",
    codeExample: "import sys; print(sys.getrecursionlimit())  # 1000"
  },
  {
    question: "How do nested concentric squares demonstrate recursion visually?",
    shortAnswer: "Each square draws its 4 sides, shifts coordinate origin, and calls itself with `size * 0.8` until size is smaller than 10 pixels.",
    explanation: "Provides an intuitive visual metaphor for nested call frames.",
    hint: "How do shrinking squares illustrate recursion?",
    level: "basic",
    codeExample: "t.forward(size); draw_nested(size * 0.8)"
  },
  {
    question: "What is Tail Recursion?",
    shortAnswer: "A recursive call that is the very last instruction executed in the function, with no operations remaining after return.",
    explanation: "Some compilers optimize tail recursion into iterative loops (Tail Call Optimization).",
    hint: "What is recursion where the call is the final statement in the function?",
    level: "advanced",
    codeExample: "def tail_fn(n): if n<=0: return; tail_fn(n-1)"
  },
  {
    question: "Does CPython (standard Python) perform Tail Call Optimization (TCO)?",
    shortAnswer: "No, Guido van Rossum deliberately omitted TCO from Python to preserve full stack traces for debugging.",
    explanation: "Every recursive call consumes a call stack frame in Python.",
    hint: "Does Python automatically optimize tail recursive calls?",
    level: "advanced",
    codeExample: "# CPython does not optimize tail calls"
  },
  {
    question: "Why should `t.speed(0)` or `screen.tracer(0)` be used for deep recursive fractal rendering?",
    shortAnswer: "Because a fractal with 1,000+ branches would take several minutes to draw with standard Turtle animation delays.",
    explanation: "`tracer(0)` renders complex fractals instantaneously.",
    hint: "Why is tracer(0) required for drawing deep fractal trees?",
    level: "basic",
    codeExample: "screen.tracer(0); draw_fractal(); screen.update()"
  },
  {
    question: "What is the Call Stack Frame in Python?",
    shortAnswer: "An internal memory block storing a function's arguments, local variables, and the return execution pointer.",
    explanation: "Understanding stack frames demystifies how local variables remain preserved across recursive calls.",
    hint: "What memory block holds local variables for each function invocation?",
    level: "moderate",
    codeExample: "# Stack frame holds local parameters per call"
  },
  {
    question: "How do you preserve the turtle's position and heading during multi-branch recursion?",
    shortAnswer: "Record `pos = t.pos()` and `head = t.heading()` before calling children, restoring with `t.goto(pos); t.setheading(head)` afterwards.",
    explanation: "State restoration ensures the parent turtle returns to its branching joint.",
    hint: "How do you return the turtle to its branch origin after exploring child branches?",
    level: "moderate",
    codeExample: "pos = t.pos(); head = t.heading()\ndraw_left(); t.goto(pos); t.setheading(head)"
  },
  {
    question: "What is the difference between Iteration (loops) and Recursion?",
    shortAnswer: "Iteration repeats statements using loop control (`for`/`while`); recursion repeats by invoking function instances on the call stack.",
    explanation: "Any iterative algorithm can be written recursively and vice-versa (Church-Turing thesis).",
    hint: "How does loop iteration compare to recursive function calls?",
    level: "basic",
    codeExample: "# Iteration: for i in range(n) | Recursion: fn(n-1)"
  },
  {
    question: "When is Recursion mathematically cleaner than Iteration?",
    shortAnswer: "For hierarchical, branching, or nested structures like fractal trees, DOM trees, file directories, and JSON AST parsers.",
    explanation: "Tree structures naturally map to recursive function call graphs.",
    hint: "What data structures are most naturally traversed with recursion?",
    level: "basic",
    codeExample: "# Tree traversal is naturally recursive"
  },
  {
    question: "What is a Fractal Dimension (Hausdorff Dimension)?",
    shortAnswer: "A non-integer mathematical dimension (e.g. 1.2618 for Koch curve) that measures how a fractal detail changes with scale.",
    explanation: "Fractal geometry bridges fractional dimensions between 1D lines and 2D planes.",
    hint: "What mathematical metric measures fractional geometric complexity?",
    level: "expert",
    codeExample: "# Koch Snowflake Dimension D = log(4)/log(3) ≈ 1.2618"
  },
  {
    question: "How do you create a color gradient that shifts with recursion depth?",
    shortAnswer: "Index a color palette using the recursion depth: `color = palette[depth % len(palette)]`.",
    explanation: "Visual depth coloring highlights fractal hierarchy clearly.",
    hint: "How are branch colors varied by recursive depth?",
    level: "basic",
    codeExample: "t.color(colors[depth % len(colors)])"
  },
  {
    question: "What is Depth-First Traversal in recursive drawing?",
    shortAnswer: "The turtle fully explores one branch all the way down to its base case before backing up to explore neighboring sibling branches.",
    explanation: "Natural consequence of call stack execution order.",
    hint: "In what order does recursion explore branches?",
    level: "moderate",
    codeExample: "# Depth-first branch traversal"
  },
  {
    question: "How does drawing on the unwinding phase differ from drawing on the winding phase?",
    shortAnswer: "Winding draws before the recursive call (top-down / trunk-to-leaves); unwinding draws after the recursive call (bottom-up / leaves-to-trunk).",
    explanation: "Pre-order vs Post-order execution control.",
    hint: "How does placing drawing commands after the recursive call affect rendering?",
    level: "advanced",
    codeExample: "# Pre-order: draw -> recurse | Post-order: recurse -> draw"
  },
  {
    question: "What is Memoization in recursive algorithms?",
    shortAnswer: "Caching results of expensive recursive calls in a lookup table/dict to avoid recomputing identical subproblems (e.g. `@functools.lru_cache`).",
    explanation: "Turns exponential `O(2^N)` recursive algorithms into linear `O(N)` dynamic programming.",
    hint: "What optimization technique caches recursive results?",
    level: "advanced",
    codeExample: "from functools import lru_cache\n@lru_cache(maxsize=None)"
  },
  {
    question: "How do you animate a recursive fractal growing step-by-step in Turtle?",
    shortAnswer: "Use `screen.ontimer()` to schedule each recursive call at 50ms intervals rather than executing all depth instantly.",
    explanation: "Asynchronous step scheduling produces captivating growth animations.",
    hint: "How do you animate fractal growth step-by-step?",
    level: "advanced",
    codeExample: "screen.ontimer(lambda: draw_next_branch(depth+1), 50)"
  },
  {
    question: "What is Mutual Recursion?",
    shortAnswer: "When function A calls function B, and function B in turn calls function A (e.g. Lindenmayer L-System curve generators).",
    explanation: "Mutual recursion models complex interlocking fractal curves like Hilbert and Peano curves.",
    hint: "What is recursion where two functions call each other?",
    level: "expert",
    codeExample: "def fn_a(): fn_b()\ndef fn_b(): fn_a()"
  },
  {
    question: "Why does recursive line thickness reduction (`t.pensize(depth)`) make fractal trees look realistic?",
    shortAnswer: "Because it mimics natural biological tree growth where tree trunks are thick and higher-order twigs are progressively thinner.",
    explanation: "Depth-scaled line width simulates botanical trunk-to-twig tapering.",
    hint: "How does scaling pen width with depth enhance botanical realism?",
    level: "basic",
    codeExample: "t.pensize(depth * 1.5)"
  },
  {
    question: "What is the Space Complexity of a recursive function with depth `D`?",
    shortAnswer: "`O(D)` memory space on the Call Stack.",
    explanation: "Memory is proportional to the maximum simultaneous stack frame depth.",
    hint: "What is the big-O memory footprint of recursion depth D?",
    level: "moderate",
    codeExample: "# Space Complexity = O(D) stack frames"
  },
  {
    question: "What is the 3-step Golden Rule for Designing Recursive Functions in Python Turtle?",
    shortAnswer: "1. Define a clear Base Case guard | 2. Perform graphical drawing in winding/unwinding phase | 3. Make recursive calls with strictly reduced arguments.",
    explanation: "This 3-step blueprint guarantees mathematically sound, terminating recursive visual algorithms.",
    hint: "What 3 steps construct any recursive drawing function?",
    level: "basic",
    codeExample: "# 1. if base_case: return -> 2. Draw -> 3. recurse(size*0.7, depth-1)"
  },
  {
    question: "How does learning visual recursion prepare students for advanced Data Structures and Algorithms (DSA)?",
    shortAnswer: "Because visual recursion builds profound mental intuition for Binary Trees, Trie structures, Merge Sort, Quick Sort, Graphs (DFS), and Backtracking.",
    explanation: "Visualizing recursion is the single most effective way to master algorithmic problem solving.",
    hint: "How does visual recursion connect to sorting algorithms and tree traversals?",
    level: "basic",
    codeExample: "# Foundational intuition for Trees, DFS, and Divide & Conquer"
  },
  {
    question: "Why are fractals found everywhere in nature (ferns, river deltas, blood vessels, lightning)?",
    shortAnswer: "Because simple recursive DNA/physical rules allow nature to generate infinite surface area and optimal branching networks using minimal genetic code.",
    explanation: "Nature uses recursive algorithms to optimize nutrient and energy transport.",
    hint: "Why does biological nature utilize fractal branching networks?",
    level: "basic",
    codeExample: "# Nature's optimal recursive branching architecture"
  }
];

export default questions;
