import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Precision Drawing Demo")

t = turtle.Turtle()
t.speed(5)

# Using integer distances for exact pattern
side = 100
for _ in range(4):
    t.forward(side)
    t.right(90)

# Floating-point distances
t.penup()
t.goto(-150, -100)
t.pendown()
t.color("blue")
t.forward(50.75)
t.right(90)
t.forward(50.25)
t.right(90)
t.forward(50.75)
t.right(90)
t.forward(50.25)

# Show that floating points can create slight mismatches
t.penup()
t.goto(-150, -150)
t.color("red")
t.write("Floats can drift slightly", font=("Arial", 10, "normal"))

turtle.done()