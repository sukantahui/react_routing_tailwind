import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Draw an Equilateral Triangle")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)
t.color("red")

side = 130

# External angle = 360/3 = 120°
for _ in range(3):
    t.forward(side)
    t.right(120)

t.penup()
t.goto(0, 60)
t.pendown()
t.begin_fill()
for _ in range(3):
    t.forward(side)
    t.right(120)
t.end_fill()

turtle.done()