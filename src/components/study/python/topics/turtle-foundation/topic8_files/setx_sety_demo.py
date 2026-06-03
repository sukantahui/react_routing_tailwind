import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("setx() and sety() Demo")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

t.color("blue")
t.penup()
t.goto(-200, 0)
t.pendown()

# Move horizontally using setx
for x in range(-200, 201, 50):
    t.setx(x)
    t.dot(5)

t.penup()
t.goto(0, -150)
t.pendown()
t.color("red")

# Move vertically using sety
for y in range(-150, 151, 50):
    t.sety(y)
    t.dot(5)

t.penup()
t.goto(0, 0)
t.write("Origin", align="center")
t.color("black")
t.write("Horizontal moves (setx) and vertical moves (sety)", align="center", font=("Arial", 10, "normal"))

turtle.done()