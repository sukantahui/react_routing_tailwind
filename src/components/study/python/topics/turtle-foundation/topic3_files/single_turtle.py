import turtle

# Create the screen
screen = turtle.Screen()
screen.title("Single Turtle Demo")

# Create a turtle object
t = turtle.Turtle()
t.shape("turtle")
t.color("green")
t.speed(3)

# Draw a square
for _ in range(4):
    t.forward(100)
    t.right(90)

turtle.done()