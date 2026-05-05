import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Basic Rotation Demo")

t = turtle.Turtle()
t.shape("turtle")
t.speed(3)

# Initial direction: east
t.write("Start: East", font=("Arial", 10, "normal"))

# Turn left (counter-clockwise)
t.left(90)
t.forward(80)
t.write("Left 90°", font=("Arial", 10, "normal"))

# Turn right (clockwise)
t.right(180)
t.forward(80)
t.write("Right 180°", font=("Arial", 10, "normal"))

# Show heading after each
print(f"Heading after left(90): {t.heading()}")
print(f"Heading after right(180): {t.heading()}")

turtle.done()