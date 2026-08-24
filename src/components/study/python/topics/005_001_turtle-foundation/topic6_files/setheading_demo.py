import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Setheading Demo")

t = turtle.Turtle()
t.shape("turtle")
t.speed(3)

# Set absolute heading to north (90°)
t.setheading(90)
t.forward(100)
t.write("North (90°)", font=("Arial", 10, "normal"))

# Set absolute heading to west (180°)
t.setheading(180)
t.forward(100)
t.write("West (180°)", font=("Arial", 10, "normal"))

# Set heading to south (270°)
t.setheading(270)
t.forward(100)
t.write("South (270°)", font=("Arial", 10, "normal"))

# Set heading back to east (0° or 360)
t.setheading(0)
t.forward(100)
t.write("East (0°)", font=("Arial", 10, "normal"))

turtle.done()