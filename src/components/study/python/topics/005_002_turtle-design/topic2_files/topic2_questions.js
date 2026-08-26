// src/components/study/python/topics/005_002_turtle-design/topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the default colormode in Python Turtle?",
    shortAnswer: "colormode(1.0) — where RGB values are floats from 0.0 to 1.0.",
    explanation: "By default, Turtle expects RGB tuples to contain floats within [0.0, 1.0].",
    hint: "Are RGB channels floats (0.0 to 1.0) or integers (0 to 255) by default?",
    level: "basic",
    codeExample: "t.color((0.5, 0.2, 0.8))  # Default float mode"
  },
  {
    question: "How do you enable standard 0-255 integer RGB mode in Turtle?",
    shortAnswer: "Call `screen.colormode(255)` or `turtle.colormode(255)`.",
    explanation: "Setting colormode(255) allows passing standard 8-bit integer RGB tuples like `(255, 128, 0)`.",
    hint: "What method changes the color representation scale?",
    level: "basic",
    codeExample: "screen = turtle.Screen()\nscreen.colormode(255)\nt.color((255, 128, 0))"
  },
  {
    question: "What exception occurs if you pass `(255, 0, 0)` while colormode is 1.0?",
    shortAnswer: "TurtleGraphicsError: bad color sequence: (255, 0, 0).",
    explanation: "Because 255 exceeds the maximum allowed float value of 1.0, Turtle raises a runtime graphics error.",
    hint: "What happens when a value exceeds 1.0 in 1.0 mode?",
    level: "moderate",
    codeExample: "# Causes error without colormode(255):\nt.color((255, 0, 0))"
  },
  {
    question: "Can you pass hexadecimal color codes like '#38bdf8' to Turtle?",
    shortAnswer: "Yes, 6-digit hex color strings are supported directly.",
    explanation: "Hex strings work seamlessly with pencolor(), fillcolor(), and screen.bgcolor().",
    hint: "Do web hex codes starting with '#' work in Turtle?",
    level: "basic",
    codeExample: "t.color('#38bdf8')\nscreen.bgcolor('#0f172a')"
  },
  {
    question: "What is the difference between `t.color('red')` and `t.pencolor('red')`?",
    shortAnswer: "`color()` sets both pen stroke and fill color; `pencolor()` sets only stroke color.",
    explanation: "pencolor modifies only the drawn line, while color() updates both stroke and interior fill.",
    hint: "Which method updates both stroke and fill simultaneously?",
    level: "basic",
    codeExample: "t.pencolor('red')  # Stroke only\nt.color('red')     # Stroke AND Fill"
  },
  {
    question: "How do you set pencolor and fillcolor in a single line using color()?",
    shortAnswer: "Pass two arguments: `t.color(pencolor, fillcolor)`.",
    explanation: "`t.color('blue', 'yellow')` sets the pen stroke to blue and fill color to yellow.",
    hint: "How does color() accept two distinct color arguments?",
    level: "basic",
    codeExample: "t.color('#38bdf8', '#0284c7')"
  },
  {
    question: "What Python standard library module is used for generating smooth rainbow color gradients?",
    shortAnswer: "The `colorsys` module.",
    explanation: "`colorsys.hsv_to_rgb(h, s, v)` converts continuous Hue angles (0.0 to 1.0) into RGB color channels.",
    hint: "What built-in module converts between HSV and RGB color spaces?",
    level: "moderate",
    codeExample: "import colorsys\nr, g, b = colorsys.hsv_to_rgb(0.5, 1.0, 1.0)"
  },
  {
    question: "What are named colors in Turtle?",
    shortAnswer: "Predefined Tkinter color strings like 'gold', 'coral', 'midnight blue', 'dark turquoise'.",
    explanation: "Tkinter includes hundreds of human-readable X11/web color names.",
    hint: "What standard color names can you type as plain text strings?",
    level: "basic",
    codeExample: "t.color('forest green')"
  },
  {
    question: "How do you query the current pencolor and fillcolor of a Turtle?",
    shortAnswer: "Call `t.pencolor()` and `t.fillcolor()` with no arguments.",
    explanation: "Calling color methods without arguments returns their current string or RGB tuple value.",
    hint: "How do getter methods work in Turtle?",
    level: "moderate",
    codeExample: "pen_c = t.pencolor()\nfill_c = t.fillcolor()"
  },
  {
    question: "How do you set the background color of the canvas window?",
    shortAnswer: "Using `screen.bgcolor(color)` or `turtle.bgcolor(color)`.",
    explanation: "bgcolor() modifies the entire canvas background color using names, hex, or RGB tuples.",
    hint: "Which method sets the background color?",
    level: "basic",
    codeExample: "screen.bgcolor('#020617')"
  },
  {
    question: "What happens to the cursor shape color when you change fillcolor?",
    shortAnswer: "The interior body of the turtle cursor updates to match the new fillcolor.",
    explanation: "The cursor icon reflects the active pencolor (outline) and fillcolor (body).",
    hint: "Does the turtle cursor icon display the active fill color?",
    level: "moderate",
    codeExample: "t.fillcolor('yellow')  # Turtle body turns yellow"
  },
  {
    question: "How do you convert hex '#FFFFFF' to integer RGB (255, 255, 255) in Python?",
    shortAnswer: "Using `tuple(int(hex_str[i:i+2], 16) for i in (1, 3, 5))`.",
    explanation: "Slice 2 hex characters at a time and parse in base 16.",
    hint: "How do you parse hex strings in base 16?",
    level: "advanced",
    codeExample: "hex_c = '#38bdf8'\nrgb = tuple(int(hex_c[i:i+2], 16) for i in (1, 3, 5))"
  },
  {
    question: "Can colormode be set to custom numbers like colormode(100)?",
    shortAnswer: "No, Turtle only officially supports colormode(1.0) and colormode(255).",
    explanation: "Passing values other than 1.0 or 255 can cause internal Tkinter color mapping errors.",
    hint: "What are the only two valid colormode scale targets?",
    level: "moderate",
    codeExample: "screen.colormode(255) # Valid\nscreen.colormode(1.0) # Valid"
  },
  {
    question: "How do you create a linear color gradient between two colors across N steps?",
    shortAnswer: "Interpolate RGB channels linearly using `r = r1 + (r2 - r1) * (i / N)`.",
    explanation: "Linear interpolation (lerp) smoothly transitions red, green, and blue channels step by step.",
    hint: "What mathematical formula blends between two numbers?",
    level: "advanced",
    codeExample: "# Linear interpolation (lerp)\nr = int(r1 + (r2 - r1) * (i / n))"
  },
  {
    question: "Why are hex colors preferred in modern web and UI styling with Turtle?",
    shortAnswer: "Because they allow exact 24-bit color fidelity matching CSS tokens like Tailwind color palettes.",
    explanation: "Hex codes give exact cross-platform color matching without ambiguity.",
    hint: "Why do web designers use hex codes instead of color names?",
    level: "basic",
    codeExample: "t.color('#38bdf8')  # Tailwind Sky 400"
  },
  {
    question: "What is the result of `t.color()` with no arguments?",
    shortAnswer: "A tuple containing `(pencolor, fillcolor)`.",
    explanation: "Calling `t.color()` returns a 2-element tuple of current stroke and fill colors.",
    hint: "What does calling color() as a getter return?",
    level: "moderate",
    codeExample: "p_col, f_col = t.color()"
  },
  {
    question: "Does changing bgcolor() erase drawings on the canvas?",
    shortAnswer: "No, bgcolor() only recolors the background canvas without affecting drawn vector lines.",
    explanation: "Drawn paths remain intact on top of the new background color.",
    hint: "Does changing canvas background delete your drawing?",
    level: "basic",
    codeExample: "screen.bgcolor('black')  # Drawings remain intact"
  },
  {
    question: "How do you cycle through a list of 5 brand colors in a drawing loop?",
    shortAnswer: "Use modulo indexing: `color_list[i % len(color_list)]`.",
    explanation: "Modulo indexing prevents IndexError and creates recurring cyclic color patterns.",
    hint: "What operator wraps list indices within bounds?",
    level: "basic",
    codeExample: "palette = ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#a78bfa']\nt.color(palette[i % len(palette)])"
  },
  {
    question: "What is alpha transparency in Python Turtle?",
    shortAnswer: "Tkinter canvas does not natively support RGBA alpha transparency channels.",
    explanation: "Colors in standard Turtle are strictly opaque RGB (no 4th alpha channel in standard Tkinter canvas).",
    hint: "Does standard Turtle canvas support transparent RGBA colors?",
    level: "expert",
    codeExample: "# Turtle colors must be RGB (no alpha channel)"
  },
  {
    question: "How do you generate a pastel color palette programmatically?",
    shortAnswer: "In HSV space, use high Value (0.9-1.0) and moderate Saturation (0.3-0.5).",
    explanation: "Reducing saturation produces soft pastel shades while preserving hue variety.",
    hint: "How does lowering saturation affect color vibrance?",
    level: "advanced",
    codeExample: "r, g, b = colorsys.hsv_to_rgb(hue, 0.4, 0.95)"
  },
  {
    question: "Can multiple turtles draw with different colors simultaneously?",
    shortAnswer: "Yes, each Turtle instance maintains its own independent pencolor and fillcolor.",
    explanation: "Object-oriented Turtle encapsulation allows distinct colors per artist instance.",
    hint: "Are color properties object-scoped or global?",
    level: "basic",
    codeExample: "t1.color('red'); t2.color('blue')"
  },
  {
    question: "What happens if you supply an invalid color name like 'super_blue'?",
    shortAnswer: "Turtle raises `TurtleGraphicsError: bad color string: super_blue`.",
    explanation: "Tkinter validates color names against its internal registry.",
    hint: "What happens when an unrecognized color name is passed?",
    level: "basic",
    codeExample: "# Raises TurtleGraphicsError"
  },
  {
    question: "How do you calculate complementary colors in Python?",
    shortAnswer: "Shift hue by 0.5 (180 degrees) in HSV space: `comp_hue = (hue + 0.5) % 1.0`.",
    explanation: "Complementary colors sit exactly opposite each other on the 360-degree color wheel.",
    hint: "How far apart are complementary colors on the color wheel?",
    level: "expert",
    codeExample: "comp_hue = (hue + 0.5) % 1.0"
  },
  {
    question: "What is the difference between `screen.colormode()` and `turtle.colormode()`?",
    shortAnswer: "They both access the same global Screen singleton colormode.",
    explanation: "colormode is a Screen-level setting shared across all turtle instances on that canvas.",
    hint: "Is colormode per-turtle or per-screen?",
    level: "moderate",
    codeExample: "turtle.colormode(255) # Same as screen.colormode(255)"
  },
  {
    question: "How do you draw a shaded sphere illusion with color rings?",
    shortAnswer: "Draw concentric filled circles transitioning from dark outline colors to bright highlight colors.",
    explanation: "Modulating brightness/value creates depth and lighting gradient illusions.",
    hint: "How do 2D graphics simulate spherical lighting?",
    level: "advanced",
    codeExample: "# Concentric gradient circles"
  },
  {
    question: "What is the return type of `t.pencolor()` when in `colormode(255)`?",
    shortAnswer: "An integer RGB tuple `(r, g, b)` if set via RGB, or string if set via string.",
    explanation: "Returns the representation used when setting, or converted RGB tuple.",
    hint: "Does it return a string or tuple?",
    level: "moderate",
    codeExample: "print(t.pencolor())"
  },
  {
    question: "Why should `colormode(255)` be set at the very beginning of a script?",
    shortAnswer: "To avoid 'bad color sequence' errors before any RGB color assignments run.",
    explanation: "Setting colormode early ensures all subsequent function calls have the correct color scale.",
    hint: "Where in the setup phase should colormode be configured?",
    level: "basic",
    codeExample: "# Setup phase:\nscreen = turtle.Screen()\nscreen.colormode(255)"
  },
  {
    question: "How do you create random vibrant colors in Turtle?",
    shortAnswer: "Generate random RGB integers: `(random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))`.",
    explanation: "Keeping channel minimums above 50 ensures bright, vibrant tones on dark backgrounds.",
    hint: "How does random integer generation produce RGB colors?",
    level: "moderate",
    codeExample: "import random\nt.color(random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))"
  },
  {
    question: "What is the role of `turtle.dot(size, color)` in color palettes?",
    shortAnswer: "It stamps a solid circular swatch of the specified color without changing active pen color.",
    explanation: "dot() accepts an optional color argument for quick palette swatches.",
    hint: "Can dot() use an independent color parameter?",
    level: "moderate",
    codeExample: "t.dot(30, '#38bdf8') # Stamps sky-blue dot"
  },
  {
    question: "What is the summary rule for Turtle color management?",
    shortAnswer: "Use hex codes (`#RRGGBB`) for exact design fidelity, and `colormode(255)` with `colorsys` for algorithmic gradients.",
    explanation: "This combination provides complete artistic control and mathematically sound gradients.",
    hint: "What two color approaches give maximum design and algorithmic power?",
    level: "basic",
    codeExample: "# Hex for UI + colormode(255) for HSV gradients"
  }
];

export default questions;
