import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Teleporting with penup()")

t = turtle.Turtle()
t.speed(4)
t.pensize(2)

# Draw a square at original position
for _ in range(4):
    t.forward(80)
    t.right(90)

# Teleport to a new location without drawing
t.penup()
t.goto(-150, -100)
t.pendown()

# Draw a triangle at new location
for _ in range(3):
    t.forward(100)
    t.right(120)

# Teleport again
t.penup()
t.goto(100, -100)
t.pendown()

# Draw a rectangle
for _ in range(2):
    t.forward(120)
    t.right(90)
    t.forward(60)
    t.right(90)

t.hideturtle()
turtle.done()