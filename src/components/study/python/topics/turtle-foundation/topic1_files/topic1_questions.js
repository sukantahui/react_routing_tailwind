const questions = [
  {
    question: "What are the default coordinates of the origin in turtle graphics?",
    shortAnswer: "(0, 0) at the center of the screen.",
    explanation: "The origin is the center point where the x-axis and y-axis intersect. Positive x moves right, negative x left; positive y up, negative y down.",
    hint: "Think of the center of a graph paper.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "How do you get the turtle's current x-coordinate?",
    shortAnswer: "Use `t.xcor()` or `t.position()[0]`.",
    explanation: "`xcor()` returns a float. It's useful for conditional movement or debugging.",
    hint: "Try printing `t.xcor()` after moving.",
    level: "basic",
    codeExample: "print(t.xcor())"
  },
  {
    question: "What is the difference between `turtle.setup()` and `turtle.screensize()`?",
    shortAnswer: "`setup()` sets the main window size; `screensize()` sets the scrollable canvas area.",
    explanation: "The window is what you see; the canvas can be larger and you can scroll (if using `turtle.ScrolledCanvas`).",
    hint: "Window = viewport; canvas = virtual drawing board.",
    level: "moderate",
    codeExample: "turtle.setup(800,600); turtle.screensize(2000,2000)"
  },
  {
    question: "In which quadrant would the point ( -50, 30 ) lie?",
    shortAnswer: "Quadrant II (x negative, y positive).",
    explanation: "Quadrant I: (+,+), II: (-,+), III: (-,-), IV: (+,-).",
    hint: "x is negative, y positive → left and up.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What does `turtle.setworldcoordinates(-200, -200, 200, 200)` do?",
    shortAnswer: "Redefines the coordinate system so that bottom-left is (-200,-200) and top-right is (200,200).",
    explanation: "It scales and translates the screen to match those bounds. The origin may move to the center if bounds are symmetric.",
    hint: "Makes it easier to work with a fixed range.",
    level: "expert",
    codeExample: "turtle.setworldcoordinates(-100, -100, 100, 100)"
  },
  {
    question: "How can you make the background color of the turtle screen blue?",
    shortAnswer: "Use `turtle.bgcolor('blue')` or `screen.bgcolor('blue')`.",
    explanation: "The method works both on the default screen or a Screen object.",
    hint: "Color names or hex codes work.",
    level: "basic",
    codeExample: "screen = turtle.Screen(); screen.bgcolor('lightblue')"
  },
  {
    question: "What is the return type of `turtle.position()`?",
    shortAnswer: "A tuple of two floats: (x, y).",
    explanation: "You can unpack: `x, y = t.pos()`.",
    hint: "Useful for storing location before movement.",
    level: "basic",
    codeExample: "print(t.position())"
  },
  {
    question: "If a turtle is at (100, 50) and you call `goto(100, -50)`, what is the change in y?",
    shortAnswer: "The y-coordinate decreases by 100 (moves down).",
    explanation: "From 50 to -50, delta y = -100.",
    hint: "Negative y goes down.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you find the screen dimensions (width and height) from within a program?",
    shortAnswer: "Use `screen.window_width()` and `screen.window_height()`.",
    explanation: "These return the current size of the turtle graphics window.",
    hint: "Useful for centering drawings.",
    level: "moderate",
    codeExample: "w = turtle.window_width(); h = turtle.window_height()"
  },
  {
    question: "Why does `turtle.goto(100, 100)` draw a line from the previous position?",
    shortAnswer: "Because the pen is down by default. Use `penup()` before moving to avoid drawing.",
    explanation: "`pendown()` is default; `penup()` lifts the pen so movement leaves no trail.",
    hint: "Lift the pen if you want to reposition without drawing.",
    level: "basic",
    codeExample: "t.penup(); t.goto(100,100); t.pendown()"
  },
  {
    question: "What is the effect of `turtle.setworldcoordinates()` on existing drawings?",
    shortAnswer: "It rescales and repositions everything to fit the new coordinate system.",
    explanation: "All previous shapes will appear stretched or compressed according to the new bounds.",
    hint: "Use before drawing for predictable results.",
    level: "expert",
    codeExample: "turtle.setworldcoordinates(-500,-500,500,500)"
  },
  {
    question: "How do you move the turtle to the origin without drawing?",
    shortAnswer: "`t.penup(); t.goto(0,0); t.pendown()`",
    explanation: "Or simply `t.home()` which also resets heading but moves to (0,0).",
    hint: "`home()` is a shortcut.",
    level: "basic",
    codeExample: "t.home()"
  },
  {
    question: "What is the maximum range of coordinates in turtle if you don't change settings?",
    shortAnswer: "Depends on screen size, but typically the canvas is about half the screen dimensions.",
    explanation: "Default `screensize(400,300)` but actual coordinates can be larger via scrolling.",
    hint: "You can always use `setworldcoordinates` for fixed ranges.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Explain the signs of coordinates in Quadrant III.",
    shortAnswer: "x is negative, y is negative.",
    explanation: "Quadrant III is bottom-left of origin.",
    hint: "Both coordinates negative.",
    level: "basic",
    codeExample: ""
  },
  {
    question: "What is the purpose of `turtle.mode('logo')`?",
    shortAnswer: "Changes heading: 0° is up (north), 90° is right (east).",
    explanation: "Logo mode matches the original LOGO turtle pointing up. Standard mode is 0° = east.",
    hint: "Some schools prefer logo mode because 'forward' goes up.",
    level: "expert",
    codeExample: "turtle.mode('logo'); t.setheading(0)  # points up"
  },
  {
    question: "How do you draw a line from (-100, -100) to (100, 100)?",
    shortAnswer: "`t.penup(); t.goto(-100,-100); t.pendown(); t.goto(100,100)`",
    explanation: "This draws a diagonal through the origin.",
    hint: "You can also use `setheading(45)` and `forward(282)` but goto is simpler.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What happens if you call `turtle.setup(300,300)` after creating a turtle?",
    shortAnswer: "The window resizes; existing drawings may be clipped or rescaled.",
    explanation: "Best to call setup before any drawing commands.",
    hint: "Set up screen first, then create turtle.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you make the turtle screen stay open until clicked?",
    shortAnswer: "Call `turtle.exitonclick()` at the end of the script.",
    explanation: "This waits for a mouse click inside the window before closing.",
    hint: "Better than `turtle.done()` because it's explicit.",
    level: "basic",
    codeExample: "turtle.exitonclick()"
  },
  {
    question: "What is the difference between `turtle.xcor()` and `turtle.pos()[0]`?",
    shortAnswer: "No functional difference; both return x-coordinate.",
    explanation: "`xcor()` is more readable for just the x value.",
    hint: "Use `xcor()` for clarity.",
    level: "basic",
    codeExample: "x = t.xcor()"
  },
  {
    question: "If you want the turtle to move to (200, 150) but the screen is only 400 wide, what happens?",
    shortAnswer: "The turtle moves there; you might see scrollbars or the turtle goes off-screen.",
    explanation: "The canvas can be larger than the window; you may need to increase screensize.",
    hint: "Use `screensize()` to enlarge the canvas.",
    level: "moderate",
    codeExample: "turtle.screensize(1000,1000)"
  },
  {
    question: "Why might a teacher have students draw a house using coordinates?",
    shortAnswer: "To reinforce the Cartesian plane and precise positioning.",
    explanation: "Students calculate positions (e.g., roof peak at (0,100), base at (-50,0) to (50,0)).",
    hint: "Combines art with math practice.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "What does `turtle.window_width()` return after `turtle.setup(800,600)`?",
    shortAnswer: "800 (the width in pixels).",
    explanation: "Returns the actual window width as set by setup.",
    hint: "Use for centering text.",
    level: "basic",
    codeExample: "w = turtle.window_width()"
  },
  {
    question: "How do you change the turtle's coordinate system so that (0,0) is the bottom-left corner?",
    shortAnswer: "Use `turtle.setworldcoordinates(0, 0, width, height)`.",
    explanation: "For example, `turtle.setworldcoordinates(0,0,600,400)` makes top-right (600,400).",
    hint: "Common in game programming where origin is bottom-left.",
    level: "expert",
    codeExample: "turtle.setworldcoordinates(0,0,800,600)"
  },
  {
    question: "What is the default size of the turtle canvas (not the window)?",
    shortAnswer: "Typically 400x300 (in older versions) but modern is based on screen size.",
    explanation: "You can always print `turtle.screensize()` to see current canvas size.",
    hint: "Canvas = drawing area before scrolling.",
    level: "moderate",
    codeExample: "print(turtle.screensize())"
  },
  {
    question: "Why does `turtle.goto(0,0)` after a series of moves not always go back to the exact center?",
    shortAnswer: "It always goes to (0,0) because that is the absolute coordinate of the origin.",
    explanation: "Unless you changed `setworldcoordinates`, (0,0) is the center.",
    hint: "Use `home()` to also reset heading.",
    level: "basic",
    codeExample: "t.goto(0,0)"
  },
  {
    question: "How can a student visualize the current coordinate system limits?",
    shortAnswer: "Draw a rectangle using `turtle.goto()` with the four corners of the screen.",
    explanation: "Move to (window_width/2, window_height/2) etc. to map the boundaries.",
    hint: "Use `window_width()` and `window_height()`.",
    level: "moderate",
    codeExample: "w = turtle.window_width()//2; h = turtle.window_height()//2; t.goto(w,h)"
  },
  {
    question: "What could cause the turtle to move but not draw even though pen is down?",
    shortAnswer: "The turtle could be off screen, or color same as background, or tracer(0) without update.",
    explanation: "Check `t.isdown()`, pen color, and if tracer is off call `update()`.",
    hint: "Add print statements to verify.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "Explain the relationship between turtle coordinates and the graphics window's pixel coordinates.",
    shortAnswer: "By default, turtle uses Cartesian coordinates where (0,0) is center; pixel coordinates usually have (0,0) top-left.",
    explanation: "Turtle abstracts pixels; you work in logical units. Use `setworldcoordinates` to map.",
    hint: "Don't confuse with pixel coordinates.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is one way to draw a symmetric pattern across the y-axis?",
    shortAnswer: "Use `goto(x, y)` and `goto(-x, y)` within a loop.",
    explanation: "Mirror points by negating x.",
    hint: "Think of reflecting over the y-axis.",
    level: "moderate",
    codeExample: "for x in range(-100,101,20): t.goto(x,50); t.goto(-x,50)"
  }
];

export default questions;