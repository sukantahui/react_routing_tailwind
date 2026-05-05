import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("goto(x, y) Demo")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Draw a triangle using goto points
points = [(0, 100), (-80, -50), (80, -50), (0, 100)]

t.penup()
t.goto(points[0])
t.pendown()

for x, y in points[1:]:
    t.goto(x, y)

# Mark each vertex
t.penup()
for x, y in points:
    t.goto(x, y)
    t.dot(8, "red")

t.goto(0, 0)
t.write("Origin", align="center")

turtle.done()