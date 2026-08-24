import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Square Using Absolute Headings")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Draw square by setting absolute heading for each side
sides = [0, 90, 180, 270]   # East, North, West, South

for heading in sides:
    t.setheading(heading)
    t.forward(100)

# Mark start and end
t.penup()
t.goto(0, 0)
t.dot(10, "red")
t.write("Start (0° facing East)", font=("Arial", 10, "normal"))

turtle.done()