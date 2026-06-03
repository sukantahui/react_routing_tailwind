const questions = [
  {
    question: "What is the difference between `setup()` and `screensize()`?",
    shortAnswer: "`setup()` sets the window size; `screensize()` sets the scrollable canvas area.",
    explanation: "The window is what you see; the canvas can be larger. If the canvas is bigger than the window, scrollbars appear.",
    hint: "Think of a paper (canvas) and a camera view (window).",
    level: "moderate",
    codeExample: "turtle.setup(800,600); turtle.screensize(2000,2000)"
  },
  {
    question: "How can you change the title of the turtle graphics window?",
    shortAnswer: "Use `turtle.title('Your Title')` or `screen.title('...')`.",
    explanation: "The title appears in the window title bar (top). Useful for distinguishing multiple programs.",
    hint: "Try `turtle.title('My Drawing')` before any drawing.",
    level: "basic",
    codeExample: "turtle.title('Tuhina\'s Art')"
  },
  {
    question: "What does `turtle.bgcolor('black')` do?",
    shortAnswer: "Sets the canvas background to black.",
    explanation: "All drawings will appear on top of this background. Use common color names or hex codes.",
    hint: "Make sure pen color contrasts with background.",
    level: "basic",
    codeExample: "turtle.bgcolor('#123456')"
  },
  {
    question: "What is the default window size in turtle?",
    shortAnswer: "50% of the screen's width and height.",
    explanation: "Unless you call `setup()`, turtle chooses a default size (often 400x300 on small screens?) Actually modern default is half of primary monitor.",
    hint: "Call `print(turtle.window_width(), turtle.window_height())` to find out.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you hide the turtle window?",
    shortAnswer: "Not directly in standard turtle; you can minimize or close programmatically with `turtle.bye()`.",
    explanation: "`turtle.bye()` closes the window. To hide, you could move it off-screen using `setup()` but not common.",
    hint: "`turtle.bye()` ends the graphics session.",
    level: "expert",
    codeExample: "turtle.bye()"
  },
  {
    question: "What happens if you set the window size larger than the screen resolution?",
    shortAnswer: "The window may appear partly off-screen or be resized by the OS.",
    explanation: "Best to stay within screen dimensions or use `startx, starty` to position it visibly.",
    hint: "Use `turtle.setup(800,600,100,100)` to position at (100,100).",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Why would you need `turtle.screensize(3000,3000)`?",
    shortAnswer: "To draw very large patterns without clipping.",
    explanation: "If your coordinates go beyond ±500, a larger canvas allows scrolling to see the whole drawing.",
    hint: "Try drawing a star that extends to x=1000; without screensize, it may be cut off.",
    level: "moderate",
    codeExample: "turtle.screensize(3000,3000)"
  },
  {
    question: "How do you center the turtle window on the screen?",
    shortAnswer: "Use `turtle.setup(width, height)` without startx/starty, or set `startx=None, starty=None`.",
    explanation: "If startx/starty are not provided, the window is centered automatically.",
    hint: "Simply `turtle.setup(800,600)` centers the window.",
    level: "basic",
    codeExample: "turtle.setup(800,600)"
  },
  {
    question: "What is the effect of calling `turtle.bgcolor()` after drawing?",
    shortAnswer: "The background changes, and existing drawings remain visible.",
    explanation: "Useful for dynamic backgrounds or creating a night effect.",
    hint: "Try changing bgcolor in a loop with `ontimer()`.",
    level: "moderate",
    codeExample: "turtle.bgcolor('darkblue')"
  },
  {
    question: "How can you make the turtle window appear at a specific location (e.g., top-left)?",
    shortAnswer: "Use `turtle.setup(width, height, 0, 0)`.",
    explanation: "The startx and starty define the top-left corner of the window in pixels from screen's top-left.",
    hint: "Set startx=0, starty=0 for top-left corner.",
    level: "moderate",
    codeExample: "turtle.setup(600,400,0,0)"
  },
  {
    question: "What does `turtle.screensize()` return?",
    shortAnswer: "A tuple (canvas_width, canvas_height) as integers.",
    explanation: "You can print it to see the current scrollable canvas dimensions.",
    hint: "Call `print(turtle.screensize())`.",
    level: "basic",
    codeExample: "print(turtle.screensize())"
  },
  {
    question: "Is `turtle.title()` available in all Python turtle versions?",
    shortAnswer: "Yes, in standard library turtle (since Python 2.6+).",
    explanation: "It's a method of the Screen class. Also works as `turtle.title()`.",
    hint: "Always call after `turtle.Screen()` or use as function.",
    level: "basic",
    codeExample: "turtle.title('My Game')"
  },
  {
    question: "How can you change the background color of the canvas only (not the window border)?",
    shortAnswer: "`turtle.bgcolor()` changes the canvas background; window border is controlled by OS.",
    explanation: "The canvas is the drawing area inside the window. The window frame (title bar etc.) is not styled by turtle.",
    hint: "bgcolor only affects the white/black drawing area.",
    level: "basic",
    codeExample: "turtle.bgcolor('beige')"
  },
  {
    question: "What is the maximum canvas size you can set with `screensize()`?",
    shortAnswer: "Limited by your system's memory and graphics driver; practically up to ~10000x10000.",
    explanation: "Very large canvases may cause performance issues.",
    hint: "Use reasonably large sizes like 2000x2000 for most educational projects.",
    level: "expert",
    codeExample: "turtle.screensize(5000,5000)"
  },
  {
    question: "Why might a teacher recommend setting `turtle.setup(800,600)` at the beginning of every script?",
    shortAnswer: "To ensure consistent window size across different screen resolutions.",
    explanation: "Without setup, window size is unpredictable, making coordinate-based designs unreliable.",
    hint: "Consistency helps students share code.",
    level: "moderate",
    codeExample: "turtle.setup(800,600)"
  },
  {
    question: "How can you check the current window title?",
    shortAnswer: "Turtle doesn't provide a getter; you must remember what you set.",
    explanation: "Unlike width/height, title is not retrievable via a function.",
    hint: "Store it in a variable if needed.",
    level: "basic",
    codeExample: "title_text = 'My Drawing'; turtle.title(title_text)"
  },
  {
    question: "What happens if you set `screensize()` smaller than the window?",
    shortAnswer: "The canvas will be smaller; drawings outside the canvas may be clipped or cause scrollbars.",
    explanation: "Usually you want canvas ≥ window.",
    hint: "Set screensize larger than window for safety.",
    level: "moderate",
    codeExample: "turtle.setup(800,600); turtle.screensize(400,300) # risky"
  },
  {
    question: "How do you reset the screen configuration to default?",
    shortAnswer: "Call `turtle.reset()` or `turtle.clearscreen()`, but window size remains; you must restart the program.",
    explanation: "Screen configuration persists until you close the window or call `turtle.bye()` and restart.",
    hint: "Use `turtle.clearscreen()` to reset all drawings but not window size.",
    level: "expert",
    codeExample: "turtle.clearscreen()"
  },
  {
    question: "What is the purpose of `turtle.window_width()` and `turtle.window_height()`?",
    shortAnswer: "To get the current dimensions of the turtle graphics window.",
    explanation: "Useful for centering shapes or adapting to window resizing (if user resizes).",
    hint: "They return integers representing pixels.",
    level: "moderate",
    codeExample: "w = turtle.window_width(); h = turtle.window_height()"
  },
  {
    question: "Can you have multiple turtle windows open at once?",
    shortAnswer: "No, the standard turtle module only supports one screen/window at a time.",
    explanation: "You would need to use additional tools (e.g., threading, tkinter directly).",
    hint: "Only one TurtleScreen instance exists.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Why does `turtle.bgcolor('white')` sometimes not change the color?",
    shortAnswer: "If you have already set `screensize(bg='some color')`, that overrides later bgcolor calls? Actually both work; ensure order.",
    explanation: "Call `bgcolor` after screensize if you want to override.",
    hint: "Set bgcolor after all screen configs.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does the `startx` parameter in `setup()` do if set to negative?",
    shortAnswer: "It positions the window offset from the right/bottom of the screen.",
    explanation: "Negative values count from the right or bottom edge. e.g., startx=-100 places window 100 pixels from right edge.",
    hint: "Use negative for right-aligned windows.",
    level: "expert",
    codeExample: "turtle.setup(600,400,-50,-50)"
  },
  {
    question: "How can you make the turtle window fullscreen?",
    shortAnswer: "Turtle doesn't have a direct fullscreen method; you can set window size to screen dimensions manually.",
    explanation: "Use `turtle.setup(1920,1080)` if you know resolution, but border remains.",
    hint: "To remove borders, you'd need tkinter fullscreen attribute.",
    level: "expert",
    codeExample: "turtle.setup(1366,768)"  // typical laptop
  },
  {
    question: "Do changes to `screensize()` affect existing drawings?",
    shortAnswer: "Yes, the canvas area expands or shrinks; drawings remain but may become partially off-canvas.",
    explanation: "If you shrink canvas, parts of drawing outside new bounds might be lost visually.",
    hint: "Set screensize before drawing.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Is `turtle.title()` available in all Python IDEs?",
    shortAnswer: "Yes, but some IDEs (like older IDLE) might not show the title change until window is active.",
    explanation: "Functionality is part of the underlying tkinter window.",
    hint: "Test with a simple script.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is the default canvas background color?",
    shortAnswer: "White ('white') in standard turtle.",
    explanation: "You can change it with `bgcolor()`.",
    hint: "Default is white; many prefer light gray for contrast.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What happens if you call `turtle.setup()` twice?",
    shortAnswer: "The window is resized to the new dimensions; existing drawings may be distorted.",
    explanation: "It's allowed but not recommended after drawing complex shapes.",
    hint: "Avoid changing window size mid-drawing.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How would you make the canvas background light green and window title 'Geometry Class'?",
    shortAnswer: "`turtle.title('Geometry Class'); turtle.bgcolor('lightgreen')`",
    explanation: "Order doesn't matter as long as called before `done()`.",
    hint: "Simple.",
    level: "basic",
    codeExample: "turtle.title('Geometry Class'); turtle.bgcolor('lightgreen')"
  },
  {
    question: "What is the difference between `turtle.bgcolor()` and `turtle.screensize(bg=...)`?",
    shortAnswer: "`bgcolor` sets the background of the visible canvas; `screensize(bg=...)` also sets canvas background but may also apply to extended scrollable area.",
    explanation: "Typically use `bgcolor` for simple background changes.",
    hint: "`screensize` background applies to the whole scrollable canvas.",
    level: "moderate",
    codeExample: "turtle.screensize(1000,1000,'lightblue')"
  },
  {
    question: "Why is it a best practice to call `turtle.Screen()` and store it in a variable?",
    shortAnswer: "To have a reference for calling screen methods and avoid confusion with global functions.",
    explanation: "Example: `screen = turtle.Screen(); screen.bgcolor('black')`.",
    hint: "Helps with code readability and debugging.",
    level: "moderate",
    codeExample: "screen = turtle.Screen(); screen.setup(800,600)"
  }
];

export default questions;