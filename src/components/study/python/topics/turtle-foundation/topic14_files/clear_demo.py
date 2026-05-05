import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("clear() Demo")

t = turtle.Turtle()
t.speed(3)

# Draw a square
for _ in range(4):
    t.forward(100)
    t.right(90)

# Remember position and heading before clear
print(f"Before clear: pos={t.pos()}, heading={t.heading()}, color={t.pencolor()}")

# Wait 2 seconds (simulate delay)
import time
time.sleep(2)

# Clear only the drawings
t.clear()
print(f"After clear: pos={t.pos()}, heading={t.heading()}, color={t.pencolor()}")

# Continue drawing from same state – will draw a line from current position
t.forward(50)

turtle.done()