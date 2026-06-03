const questions = [
  {
    question: "What does `forward(100)` do?",
    shortAnswer: "Moves the turtle 100 units in the direction it is currently facing.",
    explanation: "The distance is measured in pixels (or abstract units) along the current heading.",
    hint: "It does not change the heading.",
    level: "basic",
    codeExample: "t.forward(100)"
  },
  {
    question: "What is the difference between `backward()` and moving forward with a negative distance?",
    shortAnswer: "They are functionally identical: `backward(50)` equals `forward(-50)`.",
    explanation: "`backward()` is more readable and explicitly states intent.",
    hint: "Use `backward()` for clarity.",
    level: "moderate",
    codeExample: "t.backward(50)  # clear; t.forward(-50)  # works but confusing"
  },
  {
    question: "Does `backward()` change the turtle's heading?",
    shortAnswer: "No, heading remains the same.",
    explanation: "The turtle moves opposite to its heading but still faces the original direction.",
    hint: "Think of walking backward while looking forward.",
    level: "basic",
    codeExample: "t.setheading(90); t.backward(100)  # still heading north"
  },
  {
    question: "Can you use floating-point numbers with `forward()`?",
    shortAnswer: "Yes, e.g., `t.forward(50.75)`.",
    explanation: "Turtle uses floating-point coordinates internally, so fractional distances are allowed.",
    hint: "Useful for fine control.",
    level: "basic",
    codeExample: "t.forward(0.5)"
  },
  {
    question: "What does `t.distance(100, 0)` return?",
    shortAnswer: "The Euclidean distance from current turtle position to point (100, 0).",
    explanation: "Returns a float. Can also use `t.distance(other_turtle)`.",
    hint: "Useful for collision detection.",
    level: "moderate",
    codeExample: "dist = t.distance(100, 0)"
  },
  {
    question: "What does `t.towards(200, 200)` return?",
    shortAnswer: "The angle (in degrees) from the turtle's current position to the point (200,200).",
    explanation: "Useful for turning to face a target.",
    hint: "Combine with `setheading()` to aim.",
    level: "moderate",
    codeExample: "angle = t.towards(200,200); t.setheading(angle)"
  },
  {
    question: "Why might using repeated `forward(0.1)` cause drift?",
    shortAnswer: "Floating-point rounding errors accumulate over many steps.",
    explanation: "Each addition has tiny error; after thousands of steps, error becomes noticeable.",
    hint: "Use integers or avoid very small steps when exactness matters.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the effect of `forward(0)`?",
    shortAnswer: "No movement; does nothing.",
    explanation: "Not an error, but pointless.",
    hint: "Avoid in loops.",
    level: "basic",
    codeExample: "t.forward(0)  # no change"
  },
  {
    question: "How can you make the turtle move exactly 100 units without drawing?",
    shortAnswer: "Use `t.penup(); t.forward(100); t.pendown()`.",
    explanation: "Pen up prevents drawing during movement.",
    hint: "Lift pen before moving.",
    level: "basic",
    codeExample: "t.penup(); t.forward(100); t.pendown()"
  },
  {
    question: "What is the maximum distance you can move in one `forward()` call?",
    shortAnswer: "No practical limit, but extremely large values may cause the turtle to move off-screen or lag.",
    explanation: "Turtle uses floating-point coordinates, so you can move millions of units, but you won't see it.",
    hint: "Stick to screen-relevant distances (e.g., -500 to 500).",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Does `forward()` work if the turtle is hidden?",
    shortAnswer: "Yes, movement and drawing are unaffected by visibility.",
    explanation: "Hidden turtle still moves and draws (if pen down).",
    hint: "Visibility doesn't affect movement.",
    level: "basic",
    codeExample: "t.hideturtle(); t.forward(100)  # moves and draws"
  },
  {
    question: "What is the `fd()` alias?",
    shortAnswer: "`fd()` is a shortcut for `forward()`.",
    explanation: "Both are identical; `fd()` saves typing.",
    hint: "`t.fd(50)` same as `t.forward(50)`.",
    level: "basic",
    codeExample: "t.fd(50)"
  },
  {
    question: "How can you measure the distance the turtle has traveled from start?",
    shortAnswer: "Store initial position, then compute distance using `t.distance(initial_x, initial_y)`.",
    explanation: "Turtle does not have a built-in odometer; you must calculate.",
    hint: "Use `start = t.pos(); ...; dist = t.distance(start)`.",
    level: "moderate",
    codeExample: "start = t.pos(); t.forward(100); print(t.distance(start))"
  },
  {
    question: "Why does `t.backward(50)` sometimes not move the turtle?",
    shortAnswer: "It always moves, but if pen is up, you won't see a trail. The position still changes.",
    explanation: "Check with `print(t.pos())` before and after.",
    hint: "Pen up hides the line, not the movement.",
    level: "moderate",
    codeExample: "t.penup(); t.backward(50); print(t.pos()) # moved"
  },
  {
    question: "What is the result of `t.forward(10.5)` after `t.forward(10.5)`?",
    shortAnswer: "Total movement of 21.0 units, but each step may have rounding.",
    explanation: "The turtle's x,y coordinates are floats, so accumulation is precise enough for most purposes.",
    hint: "Use integers for exact symmetry.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How would you move the turtle in a straight line for exactly 300 units regardless of heading?",
    shortAnswer: "`t.forward(300)` already does that.",
    explanation: "`forward()` moves along the current heading; to move along absolute axis, use `goto()`.",
    hint: "Relative = forward; absolute = goto.",
    level: "basic",
    codeExample: "t.forward(300)"
  },
  {
    question: "What is a common beginner mistake when using `backward()` in a square loop?",
    shortAnswer: "Using `backward()` instead of `right()` or `left()` for turning.",
    explanation: "Beginners sometimes think backward turns the turtle; it only moves opposite direction.",
    hint: "Turning requires `left()` or `right()`.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "How can you ensure a turtle moves exactly 100 units even if the screen is resized?",
    shortAnswer: "You cannot, because turtle uses absolute pixels; screen resolution doesn't affect distance units.",
    explanation: "The unit is a pixel (or scaled by `setworldcoordinates`).",
    hint: "Use `setworldcoordinates` for scale-independent drawing.",
    level: "expert",
    codeExample: "turtle.setworldcoordinates(0,0,1000,1000)"
  },
  {
    question: "What does `t.distance(t2)` return if `t2` is another turtle?",
    shortAnswer: "Distance between the two turtles' positions.",
    explanation: "Useful for checking if turtles collide or are near each other.",
    hint: "`dist = t.distance(t2)`",
    level: "moderate",
    codeExample: "if t.distance(t2) < 10: print('Near!')"
  },
  {
    question: "How would you move the turtle forward but stop if it gets within 20 units of a point?",
    shortAnswer: "Use a loop: while t.distance(target) > 20: t.forward(5).",
    explanation: "This gradually approaches the target.",
    hint: "Avoid infinite loop – ensure movement reduces distance.",
    level: "expert",
    codeExample: "while t.distance(100,0) > 20: t.forward(5)"
  },
  {
    question: "What is the shorthand for `backward()`?",
    shortAnswer: "`bk()` or `back()`.",
    explanation: "`t.bk(50)` moves backward.",
    hint: "`bk` = back.",
    level: "basic",
    codeExample: "t.bk(50)"
  },
  {
    question: "Can `forward()` accept a negative distance?",
    shortAnswer: "Yes, it moves backward; but use `backward()` for readability.",
    explanation: "Negative values are allowed but considered bad practice for clarity.",
    hint: "Avoid negative arguments.",
    level: "moderate",
    codeExample: "t.forward(-50)  # moves backward"
  },
  {
    question: "How does `t.distance()` behave if the point is the same as current position?",
    shortAnswer: "Returns 0.0.",
    explanation: "Distance from a point to itself is zero.",
    hint: "Useful for checking arrival.",
    level: "basic",
    codeExample: "print(t.distance(t.pos()))  # 0.0"
  },
  {
    question: "What is the difference between `forward()` in turtle vs moving a sprite in game programming?",
    shortAnswer: "Very similar: both translate position by velocity vector over time.",
    explanation: "Turtle is immediate; games use incremental movement per frame.",
    hint: "Game loop: position += direction * speed * delta_time.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How can you measure total distance traveled by the turtle?",
    shortAnswer: "Maintain a variable `total_distance` and add `abs(distance)` each move.",
    explanation: "Turtle does not track this automatically.",
    hint: "`total += abs(distance)` for each forward/backward.",
    level: "expert",
    codeExample: "total = 0; t.forward(50); total += 50; t.backward(20); total += 20"
  },
  {
    question: "Why might `forward(100)` not draw a line even though pen is down?",
    shortAnswer: "The turtle may be on a point where the line is of zero length? Or color matches background.",
    explanation: "Also check if `turtle.tracer(0)` was called without `update()`.",
    hint: "Call `turtle.update()` after movement.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "What is the relationship between `distance()` and the Pythagorean theorem?",
    shortAnswer: "`distance()` computes sqrt((dx)^2 + (dy)^2).",
    explanation: "It's Euclidean distance, same as Pythagorean theorem.",
    hint: "`dx = x2 - x1; dy = y2 - y1; dist = sqrt(dx*dx + dy*dy)`.",
    level: "moderate",
    codeExample: ""
  },
  {
    question: "Can you use `forward()` with a variable name that shadows the function?",
    shortAnswer: "Yes, but it's bad practice: `forward = 100; t.forward(forward)` works but confusing.",
    explanation: "Avoid naming variables after turtle methods.",
    hint: "Use `dist = 100; t.forward(dist)`.",
    level: "moderate",
    codeExample: "step = 50; t.forward(step)"
  },
  {
    question: "What will `t.forward(t.distance(0,0))` do?",
    shortAnswer: "Moves forward by the distance from current position to origin.",
    explanation: "If turtle is at (x,y), it moves exactly to the origin if heading points that way? Actually it moves that distance in current heading, which may not go through origin.",
    hint: "Distance moved equals Euclidean distance to origin, but direction unchanged.",
    level: "expert",
    codeExample: ""
  },
  {
    question: "How would you draw a line of length 150 using `forward()` and then return to the start using `backward()`?",
    shortAnswer: "`t.forward(150); t.backward(150)`.",
    explanation: "This leaves you at the original position, heading unchanged.",
    hint: "Backward exactly reverses forward.",
    level: "basic",
    codeExample: "t.forward(150); t.backward(150)"
  }
];

export default questions;