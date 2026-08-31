// src/components/study/python/topics/005_001_turtle-foundation/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Movement fundamentals: forward(), backward(), distance control and precision

const questions = [
  {
    question: "What is the mathematical equation governing 'forward(distance)' in Turtle Graphics?",
    shortAnswer: "The new coordinates are computed as: new_x = x + distance * cos(rad(heading)) and new_y = y + distance * sin(rad(heading)).",
    explanation: "Trigonometric displacement formula of turtle linear motion.",
    hint: "new_x = x + d * cos(theta), new_y = y + d * sin(theta).",
    level: "basic",
    codeExample: "# forward(d) translates (x, y) along current heading vector"
  },
  {
    question: "What are the aliases for 'forward()' and 'backward()' in Python Turtle?",
    shortAnswer: "'t.fd()' is the alias for 'forward()'; 't.bk()' and 't.back()' are the aliases for 'backward()'.",
    explanation: "Shorthand aliases in the turtle API.",
    hint: "fd() for forward; bk() or back() for backward.",
    level: "basic",
    codeExample: "t.fd(100) # forward(100)\nt.bk(50)  # backward(50)"
  },
  {
    question: "Does calling 't.backward(50)' change the turtle cursor's heading angle?",
    shortAnswer: "No; 'backward()' moves the turtle in reverse opposite to its current heading without changing its orientation angle.",
    explanation: "Orientation preservation during backward motion.",
    hint: "No, heading remains identical; only position moves backward.",
    level: "basic",
    codeExample: "h1 = t.heading()\nt.backward(100)\nassert t.heading() == h1 # True"
  },
  {
    question: "Can distance arguments in 'forward()' and 'backward()' be negative numbers?",
    shortAnswer: "Yes; passing a negative distance to 'forward(-100)' is mathematically identical to calling 'backward(100)', and 'backward(-100)' is identical to 'forward(100)'.",
    explanation: "Signed scalar distance handling.",
    hint: "Yes, negative forward moves backward, and negative backward moves forward.",
    level: "basic",
    codeExample: "t.forward(-50) # Moves 50 units in reverse"
  },
  {
    question: "Can distance arguments in 'forward()' and 'backward()' be floating-point numbers?",
    shortAnswer: "Yes; Turtle Graphics supports precise sub-pixel floating-point distances (e.g. 't.forward(12.345)'), maintaining continuous float coordinate vectors internally.",
    explanation: "Sub-pixel floating-point precision in Turtle.",
    hint: "Yes, float distances like 12.5 or 0.75 are fully supported.",
    level: "basic",
    codeExample: "t.forward(12.345) # Precise float displacement"
  },
  {
    question: "What is the fundamental difference between relative motion ('forward()') and absolute positioning ('goto()')?",
    shortAnswer: "Relative motion ('forward(d)') advances 'd' units along the current heading angle starting from current position; absolute positioning ('goto(x, y)') jumps directly to target coordinates (x, y) regardless of orientation.",
    explanation: "Relative vector movement vs absolute Cartesian coordinate positioning.",
    hint: "forward() moves along current heading; goto() moves to specific (x, y) coordinates.",
    level: "basic",
    codeExample: "t.forward(100)  # Relative to current angle\nt.goto(100, 50) # Absolute coordinate"
  },
  {
    question: "How do you calculate the cumulative path distance traveled by a turtle across multiple movements?",
    shortAnswer: "By maintaining a running total sum of the absolute distance of every 'forward()' and 'backward()' step, or tracking coordinate displacements via 't.distance(prev_pos)'.",
    explanation: "Odometer path accumulation algorithm.",
    hint: "Sum the absolute value of each step distance.",
    level: "moderate",
    codeExample: "total_distance += abs(step_dist)"
  },
  {
    question: "If a turtle at (0, 0) facing 90° (North) executes 't.forward(100)', what are its new coordinates?",
    shortAnswer: "(0.0, 100.0) (X remains 0, Y increases by 100 along the North axis).",
    explanation: "Coordinate displacement along the positive Y axis.",
    hint: "Facing 90° North: X is 0, Y is +100.",
    level: "basic",
    codeExample: "t.setheading(90)\nt.forward(100)\nassert t.pos() == (0.0, 100.0)"
  },
  {
    question: "If a turtle at (0, 0) facing 180° (West) executes 't.forward(150)', what are its new coordinates?",
    shortAnswer: "(-150.0, 0.0) (X decreases by 150 along the negative X axis, Y remains 0).",
    explanation: "Coordinate displacement along the negative X axis.",
    hint: "Facing 180° West: X is -150, Y is 0.",
    level: "basic",
    codeExample: "t.setheading(180)\nt.forward(150)\nassert t.pos() == (-150.0, 0.0)"
  },
  {
    question: "What is floating-point drift in turtle geometry and how do you prevent it?",
    shortAnswer: "Floating-point drift occurs when repeated trigonometric calculations ('cos', 'sin') accumulate infinitesimal rounding errors (e.g. 0.0000000000000001); use 'round(val, 2)' or 'math.isclose()' when asserting coordinates.",
    explanation: "IEEE 754 floating-point rounding imprecision in geometric steps.",
    hint: "Accumulated float rounding errors; use math.isclose() or round().",
    level: "moderate",
    codeExample: "import math\nassert math.isclose(t.xcor(), 0.0, abs_tol=1e-5)"
  },
  {
    question: "How do you draw a straight line of length 200, reverse to the midpoint, and draw a perpendicular tick mark?",
    shortAnswer: "'t.forward(200); t.backward(100); t.left(90); t.forward(20); t.backward(40)'",
    explanation: "Combining forward and backward steps for tick marks and axis drawing.",
    hint: "forward(200) → backward(100) to midpoint → turn 90° → forward/backward for tick.",
    level: "moderate",
    codeExample: "t.fd(200); t.bk(100); t.lt(90); t.fd(20); t.bk(40)"
  },
  {
    question: "What happens if you call 't.forward(0)'?",
    shortAnswer: "The turtle does not move and remains at its current position, but if the pen is down with a non-zero pensize, it may place a tiny single-pixel dot on the canvas.",
    explanation: "Zero-length step behavior.",
    hint: "No displacement occurs; stays in place.",
    level: "basic",
    codeExample: "t.forward(0) # Position unchanged"
  },
  {
    question: "How do you simulate stepping motion with constant velocity in an animation loop?",
    shortAnswer: "By moving in small incremental steps (e.g. 't.forward(2)') inside a loop with 'time.sleep()' or 'screen.ontimer()'.",
    explanation: "Incremental stepping for smooth visual animation.",
    hint: "Small forward() increments inside a timed loop.",
    level: "basic",
    codeExample: "for _ in range(100): t.forward(2)"
  },
  {
    question: "What is the effect of 't.forward(100)' when the pen is lifted with 't.penup()'?",
    shortAnswer: "The turtle translates 100 units forward along its heading, updating its '(x, y)' position, but leaves zero ink or lines on the canvas.",
    explanation: "Translational motion during penup state.",
    hint: "Position updates by 100 units, but no line is drawn.",
    level: "basic",
    codeExample: "t.penup(); t.forward(100) # Silent transit"
  },
  {
    question: "If a turtle is at (50, 50) and calls 't.backward(50)' while facing 0° (East), what is its new position?",
    shortAnswer: "(0.0, 50.0) (X decreases by 50 to 0.0, Y remains unchanged at 50.0).",
    explanation: "Backward displacement calculation.",
    hint: "Facing East: backward(50) subtracts 50 from X.",
    level: "basic",
    codeExample: "# (50, 50) - 50 East = (0.0, 50.0)"
  },
  {
    question: "How do robotic CNC machines and 3D printers map onto Turtle 'forward()' commands?",
    shortAnswer: "CNC machines interpret linear G-code commands ('G1 X... Y... F...') which translate stepper motor revolutions into linear displacement vectors identical to 't.forward(distance)'.",
    explanation: "Real-world industrial kinematics of linear stepper motors.",
    hint: "Linear stepper motor displacement is conceptually identical to turtle forward().",
    level: "moderate",
    codeExample: "# G-Code: G1 X100 is conceptually identical to t.forward(100)"
  },
  {
    question: "How do you reverse a turtle's movement direction so that 'forward()' moves backward?",
    shortAnswer: "By turning 180 degrees using 't.left(180)' or 't.right(180)'.",
    explanation: "Inverting heading direction.",
    hint: "Turn 180 degrees using t.left(180) or t.right(180).",
    level: "basic",
    codeExample: "t.left(180) # Reverses direction 180 degrees"
  },
  {
    question: "Why is 'backward()' preferred over turning 180° and moving forward in certain drawings?",
    shortAnswer: "'backward()' preserves the turtle's original orientation heading, which is essential when drawing bilateral tick marks, tree branches, or return journeys without needing to re-orient the turtle.",
    explanation: "Preserving heading state during return displacements.",
    hint: "Avoids having to turn 180° and turn back, preserving orientation.",
    level: "basic",
    codeExample: "t.fd(100); t.bk(100) # Leaves heading unchanged"
  },
  {
    question: "How do you calculate the step size needed to divide a distance $D$ into $N$ equal segments?",
    shortAnswer: "step_size = D / N; then iterate 'for _ in range(N): t.forward(step_size)'.",
    explanation: "Segment division algorithm.",
    hint: "step_size = total_distance / number_of_segments.",
    level: "basic",
    codeExample: "step = 200 / 10\nfor _ in range(10): t.fd(step)"
  },
  {
    question: "What is the ultimate golden rule of Turtle Movement Fundamentals?",
    shortAnswer: "Always remember that `forward()` and `backward()` operate relative to the current heading vector ($\Delta x = d \cdot \cos\theta, \Delta y = d \cdot \sin\theta$), use `backward()` to preserve orientation during return paths, and track total displacement with mathematical precision.",
    explanation: "The complete standard for linear motion in Turtle Graphics.",
    hint: "Relative heading vectors + backward preserves orientation + distance precision.",
    level: "basic",
    codeExample: "# Enterprise Linear Motion Standard"
  }
];

export default questions;