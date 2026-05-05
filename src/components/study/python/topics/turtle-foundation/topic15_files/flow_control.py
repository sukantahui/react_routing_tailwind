import turtle
import time

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Flow Control with Loops and Conditionals")

t = turtle.Turtle()
t.speed(5)

# Using loop to repeat a pattern (square)
for side in range(4):
    t.forward(80)
    t.right(90)

# Using conditional to decide next action
if t.xcor() > 0:
    t.color("blue")
else:
    t.color("red")

t.penup()
t.goto(0, -100)
t.pendown()
t.write("Conditional flow: color changed based on position", align="center", font=("Arial", 10, "normal"))

# Using function to modularize flow
def draw_star():
    for _ in range(5):
        t.forward(50)
        t.right(144)

t.penup()
t.goto(-100, -150)
t.pendown()
draw_star()
t.penup()
t.goto(100, -150)
t.pendown()
draw_star()

turtle.done()