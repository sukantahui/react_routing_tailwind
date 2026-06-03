import turtle

# Setup window configuration
turtle.setup(800, 600)          # width=800, height=600
turtle.title("My Turtle Canvas")
turtle.bgcolor("lightblue")

# Optional: set scrollable canvas area (larger than window)
turtle.screensize(1200, 900)

# Now create turtle and draw
t = turtle.Turtle()
t.speed(3)
t.forward(300)

turtle.done()