import turtle
import math

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Degrees vs Radians Demo")

t = turtle.Turtle()
t.speed(4)

# Draw a square using degrees (default)
t.penup()
t.goto(-200, 100)
t.pendown()
t.color("blue")
t.write("Degrees mode", font=("Arial", 10, "normal"))
for _ in range(4):
    t.forward(80)
    t.left(90)          # 90 degrees

# Switch to radians
turtle.radians()
t.penup()
t.goto(50, 100)
t.pendown()
t.color("red")
t.write("Radians mode", font=("Arial", 10, "normal"))
for _ in range(4):
    t.forward(80)
    t.left(math.pi / 2)   # 90 degrees in radians

# Switch back to degrees
turtle.degrees()

# Draw a circle using radians increment
t.penup()
t.goto(-200, -100)
t.pendown()
t.color("green")
t.write("Radians circle", font=("Arial", 10, "normal"))
turtle.radians()
for _ in range(360):
    t.forward(1)
    t.left(math.pi / 180)   # 1 degree step

turtle.degrees()
turtle.done()