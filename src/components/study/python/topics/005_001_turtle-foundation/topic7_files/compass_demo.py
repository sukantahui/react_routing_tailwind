import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Compass Heading Demo")

t = turtle.Turtle()
t.shape("turtle")
t.speed(3)

# List of (heading_angle, direction_name, color)
directions = [
    (0, "East (0°)", "red"),
    (90, "North (90°)", "blue"),
    (180, "West (180°)", "green"),
    (270, "South (270°)", "orange"),
    (45, "Northeast (45°)", "purple"),
    (135, "Northwest (135°)", "cyan"),
    (225, "Southwest (225°)", "magenta"),
    (315, "Southeast (315°)", "yellow"),
]

t.penup()
t.goto(0, 50)
t.write("Heading directions:", font=("Arial", 12, "bold"))

for angle, name, color in directions:
    t.setheading(angle)
    t.penup()
    t.goto(0, 0)
    t.pendown()
    t.color(color)
    t.forward(120)
    t.write(name, font=("Arial", 10, "normal"))

t.hideturtle()
turtle.done()