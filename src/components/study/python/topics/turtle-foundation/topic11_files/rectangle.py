import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Draw a Rectangle")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)
t.color("orange")

length = 150
width = 80

# Draw rectangle: two pairs of equal sides
for _ in range(2):
    t.forward(length)
    t.right(90)
    t.forward(width)
    t.right(90)

t.penup()
t.goto(-length//2, -width//2)
t.pendown()
t.begin_fill()
for _ in range(2):
    t.forward(length)
    t.right(90)
    t.forward(width)
    t.right(90)
t.end_fill()

turtle.done()