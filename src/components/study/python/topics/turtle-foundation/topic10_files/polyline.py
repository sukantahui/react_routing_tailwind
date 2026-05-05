import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Zig‑Zag Polyline")

t = turtle.Turtle()
t.speed(4)
t.pensize(2)
t.color("purple")

# Draw a zig‑zag connected path
t.left(45)
for _ in range(6):
    t.forward(50)
    t.right(90)
    t.forward(50)
    t.left(90)

t.penup()
t.goto(0, 0)
t.dot(6, "green")
t.goto(0, 0)
t.write("Start", font=("Arial", 8, "normal"))

t.goto(t.xcor(), t.ycor())  # last position
t.dot(6, "red")
t.write("End", font=("Arial", 8, "normal"))

turtle.done()