import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Stamping with Visibility")

t = turtle.Turtle()
t.shape("turtle")
t.color("blue")
t.speed(4)

# Stamp at starting position
t.stamp()

# Move and stamp along a path
for angle in range(0, 360, 45):
    t.setheading(angle)
    t.forward(80)
    t.stamp()
    t.backward(80)

# Hide turtle for final presentation
t.hideturtle()

# Add labels
t.penup()
t.goto(0, -50)
t.color("black")
t.write("Stamped turtle shapes", align="center", font=("Arial", 12, "normal"))

turtle.done()