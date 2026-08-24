import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.title("Shape Functions")

t = turtle.Turtle()
t.speed(5)

def square(x, y, size, color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size)
        t.right(90)
    t.end_fill()

def rectangle(x, y, length, width, color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(color)
    t.begin_fill()
    for _ in range(2):
        t.forward(length)
        t.right(90)
        t.forward(width)
        t.right(90)
    t.end_fill()

def triangle(x, y, side, color):
    t.penup()
    t.goto(x, y)
    t.pendown()
    t.color(color)
    t.begin_fill()
    for _ in range(3):
        t.forward(side)
        t.right(120)
    t.end_fill()

# Draw a simple house
square(-100, -50, 100, "lightblue")
rectangle(-100, -50, 100, 100, "lightblue")   # body
triangle(-100, 50, 100, "red")                # roof

t.hideturtle()
turtle.done()