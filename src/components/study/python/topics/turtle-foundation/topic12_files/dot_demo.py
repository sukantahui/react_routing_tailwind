import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("dot() Demo")

t = turtle.Turtle()
t.speed(3)
t.penup()

# Draw a grid of dots at different positions
positions = [(-200, 100), (-100, 50), (0, 0), (100, -50), (200, -100)]
colors = ["red", "green", "blue", "orange", "purple"]
sizes = [20, 30, 15, 40, 25]

for (x, y), col, sz in zip(positions, colors, sizes):
    t.goto(x, y)
    t.dot(sz, col)
    t.write(f"  dot({sz})", font=("Arial", 8, "normal"))

t.goto(0, 150)
t.color("black")
t.write("Dots are centered at turtle position", align="center", font=("Arial", 10, "normal"))

turtle.done()