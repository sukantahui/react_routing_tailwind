import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Dashed Line with penup/pendown")

t = turtle.Turtle()
t.speed(5)
t.pensize(2)
t.color("blue")

# Draw a dashed line: 20 steps drawing, 10 steps skipping
length = 200
dash = 15
space = 10

for _ in range(length // (dash + space)):
    t.pendown()
    t.forward(dash)
    t.penup()
    t.forward(space)

t.penup()
t.goto(0, -50)
t.pendown()
t.write("Dashed line created by alternating pendown() and penup()", align="center", font=("Arial", 10, "normal"))

turtle.done()