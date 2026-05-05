import turtle
import random

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Setheading to Random Targets")

t = turtle.Turtle()
t.shape("turtle")
t.speed(4)

# Generate random target points
targets = [(random.randint(-200, 200), random.randint(-150, 150)) for _ in range(5)]

t.penup()
t.goto(0, 0)
t.pendown()
t.color("blue")

for target in targets:
    # Draw a dot at target
    t.penup()
    t.goto(target)
    t.dot(8, "red")
    t.write(f" {target}", font=("Arial", 8, "normal"))
    
    # Move turtle to target using setheading
    t.penup()
    t.goto(0, 0)
    t.pendown()
    angle = t.towards(target)
    t.setheading(angle)
    t.forward(t.distance(target))

t.hideturtle()
turtle.done()