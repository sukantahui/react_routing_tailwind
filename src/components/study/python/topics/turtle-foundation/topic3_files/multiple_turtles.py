import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.bgcolor("lightgray")

# Create three turtles with different colors
t1 = turtle.Turtle()
t1.color("red")
t1.shape("turtle")
t1.penup()
t1.goto(-150, 50)

t2 = turtle.Turtle()
t2.color("blue")
t2.shape("arrow")
t2.penup()
t2.goto(-150, 0)

t3 = turtle.Turtle()
t3.color("green")
t3.shape("circle")
t3.penup()
t3.goto(-150, -50)

# Move each turtle differently
for _ in range(30):
    t1.forward(10)
    t2.forward(8)
    t3.forward(12)
    t1.right(5)
    t2.left(3)
    t3.right(7)

turtle.done()