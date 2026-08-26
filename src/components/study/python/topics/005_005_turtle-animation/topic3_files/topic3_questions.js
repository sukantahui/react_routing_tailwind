// src/components/study/python/topics/005_005_turtle-animation/topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the primary difference between `time.sleep()` and `screen.ontimer()`?",
    shortAnswer: "`time.sleep()` synchronously blocks the execution thread; `ontimer()` asynchronously schedules callbacks inside Tkinter's event loop.",
    explanation: "`ontimer()` allows keyboard/mouse events to be processed while waiting for the next frame tick.",
    hint: "Which timing method is non-blocking and integrates with event loops?",
    level: "basic",
    codeExample: "screen.ontimer(game_tick, 16)"
  },
  {
    question: "How do you construct a continuous animation loop using `screen.ontimer()`?",
    shortAnswer: "Define a `game_tick()` function and have it call `screen.ontimer(game_tick, 16)` at the end of its own body.",
    explanation: "Recursive callback scheduling creates an infinite, non-blocking 60 FPS animation loop.",
    hint: "How does a function re-schedule itself with ontimer?",
    level: "basic",
    codeExample: "def tick():\n    update_game()\n    screen.ontimer(tick, 16)"
  },
  {
    question: "What unit of time does `screen.ontimer(fun, t)` accept for its delay parameter `t`?",
    shortAnswer: "Milliseconds (e.g. `16` ms corresponds to ~60 FPS; `1000` ms corresponds to 1 second).",
    explanation: "Unlike `time.sleep()` which accepts seconds in floats, `ontimer()` takes integer milliseconds.",
    hint: "Does ontimer take seconds or milliseconds?",
    level: "basic",
    codeExample: "screen.ontimer(callback, 16)  # 16 milliseconds"
  },
  {
    question: "What is Framerate Independence in game physics?",
    shortAnswer: "Ensuring game objects move at identical physical speeds regardless of whether the hardware runs at 30 FPS, 60 FPS, or 144 FPS.",
    explanation: "Multiplying velocity by delta-time `dt` eliminates hardware-dependent speed variations.",
    hint: "What principle ensures game speed remains constant on fast and slow computers?",
    level: "moderate",
    codeExample: "x += speed_px_per_sec * dt"
  },
  {
    question: "Why can `time.sleep(1.0)` make keyboard input feel unresponsive or frozen?",
    shortAnswer: "Because `time.sleep()` completely halts the OS thread, preventing Tkinter from polling keyboard and mouse keypress events.",
    explanation: "Blocking the main thread starves the GUI event dispatch queue.",
    hint: "Why does time.sleep() freeze keyboard responsiveness?",
    level: "moderate",
    codeExample: "# time.sleep(1) blocks GUI event pump"
  },
  {
    question: "How do you calculate Delta-Time (dt) in Python?",
    shortAnswer: "`now = time.perf_counter(); dt = now - last_time; last_time = now`.",
    explanation: "Tracking elapsed monotonic clock duration between frames gives precise delta-time values in seconds.",
    hint: "What formula calculates the exact duration between consecutive frames?",
    level: "moderate",
    codeExample: "dt = time.perf_counter() - last_time"
  },
  {
    question: "How do you run two independent timers concurrently using `screen.ontimer()`?",
    shortAnswer: "Schedule two separate callbacks with different millisecond intervals (e.g. 16ms for physics, 1000ms for clock).",
    explanation: "Tkinter's event scheduler multiplexes multiple concurrent timer callbacks seamlessly.",
    hint: "How are multi-interval timers scheduled in Turtle?",
    level: "moderate",
    codeExample: "screen.ontimer(physics_tick, 16)\nscreen.ontimer(clock_tick, 1000)"
  },
  {
    question: "What role does `screen.mainloop()` play in an `ontimer()` based application?",
    shortAnswer: "It enters Tkinter's persistent event loop, actively listening for keyboard events and firing scheduled timers.",
    explanation: "`screen.mainloop()` keeps the application alive without blocking CPU execution.",
    hint: "What method starts Tkinter's background event listener loop?",
    level: "basic",
    codeExample: "screen.mainloop()"
  },
  {
    question: "How do you stop or cancel a recursive `ontimer()` loop?",
    shortAnswer: "Check a boolean flag `if not running: return` at the start of the callback, or simply don't call `ontimer()` again.",
    explanation: "Condition-gating the recursive timer call allows clean pausing and game-over terminations.",
    hint: "How is a recursive ontimer loop cleanly exited?",
    level: "basic",
    codeExample: "if game_over: return  # Ceases timer rescheduling"
  },
  {
    question: "Why should `time.perf_counter()` be used over `time.time()` for delta-time physics?",
    shortAnswer: "`perf_counter()` is guaranteed monotonic and has nanosecond resolution, whereas `time.time()` can jump backwards during system clock syncs.",
    explanation: "Monotonic clocks prevent negative delta-time physics explosion glitches.",
    hint: "Why is perf_counter safer than time.time() for game physics?",
    level: "advanced",
    codeExample: "dt = time.perf_counter() - t0"
  },
  {
    question: "What is a 'Spiral of Death' in variable delta-time physics engines?",
    shortAnswer: "When a frame drop causes a huge `dt`, requiring more physics steps, causing an even larger frame drop, freezing the game.",
    explanation: "Clamping maximum `dt` (e.g. `min(dt, 0.05)`) protects physics loops from spiraling.",
    hint: "What happens when large dt values cause compounding computation delays?",
    level: "expert",
    codeExample: "dt = min(dt, 0.05)  # Delta clamp protection"
  },
  {
    question: "How do you implement smooth keyboard-driven character movement using `ontimer()`?",
    shortAnswer: "Track keys in a `pressed_keys = {}` dictionary via `onkeypress`/`onkeyrelease`, and apply velocity inside the 16ms `ontimer()` loop.",
    explanation: "Decoupling key state tracking from kinematic updates produces buttery smooth directional movement.",
    hint: "How do key state dictionaries enable smooth continuous movement?",
    level: "advanced",
    codeExample: "if keys['Left']: x -= speed"
  },
  {
    question: "What is the equivalent of `screen.ontimer()` in web browser JavaScript?",
    shortAnswer: "`requestAnimationFrame(callback)` or `setTimeout(callback, delay)`.",
    explanation: "Both JavaScript and Python GUI frameworks use asynchronous event loop timer scheduling.",
    hint: "What web API schedules asynchronous frame callbacks in browsers?",
    level: "basic",
    codeExample: "// JavaScript: requestAnimationFrame(tick)"
  },
  {
    question: "Why is `time.sleep(0.016)` in a `while True:` loop not guaranteed to run at exactly 60 FPS?",
    shortAnswer: "OS thread scheduling jitter and execution time of the drawing code add extra milliseconds onto the 16ms sleep.",
    explanation: "Uncompensated sleeps always drift and run slower than the theoretical target.",
    hint: "Why do raw sleep calls drift over time?",
    level: "moderate",
    codeExample: "# Sleep compensation: target_dt - render_time"
  },
  {
    question: "How do you pause and resume an `ontimer()` game cleanly?",
    shortAnswer: "Set `is_paused = True`; when unpausing, reset `last_time = time.perf_counter()` and re-trigger `screen.ontimer(tick, 16)`.",
    explanation: "Resetting `last_time` on unpause prevents massive delta-time jumps.",
    hint: "What must be reset when unpausing delta-time games?",
    level: "moderate",
    codeExample: "def unpause(): last_t = time.perf_counter(); ontimer(tick, 16)"
  },
  {
    question: "What happens if an `ontimer()` callback takes 30ms to compute when scheduled for every 16ms?",
    shortAnswer: "The callback finishes as fast as possible, and the next tick is scheduled 16ms AFTER completion, dropping effective framerate to ~22 FPS.",
    explanation: "Tkinter will not execute overlapping instances of the same timer callback.",
    hint: "Does ontimer queue overlapping callback instances if computation exceeds delay?",
    level: "advanced",
    codeExample: "# Graceful degradation under heavy CPU load"
  },
  {
    question: "How can you implement a one-shot delay (e.g. explosive blast disappearing after 500ms)?",
    shortAnswer: "Call `screen.ontimer(erase_blast, 500)` without rescheduling it inside `erase_blast`.",
    explanation: "A single, non-recursive `ontimer` call acts as a one-shot delayed trigger.",
    hint: "How is a non-recurring timer created with ontimer?",
    level: "basic",
    codeExample: "screen.ontimer(remove_explosion, 500)  # One-shot"
  },
  {
    question: "What is Fixed Timestep vs Variable Timestep in physics simulation?",
    shortAnswer: "Fixed timestep updates physics in exact deterministic increments (e.g. 1/60s); variable timestep uses real measured `dt`.",
    explanation: "Fixed timesteps guarantee reproducible, glitch-free physics simulations.",
    hint: "Which physics model uses exact constant mathematical time increments?",
    level: "advanced",
    codeExample: "# Fixed dt = 0.01666 for deterministic physics"
  },
  {
    question: "Why should drawing code NEVER contain `time.sleep()` calls inside helper functions?",
    shortAnswer: "Sleeping inside drawing helpers blocks the entire frame presentation, destroying framerate and responsiveness.",
    explanation: "Timing delays must exist strictly at the outer boundary of the frame loop.",
    hint: "Where should timing pacing reside in an animation codebase?",
    level: "basic",
    codeExample: "# Keep drawing functions pure and delay-free"
  },
  {
    question: "How do you animate a countdown timer from 10 to 0 on screen?",
    shortAnswer: "In a 1000ms `ontimer()` callback: decrement `count`, redraw the HUD text, and schedule next tick if `count > 0`.",
    explanation: "1-second timer callbacks cleanly drive game HUD countdowns.",
    hint: "How is a 1-second countdown loop structured with ontimer?",
    level: "basic",
    codeExample: "def count_tick():\n    if count > 0: count -= 1; ontimer(count_tick, 1000)"
  },
  {
    question: "What is Cooperative Multitasking in GUI event loops?",
    shortAnswer: "Tasks voluntarily yield control back to the event loop (via timer callbacks) so other events (keyboard, mouse, redraws) can run.",
    explanation: "`ontimer` relies on cooperative yielding to prevent GUI application hangs.",
    hint: "What multitasking model relies on functions completing quickly to yield execution?",
    level: "advanced",
    codeExample: "# Cooperative event-loop yielding"
  },
  {
    question: "How do you create an ease-in-out smooth camera pan using delta-time?",
    shortAnswer: "Calculate progress `t = elapsed / duration` and apply a smoothstep formula `s = t*t*(3 - 2*t)` to camera position.",
    explanation: "Mathematical easing formulas produce organic, cinematic camera movements.",
    hint: "What formula generates smooth cubic ease-in-out transitions?",
    level: "expert",
    codeExample: "smooth_t = t * t * (3 - 2 * t)"
  },
  {
    question: "Why is `screen.listen()` required before keyboard events can trigger?",
    shortAnswer: "It gives Tkinter canvas focus so that keyboard keystrokes are routed to the Turtle window.",
    explanation: "Without focus via `listen()`, keystrokes are ignored by the application.",
    hint: "What method gives window keyboard focus in Turtle?",
    level: "basic",
    codeExample: "screen.listen()"
  },
  {
    question: "How do you measure the exact jitter of an `ontimer(callback, 16)` loop?",
    shortAnswer: "Record timestamps on each invocation and calculate standard deviation of `(now - last_t - 0.016)`.",
    explanation: "Timing jitter analysis reveals background OS scheduler interference.",
    hint: "How do you quantify deviations from target frame intervals?",
    level: "advanced",
    codeExample: "jitter = abs((now - last_t) - 0.016)"
  },
  {
    question: "What is the recommended approach for arcade game projects in Python Turtle?",
    shortAnswer: "Use `screen.ontimer(tick, 16)` for the main loop, `onkeypress`/`onkeyrelease` for input, and `screen.mainloop()`.",
    explanation: "Event-driven architecture provides the highest input responsiveness and cleanest code structure.",
    hint: "What is the industry-standard architecture for interactive Turtle games?",
    level: "basic",
    codeExample: "# ontimer + onkeypress + mainloop"
  },
  {
    question: "How can you simulate slow-motion effects using delta-time?",
    shortAnswer: "Multiply `dt` by a `time_scale` factor (e.g. `dt_effective = dt * 0.25` for 4x slow-motion).",
    explanation: "Time scaling cleanly adjusts global simulation speed without altering physics formulas.",
    hint: "How do you implement matrix-style bullet time slow motion?",
    level: "moderate",
    codeExample: "x += velocity * (dt * time_scale)"
  },
  {
    question: "Why should you avoid passing lambda expressions with complex logic directly into `ontimer()`?",
    shortAnswer: "Complex lambdas reduce code readability and make debugging stack traces difficult; use named functions instead.",
    explanation: "Named functions clarify call stacks and improve code maintainability.",
    hint: "Why are named callback functions preferred over inline lambdas for ontimer?",
    level: "basic",
    codeExample: "# Preferred: def tick(): ...; screen.ontimer(tick, 16)"
  },
  {
    question: "What is the maximum practical timer resolution of `ontimer()` on Windows/macOS?",
    shortAnswer: "Typically 10 to 15 milliseconds due to OS system timer interrupt granularity.",
    explanation: "16ms (~60 FPS) aligns perfectly with OS hardware timer ticks.",
    hint: "What is the typical timer resolution on desktop operating systems?",
    level: "expert",
    codeExample: "# ~15ms OS timer granularity"
  },
  {
    question: "What is the 3-step checklist for building an Event-Driven Game Loop in Python Turtle?",
    shortAnswer: "1. Bind inputs with `onkeypress()` & `screen.listen()` | 2. Define recursive `ontimer(tick, 16)` loop | 3. Call `screen.mainloop()`.",
    explanation: "Following this 3-step blueprint guarantees responsive, professional game loop architecture.",
    hint: "What 3 steps build a complete event-driven game engine in Turtle?",
    level: "basic",
    codeExample: "# 1. listen/onkeypress | 2. ontimer(tick, 16) | 3. mainloop()"
  },
  {
    question: "How does mastering `ontimer()` prepare students for modern software engineering?",
    shortAnswer: "It teaches the asynchronous event-driven programming paradigm that powers Node.js, React, Android/iOS apps, and web sockets.",
    explanation: "Event-driven asynchronous design is one of the most vital paradigms in modern software development.",
    hint: "Why is asynchronous event loop mastery critical for full-stack software engineers?",
    level: "basic",
    codeExample: "# Asynchronous event-driven programming foundations"
  }
];

export default questions;
