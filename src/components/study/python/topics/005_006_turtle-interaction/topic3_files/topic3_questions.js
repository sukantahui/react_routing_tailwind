// src/components/study/python/topics/005_006_turtle-interaction/topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the primary difference between `screen.onclick()` and `turtle.onclick()`?",
    shortAnswer: "`screen.onclick()` triggers anywhere on canvas background; `turtle.onclick()` triggers only when clicking that specific turtle's visible sprite.",
    explanation: "Allows separating global canvas interactions from individual clickable buttons and game entities.",
    hint: "Which method clicks global canvas versus a specific sprite?",
    level: "basic",
    codeExample: "screen.onclick(stamp_bg)\ntarget_turtle.onclick(hit_target)"
  },
  {
    question: "What arguments are automatically passed to an `onclick` callback function?",
    shortAnswer: "Two floats representing the `x` and `y` Cartesian coordinates of the mouse click: `def on_click(x, y):`.",
    explanation: "Turtle passes clicked coordinates directly to the handler.",
    hint: "How many coordinate arguments does onclick pass to its callback?",
    level: "basic",
    codeExample: "def on_click(x, y):\n    print(f'Clicked at ({x}, {y})')"
  },
  {
    question: "What do the `btn` argument numbers 1, 2, and 3 correspond to in `screen.onclick(fun, btn=1)`?",
    shortAnswer: "1 = Left click, 2 = Middle click (scroll wheel click), 3 = Right click.",
    explanation: "Standard Unix/X11 mouse button index convention.",
    hint: "Which number corresponds to Left, Middle, and Right mouse buttons?",
    level: "basic",
    codeExample: "screen.onclick(left_click, 1)\nscreen.onclick(right_click, 3)"
  },
  {
    question: "Why must a turtle be visible (`t.isvisible() == True`) for `turtle.onclick()` to trigger?",
    shortAnswer: "Because Tkinter cannot detect clicks on hidden or zero-size bounding regions (`hideturtle()`).",
    explanation: "Clicks on hidden turtles do not intersect a visible polygon hit box.",
    hint: "Can users click on a hidden turtle with turtle.onclick?",
    level: "basic",
    codeExample: "# Turtle must be visible to receive clicks"
  },
  {
    question: "How do you increase the clickable hit-box area of an interactive Turtle button?",
    shortAnswer: "Use `t.shapesize(width_scale, length_scale)` to enlarge the turtle's visible sprite polygon.",
    explanation: "Enlarging the shape size proportionally expands the clickable boundary area.",
    hint: "What method enlarges the physical clickable dimensions of a turtle?",
    level: "moderate",
    codeExample: "t.shapesize(3, 6)  # 3x height, 6x width hit box"
  },
  {
    question: "What is Point-and-Click Adventure game mechanics in Python Turtle?",
    shortAnswer: "Gameplay driven by clicking interactive sprites (`turtle.onclick`) and terrain (`screen.onclick`) to navigate and interact with the world.",
    explanation: "Point-and-click mechanics form the core of classics like Monkey Island and Myst.",
    hint: "What genre of games relies entirely on mouse click event interactions?",
    level: "moderate",
    codeExample: "# Point-and-click NPC interaction"
  },
  {
    question: "How do you bind different actions to Left Click and Right Click simultaneously?",
    shortAnswer: "Call `screen.onclick(left_handler, btn=1)` and `screen.onclick(right_handler, btn=3)`.",
    explanation: "Separate `btn` indices register independent callbacks for each mouse button.",
    hint: "How are Left and Right mouse buttons bound independently?",
    level: "basic",
    codeExample: "screen.onclick(draw, 1); screen.onclick(erase, 3)"
  },
  {
    question: "How do you pass extra parameters (like an entity ID) to a `turtle.onclick` handler?",
    shortAnswer: "Use a closure factory `def make_handler(obj_id): return lambda x, y: do_action(obj_id, x, y)`.",
    explanation: "Closure factories capture specific instance parameters for individual sprite callbacks.",
    hint: "What function pattern creates custom callback handlers for specific entities?",
    level: "advanced",
    codeExample: "t.onclick(lambda x, y, id=i: on_hit(id, x, y))"
  },
  {
    question: "What happens if a user clicks on an overlapping cluster of multiple turtles?",
    shortAnswer: "The topmost turtle in the Z-order stack receives the click event.",
    explanation: "Tkinter canvas event routing dispatches clicks to the highest visible polygon layer.",
    hint: "Which turtle receives the click when multiple turtles overlap?",
    level: "advanced",
    codeExample: "# Topmost turtle in z-index receives the click"
  },
  {
    question: "How do you create an interactive Whack-A-Mole game in Python Turtle?",
    shortAnswer: "Spawn mole turtles in random holes on a timer, bind `mole.onclick()` to award score and hide the mole upon click.",
    explanation: "Timer-based spawning combined with `turtle.onclick` drives Whack-A-Mole gameplay.",
    hint: "How is Whack-a-mole constructed in Turtle?",
    level: "moderate",
    codeExample: "mole_t.onclick(lambda x, y: score_hit(mole_t))"
  },
  {
    question: "Why should `screen.listen()` be included inside `screen.onclick()` handlers?",
    shortAnswer: "To ensure that clicking the canvas background immediately re-claims keyboard focus if lost.",
    explanation: "Auto-refocusing ensures uninterrupted keyboard controls after mouse clicks.",
    hint: "Why call listen() inside onclick handlers?",
    level: "basic",
    codeExample: "def on_click(x, y): screen.listen()"
  },
  {
    question: "What is Hit Testing in computer graphics?",
    shortAnswer: "The geometric process of determining whether a mouse coordinate `(x, y)` intersects an on-screen graphical object or shape.",
    explanation: "Hit testing is the underlying algorithm powering `turtle.onclick`.",
    hint: "What is the technical term for testing if a point lies within a shape boundary?",
    level: "advanced",
    codeExample: "# Hit testing: is_inside_polygon(mx, my, poly)"
  },
  {
    question: "How do you disable a `turtle.onclick()` handler after an item is collected?",
    shortAnswer: "Call `t.onclick(None)`.",
    explanation: "Passing `None` detaches the event handler, preventing further clicks.",
    hint: "How do you unbind click listeners from a collected coin or item?",
    level: "basic",
    codeExample: "coin_t.onclick(None)"
  },
  {
    question: "What is Raycasting in 3D point-and-click games?",
    shortAnswer: "Projecting a virtual ray from the camera through the mouse cursor to detect which 3D object the ray intersects.",
    explanation: "3D raycasting is the three-dimensional extension of 2D screen coordinate hit testing.",
    hint: "What 3D technique determines which object is beneath the mouse pointer?",
    level: "expert",
    codeExample: "# Raycast hit detection from screen to world"
  },
  {
    question: "How do you draw a connecting line from the turtle's current position to wherever the user clicks?",
    shortAnswer: "In `on_screen_click(x, y)`: call `t.pendown(); t.goto(x, y)`.",
    explanation: "Directing the turtle to click coordinates draws interactive connector vectors.",
    hint: "How do you make the turtle draw a line to mouse click coordinates?",
    level: "basic",
    codeExample: "def on_click(x, y): t.goto(x, y)"
  },
  {
    question: "How do you measure double-clicks versus single-clicks in Python Turtle?",
    shortAnswer: "Track `last_click_time = time.time()`; if `time.time() - last_click_time < 0.3` seconds, trigger double-click logic.",
    explanation: "Delta-time threshold checks differentiate single clicks from rapid double-clicks.",
    hint: "How is double-click timing detected in code?",
    level: "moderate",
    codeExample: "if time.time() - last_t < 0.3: double_click()"
  },
  {
    question: "Can custom vector shapes (like houses or stars) registered with `screen.register_shape()` receive `turtle.onclick()` events?",
    shortAnswer: "Yes, custom polygon shapes registered with `register_shape()` inherit full click hit-testing capabilities.",
    explanation: "Turtle creates accurate polygon bounding hit areas for all custom shapes.",
    hint: "Do custom registered shapes support turtle.onclick?",
    level: "moderate",
    codeExample: "screen.register_shape('star', poly)\nstar_t.shape('star')\nstar_t.onclick(hit)"
  },
  {
    question: "How do you animate a button depression visual feedback effect when a turtle is clicked?",
    shortAnswer: "Temporarily shrink `t.shapesize(0.9 * scale)` and restore full size after 100ms using `screen.ontimer()`.",
    explanation: "Visual scaling feedback gives buttons a satisfying tactile, physical feel.",
    hint: "How do you create tactile click animations for Turtle buttons?",
    level: "moderate",
    codeExample: "t.shapesize(2.7, 2.7); screen.ontimer(lambda: t.shapesize(3, 3), 100)"
  },
  {
    question: "Why should drawing operations inside click callbacks avoid heavy recursive fractals?",
    shortAnswer: "Because long recursive drawing inside callbacks freezes the main event queue, preventing other clicks from responding.",
    explanation: "Heavy computations should be decomposed into timer steps or pre-rendered.",
    hint: "Why should heavy recursive drawings be avoided in click handlers?",
    level: "moderate",
    codeExample: "# Keep click callbacks lightweight and fast"
  },
  {
    question: "How do you create a Color Picker Palette using clickable turtles?",
    shortAnswer: "Place 5 colored circle turtles along the bottom edge, each bound with `t.onclick(lambda x,y, c=color: set_brush(c))`.",
    explanation: "Clickable color swatch turtles form a digital art toolbar palette.",
    hint: "How are clickable color swatch palettes assembled?",
    level: "moderate",
    codeExample: "for c in palette: make_color_swatch(c)"
  },
  {
    question: "What is Cursor Hover (Mouse-Over) detection in Turtle?",
    shortAnswer: "Detecting when the mouse enters a button area; achieved in Tkinter by binding `<Enter>` and `<Leave>` events to the canvas.",
    explanation: "Hover states allow buttons to glow before being clicked.",
    hint: "What events detect mouse enter and leave states?",
    level: "advanced",
    codeExample: "canvas.bind('<Enter>', on_hover)"
  },
  {
    question: "How do you calculate distance from click coordinate `(x, y)` to an object `(ox, oy)`?",
    shortAnswer: "`dist = math.hypot(x - ox, y - oy)`.",
    explanation: "Euclidean distance formula checks proximity to target objects.",
    hint: "What formula calculates distance from click to target?",
    level: "basic",
    codeExample: "dist = math.hypot(x - target_x, y - target_y)"
  },
  {
    question: "How do you prevent rapid clicking from spamming sound effects or weapon fire?",
    shortAnswer: "Implement a cooldown timestamp: `if time.time() < cooldown_end: return; cooldown_end = time.time() + 0.25`.",
    explanation: "Cooldown timers debounce rapid clicks.",
    hint: "How do cooldown timers prevent click spamming?",
    level: "moderate",
    codeExample: "if now < next_click_time: return"
  },
  {
    question: "What is Context Menu invocation using Right Click (`btn=3`)?",
    shortAnswer: "Opening an options or actions menu at mouse click `(x, y)` coordinates upon right-clicking.",
    explanation: "Right click standardly summons context-sensitive command menus.",
    hint: "What menu is standardly summoned by Right Click (btn=3)?",
    level: "basic",
    codeExample: "screen.onclick(open_context_menu, 3)"
  },
  {
    question: "How do you build an interactive Chess or Checkers board in Turtle?",
    shortAnswer: "Draw the grid; calculate clicked square `(col, row) = (x // tile_size, y // tile_size)` inside `screen.onclick`.",
    explanation: "Mathematical grid cell division maps continuous click coordinates to discrete board matrix indices.",
    hint: "How do you convert continuous click coordinates to discrete grid square columns and rows?",
    level: "moderate",
    codeExample: "col = int((x + 200) // 50); row = int((y + 200) // 50)"
  },
  {
    question: "Why is `turtle.onclick()` superior to calculating bounding boxes manually for circular sprites?",
    shortAnswer: "`turtle.onclick()` handles polygon hit-testing and transformation matrices automatically via Tkinter's native C implementation.",
    explanation: "Native hit-testing is faster and requires fewer lines of boilerplate code.",
    hint: "Why prefer turtle.onclick over manual bounding box math?",
    level: "basic",
    codeExample: "# Native Tkinter hit-testing"
  },
  {
    question: "How do you create an interactive soundboard where clicking instruments plays audio?",
    shortAnswer: "Create clickable instrument turtles; invoke audio playback libraries (`playsound` or `pygame.mixer`) inside their `onclick` callbacks.",
    explanation: "Binding audio playback to sprite clicks creates interactive soundboards.",
    hint: "How are audio soundboards constructed in Turtle?",
    level: "moderate",
    codeExample: "piano_t.onclick(lambda x,y: play_note('C4'))"
  },
  {
    question: "What is the 3-step Golden Rule for Mouse Click Handling in Python Turtle?",
    shortAnswer: "1. Define callback receiving `(x, y)` | 2. Choose `screen.onclick` (canvas) vs `turtle.onclick` (sprite) | 3. Start `screen.mainloop()`.",
    explanation: "This 3-step blueprint guarantees clean, intuitive mouse interaction architecture.",
    hint: "What 3 steps build interactive mouse-driven software in Turtle?",
    level: "basic",
    codeExample: "# 1. def click(x,y) → 2. bind screen/turtle.onclick → 3. mainloop()"
  },
  {
    question: "How does mouse click handling prepare students for modern web and mobile apps?",
    shortAnswer: "Because `screen.onclick(x, y)` directly translates to JavaScript `addEventListener('click', e => ...)` and React `onClick={(e) => ...}`.",
    explanation: "Mouse event architectures are universal across desktop and web applications.",
    hint: "How do Turtle click handlers map to web JavaScript and React?",
    level: "basic",
    codeExample: "# Direct mapping to React onClick and DOM event listeners"
  },
  {
    question: "Why is point-and-click UI design critical for modern software usability?",
    shortAnswer: "Because graphical click interfaces allow users of any age to navigate and control complex systems intuitively without memorizing text commands.",
    explanation: "Direct visual manipulation is the cornerstone of modern user interface design.",
    hint: "Why is intuitive point-and-click interaction essential in software design?",
    level: "basic",
    codeExample: "# Direct visual manipulation UI foundations"
  }
];

export default questions;
