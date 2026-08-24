import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.bgcolor("lightgray")
screen.title("Visibility Demo")

t = turtle.Turtle()
t.speed(3)

# Start visible
t.write("I am visible!", align="center")
t.forward(100)

# Hide turtle
t.hideturtle()  # or t.ht()
t.write("Now hidden but still drawing!", align="center")
t.forward(100)
t.color("red")
t.circle(30)

# Show again
t.showturtle()  # or t.st()
t.write("Back visible!", align="center")

# Check visibility
if t.isvisible():
    t.color("green")
    t.write("I am visible now", align="center")
else:
    t.write("I am hidden", align="center")

turtle.done()