// src/components/study/python/topics/005_006_turtle-interaction/topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is `turtle.ondrag()` used for in Python graphics?",
    shortAnswer: "Binding a callback function that executes continuously while the user clicks and drags a specific turtle across the screen.",
    explanation: "Allows building freehand painting pens, draggable sliders, and movable puzzle sprites.",
    hint: "What method listens to mouse drag interactions on a turtle?",
    level: "basic",
    codeExample: "t.ondrag(t.goto)"
  },
  {
    question: "Why should `t.ondrag(None)` be called at the start of a drag callback function?",
    shortAnswer: "To temporarily unbind the event and prevent rapid mouse movements from overwhelming the Tkinter event queue with hundreds of queued moves.",
    explanation: "The unbind-rebind pattern prevents sluggish drag lag and UI freezing.",
    hint: "How do you prevent event queue flooding during high-speed dragging?",
    level: "moderate",
    codeExample: "def on_drag(x, y):\n    t.ondrag(None)\n    t.goto(x, y)\n    t.ondrag(on_drag)"
  },
  {
    question: "What coordinates are passed into the `ondrag` callback function?",
    shortAnswer: "Two float values representing the current `(x, y)` Cartesian coordinates of the mouse cursor.",
    explanation: "Turtle passes the real-time mouse position directly to the drag callback.",
    hint: "What parameters are supplied to an ondrag callback?",
    level: "basic",
    codeExample: "def handle_drag(x, y):\n    t.goto(x, y)"
  },
  {
    question: "How do you create a 1D horizontal slider using `ondrag()`?",
    shortAnswer: "Clamp the `x` coordinate between minimum and maximum bounds and lock the `y` coordinate to zero: `t.goto(max(min_x, min(max_x, x)), 0)`.",
    explanation: "Locking the unused axis creates clean linear 1D slider widgets.",
    hint: "How do you constrain a draggable turtle to a horizontal line?",
    level: "moderate",
    codeExample: "clamped_x = max(-100, min(100, x))\nt.goto(clamped_x, 0)"
  },
  {
    question: "What is Snap-to-Grid snapping in puzzle games and level editors?",
    shortAnswer: "Rounding the dropped coordinate to the nearest grid increment: `snap_x = round(x / grid_size) * grid_size`.",
    explanation: "Grid snapping aligns objects neatly into discrete board slots.",
    hint: "What formula snaps continuous coordinates to grid multiples?",
    level: "basic",
    codeExample: "snap_x = round(x / 50) * 50\nsnap_y = round(y / 50) * 50"
  },
  {
    question: "What does `turtle.onrelease()` do in drag-and-drop mechanics?",
    shortAnswer: "Fires a callback when the user releases the mouse button after dragging, ideal for snapping puzzle pieces into place.",
    explanation: "Complements `ondrag` by handling drop validation and placement.",
    hint: "What method detects when a dragged turtle is released?",
    level: "basic",
    codeExample: "t.onrelease(snap_to_target)"
  },
  {
    question: "How do you implement freehand brush size adjustments in a drawing app?",
    shortAnswer: "Bind `+` and `-` keys to increment/decrement `t.pensize(size)`.",
    explanation: "Dynamic pen size adjustments allow fine sketching and broad shading.",
    hint: "What method alters line thickness during freehand drawing?",
    level: "basic",
    codeExample: "def thicker(): t.pensize(t.pensize() + 2)"
  },
  {
    question: "Why should `t.speed(0)` be set for drawing pen turtles?",
    shortAnswer: "To eliminate turn and walk animation pauses, ensuring the pen follows the mouse cursor instantaneously without lag.",
    explanation: "`speed(0)` delivers zero-latency cursor tracking.",
    hint: "Why is speed(0) essential for freehand drawing pens?",
    level: "basic",
    codeExample: "pen.speed(0)"
  },
  {
    question: "What is Bezier Curve Smoothing in digital whiteboard software?",
    shortAnswer: "Interpolating raw mouse drag points with quadratic or cubic Bezier curves to eliminate jagged corner artifacts.",
    explanation: "Vector curve smoothing creates polished calligraphy strokes.",
    hint: "What mathematical technique transforms jagged mouse paths into smooth curves?",
    level: "advanced",
    codeExample: "# Bezier stroke smoothing algorithm"
  },
  {
    question: "How do you create an interactive color palette for a whiteboard app?",
    shortAnswer: "Bind number keys `1`-`5` or create clickable color swatch turtles that call `pen.color(chosen_color)`.",
    explanation: "Palette switching provides dynamic color selection.",
    hint: "How are brush colors switched dynamically in painting apps?",
    level: "basic",
    codeExample: "screen.onkeypress(lambda: pen.color('red'), '1')"
  },
  {
    question: "What is Bounding Box Clamping during sprite dragging?",
    shortAnswer: "Restricting dragged sprite coordinates so they cannot escape the visible screen arena: `x = max(min_x, min(max_x, x))`.",
    explanation: "Prevents users from accidentally dragging pieces offscreen.",
    hint: "What technique prevents dragging objects off the screen?",
    level: "basic",
    codeExample: "x = max(-300, min(300, x))"
  },
  {
    question: "How do you implement an Eraser Tool in a Turtle whiteboard?",
    shortAnswer: "Set the pen color to the background color (`pen.color(bg_color)`) and increase `pen.pensize(20)`.",
    explanation: "Drawing with background color functions as a digital eraser.",
    hint: "How is an eraser implemented in canvas drawing apps?",
    level: "basic",
    codeExample: "def set_eraser(): pen.color(bg_color); pen.pensize(20)"
  },
  {
    question: "What is Drag Threshold / Deadzone in UI controls?",
    shortAnswer: "Requiring the mouse to move at least 3 to 5 pixels before interpreting a mouse press as a drag rather than a static click.",
    explanation: "Deadzone thresholds prevent accidental micro-drags when clicking buttons.",
    hint: "What mechanism distinguishes intentional drags from static clicks?",
    level: "advanced",
    codeExample: "if math.hypot(dx, dy) > 5: start_dragging()"
  },
  {
    question: "How do you build a multi-piece jigsaw puzzle in Python Turtle?",
    shortAnswer: "Create 4-9 separate turtle shapes, attach `ondrag` and `onrelease` to each, checking if each piece is dropped near its target slot.",
    explanation: "Independent draggable turtles represent separate movable puzzle pieces.",
    hint: "How are multi-piece puzzle games constructed?",
    level: "moderate",
    codeExample: "for piece in pieces: piece.ondrag(drag); piece.onrelease(check_slot)"
  },
  {
    question: "What is Rubber-banding in box-selection tools?",
    shortAnswer: "Drawing an interactive expanding dashed rectangle from initial click `(x0, y0)` to current drag `(x1, y1)` to select multiple objects.",
    explanation: "Standard multi-item selection technique in desktop operating systems.",
    hint: "What is the term for rectangular drag-selection boxes?",
    level: "advanced",
    codeExample: "# Rubber-band box selection rectangle"
  },
  {
    question: "Why should `pen.penup()` be used when jumping the pen cursor without drawing?",
    shortAnswer: "To prevent unwanted stray connector lines between separate drawing strokes.",
    explanation: "`penup()` lifts the virtual pen off the digital paper.",
    hint: "How do you reposition the brush without drawing lines?",
    level: "basic",
    codeExample: "pen.penup(); pen.goto(new_x, new_y); pen.pendown()"
  },
  {
    question: "How do you calculate the percentage value `(0% - 100%)` from a slider knob's `x` position?",
    shortAnswer: "`pct = ((x - min_x) / (max_x - min_x)) * 100`.",
    explanation: "Linear normalization maps physical pixel ranges to logical 0-100% metrics.",
    hint: "What formula normalizes slider knob position to a 0-100 percentage?",
    level: "basic",
    codeExample: "pct = int(((x + 150) / 300) * 100)"
  },
  {
    question: "How do you export or save a freehand Turtle drawing to an image file?",
    shortAnswer: "Use `screen.getcanvas().postscript(file='drawing.eps')` or convert with PIL / Ghostscript.",
    explanation: "Tkinter canvas natively exports vector EPS PostScript files.",
    hint: "What method exports Turtle canvas graphics to PostScript EPS files?",
    level: "moderate",
    codeExample: "screen.getcanvas().postscript(file='art.eps')"
  },
  {
    question: "How do you implement Undo functionality for a freehand drawing canvas?",
    shortAnswer: "Store stroke coordinates in a list; on Undo keypress, clear canvas and replay all strokes except the last one.",
    explanation: "Stroke replay buffers implement non-destructive undo and redo stacks.",
    hint: "How is Undo history implemented for freehand drawings?",
    level: "advanced",
    codeExample: "strokes.pop(); redraw_all(strokes)"
  },
  {
    question: "Can multiple sliders (e.g. Red, Green, Blue) coexist on the same screen?",
    shortAnswer: "Yes, each slider uses its own draggable knob turtle clamped to its respective Y horizontal track.",
    explanation: "Separate knob turtles allow building complex multi-slider control panels.",
    hint: "How do multiple RGB sliders coexist on one canvas?",
    level: "moderate",
    codeExample: "# r_knob at y=50, g_knob at y=0, b_knob at y=-50"
  },
  {
    question: "What is Delta Drag Tracking (`dx, dy`)?",
    shortAnswer: "Calculating displacement relative to the previous frame's mouse position (`dx = x - prev_x`) rather than absolute coordinates.",
    explanation: "Delta tracking simplifies relative movement for complex compound objects.",
    hint: "What technique computes movement relative to previous mouse positions?",
    level: "advanced",
    codeExample: "dx = x - last_x; dy = y - last_y"
  },
  {
    question: "How do you animate dragging with a physics spring / elastic tether?",
    shortAnswer: "Apply spring force `fx = -k * (pos - mouse_pos)` every tick, accelerating the object smoothly toward the mouse cursor.",
    explanation: "Spring physics adds satisfying weight and momentum to draggable objects.",
    hint: "How do spring equations create elastic dragging physics?",
    level: "expert",
    codeExample: "ax = -k * (x - target_x) - damping * vx"
  },
  {
    question: "Why does dragging feel sluggish if `screen.tracer(0)` and `screen.update()` are not used properly?",
    shortAnswer: "Without tracer synchronization, Tkinter animates every microscopic sub-step of the turtle's movement.",
    explanation: "Double-buffering guarantees immediate, instant visual drag updates.",
    hint: "Why is tracer management important for smooth dragging?",
    level: "moderate",
    codeExample: "screen.tracer(0); # in drag: update(); screen.update()"
  },
  {
    question: "How do you create a draggable circular dial / knob that rotates around a pivot?",
    shortAnswer: "Compute angle using `theta = math.atan2(y - pivot_y, x - pivot_x)` and rotate the turtle heading to `theta`.",
    explanation: "Trigonometric arctangent converts mouse drag coordinates to rotational angles.",
    hint: "What trigonometric function converts drag coordinates to rotation angles?",
    level: "advanced",
    codeExample: "angle = math.degrees(math.atan2(y - cy, x - cx))"
  },
  {
    question: "How do you bind different drag behaviors to Left Button vs Right Button?",
    shortAnswer: "Specify `btn=1` or `btn=3`: `t.ondrag(drag_draw, btn=1)` and `t.ondrag(drag_erase, btn=3)`.",
    explanation: "Button index arguments support multi-button drag workflows.",
    hint: "How are multi-button drags configured in ondrag?",
    level: "moderate",
    codeExample: "t.ondrag(brush_drag, 1); t.ondrag(erase_drag, 3)"
  },
  {
    question: "What is Card Deck Drag-and-Drop in solitaire or trading card games?",
    shortAnswer: "Dragging card turtles between tableau stacks, validating target stack rules upon `onrelease`.",
    explanation: "Drag and drop forms the core interaction model for card and board games.",
    hint: "What game genre relies on card drag and drop validation?",
    level: "moderate",
    codeExample: "card_t.ondrag(drag_card); card_t.onrelease(drop_card)"
  },
  {
    question: "How do you provide visual feedback (like a drop-shadow) while dragging a sprite?",
    shortAnswer: "Scale `shapesize(1.15)` and draw a faint grey shadow polygon slightly offset beneath the dragged sprite.",
    explanation: "Visual elevation cues simulate picking up a physical card or tile.",
    hint: "How do drop shadows and scaling simulate physical elevation during drags?",
    level: "moderate",
    codeExample: "t.shapesize(2.8, 2.8)  # Elevate on drag"
  },
  {
    question: "What is the 3-step Golden Rule for Drag-and-Drop Interactions in Python Turtle?",
    shortAnswer: "1. Bind `t.ondrag(drag_fn)` with the unbind-rebind pattern | 2. Apply spatial bounds / clamping | 3. Bind `t.onrelease(drop_fn)` for snap alignment.",
    explanation: "This 3-step blueprint guarantees rock-solid, glitch-free dragging and snapping.",
    hint: "What 3 steps build robust drag and drop interactions in Turtle?",
    level: "basic",
    codeExample: "# 1. ondrag + unbind -> 2. clamp bounds -> 3. onrelease snap"
  },
  {
    question: "How does learning `ondrag()` prepare students for modern frontend and mobile development?",
    shortAnswer: "Because touch gestures (drag, swipe, pan), HTML5 Drag-and-Drop API, and React Native PanResponder use identical spatial event concepts.",
    explanation: "Drag-and-drop mechanics are foundational across all modern GUI and mobile platforms.",
    hint: "How does ondrag connect to HTML5 Drag-and-Drop and React Native gestures?",
    level: "basic",
    codeExample: "# Direct mapping to HTML5 Drag-and-Drop and mobile touch gestures"
  },
  {
    question: "Why are custom interactive widgets (sliders, knobs, color pickers) better than OS default widgets in game development?",
    shortAnswer: "Because custom graphical widgets can be fully styled with theme graphics, custom fonts, animations, and sound effects matching the game's aesthetic.",
    explanation: "Custom game UI widgets maintain visual immersion compared to standard OS grey dialogs.",
    hint: "Why do game developers build custom canvas sliders rather than default OS controls?",
    level: "basic",
    codeExample: "# Immersive themed custom GUI widgets"
  }
];

export default questions;
