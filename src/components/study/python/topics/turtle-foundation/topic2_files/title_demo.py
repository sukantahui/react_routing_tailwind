import turtle

# Screen configuration with custom title
screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Welcome to Barrackpore Turtle Studio!")
screen.bgcolor("palegreen")

t = turtle.Turtle()
t.write("Drawing here...", align="center", font=("Arial", 16, "normal"))

turtle.done()