import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("home() Demo")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Draw a path away from origin
t.forward(100)
t.left(90)
t.forward(50)
t.left(90)
t.forward(80)

print(f"Before home: pos={t.pos()}, heading={t.heading()}")

import time
time.sleep(2)

# Return to origin, facing east (drawings remain)
t.home()
print(f"After home: pos={t.pos()}, heading={t.heading()}")

# Draw a dot at origin to mark home
t.dot(10, "red")
t.write("Home", font=("Arial", 10, "normal"))

turtle.done()