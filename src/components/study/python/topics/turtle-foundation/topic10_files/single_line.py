import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Single Straight Line")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Draw a single horizontal line using forward
t.forward(200)

# Mark start and end
t.penup()
t.goto(0, 0)
t.dot(8, "green")
t.write("Start", font=("Arial", 10, "normal"))

t.goto(200, 0)
t.dot(8, "red")
t.write("End", font=("Arial", 10, "normal"))

turtle.done()