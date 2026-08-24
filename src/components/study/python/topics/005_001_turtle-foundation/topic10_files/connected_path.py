import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Connected Path (Polyline)")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)
t.color("blue")

# Draw an L‑shaped connected path
t.forward(120)   # horizontal segment
t.left(90)       # turn down
t.forward(80)    # vertical segment

# Mark points
t.penup()
t.goto(0, 0)
t.dot(8, "green")
t.write("Start", font=("Arial", 10, "normal"))

t.goto(120, 0)
t.dot(8, "orange")
t.write("Corner", font=("Arial", 10, "normal"))

t.goto(120, -80)
t.dot(8, "red")
t.write("End", font=("Arial", 10, "normal"))

t.goto(60, -40)
t.color("gray")
t.write("Connected path: pen always down", align="center", font=("Arial", 10, "normal"))

turtle.done()