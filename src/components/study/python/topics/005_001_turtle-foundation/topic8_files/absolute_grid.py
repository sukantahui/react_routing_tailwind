import turtle

screen = turtle.Screen()
screen.setup(600, 600)
screen.title("Absolute Grid of Dots")

t = turtle.Turtle()
t.speed(10)
t.hideturtle()

# Draw a 5x5 grid of dots at absolute positions
start_x = -200
start_y = -200
spacing = 100

t.penup()
for row in range(5):
    y = start_y + row * spacing
    for col in range(5):
        x = start_x + col * spacing
        t.goto(x, y)
        t.dot(10, "cyan")
        t.write(f"({x},{y})", font=("Arial", 8, "normal"), align="center")

# Draw axes
t.goto(-250, 0)
t.pendown()
t.goto(250, 0)
t.penup()
t.goto(0, -250)
t.pendown()
t.goto(0, 250)

turtle.done()