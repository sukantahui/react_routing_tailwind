// src/components/study/python/topics/005_001_turtle-foundation/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Understanding the Turtle screen: canvas, coordinate system (Cartesian plane), origin (0,0), and quadrants

const questions = [
  {
    question: "Where is the coordinate origin (0, 0) located on a standard Python Turtle screen?",
    shortAnswer: "The origin (0, 0) is located at the exact geometric center of the Turtle screen window.",
    explanation: "Standard Cartesian coordinate system origin placement in Python Turtle.",
    hint: "Exact center of the window.",
    level: "basic",
    codeExample: "t = turtle.Turtle()\nprint(t.pos()) # (0.0, 0.0) at the center"
  },
  {
    question: "What are the algebraic sign characteristics of the 4 Cartesian quadrants in Turtle?",
    shortAnswer: "Quadrant I: (+X, +Y) [Top-Right]; Quadrant II: (-X, +Y) [Top-Left]; Quadrant III: (-X, -Y) [Bottom-Left]; Quadrant IV: (+X, -Y) [Bottom-Right].",
    explanation: "Cartesian quadrant signs and spatial orientations.",
    hint: "Q1 (+,+), Q2 (-,+), Q3 (-,-), Q4 (+,-).",
    level: "basic",
    codeExample: "# Q1: (100, 100) | Q2: (-100, 100) | Q3: (-100, -100) | Q4: (100, -100)"
  },
  {
    question: "How does the Python Turtle coordinate system differ from standard HTML Canvas / Pygame coordinates?",
    shortAnswer: "In Turtle, (0, 0) is at the center and +Y points upwards (standard Cartesian math), whereas in HTML Canvas and Pygame, (0, 0) is at the top-left corner and +Y points downwards.",
    explanation: "Cartesian vs Computer Screen pixel grid coordinate differences.",
    hint: "Turtle origin is center with +Y pointing UP; HTML Canvas/Pygame origin is top-left with +Y pointing DOWN.",
    level: "basic",
    codeExample: "# Turtle: +Y is UP (North) | HTML Canvas: +Y is DOWN (South)"
  },
  {
    question: "How do you query the current X and Y coordinates of a Turtle object?",
    shortAnswer: "Using 't.xcor()' for X coordinate, 't.ycor()' for Y coordinate, or 't.pos()' (or 't.position()') to get the (x, y) tuple directly.",
    explanation: "Coordinate inspection methods in the turtle API.",
    hint: "t.xcor(), t.ycor(), and t.pos().",
    level: "basic",
    codeExample: "x = t.xcor()\ny = t.ycor()\nx, y = t.pos()"
  },
  {
    question: "How do you calculate the straight-line Euclidean distance between a turtle and another point (x, y)?",
    shortAnswer: "Using the built-in method 't.distance(x, y)' or 't.distance(other_turtle)', which computes sqrt((x2 - x1)^2 + (y2 - y1)^2).",
    explanation: "Euclidean distance calculation in the turtle module.",
    hint: "Use t.distance(x, y).",
    level: "basic",
    codeExample: "d = t.distance(150, 200) # Computes Euclidean distance"
  },
  {
    question: "How do you query the current width and height of the Turtle window?",
    shortAnswer: "Using 'screen.window_width()' and 'screen.window_height()'.",
    explanation: "Retrieving window viewport pixel dimensions.",
    hint: "screen.window_width() and screen.window_height().",
    level: "basic",
    codeExample: "w = screen.window_width()\nh = screen.window_height()"
  },
  {
    question: "What are the X-axis coordinate limits on an 800-pixel wide Turtle canvas centered at (0, 0)?",
    shortAnswer: "The X coordinates range from -400 (leftmost edge) to +400 (rightmost edge).",
    explanation: "Centered coordinate range calculations from total window dimensions.",
    hint: "From -width/2 (-400) to +width/2 (+400).",
    level: "basic",
    codeExample: "# Width 800: X spans [-400, +400]"
  },
  {
    question: "What are the Y-axis coordinate limits on a 600-pixel high Turtle canvas centered at (0, 0)?",
    shortAnswer: "The Y coordinates range from -300 (bottom edge) to +300 (top edge).",
    explanation: "Centered coordinate range calculations for height.",
    hint: "From -height/2 (-300) to +height/2 (+300).",
    level: "basic",
    codeExample: "# Height 600: Y spans [-300, +300]"
  },
  {
    question: "How can you programmatically draw labeled X and Y axes across the center of the canvas?",
    shortAnswer: "Lift pen, move to (-width/2, 0), lower pen and draw line to (+width/2, 0) for X-axis; then lift pen, move to (0, -height/2), lower pen and draw line to (0, +height/2) for Y-axis.",
    explanation: "Algorithm for drawing central Cartesian axes on screen.",
    hint: "Draw line from (-w/2, 0) to (+w/2, 0) for X, and (0, -h/2) to (0, +h/2) for Y.",
    level: "moderate",
    codeExample: "t.penup(); t.goto(-300, 0); t.pendown(); t.goto(300, 0) # X-axis"
  },
  {
    question: "What happens if a turtle moves beyond the visible window boundaries?",
    shortAnswer: "Turtle Graphics allows drawing beyond the screen boundaries (coordinates can be (-5000, 5000)); drawings continue on an infinite virtual canvas, but parts outside the window are clipped from visible view.",
    explanation: "Virtual canvas coordinate space vs viewport clipping.",
    hint: "The virtual canvas is unbounded; content outside the screen is simply clipped from view.",
    level: "moderate",
    codeExample: "t.goto(1000, 1000) # Valid, but off-screen"
  },
  {
    question: "How do you check if a turtle's current position is within the visible canvas bounds?",
    shortAnswer: "By comparing 'abs(t.xcor()) <= screen.window_width() / 2' and 'abs(t.ycor()) <= screen.window_height() / 2'.",
    explanation: "Boundary detection logic for game walls or screen collision.",
    hint: "Check if abs(x) <= width/2 and abs(y) <= height/2.",
    level: "moderate",
    codeExample: "is_inside = abs(t.xcor()) <= w/2 and abs(t.ycor()) <= h/2"
  },
  {
    question: "How do you write text (like coordinate labels) on the Turtle canvas at a specific point?",
    shortAnswer: "Using 't.write(text, font=(\"Arial\", 12, \"normal\"), align=\"center\")'.",
    explanation: "Writing text annotations on the turtle canvas.",
    hint: "Use t.write('text', font=(...), align='center').",
    level: "basic",
    codeExample: "t.write('Origin (0,0)', font=('Arial', 10, 'bold'), align='center')"
  },
  {
    question: "What coordinate does a turtle return to when 't.home()' is called?",
    shortAnswer: "It moves to the center origin (0, 0) and resets its heading direction to 0.0 degrees (East).",
    explanation: "The home() command effect on position and heading.",
    hint: "Moves to (0, 0) and sets heading to 0 degrees East.",
    level: "basic",
    codeExample: "t.home() # Position (0, 0), Heading 0.0"
  },
  {
    question: "In which quadrant would the point (-180, -220) lie?",
    shortAnswer: "Quadrant III (both X and Y are negative, located at the bottom-left area of the canvas).",
    explanation: "Quadrant identification for negative coordinates.",
    hint: "Both negative: Quadrant III (Bottom-Left).",
    level: "basic",
    codeExample: "# (-180, -220) -> Quadrant III"
  },
  {
    question: "In which quadrant would the point (120, -95) lie?",
    shortAnswer: "Quadrant IV (positive X and negative Y, located at the bottom-right area of the canvas).",
    explanation: "Quadrant identification for (+X, -Y).",
    hint: "Positive X, negative Y: Quadrant IV (Bottom-Right).",
    level: "basic",
    codeExample: "# (120, -95) -> Quadrant IV"
  },
  {
    question: "How do you change the coordinate world space using 'screen.setworldcoordinates()'?",
    shortAnswer: "Using 'screen.setworldcoordinates(llx, lly, urx, ury)' allows remapping the screen coordinates to custom bounds (e.g. Setting lower-left to (0, 0) and upper-right to (100, 100) or matching HTML Canvas).",
    explanation: "Custom coordinate space transformation in turtle.",
    hint: "screen.setworldcoordinates(min_x, min_y, max_x, max_y).",
    level: "pro",
    codeExample: "screen.setworldcoordinates(0, 0, 1000, 1000) # Remaps canvas space"
  },
  {
    question: "Why is Cartesian quadrant understanding essential before building Turtle games or animations?",
    shortAnswer: "Collision detection with walls, ball bouncing physics (inverting delta X or delta Y on boundary collision), and sprite positioning all depend directly on Cartesian coordinate math.",
    explanation: "Mathematical foundation for game physics and boundary collisions.",
    hint: "Essential for screen bouncing physics, wall collisions, and precise sprite positioning.",
    level: "basic",
    codeExample: "# Wall bounce: if abs(t.xcor()) > 380: dx = -dx"
  },
  {
    question: "What is the heading angle when a turtle points directly along the positive Y-axis (North)?",
    shortAnswer: "90 degrees (North).",
    explanation: "Standard compass heading angles in Turtle Graphics.",
    hint: "90 degrees points North along +Y.",
    level: "basic",
    codeExample: "t.setheading(90) # Points North"
  },
  {
    question: "What is the heading angle when a turtle points directly along the negative X-axis (West)?",
    shortAnswer: "180 degrees (West).",
    explanation: "Standard compass heading angles in Turtle Graphics.",
    hint: "180 degrees points West along -X.",
    level: "basic",
    codeExample: "t.setheading(180) # Points West"
  },
  {
    question: "What is the ultimate rule for navigating the Turtle Cartesian canvas?",
    shortAnswer: "Always remember that (0, 0) is at the center of the window, +X is East, -X is West, +Y is North, -Y is South, and querying 'pos()' or using 'distance()' gives exact geometric precision for any visual path.",
    explanation: "The complete foundation for 2D Cartesian navigation in Turtle Graphics.",
    hint: "(0, 0) at center + 4 quadrants + pos() inspection + distance() precision.",
    level: "basic",
    codeExample: "# Enterprise Turtle Coordinate Standard"
  }
];

export default questions;