import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("reset() Demo")

t = turtle.Turtle()
t.speed(3)
t.pensize(5)
t.color("red")
t.shape("turtle")

# Draw a triangle
for _ in range(3):
    t.forward(100)
    t.right(120)

# Show state before reset
print(f"Before reset: pos={t.pos()}, heading={t.heading()}, pensize={t.pensize()}, color={t.pencolor()}")

import time
time.sleep(2)

# Full reset
t.reset()
print(f"After reset: pos={t.pos()}, heading={t.heading()}, pensize={t.pensize()}, color={t.pencolor()}")

# Draw a square from fresh state
for _ in range(4):
    t.forward(80)
    t.right(90)

turtle.done()