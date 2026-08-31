// src/components/study/python/topics/005_002_turtle-design/topic1_files/topic1_questions.js

const questions = [
  {
    question: "What does turtle.pensize(width) do?",
    shortAnswer: "Sets the line drawing thickness in integer screen pixels.",
    explanation: "pensize() defines the diameter of the circular virtual brush tip used when drawing strokes.",
    hint: "How do you make lines thicker or thinner?",
    level: "basic",
    codeExample: "t.pensize(8)\nt.forward(100)"
  },
  {
    question: "What is the alias for turtle.pensize()?",
    shortAnswer: "turtle.width(w).",
    explanation: "t.width() and t.pensize() are identical aliases in Python's turtle library.",
    hint: "What word describes the thickness of a line?",
    level: "basic",
    codeExample: "t.width(5)  # Same as t.pensize(5)"
  },
  {
    question: "What does turtle.shapesize() control?",
    shortAnswer: "The visual size and scale factors of the turtle cursor icon.",
    explanation: "shapesize(stretch_wid, stretch_len, outline) scales the cursor representation on canvas without changing line drawing width.",
    hint: "Does it scale the ink or the cursor shape?",
    level: "basic",
    codeExample: "t.shapesize(2, 2, 1)  # 2x cursor scaling"
  },
  {
    question: "What are the three arguments of shapesize(stretch_wid, stretch_len, outline)?",
    shortAnswer: "Height multiplier, width multiplier, and cursor outline border width.",
    explanation: "Default cursor size is 20x20 pixels; multipliers scale from that baseline.",
    hint: "Think about vertical scale, horizontal scale, and outline border.",
    level: "moderate",
    codeExample: "t.shapesize(stretch_wid=3, stretch_len=1.5, outline=2)"
  },
  {
    question: "What is the alias for turtle.shapesize()?",
    shortAnswer: "turtle.turtlesize().",
    explanation: "turtlesize() and shapesize() are identical methods in Python Turtle.",
    hint: "What is the alternative method name with 'turtle' in it?",
    level: "basic",
    codeExample: "t.turtlesize(2, 2)"
  },
  {
    question: "What does t.pen() return when called with no arguments?",
    shortAnswer: "A complete dictionary of all current pen state attributes.",
    explanation: "Returns keys like 'shown', 'pendown', 'pencolor', 'fillcolor', 'pensize', 'speed', etc.",
    hint: "What Python collection type stores key-value pairs?",
    level: "moderate",
    codeExample: "pen_dict = t.pen()\nprint(pen_dict['pensize'])"
  },
  {
    question: "How do you pass a complete pen dictionary to update all settings simultaneously?",
    shortAnswer: "By passing the dictionary to `t.pen(pen_dict)`.",
    explanation: "t.pen() accepts keyword arguments or a dictionary to batch-update pen configuration.",
    hint: "How do you apply a dictionary of settings?",
    level: "advanced",
    codeExample: "t.pen(pensize=4, pencolor='orange', speed=0)"
  },
  {
    question: "How do line joints and corner caps behave with very thick pensize (e.g. pensize=20)?",
    shortAnswer: "Tkinter renders rounded caps and smooth miter joins at segment intersections.",
    explanation: "Because Turtle's virtual pen has a circular brush tip, thick strokes produce rounded corner geometry.",
    hint: "Is the pen tip circular or square?",
    level: "advanced",
    codeExample: "t.pensize(20)\nt.forward(100); t.right(90); t.forward(100)"
  },
  {
    question: "What is stroke hierarchy in graphical design?",
    shortAnswer: "Using varied line weights to convey foreground prominence vs background context.",
    explanation: "Thick lines draw immediate viewer attention, while thin lines provide subtle guidelines.",
    hint: "Why do artists use fine pens for backgrounds and bold markers for outlines?",
    level: "moderate",
    codeExample: "# 1px grid, 4px shape, 10px frame"
  },
  {
    question: "How can you create a dynamic tapering line in Turtle?",
    shortAnswer: "Change `t.pensize()` on each iteration of a step loop.",
    explanation: "Modulating width with an expression or mathematical function on each small step creates tapered strokes.",
    hint: "How do you vary thickness over distance?",
    level: "moderate",
    codeExample: "for w in range(1, 15):\n    t.pensize(w); t.forward(10)"
  },
  {
    question: "Does changing pensize affect the turtle cursor shape?",
    shortAnswer: "No, pensize only affects drawn line strokes; use shapesize to change cursor size.",
    explanation: "Line stroke properties and cursor visual properties are completely decoupled.",
    hint: "Are cursor scale and line thickness the same property?",
    level: "basic",
    codeExample: "t.pensize(10)   # Cursor remains normal size\nt.shapesize(3) # Cursor becomes 3x larger"
  },
  {
    question: "What is `t.resizemode()` in Turtle?",
    shortAnswer: "Controls how the turtle shape resizes: 'auto', 'user', or 'noresize'.",
    explanation: "'auto' adjusts shape with pensize, 'user' resizes by shapesize(), and 'noresize' locks shape dimensions.",
    hint: "Which method defines the resize behavior mode?",
    level: "advanced",
    codeExample: "t.resizemode('user')"
  },
  {
    question: "What happens if pensize is set to a floating point value like 4.7?",
    shortAnswer: "It works; Tkinter accepts float values and anti-aliases the stroke edges.",
    explanation: "While integer pixels are most common, fractional stroke weights are valid.",
    hint: "Can stroke widths have decimal places?",
    level: "moderate",
    codeExample: "t.pensize(4.5)"
  },
  {
    question: "How do you query the current shapesize scale values?",
    shortAnswer: "Call `t.shapesize()` without arguments.",
    explanation: "Returns a tuple: `(stretch_wid, stretch_len, outline)`.",
    hint: "How do getters work in Turtle?",
    level: "moderate",
    codeExample: "wid, len, outline = t.shapesize()"
  },
  {
    question: "Why should you avoid extremely large pensize values (e.g. pensize=200) for small polygons?",
    shortAnswer: "The stroke thickness will swallow the internal area and distort the geometry.",
    explanation: "If stroke width exceeds polygon side length, the inner shape is completely filled by overlapping line ink.",
    hint: "What happens when ink width is larger than the shape dimensions?",
    level: "moderate",
    codeExample: "# Side length 50 with pensize 80 produces a solid blob"
  },
  {
    question: "How do you draw concentric squares with alternating stroke weights?",
    shortAnswer: "Loop over increasing side sizes while alternating `pensize()` values.",
    explanation: "Toggling between 2px and 6px pensize creates optical contrast patterns.",
    hint: "How do you create visual rhythm in geometric patterns?",
    level: "moderate",
    codeExample: "for i, size in enumerate(range(40, 200, 40)):\n    t.pensize(2 if i % 2 == 0 else 6)\n    # draw square"
  },
  {
    question: "What is the visual effect of setting cursor outline in `shapesize(outline=5)`?",
    shortAnswer: "It draws a bold 5px border around the turtle cursor shape.",
    explanation: "The outline parameter modifies the stroke border around the cursor icon.",
    hint: "What does the third argument of shapesize control?",
    level: "moderate",
    codeExample: "t.shapesize(2, 2, outline=4)"
  },
  {
    question: "How can you create a 3D isometric box illusion with line thickness?",
    shortAnswer: "Draw foreground edges with thick pensize (8px) and background/depth edges with fine pensize (2px).",
    explanation: "Simulating atmospheric perspective using stroke weight gives 2D drawings a 3D depth feel.",
    hint: "Which lines in a 3D cube appear closer to the viewer?",
    level: "advanced",
    codeExample: "# Foreground edges: pensize(8)\n# Receding edges: pensize(2)"
  },
  {
    question: "Can you change pensize while drawing a single circle?",
    shortAnswer: "No, circle() completes with the active pensize; to vary width, draw multiple small arcs with different pensize.",
    explanation: "A single `circle()` call uses the width active at the start of the command.",
    hint: "How do you segment a circle to change stroke mid-way?",
    level: "advanced",
    codeExample: "for _ in range(36):\n    t.pensize(t.pensize() + 0.2)\n    t.circle(100, 10) # 10-degree arc"
  },
  {
    question: "How do you create a calligraphy brush effect using angle-dependent stroke width?",
    shortAnswer: "Set pensize based on current heading: `pensize(2 + 8 * abs(sin(heading)))`.",
    explanation: "Real nib pens draw thin vertical strokes and thick horizontal strokes; calculating width from heading simulates this.",
    hint: "How does a physical calligraphy nib change thickness based on drawing direction?",
    level: "expert",
    codeExample: "import math\n# Vary thickness by heading angle"
  },
  {
    question: "What is the default cursor size in pixels before scaling?",
    shortAnswer: "20 pixels by 20 pixels.",
    explanation: "Base vector shapes in Turtle (turtle, arrow, circle, square, triangle) are 20x20 units.",
    hint: "What is the standard base resolution of turtle cursors?",
    level: "basic",
    codeExample: "# shapesize(1, 1) = 20x20 pixels"
  },
  {
    question: "What happens when you stretch a cursor non-uniformly (e.g. shapesize(1, 4))?",
    shortAnswer: "The cursor elongates horizontally into an oblong spear or needle.",
    explanation: "Different stretch_wid and stretch_len values allow custom cursor aspect ratios.",
    hint: "What happens when width scale != length scale?",
    level: "moderate",
    codeExample: "t.shapesize(1, 4)  # Elongated pointer"
  },
  {
    question: "How do you restore default pensize after custom function drawing?",
    shortAnswer: "Set `t.pensize(1)` explicitly at the end of the function.",
    explanation: "Explicit reset avoids leaky state across drawing subroutines.",
    hint: "What is the standard baseline width?",
    level: "basic",
    codeExample: "t.pensize(1)"
  },
  {
    question: "Does `t.clear()` reset pensize?",
    shortAnswer: "No, clear() only erases drawings; it preserves pensize, color, and coordinates.",
    explanation: "To reset pen attributes as well, use `t.reset()`.",
    hint: "Does clear() erase lines only or reset the entire turtle?",
    level: "moderate",
    codeExample: "t.clear() # Keeps current pensize\nt.reset() # Resets pensize to 1"
  },
  {
    question: "What is the difference between stroke color and cursor color?",
    shortAnswer: "pencolor() sets stroke and cursor outline; fillcolor() sets cursor interior; color(pen, fill) sets both.",
    explanation: "Turtle color methods control both the drawn strokes and the cursor icon colors.",
    hint: "How do pencolor and fillcolor affect cursor appearance?",
    level: "moderate",
    codeExample: "t.color('red', 'yellow') # Red outline, yellow interior"
  },
  {
    question: "Why does pensize affect rendering speed in complex 10,000-line fractals?",
    shortAnswer: "Thick strokes require more polygon rasterization overhead by the graphics driver.",
    explanation: "1px lines are rendered faster as single raster primitives compared to thick anti-aliased polygons.",
    hint: "Do thick strokes require more pixel rasterization than 1px lines?",
    level: "expert",
    codeExample: "# For max fractal speed, keep pensize(1) and tracer(0)"
  },
  {
    question: "How do you draw a multi-layered neon glowing line effect?",
    shortAnswer: "Draw a thick semi-transparent outer line, then overlay thinner brighter lines on top.",
    explanation: "Layering pensize(12) deep blue → pensize(6) light blue → pensize(2) white creates a neon glow illusion.",
    hint: "How do glow shaders work in 2D graphic design?",
    level: "advanced",
    codeExample: "# Layered stroke technique"
  },
  {
    question: "Can pensize be bound to mouse scroll events in interactive applications?",
    shortAnswer: "Yes, using Tkinter canvas event bindings on Button-4 and Button-5.",
    explanation: "Binding scroll events allows dynamic brush size adjustment in paint programs.",
    hint: "Can user input dynamically alter pensize in real time?",
    level: "expert",
    codeExample: "# Dynamic brush size in interactive drawing apps"
  },
  {
    question: "What is the relationship between pensize and turtle.stamp()?",
    shortAnswer: "stamp() size is determined by shapesize(), NOT pensize().",
    explanation: "Stamp size matches the cursor shape scale, completely ignoring line stroke width.",
    hint: "Does stamping use the line thickness or the cursor size?",
    level: "moderate",
    codeExample: "t.pensize(20)\nt.stamp() # Stamp size remains shapesize()!"
  },
  {
    question: "What is the summary rule for professional stroke styling?",
    shortAnswer: "Use thin lines (1-2px) for grids, medium lines (3-5px) for geometry, and thick lines (8-15px) for emphasis.",
    explanation: "Thoughtful stroke hierarchy turns flat drawings into visually compelling illustrations.",
    hint: "What rule governs professional graphic stroke hierarchy?",
    level: "basic",
    codeExample: "# 1-2px: Guide | 3-5px: Shape | 8-15px: Border"
  }
];

export default questions;
