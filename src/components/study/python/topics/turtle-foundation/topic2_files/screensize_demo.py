import turtle

# Setup
turtle.setup(600, 400)        # Window size
turtle.screensize(2000, 1500, "lightgray")   # Canvas (scrollable) 2000x1500, bg gray
turtle.title("Scrolling Canvas Demo")

t = turtle.Turtle()
t.speed(5)

# Draw pattern that extends beyond window to test scrolling
for i in range(50):
    t.forward(100)
    t.right(91)

turtle.done()