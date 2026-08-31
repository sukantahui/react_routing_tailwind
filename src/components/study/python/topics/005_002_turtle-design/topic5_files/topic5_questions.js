// src/components/study/python/topics/005_002_turtle-design/topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the fastest standard speed setting in turtle.speed()?",
    shortAnswer: "speed(0) or speed('fastest').",
    explanation: "0 disables animation delay timers, making it faster than speed(10).",
    hint: "Is the fastest speed represented by 10 or 0?",
    level: "basic",
    codeExample: "t.speed(0)  # Fastest standard speed"
  },
  {
    question: "What is the slowest speed setting in Python Turtle?",
    shortAnswer: "speed(1) or speed('slowest').",
    explanation: "speed(1) introduces the longest artificial delay between frame ticks, making it ideal for classroom step-by-step observation.",
    hint: "What is the smallest positive integer speed?",
    level: "basic",
    codeExample: "t.speed(1)  # Slowest motion"
  },
  {
    question: "What is the default speed when a new Turtle object is initialized?",
    shortAnswer: "speed(6) or 'normal'.",
    explanation: "Default speed is set to 6, providing a balanced visual animation pace.",
    hint: "What is the moderate default speed setting?",
    level: "basic",
    codeExample: "print(t.speed())  # 6"
  },
  {
    question: "Why is speed(0) faster than speed(10)?",
    shortAnswer: "Because 0 represents zero animation delay, whereas 10 is a high animation rate with a small non-zero delay.",
    explanation: "speed(0) instructs the interpreter to remove all artificial pause timers between steps.",
    hint: "What does 0 delay mean compared to a 10 rate?",
    level: "moderate",
    codeExample: "# speed(0) = 0ms delay\n# speed(10) = short delay"
  },
  {
    question: "What are the valid string aliases for turtle.speed()?",
    shortAnswer: "'fastest' (0), 'fast' (10), 'normal' (6), 'slow' (3), and 'slowest' (1).",
    explanation: "These 5 string literals map directly to their corresponding integer speed constants.",
    hint: "What 5 words describe speeds from slowest to fastest?",
    level: "basic",
    codeExample: "t.speed('fastest')"
  },
  {
    question: "What is the difference between `turtle.speed(0)` and `screen.tracer(0)`?",
    shortAnswer: "`speed(0)` removes sleep delays but still redraws canvas each step; `tracer(0)` disables screen redraws completely until `update()` is called.",
    explanation: "tracer(0) is significantly faster for 1,000+ line fractals because it avoids all intermediary screen refresh calls.",
    hint: "Which one disables canvas screen refreshing entirely?",
    level: "advanced",
    codeExample: "screen.tracer(0)\n# Draw 10,000 lines instantly in RAM\nscreen.update()"
  },
  {
    question: "What happens if you forget to call `screen.update()` after using `screen.tracer(0)`?",
    shortAnswer: "The canvas remains blank or partially rendered because pending drawing buffer updates were never flushed.",
    explanation: "tracer(0) suppresses automatic rendering; explicit update() is mandatory to flush vector buffers to screen.",
    hint: "How does the canvas know when to paint buffered shapes?",
    level: "moderate",
    codeExample: "screen.tracer(0)\n# draw...\nscreen.update() # Mandatory!"
  },
  {
    question: "How do you query the current speed integer of a Turtle?",
    shortAnswer: "Call `t.speed()` with no arguments.",
    explanation: "Like all Turtle property methods, speed() acts as a getter returning the active integer speed.",
    hint: "What does calling speed without arguments return?",
    level: "basic",
    codeExample: "current_speed = t.speed()"
  },
  {
    question: "What happens if you pass a number greater than 10 (e.g. speed(15))?",
    shortAnswer: "Any integer >= 10 or <= 0.5 defaults internally to speed(0) (fastest).",
    explanation: "Python clamps out-of-range speed values to 0.",
    hint: "How does Turtle handle integers larger than 10?",
    level: "moderate",
    codeExample: "t.speed(100) # Treated as speed(0)"
  },
  {
    question: "How do you hide the turtle cursor to increase drawing performance further?",
    shortAnswer: "Using `t.hideturtle()` or `t.ht()`.",
    explanation: "Hiding the cursor eliminates the CPU overhead of erasing and redrawing the turtle icon on every step.",
    hint: "What method hides the turtle pointer from canvas?",
    level: "basic",
    codeExample: "t.hideturtle()"
  },
  {
    question: "What is `screen.delay(ms)` in Python Turtle?",
    shortAnswer: "Sets the global animation delay in milliseconds for all turtles on the screen (default is 10ms).",
    explanation: "screen.delay(0) globally removes animation pauses across all artist instances.",
    hint: "Which screen method sets millisecond animation delays?",
    level: "advanced",
    codeExample: "screen.delay(0)"
  },
  {
    question: "Can different turtles have different speeds on the same canvas?",
    shortAnswer: "Yes, speed is an instance attribute maintained independently by each Turtle.",
    explanation: "Turtle A can race at speed(0) while Turtle B demonstrates at speed(1).",
    hint: "Is speed object-scoped or global?",
    level: "basic",
    codeExample: "t1.speed(1); t2.speed(0)"
  },
  {
    question: "Why is `t.speed(1)` useful in educational demonstrations?",
    shortAnswer: "It allows students to visually follow angle rotations, loop iterations, and coordinate translations step-by-step.",
    explanation: "Slow visual pacing demystifies geometric logic for beginners.",
    hint: "Why would a teacher want a slow animation pace?",
    level: "basic",
    codeExample: "# Teaching loops: t.speed(1)"
  },
  {
    question: "What is the typical execution time difference between speed(6) and tracer(0) for a 1,000-line mandala?",
    shortAnswer: "speed(6) may take 15-30 seconds; tracer(0) takes less than 0.05 seconds (instantaneous).",
    explanation: "Eliminating 1,000 intermediate Tkinter repaint cycles speeds up rendering by hundreds of times.",
    hint: "How dramatic is the performance leap with tracer(0)?",
    level: "moderate",
    codeExample: "# tracer(0) reduces 30s animations to < 50ms"
  },
  {
    question: "What does `screen.tracer(n, delay)` do when passing an integer n > 1?",
    shortAnswer: "Updates the screen only once every n drawing actions, with an optional delay in ms.",
    explanation: "`tracer(10)` redraws the canvas only once every 10 forward/turn steps, speeding up animations while keeping motion visible.",
    hint: "How do you refresh the screen once every N frames?",
    level: "advanced",
    codeExample: "screen.tracer(8, 25) # Update every 8th step"
  },
  {
    question: "How do game loops use `screen.tracer(0)` and `screen.ontimer()`?",
    shortAnswer: "By executing physics and drawing logic in memory, calling `screen.update()`, and scheduling the next frame with `ontimer()`.",
    explanation: "This classic Double-Buffering loop pattern produces smooth 60 FPS games without screen tearing.",
    hint: "What pattern creates smooth, flicker-free game animations?",
    level: "expert",
    codeExample: "# Game loop pattern: tracer(0) → update() → ontimer(loop, 16)"
  },
  {
    question: "Does `t.speed(0)` speed up computation time (like math calculations) or only canvas rendering?",
    shortAnswer: "Only canvas animation delays; Python's mathematical calculations execute at normal CPU speeds regardless.",
    explanation: "speed() modifies GUI timer delays, not CPU bytecode execution speed.",
    hint: "Does speed() accelerate CPU math or GUI delays?",
    level: "moderate",
    codeExample: "# Modifies GUI rendering pacing only"
  },
  {
    question: "Can speed be changed dynamically inside a drawing loop?",
    shortAnswer: "Yes, you can call `t.speed()` at any point to accelerate or decelerate motion.",
    explanation: "Useful for drawing complex backgrounds at speed(0) and foreground characters at speed(3).",
    hint: "Can you switch speeds between different phases of a script?",
    level: "basic",
    codeExample: "t.speed(0); draw_background()\nt.speed(3); draw_hero()"
  },
  {
    question: "What is screen flickering in Turtle animations?",
    shortAnswer: "Rapid visual flashing caused when shapes are cleared and redrawn frame-by-frame with automatic updates enabled.",
    explanation: "tracer(0) and update() eliminate flicker by buffering changes in memory before painting.",
    hint: "What causes visual stutter when moving game sprites?",
    level: "advanced",
    codeExample: "# Eliminate flicker with tracer(0) + update()"
  },
  {
    question: "How do you benchmark the exact rendering time of a Turtle script in Python?",
    shortAnswer: "Use `time.time()` or `time.perf_counter()` before and after the drawing loop.",
    explanation: "Measuring elapsed seconds allows students to quantify speed optimizations mathematically.",
    hint: "What standard library module measures execution duration?",
    level: "moderate",
    codeExample: "import time\nt0 = time.perf_counter()\n# render...\nprint(f'Time: {time.perf_counter() - t0:.3f}s')"
  },
  {
    question: "What is double buffering in graphical engines?",
    shortAnswer: "Drawing to an off-screen memory buffer before copying the finished frame to the visible display.",
    explanation: "`screen.tracer(0)` enables off-screen buffer rendering; `screen.update()` swaps the buffer to display.",
    hint: "What technique draws in an invisible memory buffer before showing the frame?",
    level: "expert",
    codeExample: "# tracer(0) = off-screen buffer; update() = buffer swap"
  },
  {
    question: "Does `t.speed()` affect how fast `turtle.write()` prints text?",
    shortAnswer: "No, text writing is rendered instantaneously regardless of speed settings.",
    explanation: "write() does not interpolate path points; it delegates font rasterization directly to Tkinter.",
    hint: "Does text printing have step-by-step motion animation?",
    level: "moderate",
    codeExample: "t.write('Instant Text!')"
  },
  {
    question: "What is the slowest animation speed value in terms of milliseconds?",
    shortAnswer: "speed(1) introduces approximately 50-100ms pauses between steps.",
    explanation: "This gives a deliberate crawl allowing human inspection of individual vectors.",
    hint: "Approximately how long does speed(1) pause between steps?",
    level: "basic",
    codeExample: "t.speed(1)"
  },
  {
    question: "How does setting `screen.tracer(False)` compare to `screen.tracer(0)`?",
    shortAnswer: "They are completely identical; boolean False evaluates to 0 in Python.",
    explanation: "Passing 0, False, or None disables tracer updates.",
    hint: "Are False and 0 interchangeable in Python boolean evaluation?",
    level: "basic",
    codeExample: "screen.tracer(False) # Same as screen.tracer(0)"
  },
  {
    question: "Can `screen.tracer(True)` re-enable automatic canvas updates?",
    shortAnswer: "Yes, passing True (or 1) re-enables standard automatic frame updates.",
    explanation: "Use this to resume normal step-by-step animation after generating background assets.",
    hint: "How do you turn tracer automatic updates back on?",
    level: "basic",
    codeExample: "screen.tracer(True)"
  },
  {
    question: "Why should `t.speed(0)` be paired with `t.hideturtle()` for maximum efficiency?",
    shortAnswer: "Because hiding the turtle icon avoids unnecessary icon bounding box recalculations on every step.",
    explanation: "Eliminating cursor drawing saves significant CPU rendering cycles.",
    hint: "What two commands give maximum speed without using tracer?",
    level: "moderate",
    codeExample: "t.speed(0)\nt.hideturtle()"
  },
  {
    question: "How do you achieve a cinematic dramatic reveal effect in Turtle?",
    shortAnswer: "Start at `speed(1)` for the opening shape, then gradually accelerate up to `speed(0)` as complexity increases.",
    explanation: "Modulating speed over time creates engaging visual storytelling.",
    hint: "How can speed pacing create drama in algorithmic art presentations?",
    level: "advanced",
    codeExample: "for i in range(1, 10): t.speed(i); t.forward(i*10); t.left(90)"
  },
  {
    question: "What is the return type of `screen.tracer()` when called without arguments?",
    shortAnswer: "An integer representing the current n-step tracer update interval.",
    explanation: "Functions as a getter for the current screen tracer frequency.",
    hint: "What does calling tracer as a getter return?",
    level: "advanced",
    codeExample: "n_interval = screen.tracer()"
  },
  {
    question: "How do you optimize 3D wireframe rotations rendered with Turtle?",
    shortAnswer: "Use `tracer(0)`, compute 3D matrix projection in RAM, draw 2D projected lines, call `update()`, then `clear()` for next frame.",
    explanation: "This is the classic real-time 3D vector pipeline running entirely in Python Turtle.",
    hint: "What sequence renders smooth 3D projections in Turtle?",
    level: "expert",
    codeExample: "# 3D Vector Engine Pipeline"
  },
  {
    question: "What is the summary rule for Turtle speed and performance optimization?",
    shortAnswer: "Use `speed(1-6)` for classroom teaching and visual animation; use `speed(0)` + `hideturtle()` for fast drawing; use `tracer(0)` + `update()` for instant fractals and 60 FPS interactive games.",
    explanation: "Choosing the correct rendering tier guarantees both pedagogical clarity and high-performance graphics.",
    hint: "What 3 tiers define speed optimization in Turtle?",
    level: "basic",
    codeExample: "# Tier 1: speed(1-6) | Tier 2: speed(0) | Tier 3: tracer(0) + update()"
  }
];

export default questions;
