// src/components/study/python/topics/005_005_turtle-animation/topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is a Frame in computer animation?",
    shortAnswer: "A single static image rendered at a specific point in time within an animation sequence.",
    explanation: "Displaying consecutive frames at high speed creates the optical illusion of continuous motion.",
    hint: "What is each individual static snapshot in an animation called?",
    level: "basic",
    codeExample: "# Single frame render"
  },
  {
    question: "What does FPS stand for and why is 60 FPS standard in modern interactive graphics?",
    shortAnswer: "Frames Per Second; 60 FPS matches standard 60 Hz display refresh rates, delivering tear-free, butter-smooth motion.",
    explanation: "At 60 FPS, a new frame is rendered every 16.6 milliseconds, exceeding human flicker fusion rates.",
    hint: "What metric measures animation frame refresh frequency?",
    level: "basic",
    codeExample: "# 60 FPS = 16.6 ms per frame"
  },
  {
    question: "What are the 4 fundamental stages of a standard Game / Animation Loop?",
    shortAnswer: "1. Clear Previous Frame → 2. Update Kinematic State → 3. Render Geometry → 4. Flush Buffer & Sleep `dt`.",
    explanation: "This 4-stage pipeline is universal across Turtle graphics, PyGame, Unity, and Unreal Engine.",
    hint: "What 4 steps happen on every tick of an animation loop?",
    level: "basic",
    codeExample: "t.clear(); x += vx; draw_ball(x); screen.update(); time.sleep(1/60)"
  },
  {
    question: "What is the frame duration budget for a 60 FPS target?",
    shortAnswer: "16.6 milliseconds (0.0166 seconds).",
    explanation: "`1.0 / 60.0 = 0.01666...` seconds. All drawing and physics calculations must complete within this window.",
    hint: "How many milliseconds do you have per frame at 60 FPS?",
    level: "basic",
    codeExample: "dt = 1.0 / 60.0  # 16.6 ms"
  },
  {
    question: "Why is `t.clear()` used instead of `t.reset()` inside the animation loop?",
    shortAnswer: "`t.clear()` wipes only the drawn lines while preserving pen color, size, and position; `t.reset()` resets all configurations to defaults.",
    explanation: "Reconfiguring pen states on every frame using `reset()` degrades performance.",
    hint: "Which method clears canvas lines without resetting pen styles?",
    level: "moderate",
    codeExample: "t.clear()  # Preserves pen state"
  },
  {
    question: "What happens if you forget to call `t.clear()` inside the animation loop?",
    shortAnswer: "The moving object leaves a solid, continuous smear trail of previous frames across the screen.",
    explanation: "Without clearing, previous frame geometry remains permanently on the canvas buffer.",
    hint: "What happens if old frames are never erased?",
    level: "basic",
    codeExample: "# Forgetting t.clear() creates permanent smears"
  },
  {
    question: "What is Delta-Time (dt) pacing?",
    shortAnswer: "Subtracting the actual computation time from the target frame duration: `sleep_time = max(0, frame_duration - elapsed)`.",
    explanation: "Delta-time compensation ensures steady frame rates regardless of CPU load variations.",
    hint: "How do you compensate for CPU calculation delays in animation pacing?",
    level: "advanced",
    codeExample: "elapsed = time.perf_counter() - start_time\ntime.sleep(max(0, 1/60 - elapsed))"
  },
  {
    question: "Why should `screen.tracer(0)` be invoked before starting an animation loop?",
    shortAnswer: "To suppress intermediate step repaints and enable instant back-buffer rendering.",
    explanation: "Without `tracer(0)`, Turtle animates every individual coordinate shift with heavy lag.",
    hint: "Which method enables double-buffered frame animation?",
    level: "basic",
    codeExample: "screen.tracer(0)"
  },
  {
    question: "How do you calculate the velocity step `dx` for an object moving 300 pixels in 2 seconds at 60 FPS?",
    shortAnswer: "Total frames = `2 * 60 = 120`; `dx = 300 / 120 = 2.5` pixels per frame.",
    explanation: "Dividing distance by total frame count yields the per-frame kinematic displacement.",
    hint: "How is displacement divided across total animation frames?",
    level: "moderate",
    codeExample: "dx = total_distance / (duration_sec * FPS)"
  },
  {
    question: "What causes 'screen tearing' in graphical animations?",
    shortAnswer: "When the display refreshes midway through a buffer swap, showing top half of new frame and bottom half of old frame.",
    explanation: "Vertical sync (VSync) synchronizes buffer swaps with monitor refresh intervals to prevent tearing.",
    hint: "What artifact occurs when buffer swaps desynchronize from display refresh?",
    level: "advanced",
    codeExample: "# Screen tearing vs VSync buffer synchronization"
  },
  {
    question: "How does 15 FPS visually compare to 60 FPS?",
    shortAnswer: "15 FPS appears visibly choppy and stuttering (strobing); 60 FPS delivers silky-smooth continuous movement.",
    explanation: "Higher frame rates reduce perceptual retinal jitter during fast motion.",
    hint: "What is the visual difference between low and high frame rates?",
    level: "basic",
    codeExample: "# 15 FPS = 66ms stutter | 60 FPS = 16.6ms fluid"
  },
  {
    question: "How do you animate a rotating object around a central pivot?",
    shortAnswer: "Increment an angle variable on each frame: `angle = (angle + speed) % 360` and pass it to your drawing function.",
    explanation: "Modulo 360 arithmetic keeps angular coordinates within standard circular bounds.",
    hint: "How do you update rotational angle per frame?",
    level: "moderate",
    codeExample: "angle = (angle + 3) % 360"
  },
  {
    question: "What is Persistence of Vision in human perception?",
    shortAnswer: "The physiological phenomenon where an image persists on the retina for ~1/25th of a second, blending discrete frames into continuous motion.",
    explanation: "Persistence of vision is the biological basis of cinema, television, and computer animation.",
    hint: "What biological principle enables humans to see animation as motion?",
    level: "moderate",
    codeExample: "# Biological persistence of vision blending frames"
  },
  {
    question: "Why should `time.perf_counter()` be used instead of `time.time()` for frame benchmarking?",
    shortAnswer: "`perf_counter()` provides the highest available resolution monotonic clock, unaffected by system clock adjustments.",
    explanation: "`perf_counter()` delivers sub-microsecond precision for animation timing.",
    hint: "Which time module function offers high-precision monotonic timing?",
    level: "advanced",
    codeExample: "t0 = time.perf_counter()"
  },
  {
    question: "How do you display a live HUD frame counter and FPS readout on canvas?",
    shortAnswer: "Use `t.write(f'Frame: {count} | FPS: {fps}', font=('Arial', 10, 'bold'))` during the render pass.",
    explanation: "Rendering diagnostic telemetry on screen aids debugging and performance profiling.",
    hint: "How do you write frame diagnostics onto the Turtle canvas?",
    level: "basic",
    codeExample: "t.write(f'FPS: {fps}', font=('Arial', 10, 'bold'))"
  },
  {
    question: "What is a Frame Drop (stutter) in animation loops?",
    shortAnswer: "When frame computation exceeds the 16.6 ms budget, causing the display to miss the refresh cycle and repeat a frame.",
    explanation: "Optimizing draw calls prevents frame budget overruns.",
    hint: "What happens when frame rendering takes longer than 16.6 ms?",
    level: "moderate",
    codeExample: "# Frame drop occurs when computation > 16.6 ms"
  },
  {
    question: "How do you animate multiple independent objects concurrently in a single frame loop?",
    shortAnswer: "Store objects in a list of dictionaries/classes, update all states in stage 2, and draw all in stage 3.",
    explanation: "Separating mass state updates from mass rendering ensures synchronization.",
    hint: "How are multiple moving objects coordinated in one loop?",
    level: "moderate",
    codeExample: "for obj in objects: obj.update(); obj.draw(t)"
  },
  {
    question: "Why is a `while True:` loop used for continuous games and animations?",
    shortAnswer: "To keep the simulation running perpetually until the user closes the window or triggers a game-over condition.",
    explanation: "The perpetual loop handles continuous real-time physics and graphics updates.",
    hint: "What loop construct runs continuous real-time simulations?",
    level: "basic",
    codeExample: "while running:\n    # loop cycle"
  },
  {
    question: "How can you gracefully exit a `while True:` animation loop when the window is closed?",
    shortAnswer: "Catch `turtle.Terminator` or check a boolean flag `running = False` on window close.",
    explanation: "Handling termination exceptions prevents ugly console tracebacks on exit.",
    hint: "What exception is raised when closing an active Turtle window?",
    level: "advanced",
    codeExample: "try:\n    while running: ...\nexcept turtle.Terminator: pass"
  },
  {
    question: "What is Interpolation (Lerp) between frames?",
    shortAnswer: "Calculating intermediate positions between keyframes: `val = start + t * (end - start)`.",
    explanation: "Linear interpolation generates smooth transitions between discrete keypoint states.",
    hint: "What mathematical technique calculates intermediate animation states?",
    level: "advanced",
    codeExample: "x = x0 + progress * (x1 - x0)"
  },
  {
    question: "How do you draw a pulsating beacon that expands and contracts periodically?",
    shortAnswer: "Calculate radius using a sine wave: `radius = base_r + amplitude * math.sin(frame * speed)`.",
    explanation: "Trigonometric sine oscillations create natural breathing and pulsing effects.",
    hint: "What mathematical function generates smooth periodic pulsing?",
    level: "moderate",
    codeExample: "r = 30 + 10 * math.sin(frame * 0.1)"
  },
  {
    question: "Why should you separate physics state updates from drawing operations?",
    shortAnswer: "So physics calculations remain deterministic and can run at a fixed tick rate independent of rendering frame rates.",
    explanation: "Decoupling physics from rendering is standard in professional game engine design.",
    hint: "Why decouple physics calculations from rendering?",
    level: "advanced",
    codeExample: "# Fixed timestep physics + Variable timestep rendering"
  },
  {
    question: "What is Motion Blur in digital graphics?",
    shortAnswer: "The visual streaking of rapidly moving objects caused by sensor exposure time or persistence of vision.",
    explanation: "Rendering subtle trailing ghost sprites simulates motion blur in vector graphics.",
    hint: "What effect streaks fast-moving objects across frames?",
    level: "advanced",
    codeExample: "# Ghost trails with fading opacity"
  },
  {
    question: "How do you achieve 120 FPS or 144 FPS animation in high-refresh displays?",
    shortAnswer: "Set `frame_duration = 1.0 / 144.0` (6.94 ms budget) and minimize draw calls with `tracer(0)`.",
    explanation: "Sub-7ms frame budgets require aggressive draw call batching and object pooling.",
    hint: "What frame duration budget corresponds to 144 FPS gaming?",
    level: "expert",
    codeExample: "dt = 1.0 / 144.0  # 6.94 ms"
  },
  {
    question: "How do you animate an object moving along a parametric circular orbit?",
    shortAnswer: "Calculate `x = cx + r * cos(theta)` and `y = cy + r * sin(theta)`, incrementing `theta` on every frame.",
    explanation: "Polar-to-Cartesian conversion per frame produces perfect circular orbital paths.",
    hint: "What formulas compute orbital motion per frame?",
    level: "moderate",
    codeExample: "x = cx + r * math.cos(theta); y = cy + r * math.sin(theta)"
  },
  {
    question: "Why is `time.sleep(0)` sometimes used inside high-speed animation loops?",
    shortAnswer: "To yield the CPU timeslice briefly to the operating system and Tkinter event queue without introducing noticeable delay.",
    explanation: "Yielding prevents 100% CPU thread starvation during tight loops.",
    hint: "Why yield CPU timeslices with time.sleep(0)?",
    level: "expert",
    codeExample: "time.sleep(0.001)"
  },
  {
    question: "What is Keyframing in animation design?",
    shortAnswer: "Defining critical landmark poses at specific timestamps, and calculating in-between frames mathematically.",
    explanation: "Keyframing allows artists to choreograph complex character motion timelines.",
    hint: "What technique defines landmark poses with in-between frame interpolation?",
    level: "moderate",
    codeExample: "# Keyframe 0s: (0,0) | Keyframe 2s: (300, 100)"
  },
  {
    question: "How do you measure actual measured FPS versus target FPS?",
    shortAnswer: "Count frames rendered over 1 second: `fps = frame_count / (now - last_report_time)`.",
    explanation: "Tracking 1-second rolling averages yields accurate real-world FPS performance metrics.",
    hint: "How is rolling average FPS calculated in real time?",
    level: "moderate",
    codeExample: "fps = frames_rendered / elapsed_seconds"
  },
  {
    question: "What is the 5-step checklist for building a 60 FPS animation loop in Python Turtle?",
    shortAnswer: "1. `screen.tracer(0)` | 2. `t.clear()` | 3. Update coordinates | 4. Draw frame | 5. `screen.update()` + `sleep(1/60)`.",
    explanation: "Following this 5-step framework guarantees rock-solid, fluid animation.",
    hint: "What 5 steps guarantee rock-solid 60 FPS animation in Turtle?",
    level: "basic",
    codeExample: "# 1. tracer(0) | 2. clear | 3. update state | 4. draw | 5. update & sleep"
  },
  {
    question: "Why is understanding frame loops crucial for future game engine and frontend frameworks?",
    shortAnswer: "Because `requestAnimationFrame` in web browsers, PyGame game loops, and Unreal Engine tick cycles all follow this exact architecture.",
    explanation: "Frame loop principles apply directly to all modern interactive real-time systems.",
    hint: "How does Turtle frame looping connect to web requestAnimationFrame and game engines?",
    level: "basic",
    codeExample: "# Universal frame loop architecture"
  }
];

export default questions;
