import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Order of Commands Matters")

t = turtle.Turtle()
t.speed(3)

# Draw a shape with specific order: square, but different start
t.penup()
t.goto(-150, 100)
t.pendown()
t.write("Version A: forward, then right", font=("Arial", 8, "normal"))

for _ in range(4):
    t.forward(50)
    t.right(90)

t.penup()
t.goto(50, 100)
t.pendown()
t.write("Version B: right, then forward", font=("Arial", 8, "normal"))

# Different order: first turn, then forward
t.right(90)
t.forward(50)
t.right(90)
t.forward(50)
t.right(90)
t.forward(50)
t.right(90)
t.forward(50)

turtle.done()