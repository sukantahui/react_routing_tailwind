// src/components/study/python/topics/005_001_turtle-foundation/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Turtle cursor (pen) behavior: position, heading, visibility (showturtle(), hideturtle())

const questions = [
  {
    question: "How do you query the current heading angle of a Turtle cursor?",
    shortAnswer: "Using 't.heading()', which returns a float value between 0.0 and 359.9 degrees measured counter-clockwise from East (0°).",
    explanation: "Querying turtle orientation in degrees.",
    hint: "Use t.heading().",
    level: "basic",
    codeExample: "angle = t.heading() # e.g. 90.0 (North)"
  },
  {
    question: "What are the compass directions corresponding to 0°, 90°, 180°, and 270° in Turtle?",
    shortAnswer: "0° is East (+X), 90° is North (+Y), 180° is West (-X), and 270° is South (-Y).",
    explanation: "Standard compass heading angles in Python Turtle.",
    hint: "0° East, 90° North, 180° West, 270° South.",
    level: "basic",
    codeExample: "# 0°: East | 90°: North | 180°: West | 270°: South"
  },
  {
    question: "Why does calling 't.hideturtle()' significantly speed up drawing execution in large loops?",
    shortAnswer: "When the cursor is visible, Tkinter must redraw, rotate, and re-render the turtle icon polygon on the canvas after every single movement and turn; hiding the cursor eliminates this icon rendering overhead entirely.",
    explanation: "Rendering performance optimization via cursor hiding.",
    hint: "Eliminates Tkinter cursor polygon redraw and rotation overhead.",
    level: "moderate",
    codeExample: "t.hideturtle() # 3x-5x faster drawing in loops"
  },
  {
    question: "What are the short aliases for 'showturtle()' and 'hideturtle()'?",
    shortAnswer: "'t.st()' for 'showturtle()' and 't.ht()' for 'hideturtle()'.",
    explanation: "Convenience shorthand methods in turtle API.",
    hint: "t.st() and t.ht().",
    level: "basic",
    codeExample: "t.ht() # Hide cursor\nt.st() # Show cursor"
  },
  {
    question: "How do you check whether a Turtle cursor is currently visible on the screen?",
    shortAnswer: "Using 't.isvisible()', which returns 'True' if the cursor is visible and 'False' if hidden.",
    explanation: "Querying cursor visibility boolean state.",
    hint: "Use t.isvisible().",
    level: "basic",
    codeExample: "if t.isvisible(): print('Cursor is visible')"
  },
  {
    question: "What is the difference between 't.pos()' and 't.xcor()' / 't.ycor()'?",
    shortAnswer: "'t.pos()' (or 't.position()') returns a tuple '(x, y)' of both coordinates, while 't.xcor()' and 't.ycor()' return the individual X and Y coordinate floats separately.",
    explanation: "Coordinate inspection methods.",
    hint: "pos() returns (x,y) tuple; xcor() and ycor() return individual floats.",
    level: "basic",
    codeExample: "x, y = t.pos()\nx = t.xcor()\ny = t.ycor()"
  },
  {
    question: "How do you move the turtle to a new position without leaving an ink trail on the canvas?",
    shortAnswer: "By calling 't.penup()' (or 't.up()') before moving, and calling 't.pendown()' (or 't.down()') after reaching the target position.",
    explanation: "Pen up and down mechanics for discrete drawing segments.",
    hint: "Lift pen with penup(), move, then lower pen with pendown().",
    level: "basic",
    codeExample: "t.penup()\nt.goto(150, 200)\nt.pendown()"
  },
  {
    question: "How do you query whether the turtle's pen is currently in the drawing state (down)?",
    shortAnswer: "Using 't.isdown()', which returns 'True' if the pen is down and 'False' if the pen is up.",
    explanation: "Inspecting pen drawing status.",
    hint: "Use t.isdown().",
    level: "basic",
    codeExample: "if t.isdown(): print('Pen is down, drawing active')"
  },
  {
    question: "What is the return type and format of 't.pos()' in Python Turtle?",
    shortAnswer: "It returns a 'turtle.Vec2D' object (a 2D vector subclass of tuple) representing '(x, y)' coordinates.",
    explanation: "Vec2D vector return type of position queries.",
    hint: "Returns a Vec2D tuple containing (x, y).",
    level: "moderate",
    codeExample: "pos = t.pos() # Vec2D(100.0, 50.0)"
  },
  {
    question: "How do you change the line thickness (stroke width) drawn by a Turtle pen?",
    shortAnswer: "Using 't.pensize(width)' (or 't.width(width)') where width is a positive integer representing line thickness in pixels.",
    explanation: "Setting pen stroke width.",
    hint: "Use t.pensize(width) or t.width(width).",
    level: "basic",
    codeExample: "t.pensize(4) # 4-pixel thick stroke"
  },
  {
    question: "Can a turtle still draw lines on the canvas while its cursor is hidden with 'hideturtle()'?",
    shortAnswer: "Yes; hiding the cursor only makes the icon invisible. The pen continues to draw all lines and fill polygons normally if 'pendown()' is active.",
    explanation: "Cursor visibility independence from pen drawing state.",
    hint: "Yes, drawing continues normally; only the cursor icon is invisible.",
    level: "basic",
    codeExample: "t.hideturtle()\nt.forward(100) # Line is drawn cleanly without cursor"
  },
  {
    question: "How do you set the turtle cursor to an exact heading angle directly?",
    shortAnswer: "Using 't.setheading(angle)' (or 't.seth(angle)') where angle is specified in degrees (e.g. 'setheading(90)' points directly North).",
    explanation: "Absolute heading angle orientation.",
    hint: "Use t.setheading(angle) or t.seth(angle).",
    level: "basic",
    codeExample: "t.setheading(90) # Points North (+Y)"
  },
  {
    question: "What is the default heading angle of a newly created Turtle?",
    shortAnswer: "0.0 degrees (pointing directly East along the positive X-axis).",
    explanation: "Default orientation of newly initialized turtles.",
    hint: "0.0 degrees (East / rightward).",
    level: "basic",
    codeExample: "t = turtle.Turtle()\nassert t.heading() == 0.0"
  },
  {
    question: "What happens if you pass an angle greater than 360° or negative to 'setheading()'?",
    shortAnswer: "Python Turtle normalizes the angle modulo 360 (e.g. 'setheading(450)' becomes 90°, and 'setheading(-90)' becomes 270°).",
    explanation: "Modulo 360 normalization of heading angles.",
    hint: "Automatically normalized modulo 360 degrees.",
    level: "basic",
    codeExample: "t.setheading(450) # Normalizes to 90.0 (North)"
  },
  {
    question: "How do you inspect the current pen line color of a Turtle object?",
    shortAnswer: "Using 't.pencolor()' without arguments, which returns the current color name, hex string, or RGB tuple.",
    explanation: "Querying active pencolor.",
    hint: "Call t.pencolor() with no arguments.",
    level: "basic",
    codeExample: "current_pencolor = t.pencolor() # '#2dd4bf'"
  },
  {
    question: "How do you inspect the current fill color of a Turtle object?",
    shortAnswer: "Using 't.fillcolor()' without arguments.",
    explanation: "Querying active fillcolor.",
    hint: "Call t.fillcolor() with no arguments.",
    level: "basic",
    codeExample: "current_fill = t.fillcolor() # '#0d9488'"
  },
  {
    question: "Why is tracking turtle position and heading essential when writing algorithmic drawing functions?",
    shortAnswer: "Algorithmic drawing requires returning the turtle to known reference coordinates or calculating delta displacements for recursive branch trees and symmetrical geometric mandalas.",
    explanation: "Position and heading tracking in algorithmic geometry.",
    hint: "Essential for restoring state in recursive functions and symmetrical art.",
    level: "moderate",
    codeExample: "saved_pos = t.pos(); saved_heading = t.heading() # Save state"
  },
  {
    question: "How do you restore a turtle's position and heading to a previously saved state?",
    shortAnswer: "By saving 'saved_pos = t.pos()' and 'saved_head = t.heading()', and later restoring with 't.penup(); t.goto(saved_pos); t.setheading(saved_head); t.pendown()'.",
    explanation: "State push/pop pattern in turtle graphics.",
    hint: "Save pos/heading to variables, then use goto() and setheading() to restore.",
    level: "moderate",
    codeExample: "t.goto(saved_pos); t.setheading(saved_head)"
  },
  {
    question: "What is the difference between 't.towards(x, y)' and 't.heading()'?",
    shortAnswer: "'t.heading()' returns the turtle's current direction, while 't.towards(x, y)' calculates the angle needed from the turtle's current position to point directly at the target point (x, y).",
    explanation: "Calculating orientation angle towards a target coordinate.",
    hint: "heading() is current direction; towards(x,y) is angle needed to face (x,y).",
    level: "pro",
    codeExample: "target_angle = t.towards(100, 100)\nt.setheading(target_angle) # Faces target"
  },
  {
    question: "What is the ultimate golden rule of Turtle Cursor & Pen management?",
    shortAnswer: "Always manage pen states defensively with `penup()` and `pendown()`, hide the cursor (`hideturtle()`) during heavy computational loops to eliminate rendering lag, and inspect `pos()` and `heading()` to guarantee geometric precision.",
    explanation: "The complete standard for professional Turtle cursor management.",
    hint: "Defensive penup/pendown + hideturtle() in loops + pos()/heading() telemetry.",
    level: "basic",
    codeExample: "# Enterprise Cursor & Pen Telemetry Standard"
  }
];

export default questions;