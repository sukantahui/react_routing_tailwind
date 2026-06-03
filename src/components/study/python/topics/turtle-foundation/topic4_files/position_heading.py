import turtle

screen = turtle.Screen()
screen.title("Position & Heading Demo")

t = turtle.Turtle()
t.shape("turtle")

# Initial state
print(f"Initial position: {t.pos()}")
print(f"Initial heading: {t.heading()}°")

# Move and turn
t.forward(100)
t.left(90)
t.forward(50)

# After movement
print(f"After moving: position = {t.pos()}")
print(f"Heading now: {t.heading()}°")

# Get individual coordinates
print(f"x = {t.xcor()}, y = {t.ycor()}")

turtle.done()