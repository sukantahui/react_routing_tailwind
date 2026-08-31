// src/components/study/python/topics/005_001_turtle-foundation/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Screen configuration: setup(), title(), bgcolor(), screensize()

const questions = [
  {
    question: "What is the purpose of 'screen.setup(width, height, startx, starty)'?",
    shortAnswer: "'screen.setup()' configures the physical OS window dimensions (width and height) and the optional top-left starting position (startx, starty) on the monitor screen.",
    explanation: "Configuring the physical window geometry.",
    hint: "Sets window width, height, and starting screen placement coordinates.",
    level: "basic",
    codeExample: "screen.setup(width=800, height=600, startx=100, starty=100)"
  },
  {
    question: "What happens if you pass fractional float values to 'screen.setup(width, height)' (e.g. 'screen.setup(0.5, 0.5)')?",
    shortAnswer: "Float values between 0.0 and 1.0 represent a fraction of the user's total physical display monitor resolution (e.g. 0.5 creates a window occupying 50% of the screen width and height).",
    explanation: "Fractional monitor resolution scaling in screen.setup.",
    hint: "Floats (0.0 to 1.0) scale window size as a percentage of the user's screen.",
    level: "moderate",
    codeExample: "screen.setup(0.75, 0.75) # 75% of monitor screen width and height"
  },
  {
    question: "What is the difference between 'screen.setup()' and 'screen.screensize()'?",
    shortAnswer: "'screen.setup()' controls the physical operating system window viewport size, while 'screen.screensize()' controls the dimensions of the internal virtual drawing canvas buffer (attaching scrollbars if the canvas is larger than the window).",
    explanation: "Physical window viewport vs internal virtual canvas dimensions.",
    hint: "setup() = physical window size; screensize() = internal drawing canvas size (with scrollbars).",
    level: "moderate",
    codeExample: "screen.setup(600, 400)\nscreen.screensize(2000, 2000) # Creates scrollable canvas"
  },
  {
    question: "How do you set a custom window title in Python Turtle?",
    shortAnswer: "Using 'screen.title(\"Custom Title\")'.",
    explanation: "Branding and setting the OS window title bar.",
    hint: "Use screen.title('My Title').",
    level: "basic",
    codeExample: "screen.title('Coder & Accotax • Creative Turtle Art')"
  },
  {
    question: "What color formats can be passed to 'screen.bgcolor()' by default?",
    shortAnswer: "1. Named color strings (e.g. 'black', 'navy', 'crimson', 'teal'), 2. Hexadecimal color strings (e.g. '#0f172a', '#2dd4bf'), and 3. RGB tuples when colormode is configured.",
    explanation: "Supported color formats for canvas background.",
    hint: "Named strings, Hexadecimal strings, and RGB tuples.",
    level: "basic",
    codeExample: "screen.bgcolor('#090d16') # Hex dark theme"
  },
  {
    question: "How do you enable 0-255 integer RGB color values in Python Turtle?",
    shortAnswer: "By calling 'screen.colormode(255)' (the default mode is 1.0 where RGB values range from 0.0 to 1.0).",
    explanation: "Switching Turtle colormode between 1.0 float and 255 integer ranges.",
    hint: "Call screen.colormode(255).",
    level: "basic",
    codeExample: "screen.colormode(255)\nscreen.bgcolor((15, 23, 42)) # RGB tuple in 0-255 range"
  },
  {
    question: "What happens if you omit 'startx' and 'starty' in 'screen.setup(800, 600)'?",
    shortAnswer: "The window is automatically positioned at the exact center of the user's primary monitor display.",
    explanation: "Default centered window positioning in Tkinter.",
    hint: "The window is automatically centered on the user's monitor.",
    level: "basic",
    codeExample: "screen.setup(800, 600) # Centered on monitor"
  },
  {
    question: "How do you make a Turtle window fullscreen across the entire monitor?",
    shortAnswer: "By calling 'screen.setup(1.0, 1.0)' or using the underlying Tkinter root method 'screen.cv._rootwindow.attributes(\"-fullscreen\", True)'.",
    explanation: "Fullscreen window configuration techniques.",
    hint: "screen.setup(1.0, 1.0) occupies 100% of the display monitor.",
    level: "moderate",
    codeExample: "screen.setup(1.0, 1.0) # Fullscreen dimensions"
  },
  {
    question: "Can you change 'screen.bgcolor()' dynamically during an animation?",
    shortAnswer: "Yes; calling 'screen.bgcolor(\"new_color\")' at any time immediately repaints the background canvas without clearing or erasing existing turtle drawings.",
    explanation: "Dynamic runtime background updates.",
    hint: "Yes, calling bgcolor() dynamically updates the background without erasing existing lines.",
    level: "basic",
    codeExample: "screen.bgcolor('black')\n# later...\nscreen.bgcolor('#1e1b4b')"
  },
  {
    question: "How do you access the underlying Tkinter Canvas object from a Turtle Screen?",
    shortAnswer: "Using 'screen.getcanvas()' (or 'screen.cv'), which returns the native 'tkinter.Canvas' object for advanced Tkinter integrations.",
    explanation: "Interfacing Turtle with standard Tkinter widgets.",
    hint: "Use screen.getcanvas().",
    level: "pro",
    codeExample: "tk_canvas = screen.getcanvas() # Native Tkinter Canvas object"
  },
  {
    question: "What is the purpose of 'screen.clear()' vs 'screen.resetscreen()'?",
    shortAnswer: "'screen.clear()' deletes all drawings and resets all turtles on the screen to initial state; 'screen.resetscreen()' does the same but maintains custom background colors and settings.",
    explanation: "Screen-level clearing and resetting methods.",
    hint: "clear() resets entire screen including turtles; resetscreen() maintains screen settings.",
    level: "moderate",
    codeExample: "screen.clear() # Erases everything on the screen"
  },
  {
    question: "How do you disable window resizing by the user?",
    shortAnswer: "Through the underlying Tkinter window reference: 'screen.cv._rootwindow.resizable(False, False)'.",
    explanation: "Locking window aspect ratio and preventing user resizing.",
    hint: "Access root window and set resizable(False, False).",
    level: "pro",
    codeExample: "screen.cv._rootwindow.resizable(False, False)"
  },
  {
    question: "Why is a dark background theme ('#090d16' or 'black') popular for creative generative art?",
    shortAnswer: "Dark backgrounds provide high visual contrast for vibrant neon and pastel colors (cyan, magenta, yellow, lime), mimicking modern computer terminals, games, and digital art studios.",
    explanation: "Color contrast and visual aesthetics in computer graphics.",
    hint: "High visual contrast makes neon and gradient colors pop cleanly.",
    level: "basic",
    codeExample: "screen.bgcolor('#090d16') # Sleek dark mode"
  },
  {
    question: "What is the return type of 'screen.window_width()' and 'screen.window_height()'?",
    shortAnswer: "They return integer values representing the current physical pixel dimensions of the window.",
    explanation: "Window dimension query return types.",
    hint: "Integer pixel counts.",
    level: "basic",
    codeExample: "w = screen.window_width() # e.g. 800"
  },
  {
    question: "How do you set a background image in Python Turtle?",
    shortAnswer: "Using 'screen.bgpic(\"image.gif\")' (only GIF images are natively supported by Tkinter without PIL).",
    explanation: "Background image loading in turtle.",
    hint: "Use screen.bgpic('filename.gif') with GIF format.",
    level: "moderate",
    codeExample: "screen.bgpic('landscape.gif')"
  },
  {
    question: "What happens if the virtual canvas size ('screensize') is smaller than the window viewport ('setup')?",
    shortAnswer: "The virtual drawing area is centered inside the physical window without scrollbars; drawings outside the screensize boundary are clipped.",
    explanation: "Canvas smaller than viewport behavior.",
    hint: "No scrollbars appear; drawing is centered in the window.",
    level: "moderate",
    codeExample: "screen.setup(800, 600)\nscreen.screensize(400, 300)"
  },
  {
    question: "Can multiple calls to 'turtle.Screen()' be made in a single Python script?",
    shortAnswer: "Yes, but 'turtle.Screen()' is a Singleton; every call returns the same underlying screen instance.",
    explanation: "Singleton design pattern of turtle.Screen.",
    hint: "turtle.Screen() is a Singleton that returns the same global screen instance.",
    level: "basic",
    codeExample: "s1 = turtle.Screen()\ns2 = turtle.Screen()\nassert s1 is s2 # True (Singleton)"
  },
  {
    question: "How do you set the window icon in Python Turtle?",
    shortAnswer: "Through Tkinter's root window method: 'screen.cv._rootwindow.iconbitmap(\"icon.ico\")' on Windows.",
    explanation: "Setting OS application icon.",
    hint: "Use iconbitmap('icon.ico') on the root window.",
    level: "pro",
    codeExample: "screen.cv._rootwindow.iconbitmap('app_icon.ico')"
  },
  {
    question: "What is the standard order of operations when initializing a Turtle program?",
    shortAnswer: "1. Create and configure the Screen (`setup`, `title`, `bgcolor`), 2. Set colormode if using RGB, 3. Create Turtle pen instances and configure their shapes/speeds, 4. Execute drawing logic, and 5. Enter event loop with `done()` or `exitonclick()`.",
    explanation: "Standard architectural pipeline for Turtle graphics scripts.",
    hint: "Screen config → colormode → Turtle instances → Drawing → Event loop.",
    level: "basic",
    codeExample: "# Standard Turtle Initialization Pipeline"
  },
  {
    question: "What is the ultimate rule of Turtle Screen configuration?",
    shortAnswer: "Always configure your screen explicitly with `setup(width, height)`, assign a descriptive `title()`, set a deliberate `bgcolor()`, choose the appropriate `colormode()`, and finish with `exitonclick()` or `done()` to create professional, rock-solid desktop graphics applications.",
    explanation: "The complete standard for configuring desktop graphics windows in Python.",
    hint: "setup + title + bgcolor + colormode + exitonclick.",
    level: "basic",
    codeExample: "# Enterprise Screen Configuration Standard"
  }
];

export default questions;