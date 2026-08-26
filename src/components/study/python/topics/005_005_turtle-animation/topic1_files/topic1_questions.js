// src/components/study/python/topics/005_005_turtle-animation/topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the primary function of `screen.tracer(0)`?",
    shortAnswer: "Disables automatic canvas screen updates, buffering all subsequent drawing commands in memory.",
    explanation: "Allows complex procedural shapes with thousands of steps to be drawn offscreen in milliseconds.",
    hint: "How do you disable automatic screen redraws in Turtle?",
    level: "basic",
    codeExample: "screen.tracer(0)"
  },
  {
    question: "What happens if a program calls `screen.tracer(0)` but forgets to call `screen.update()`?",
    shortAnswer: "The canvas remains completely blank because buffered drawing commands are never flushed to the screen.",
    explanation: "`tracer(0)` buffers everything in invisible memory; `screen.update()` is mandatory to display the result.",
    hint: "Why is the screen blank after tracer(0)?",
    level: "basic",
    codeExample: "# Blank screen without screen.update()"
  },
  {
    question: "What is the Front Buffer in computer graphics architecture?",
    shortAnswer: "The memory buffer currently being read by the display hardware and shown on the physical screen.",
    explanation: "Display monitors refresh their scanlines directly from the front buffer.",
    hint: "What buffer is visible on the monitor screen?",
    level: "basic",
    codeExample: "# Front Buffer = Visible Onscreen"
  },
  {
    question: "What is the Back Buffer in double-buffered rendering?",
    shortAnswer: "The offscreen memory area where graphics commands draw the next frame without user visibility.",
    explanation: "Drawing in the back buffer avoids flickering and intermediate drawing artifacts.",
    hint: "Where is the next frame drawn invisibly in memory?",
    level: "basic",
    codeExample: "# Back Buffer = Offscreen Invisible RAM"
  },
  {
    question: "What does the optional second argument in `screen.tracer(n, delay)` control?",
    shortAnswer: "The delay in milliseconds between automatic screen updates when `n > 0`.",
    explanation: "`tracer(n, delay)` allows tuning both batch frequency and pacing delay.",
    hint: "What does the second parameter in tracer() specify?",
    level: "moderate",
    codeExample: "screen.tracer(10, 25)  # Update every 10 ops with 25ms delay"
  },
  {
    question: "How does `screen.tracer(50)` differ from `screen.tracer(0)`?",
    shortAnswer: "`tracer(50)` auto-updates canvas every 50 draw calls; `tracer(0)` never auto-updates until `screen.update()` is called.",
    explanation: "`tracer(50)` is great for live progressive drawing; `tracer(0)` is mandatory for frame-by-frame games.",
    hint: "Which mode updates automatically every 50 operations?",
    level: "moderate",
    codeExample: "screen.tracer(50)  # Batched auto-update"
  },
  {
    question: "Why does `speed(0)` still exhibit animation lag compared to `tracer(0)`?",
    shortAnswer: "`speed(0)` removes timer delays but still repaints the canvas on every step; `tracer(0)` disables canvas repainting entirely.",
    explanation: "Canvas repaints consume significantly more CPU time than the Python instruction execution.",
    hint: "Why is tracer(0) hundreds of times faster than speed(0)?",
    level: "moderate",
    codeExample: "# speed(0) = 0ms timer delay | tracer(0) = zero canvas redraws"
  },
  {
    question: "What is an Atomic Buffer Swap?",
    shortAnswer: "An instantaneous pointer swap between front and back buffers, rendering the new frame in one unified tick.",
    explanation: "Atomic swaps prevent half-drawn shapes from appearing on the screen.",
    hint: "What do you call an instantaneous buffer swap between front and back?",
    level: "advanced",
    codeExample: "# Atomic swap via screen.update()"
  },
  {
    question: "How many draw calls can `screen.tracer(0)` execute per second compared to default Turtle?",
    shortAnswer: "Over 100,000+ operations/second with `tracer(0)` versus ~50 operations/second by default (2,000x speedup).",
    explanation: "Eliminating GUI paint events unlocks pure Python and C bytecode speeds.",
    hint: "What is the order of magnitude speedup with tracer(0)?",
    level: "basic",
    codeExample: "# 2,000x execution speedup"
  },
  {
    question: "How do you achieve progressive generative art where spirals grow in animated bursts?",
    shortAnswer: "Use `screen.tracer(100)` so the canvas refreshes every 100 segments as the spiral expands.",
    explanation: "Batching draw calls balances execution speed with satisfying live visual progression.",
    hint: "How do you refresh canvas every 100 iterations during drawing?",
    level: "moderate",
    codeExample: "screen.tracer(100)"
  },
  {
    question: "Why should `t.hideturtle()` always be paired with `screen.tracer(0)` in animation loops?",
    shortAnswer: "To prevent the engine from spending CPU time calculating cursor polygon rotation and translation.",
    explanation: "Hiding the cursor eliminates unnecessary sprite transformations.",
    hint: "Why hide the turtle cursor sprite in high-speed loops?",
    level: "basic",
    codeExample: "t.hideturtle()"
  },
  {
    question: "What happens if `screen.update()` is placed INSIDE the inner loop of a complex shape instead of after the frame?",
    shortAnswer: "The screen repaints multiple times per frame, re-introducing lag and defeating the purpose of double buffering.",
    explanation: "`screen.update()` should be called exactly ONCE per animation frame.",
    hint: "How many times per frame should screen.update() be called?",
    level: "moderate",
    codeExample: "# Call screen.update() once per frame cycle"
  },
  {
    question: "How do you re-enable default automatic screen updates after finishing a fast drawing?",
    shortAnswer: "Call `screen.tracer(1)`.",
    explanation: "`tracer(1)` restores default single-step animation updates.",
    hint: "How do you reset tracer back to default single-step mode?",
    level: "basic",
    codeExample: "screen.tracer(1)"
  },
  {
    question: "What is Triple Buffering and how does it compare to Double Buffering?",
    shortAnswer: "Uses three buffers (Front, Back, and Mid) to allow continuous rendering even if the display is busy refreshing.",
    explanation: "Triple buffering further reduces latency and completely eliminates frame pacing stutter.",
    hint: "What graphics technique uses 3 memory buffers?",
    level: "expert",
    codeExample: "# Triple buffering: Front, Mid, Back"
  },
  {
    question: "How does `turtle.update()` compare to `screen.update()`?",
    shortAnswer: "They are aliases in the Python standard library; both invoke the underlying Tkinter canvas refresh.",
    explanation: "`turtle.update()` is a module-level convenience function for `screen.update()`.",
    hint: "Is turtle.update() identical to screen.update()?",
    level: "moderate",
    codeExample: "screen.update()  # Standard OOP convention"
  },
  {
    question: "Why does double buffering eliminate visual flickering?",
    shortAnswer: "Because the user never sees the blank canvas during erasing (`clear()`) or intermediate construction strokes.",
    explanation: "Only fully completed frames are presented to the viewer.",
    hint: "Why does double buffering stop screen flicker?",
    level: "basic",
    codeExample: "# No flicker: Erase and redraw happen offscreen in RAM"
  },
  {
    question: "How do you benchmark how long `screen.update()` takes to flush to the monitor?",
    shortAnswer: "Measure `t0 = time.perf_counter(); screen.update(); dt = time.perf_counter() - t0`.",
    explanation: "Benchmarking buffer swap latency helps identify GPU or GUI bottleneck issues.",
    hint: "How do you measure screen.update() execution time?",
    level: "advanced",
    codeExample: "t0 = time.perf_counter()\nscreen.update()\nswap_ms = (time.perf_counter() - t0) * 1000"
  },
  {
    question: "What is the default tracer value when a Turtle program launches?",
    shortAnswer: "`screen.tracer(1)` with a 10ms delay.",
    explanation: "Python Turtle defaults to slow educational animation mode so beginners can watch the turtle crawl.",
    hint: "What is the default tracer setting in Turtle?",
    level: "basic",
    codeExample: "# Default: tracer(1, 10)"
  },
  {
    question: "Can `screen.tracer(0)` be toggled dynamically during runtime?",
    shortAnswer: "Yes, you can enable `tracer(0)` for fast background setup and switch to `tracer(1)` for interactive turtle crawling.",
    explanation: "Tracer settings can be altered anytime throughout program execution.",
    hint: "Can tracer modes change dynamically during program execution?",
    level: "moderate",
    codeExample: "screen.tracer(0); setup_world(); screen.tracer(1)"
  },
  {
    question: "How does Tkinter handle the internal canvas item display list during `tracer(0)`?",
    shortAnswer: "It accumulates canvas item definitions without sending paint event notifications to the OS window manager.",
    explanation: "Suppressing OS paint messages prevents window manager redraw stalls.",
    hint: "How does tracer(0) suppress OS window paint events?",
    level: "expert",
    codeExample: "# Suppresses Tkinter expose/paint event dispatch"
  },
  {
    question: "How do you draw a 10,000-particle starfield instantly at startup?",
    shortAnswer: "Call `screen.tracer(0)`, draw all 10,000 stars in a loop, and call `screen.update()` at the end.",
    explanation: "Renders 10,000 stars in under 0.05 seconds instead of 10 minutes.",
    hint: "How do you render a massive starfield in milliseconds?",
    level: "basic",
    codeExample: "screen.tracer(0)\nfor star in stars: draw_star(t, *star)\nscreen.update()"
  },
  {
    question: "What is the danger of setting `tracer(0)` inside a recursive fractal function?",
    shortAnswer: "Setting tracer inside the recursive body is redundant; set `screen.tracer(0)` once before starting the recursion.",
    explanation: "Calling configuration functions repeatedly across recursion wastes CPU cycles.",
    hint: "Where should screen.tracer(0) be called relative to a recursive function?",
    level: "moderate",
    codeExample: "screen.tracer(0)\ndraw_fractal_tree(t, 100, 8)\nscreen.update()"
  },
  {
    question: "How do you synchronize animations with real-world time rather than loop iteration count?",
    shortAnswer: "Measure elapsed real time using `time.perf_counter()` and compute positions as `pos = f(time)`.",
    explanation: "Time-based movement ensures identical animation speeds across fast and slow computers.",
    hint: "How do you guarantee constant speed across different CPU hardware?",
    level: "advanced",
    codeExample: "x = start_x + velocity * elapsed_seconds"
  },
  {
    question: "What role does `screen.delay(ms)` play in relation to `screen.tracer()`?",
    shortAnswer: "`screen.delay(ms)` sets the global animation delay between actions; setting `delay(0)` further reduces timer overhead.",
    explanation: "Combining `tracer(0)` and `delay(0)` maximizes raw execution speed.",
    hint: "What function sets the global animation timer delay in Turtle?",
    level: "moderate",
    codeExample: "screen.delay(0)"
  },
  {
    question: "Why should game developers avoid relying on default Turtle animation speed?",
    shortAnswer: "Default animation speeds are non-deterministic, variable across operating systems, and too slow for real-time gaming.",
    explanation: "Professional games demand strict double-buffered manual frame control.",
    hint: "Why is default animation mode unsuitable for games?",
    level: "basic",
    codeExample: "# Always use tracer(0) for game development"
  },
  {
    question: "How does double buffering affect GPU / CPU power consumption?",
    shortAnswer: "Reduces power consumption by eliminating thousands of intermediate OS window repaint interrupts.",
    explanation: "Batching updates into a single frame swap minimizes CPU-GPU context switches.",
    hint: "Does double buffering reduce CPU/GPU power consumption?",
    level: "advanced",
    codeExample: "# Efficient batching saves CPU cycles"
  },
  {
    question: "What is the difference between `screen.clearscreen()` and `screen.update()`?",
    shortAnswer: "`clearscreen()` resets and wipes the canvas completely; `update()` renders pending buffered geometry.",
    explanation: "`update()` displays drawings, while `clearscreen()` erases everything.",
    hint: "Which method displays drawings versus wiping the canvas?",
    level: "basic",
    codeExample: "# clearscreen(): wipes canvas | update(): flushes buffer"
  },
  {
    question: "How do you debug an animation that freezes without errors?",
    shortAnswer: "Check if `screen.tracer(0)` was enabled without calling `screen.update()` or if an infinite loop blocked the event loop.",
    explanation: "Missing `update()` is the most common cause of seemingly frozen Turtle scripts.",
    hint: "What is the first thing to check when a Turtle screen appears frozen?",
    level: "basic",
    codeExample: "# Check for missing screen.update() call"
  },
  {
    question: "What is the 3-step Golden Rule of Instant Rendering in Python Turtle?",
    shortAnswer: "1. `screen.tracer(0)` before drawing | 2. `t.hideturtle()` | 3. `screen.update()` after all drawing is finished.",
    explanation: "This 3-step pattern guarantees instantaneous sub-second visual presentation across all projects.",
    hint: "What 3 steps guarantee instant rendering in Turtle?",
    level: "basic",
    codeExample: "# 1. tracer(0) | 2. hideturtle() | 3. update()"
  },
  {
    question: "How does `screen.tracer(0)` enable smooth 60 FPS rotating 3D vector projections in Turtle?",
    shortAnswer: "By allowing 3D matrix math and polygon rasterization to occur silently in RAM before swapping to screen in 16.6 ms.",
    explanation: "Software double-buffering makes complex 3D wireframe rotations possible in standard Python.",
    hint: "How does tracer(0) facilitate rotating 3D wireframes in Turtle?",
    level: "expert",
    codeExample: "# 3D matrix projection rendered into back buffer"
  }
];

export default questions;
