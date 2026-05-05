import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Pen Control: penup() and pendown()")

t = turtle.Turtle()
t.speed(3)
t.pensize(2)

# Draw a line with pen down (default)
t.forward(100)          # draws line
t.write("pendown", font=("Arial", 8, "normal"))

# Lift pen and move without drawing
t.penup()
t.forward(100)          # no line
t.write("penup", font=("Arial", 8, "normal"))

# Lower pen and draw again
t.pendown()
t.forward(100)          # draws line
t.write("pendown again", font=("Arial", 8, "normal"))

# Check pen state
print(f"Pen down? {t.isdown()}")   # True

turtle.done()