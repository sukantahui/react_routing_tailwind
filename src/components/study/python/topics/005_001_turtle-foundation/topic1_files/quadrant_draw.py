import turtle

# Setup
screen = turtle.Screen()
screen.setup(600, 600)
screen.bgcolor("black")

t = turtle.Turtle()
t.speed(2)
t.pensize(2)

# Draw axes
t.penup()
t.goto(-250, 0)
t.pendown()
t.forward(500)
t.penup()
t.goto(0, -250)
t.pendown()
t.setheading(90)
t.forward(500)

# Draw shapes in each quadrant
t.penup()
# Quadrant I (+,+)
t.goto(100, 100)
t.pendown()
t.color("lime")
t.circle(40)

# Quadrant II (-,+)
t.penup()
t.goto(-120, 100)
t.pendown()
t.color("cyan")
for _ in range(4):
    t.forward(60)
    t.right(90)

# Quadrant III (-,-)
t.penup()
t.goto(-130, -100)
t.pendown()
t.color("orange")
t.begin_fill()
for _ in range(3):
    t.forward(80)
    t.left(120)
t.end_fill()

# Quadrant IV (+,-)
t.penup()
t.goto(100, -130)
t.pendown()
t.color("magenta")
for _ in range(36):
    t.forward(5)
    t.right(10)

t.hideturtle()
turtle.done()