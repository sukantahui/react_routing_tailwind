import turtle
import time

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Sequential Flow Demo")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Commands execute in this order, one after another
t.forward(100)          # 1: draw line right
t.left(90)              # 2: turn north
t.forward(80)           # 3: draw line up
t.color("red")          # 4: change color
t.right(45)             # 5: turn 45° right
t.forward(60)           # 6: draw diagonal line

# Add a small delay to observe step by step
time.sleep(0.5)

t.color("green")
t.backward(40)

turtle.done()