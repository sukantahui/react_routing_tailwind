import turtle

# Create screen and turtle
screen = turtle.Screen()
screen.title("Coordinate Demo")
screen.setup(600, 400)
screen.bgcolor("lightblue")

t = turtle.Turtle()
t.speed(3)

# Move to specific coordinates and stamp
points = [(100, 100), (-100, 100), (-100, -100), (100, -100), (0, 0)]
colors = ["red", "green", "blue", "orange", "purple"]

for (x, y), col in zip(points, colors):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(col)
    t.dot(20)
    t.write(f"({x},{y})", align="center")

t.hideturtle()
turtle.done()