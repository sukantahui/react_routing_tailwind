// src/components/study/python/topics/005_002_turtle-design/topic4_files/topic4_questions.js

const questions = [
  {
    question: "What does screen.setup(width, height) do in Python Turtle?",
    shortAnswer: "Sets the dimensions and optional position of the Turtle graphics window on the desktop.",
    explanation: "setup() configures the initial size of the OS application window in pixels or fractional percentages.",
    hint: "Which method initializes the window's pixel dimensions?",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nscreen.setup(width=800, height=600)"
  },
  {
    question: "How do you set a custom title bar caption for the graphics window?",
    shortAnswer: "Using `screen.title('Your Title Text')`.",
    explanation: "title() updates the top operating system window frame caption string.",
    hint: "What method sets the text in the window title bar?",
    level: "basic",
    codeExample: "screen.title('AccoTax Graphics Studio - Barrackpore')"
  },
  {
    question: "How do you set the canvas background color in Turtle?",
    shortAnswer: "Using `screen.bgcolor(color)`.",
    explanation: "bgcolor() accepts color names, hex codes, or RGB tuples to fill the canvas background.",
    hint: "What method modifies the background color?",
    level: "basic",
    codeExample: "screen.bgcolor('#020617')"
  },
  {
    question: "What is the difference between `screen.setup()` and `screen.screensize()`?",
    shortAnswer: "setup() controls the outer OS viewport window size; screensize() controls the scrollable canvas drawing area inside.",
    explanation: "screensize defines the internal world coordinate bounds, which can be larger than the visible window.",
    hint: "One defines the outer window, the other defines the internal canvas.",
    level: "moderate",
    codeExample: "screen.setup(800, 600)      # Outer window\nscreen.screensize(1600, 1200) # Inner scrollable canvas"
  },
  {
    question: "How do you query the visible window width and height dynamically?",
    shortAnswer: "Using `screen.window_width()` and `screen.window_height()`.",
    explanation: "These methods return the active viewport dimensions in integer pixels.",
    hint: "What getter methods return window width and height?",
    level: "basic",
    codeExample: "w = screen.window_width()\nh = screen.window_height()"
  },
  {
    question: "What coordinate bounds exist for a window created with `screen.setup(800, 600)`?",
    shortAnswer: "X-axis spans from -400 to +400; Y-axis spans from -300 to +300 with (0,0) at the center.",
    explanation: "Turtle uses a centered Cartesian coordinate plane where origin (0,0) is in the exact middle.",
    hint: "How is the center origin (0,0) related to window width and height?",
    level: "basic",
    codeExample: "# Left: -400, Right: +400, Top: +300, Bottom: -300"
  },
  {
    question: "What do the optional `startx` and `starty` parameters in `screen.setup()` control?",
    shortAnswer: "The desktop screen pixel position where the window opens.",
    explanation: "startx/starty position the top-left corner of the window relative to the monitor display.",
    hint: "What parameters position the window on the physical monitor screen?",
    level: "moderate",
    codeExample: "screen.setup(600, 400, startx=50, starty=50)"
  },
  {
    question: "Can percentage fractions like `screen.setup(0.8, 0.8)` be used?",
    shortAnswer: "Yes, float values between 0.0 and 1.0 represent fractions of the total monitor resolution.",
    explanation: "setup(0.8, 0.8) opens a window taking up 80% of the screen width and height.",
    hint: "Can setup() accept decimals between 0.0 and 1.0?",
    level: "moderate",
    codeExample: "screen.setup(0.75, 0.75) # 75% of monitor resolution"
  },
  {
    question: "How do you set a background image file in Turtle?",
    shortAnswer: "Using `screen.bgpic('image.gif')`.",
    explanation: "bgpic() loads and centers a GIF image as the canvas backdrop.",
    hint: "What image format does standard Tkinter Turtle support for bgpic()?",
    level: "moderate",
    codeExample: "screen.bgpic('space_background.gif')"
  },
  {
    question: "Why does `screen.bgpic()` only support GIF images in default Python?",
    shortAnswer: "Because Tkinter's underlying PhotoImage class natively supports only GIF and PPM/PGM formats without PIL/Pillow.",
    explanation: "To load PNG/JPEG images, the Pillow library is required to convert image data first.",
    hint: "What format limitation exists in standard Tkinter PhotoImage?",
    level: "advanced",
    codeExample: "# Standard Turtle supports .gif backgrounds"
  },
  {
    question: "How do you remove a background image previously loaded with `bgpic()`?",
    shortAnswer: "Call `screen.bgpic('nopic')`.",
    explanation: "Passing the special keyword string 'nopic' clears the background image.",
    hint: "What special string keyword removes the background picture?",
    level: "moderate",
    codeExample: "screen.bgpic('nopic')"
  },
  {
    question: "How do you calculate margin coordinates dynamically for any screen size?",
    shortAnswer: "Use `margin_x = screen.window_width() // 2 - padding`.",
    explanation: "Dynamic bounds calculation prevents hardcoded coordinate clipping across different screen setups.",
    hint: "How do you find the edge of the screen using window_width?",
    level: "moderate",
    codeExample: "edge_x = screen.window_width() // 2 - 20"
  },
  {
    question: "What happens if a turtle travels past the visible window boundary?",
    shortAnswer: "The turtle continues drawing in off-screen coordinate space; lines can be viewed by scrolling if screensize is larger.",
    explanation: "Turtle coordinates are unbounded mathematical floats; the window is merely a viewing portal.",
    hint: "Does Turtle crash if it moves off-screen?",
    level: "basic",
    codeExample: "t.goto(1000, 1000) # Continues drawing off-screen"
  },
  {
    question: "What is `screen.setworldcoordinates(llx, lly, urx, ury)`?",
    shortAnswer: "Remaps the canvas coordinate system to custom user-defined axes (lower-left and upper-right points).",
    explanation: "Allows placing (0,0) at the bottom-left corner for standard mathematical plotting or custom scales.",
    hint: "Which method remaps origin (0,0) from the center to custom bounds?",
    level: "expert",
    codeExample: "screen.setworldcoordinates(0, 0, 100, 100) # (0,0) is now bottom-left!"
  },
  {
    question: "Why should `screen.tracer(0)` be used when drawing complex procedural backgrounds?",
    shortAnswer: "To disable frame-by-frame animation delays and render thousands of background elements instantly.",
    explanation: "tracer(0) pauses visual redraws until `screen.update()` is called.",
    hint: "How do you render complex backdrops without watching every individual line?",
    level: "moderate",
    codeExample: "screen.tracer(0)\n# draw 200 stars\nscreen.update()"
  },
  {
    question: "How do you query the current background color of the screen?",
    shortAnswer: "Call `screen.bgcolor()` with no arguments.",
    explanation: "Returns the active background color string or RGB tuple.",
    hint: "How do getters work for screen properties?",
    level: "basic",
    codeExample: "bg = screen.bgcolor()"
  },
  {
    question: "How do you draw a border frame along the exact perimeter of the window?",
    shortAnswer: "Calculate `hw = screen.window_width()//2 - 10` and `hh = screen.window_height()//2 - 10` and draw a rectangle.",
    explanation: "Using dynamic half-dimensions creates responsive canvas framing.",
    hint: "How do half-width and half-height define the window perimeter?",
    level: "moderate",
    codeExample: "# Responsive canvas perimeter border"
  },
  {
    question: "Does `turtle.clearscreen()` reset window dimensions or background color?",
    shortAnswer: "It deletes all drawings and resets background color back to white.",
    explanation: "clearscreen() completely resets the screen back to initial factory state.",
    hint: "Does clearscreen reset the canvas background?",
    level: "moderate",
    codeExample: "screen.clearscreen()"
  },
  {
    question: "What is the difference between `t.clear()` and `screen.clearscreen()`?",
    shortAnswer: "`t.clear()` removes drawings made by that turtle; `screen.clearscreen()` resets the entire canvas and all turtles.",
    explanation: "t.clear() is turtle-scoped, while clearscreen() is canvas-wide.",
    hint: "Which one resets all turtles and the background color?",
    level: "basic",
    codeExample: "t.clear()           # Local to turtle\nscreen.clearscreen() # Global canvas reset"
  },
  {
    question: "How do you create a split dual-color canvas background (half blue sky, half green grass)?",
    shortAnswer: "Draw two filled rectangles covering the top half and bottom half of the screen coordinates.",
    explanation: "Drawing large background shapes over coordinates [-hw, 0] to [hw, hh] creates multi-tone environments.",
    hint: "How do you draw horizon landscapes in Turtle?",
    level: "moderate",
    codeExample: "# Sky rectangle (Y > 0) + Grass rectangle (Y < 0)"
  },
  {
    question: "Can multiple windows be opened simultaneously in standard Turtle?",
    shortAnswer: "Standard Turtle module is built around a single Screen singleton per process.",
    explanation: "Tkinter Turtle manages one active root window; for multiple canvases, direct Tkinter Canvas widgets are used.",
    hint: "Is Screen a singleton or can you instantiate multiple screens?",
    level: "advanced",
    codeExample: "# Standard Turtle uses single Screen singleton"
  },
  {
    question: "How do you access the underlying Tkinter canvas object from Turtle?",
    shortAnswer: "Using `screen.getcanvas()` or `screen.cv`.",
    explanation: "Returns the native tkinter.Canvas object, enabling low-level Tkinter widget bindings.",
    hint: "What method exposes the underlying Tkinter widget?",
    level: "expert",
    codeExample: "tk_canvas = screen.getcanvas()"
  },
  {
    question: "How do you hide the operating system mouse cursor over the canvas?",
    shortAnswer: "Using `screen.getcanvas().config(cursor='none')`.",
    explanation: "Configuring the Tkinter canvas cursor attribute to 'none' hides the cursor for fullscreen game modes.",
    hint: "How do you configure Tkinter widget cursor properties?",
    level: "expert",
    codeExample: "screen.getcanvas().config(cursor='none')"
  },
  {
    question: "How do you maximize or make the window fullscreen in Turtle?",
    shortAnswer: "Using `screen.setup(1.0, 1.0)` or `screen.getcanvas().winfo_toplevel().attributes('-fullscreen', True)`.",
    explanation: "Passing 1.0 fractions to setup() or configuring the toplevel window attributes enables fullscreen display.",
    hint: "What fraction in setup() scales to full monitor size?",
    level: "advanced",
    codeExample: "screen.setup(1.0, 1.0)"
  },
  {
    question: "What is the default size of the Turtle canvas if `screen.setup()` is omitted?",
    shortAnswer: "50% width and 75% height of the monitor display.",
    explanation: "Default Turtle initialization calculates window dimensions based on display resolution.",
    hint: "Does Turtle pick a default percentage size if setup() is not called?",
    level: "basic",
    codeExample: "# Default setup is (0.5, 0.75)"
  },
  {
    question: "How do you draw a coordinate grid overlay with labeled axis numbers?",
    shortAnswer: "Loop across X and Y coordinate intervals with `t.goto()` and `t.write()`.",
    explanation: "Drawing gridlines every 50px creates a mathematical plotting workspace for students.",
    hint: "How do step loops draw evenly spaced axis lines?",
    level: "advanced",
    codeExample: "for x in range(-300, 301, 50): # draw vertical line"
  },
  {
    question: "How do you prevent the window from closing until the user clicks it?",
    shortAnswer: "Using `screen.exitonclick()`.",
    explanation: "exitonclick() binds the left mouse button to window termination and starts the mainloop.",
    hint: "What method exits when the user clicks anywhere on screen?",
    level: "basic",
    codeExample: "screen.exitonclick()"
  },
  {
    question: "What is the role of `screen.resetscreen()`?",
    shortAnswer: "Reinitializes all turtles on canvas back to origin (0,0) and initial headings.",
    explanation: "Resets all artist objects while preserving window setup.",
    hint: "What method resets all turtles back to starting position?",
    level: "moderate",
    codeExample: "screen.resetscreen()"
  },
  {
    question: "Why should `bgcolor()` be called before drawing foreground shapes?",
    shortAnswer: "To set the canvas color upfront and avoid visual flickering when background updates.",
    explanation: "Setting canvas properties first establishes the design theme before vector rendering begins.",
    hint: "Why should background be configured before foreground?",
    level: "basic",
    codeExample: "# Setup -> bgcolor -> draw geometry -> done"
  },
  {
    question: "What is the summary golden rule of canvas window design?",
    shortAnswer: "Always configure `setup()`, `title()`, and `bgcolor()` in the initial initialization block, and use dynamic coordinate math (`window_width() // 2`) for responsive layouts.",
    explanation: "This guarantees professional presentation and prevents hardcoded boundary clipping on different screen resolutions.",
    hint: "What sequence guarantees clean window presentation?",
    level: "basic",
    codeExample: "# 1. screen.setup() -> 2. screen.title() -> 3. screen.bgcolor()"
  }
];

export default questions;
