import turtle

screen = turtle.Screen()
screen.setup(500, 400)
screen.title("Draw a Square")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)
t.color("green")

side = 120

# Draw square: 4 sides, 90° external angle
for _ in range(4):
    t.forward(side)
    t.right(90)

# Mark start and fill
t.penup()
t.goto(-side//2, -side//2)
t.pendown()
t.begin_fill()
for _ in range(4):
    t.forward(side)
    t.right(90)
t.end_fill()

turtle.done()