import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.bgcolor("darkgray")

t = turtle.Turtle()
t.speed(4)
t.pensize(2)

# Draw a star shape using absolute goto
points = [(0, 100), (30, 30), (100, 30), (50, -20), (70, -90), (0, -40), (-70, -90), (-50, -20), (-100, 30), (-30, 30)]

t.penup()
t.goto(points[0])
t.pendown()
for x, y in points[1:]:
    t.goto(x, y)
t.goto(points[0])  # close

# Mark origin
t.penup()
t.goto(0, 0)
t.dot(10, "red")
t.write("Origin (0,0)", align="right")

t.hideturtle()
turtle.done()