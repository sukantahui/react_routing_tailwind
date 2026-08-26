// src/components/study/python/topics/005_005_turtle-animation/topic2_files/topic2_questions.js

const questions = [
  {
    question: "What physical cause creates screen flickering in digital animation?",
    shortAnswer: "The monitor displaying the blank canvas during the brief erase phase before the new frame is rendered.",
    explanation: "Rapid alternating visibility between blank backgrounds and drawn shapes creates strobe flickering.",
    hint: "What does the user see during an unbuffered canvas clear?",
    level: "basic",
    codeExample: "# Unbuffered clear() causes strobe flicker"
  },
  {
    question: "How does `screen.tracer(0)` eliminate screen flicker completely?",
    shortAnswer: "It hides both the erase (`clear()`) and intermediate drawing strokes inside offscreen RAM, showing only finished frames.",
    explanation: "Offscreen double buffering guarantees the physical display never sees partial or blank frames.",
    hint: "How does buffering prevent intermediate frames from reaching the screen?",
    level: "basic",
    codeExample: "screen.tracer(0)  # Offscreen buffering"
  },
  {
    question: "What is the Multi-Turtle Layer Isolation pattern?",
    shortAnswer: "Using one turtle (`bg_t`) to draw static backdrops once, and a second turtle (`sprite_t`) that clears only moving sprites.",
    explanation: "Isolating layers avoids redrawing static scenery (mountains, stars) on every single animation frame.",
    hint: "How do separate turtles handle background vs foreground objects?",
    level: "moderate",
    codeExample: "bg_t.draw_mountains()  # Drawn once\nsprite_t.clear()       # Cleared per frame"
  },
  {
    question: "Why should `screen.clearscreen()` NOT be used in an animation loop?",
    shortAnswer: "It deletes all turtles, resets all window settings, and causes violent full-screen white flashes.",
    explanation: "Use `t.clear()` on dedicated sprite turtles rather than wiping the entire screen object.",
    hint: "Why is clearscreen() destructive in animation loops?",
    level: "basic",
    codeExample: "# BAD: screen.clearscreen()\n# GOOD: sprite_t.clear()"
  },
  {
    question: "What is a Strobe Artifact in low-framerate unbuffered drawing?",
    shortAnswer: "A jarring high-frequency pulsing flash visible to the human eye caused by rapid repainting cycles.",
    explanation: "Strobe artifacts cause severe eye fatigue and ruin user experience.",
    hint: "What do you call high-frequency flashing artifacts?",
    level: "basic",
    codeExample: "# Strobe artifacts from unbuffered drawing"
  },
  {
    question: "How do you animate a space invader alien moving over a starfield without erasing the stars?",
    shortAnswer: "Draw stars once using `star_turtle`, and animate the alien on `game_turtle` using `game_turtle.clear()`.",
    explanation: "Clearing `game_turtle` preserves the underlying starfield drawn by `star_turtle`.",
    hint: "How do separate turtles protect stars from being erased?",
    level: "moderate",
    codeExample: "stars_t.draw_stars(); game_t.clear(); game_t.draw_alien()"
  },
  {
    question: "What is the computational overhead of having 3 separate Turtle objects?",
    shortAnswer: "Minimal (a few kilobytes of RAM per instance).",
    explanation: "Instantiating 2-3 persistent layer turtles is lightweight and vastly improves performance.",
    hint: "Does having multiple persistent turtles slow down execution?",
    level: "basic",
    codeExample: "bg_t = turtle.Turtle(); player_t = turtle.Turtle()"
  },
  {
    question: "Why does calling `screen.update()` multiple times per frame re-introduce flicker?",
    shortAnswer: "Because each extra `update()` call pushes an incomplete partial drawing to the physical screen.",
    explanation: "Buffer swaps must occur strictly ONCE per frame cycle after all drawing is finished.",
    hint: "What happens if update() is called while drawing is half-finished?",
    level: "moderate",
    codeExample: "# Call screen.update() only once at frame end"
  },
  {
    question: "How does VSync (Vertical Synchronization) help prevent screen tearing and flicker?",
    shortAnswer: "It locks buffer flips to the physical monitor's vertical blanking interval (VBLANK).",
    explanation: "Syncing swaps with monitor refreshes guarantees tear-free display.",
    hint: "What hardware feature synchronizes buffer swaps with monitor refresh?",
    level: "advanced",
    codeExample: "# VSync synchronization with monitor refresh"
  },
  {
    question: "What happens if you clear the canvas while `tracer(1)` is active?",
    shortAnswer: "The canvas repaints to blank background instantly, causing a visible flash before the next shape is drawn.",
    explanation: "Active auto-redraw always exposes intermediate blank states.",
    hint: "Why does tracer(1) guarantee flickering during clear()?",
    level: "basic",
    codeExample: "# tracer(1) exposes canvas during clear()"
  },
  {
    question: "How do you animate a scorecard/HUD in a game without flicker?",
    shortAnswer: "Use a dedicated `hud_turtle`, call `hud_turtle.clear()`, and write updated scores at frame end before `screen.update()`.",
    explanation: "Isolating HUD rendering prevents score text from flickering.",
    hint: "How should game HUD scoreboards be animated cleanly?",
    level: "moderate",
    codeExample: "hud_t.clear(); hud_t.write(f'Score: {score}')"
  },
  {
    question: "What is the difference between Screen Tearing and Screen Flickering?",
    shortAnswer: "Flickering is alternating brightness/blank frames; tearing is horizontal misalignment where parts of two frames show simultaneously.",
    explanation: "Flickering stems from unbuffered clearing; tearing stems from un-synced buffer flips.",
    hint: "How does horizontal line misalignment differ from flashing?",
    level: "moderate",
    codeExample: "# Flickering = flashing | Tearing = split frame lines"
  },
  {
    question: "How do you animate rotating clock hands over a static dial face with zero flicker?",
    shortAnswer: "Draw dial face once with `dial_t`, and animate hands with `hands_t.clear()` and `screen.update()`.",
    explanation: "Static dial face stays permanently cached; only clock hands are erased and redrawn.",
    hint: "How do you separate clock dial from rotating hands?",
    level: "moderate",
    codeExample: "dial_t.draw_face(); hands_t.clear(); hands_t.draw_hands()"
  },
  {
    question: "Why should you never create new Turtle instances inside the `while` loop to avoid flicker?",
    shortAnswer: "Creating turtles dynamically inside the loop causes massive memory allocation stalls, triggering GC pauses and stutter.",
    explanation: "Always pre-allocate a fixed pool of persistent turtle instances before the loop starts.",
    hint: "Why should turtle instances be created before the loop?",
    level: "moderate",
    codeExample: "# Pre-allocate turtles before animation loop"
  },
  {
    question: "What is Double Buffering tearing protection in modern OS window compositors?",
    shortAnswer: "Desktop window managers (DWM/Wayland) composite back buffers into GPU surfaces before presentation.",
    explanation: "Modern compositors eliminate window-level flickering when double buffering is properly engaged.",
    hint: "How do modern OS window compositors handle double-buffered frames?",
    level: "advanced",
    codeExample: "# OS compositor surface blending"
  },
  {
    question: "How can you verify that an animation is 100% flicker-free on high-speed cameras?",
    shortAnswer: "Record the screen at 120 FPS or 240 FPS and verify that no blank or half-rendered frames appear in the recording.",
    explanation: "High-speed camera analysis reveals micro-flicker undetectable to the naked eye.",
    hint: "How do engineers test display flicker with high-speed video?",
    level: "advanced",
    codeExample: "# High-speed camera frame validation"
  },
  {
    question: "How do you animate particles exploding over a background image without destroying the background?",
    shortAnswer: "Render background on `bg_turtle`, render particles on `particle_turtle`, and clear only `particle_turtle` per tick.",
    explanation: "Multi-turtle layer isolation keeps background artwork intact during explosive particle animations.",
    hint: "How are particle effects isolated from background images?",
    level: "moderate",
    codeExample: "particle_t.clear(); particle_t.draw_sparks()"
  },
  {
    question: "What is Canvas Blitting in 2D graphic engines?",
    shortAnswer: "Bit-block image transfer: copying a pre-rendered block of memory directly onto the display canvas.",
    explanation: "Blitting is the low-level memory operation underlying `screen.update()`.",
    hint: "What term describes fast memory block copying of image data?",
    level: "advanced",
    codeExample: "# Bit-block transfer (Blit) to display"
  },
  {
    question: "Why does setting `t.speed(0)` NOT solve flickering by itself?",
    shortAnswer: "Because `speed(0)` only sets delay to 0; it does NOT stop the canvas from refreshing during `t.clear()`.",
    explanation: "`screen.tracer(0)` is the only command that disables canvas paint events during clears.",
    hint: "Why is speed(0) insufficient to stop flickering?",
    level: "basic",
    codeExample: "# speed(0) alone does NOT prevent flicker"
  },
  {
    question: "How do you animate a car driving across a city with moving wheels without flicker?",
    shortAnswer: "On each frame: `car_t.clear()`, draw car chassis at `(x, y)`, draw rotating wheel spokes, and call `screen.update()`.",
    explanation: "Grouping all moving parts into a single turtle clear and draw cycle ensures synchronized, flicker-free movement.",
    hint: "How do you keep car body and wheels synchronized?",
    level: "moderate",
    codeExample: "car_t.clear(); draw_car(car_t, x, y); screen.update()"
  },
  {
    question: "How does `screen.tracer(0)` interact with Tkinter's event queue?",
    shortAnswer: "It prevents Tkinter from firing intermediate `<Expose>` paint callbacks until `screen.update()` triggers an explicit update.",
    explanation: "Suppressing expose events keeps the GUI thread responsive and flicker-free.",
    hint: "What Tkinter event is suppressed by tracer(0)?",
    level: "expert",
    codeExample: "# Suppresses Tkinter Expose paint events"
  },
  {
    question: "What is the role of `t.hideturtle()` in preventing cursor flicker?",
    shortAnswer: "If the turtle is visible, the cursor sprite flashes and redraws over changing geometry; hiding it removes cursor artifacts.",
    explanation: "Cursor sprites introduce extra redraw passes that can cause visual jitter.",
    hint: "Why does hiding the cursor sprite prevent visual jitter?",
    level: "basic",
    codeExample: "t.hideturtle()"
  },
  {
    question: "How do you implement a 3-layer architecture (Background, Midground Actors, Foreground HUD) in Turtle?",
    shortAnswer: "Create `bg_t`, `actor_t`, and `hud_t`; only clear `actor_t` and `hud_t` during the frame loop.",
    explanation: "3-layer isolation is the classic game architecture for retro 2D arcade games.",
    hint: "What 3 turtles manage background, gameplay actors, and HUD?",
    level: "advanced",
    codeExample: "# bg_t (static) | actor_t (moving) | hud_t (scores)"
  },
  {
    question: "What is Ghosting in animation?",
    shortAnswer: "A visual artifact where faint traces of previous positions remain visible due to slow display pixel response times or incomplete clears.",
    explanation: "Thorough frame clearing and proper double buffering eliminate digital ghosting.",
    hint: "What artifact leaves faint trailing shadows of previous frames?",
    level: "moderate",
    codeExample: "# Ghosting from slow pixel transitions or incomplete clear"
  },
  {
    question: "How do you animate a bouncing ball with a trailing shadow on the floor without flicker?",
    shortAnswer: "In the frame loop: `t.clear()`, draw shadow oval on floor, draw ball above it, and flush with `screen.update()`.",
    explanation: "Drawing shadow and ball in the same buffer pass ensures synchronized depth.",
    hint: "How are ball and floor shadow rendered together?",
    level: "moderate",
    codeExample: "t.clear(); draw_shadow(t, x); draw_ball(t, x, y); screen.update()"
  },
  {
    question: "Why should `screen.update()` be followed immediately by a paced sleep `time.sleep(dt)`?",
    shortAnswer: "To give the monitor time to display the current frame before the next loop tick starts clearing the buffer.",
    explanation: "Paced sleeps stabilize frame delivery and prevent 100% CPU thread lock.",
    hint: "Why is sleep required immediately after screen.update()?",
    level: "basic",
    codeExample: "screen.update(); time.sleep(1/60)"
  },
  {
    question: "How do you create an animated loading spinner in Python Turtle with zero flicker?",
    shortAnswer: "In a timer loop: `spinner_t.clear()`, draw 8 radial dots with fading opacities/colors, and call `screen.update()`.",
    explanation: "Double-buffered radial dots simulate smooth modern web loading spinners.",
    hint: "How is a smooth radial loading spinner animated in Turtle?",
    level: "moderate",
    codeExample: "spinner_t.clear(); draw_spinner_dots(angle); screen.update()"
  },
  {
    question: "What is the 3-step Golden Rule for 100% Flicker-Free Animation in Python Turtle?",
    shortAnswer: "1. `screen.tracer(0)` | 2. `sprite_turtle.clear()` per frame | 3. Single `screen.update()` after all layer rendering.",
    explanation: "This 3-step framework guarantees rock-solid, flicker-free presentation across all projects.",
    hint: "What 3 steps guarantee zero flicker in Turtle animations?",
    level: "basic",
    codeExample: "# 1. tracer(0) | 2. clear sprite | 3. screen.update()"
  },
  {
    question: "How do professional game engines like Unreal Engine and Unity handle flicker prevention?",
    shortAnswer: "Using multi-buffered swap chains (Double/Triple Buffering) synced with display vertical blanking intervals (VSync).",
    explanation: "The same double-buffering principles taught here power all commercial game rendering pipelines.",
    hint: "How do AAA commercial game engines eliminate display flicker?",
    level: "basic",
    codeExample: "# Universal multi-buffered swap chain architecture"
  },
  {
    question: "Why is flicker elimination crucial for user accessibility and health?",
    shortAnswer: "Strobe flickering can trigger photosensitive epileptic seizures, severe headaches, and visual eye strain.",
    explanation: "Flicker-free rendering is a critical accessibility standard in software engineering.",
    hint: "Why is flicker elimination an important accessibility requirement?",
    level: "basic",
    codeExample: "# Accessibility: Prevent photosensitive strobe triggers"
  }
];

export default questions;
