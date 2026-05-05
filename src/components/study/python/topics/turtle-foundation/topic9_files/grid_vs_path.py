import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.title("Grid (Absolute) vs Spiral (Relative)")

# Absolute: draw grid of dots
t_abs = turtle.Turtle()
t_abs.speed(5)
t_abs.hideturtle()
t_abs.penup()
t_abs.color("cyan")

start_x = -250
start_y = -150
spacing = 50

t_abs.goto(-200, 180)
t_abs.write("Absolute: Grid of dots", font=("Arial", 10, "bold"))

for row in range(7):
    y = start_y + row * spacing
    for col in range(7):
        x = start_x + col * spacing
        if -200 <= x <= 200 and -150 <= y <= 150:
            t_abs.goto(x, y)
            t_abs.dot(4)

# Relative: draw spiral
t_rel = turtle.Turtle()
t_rel.penup()
t_rel.goto(200, 150)
t_rel.pendown()
t_rel.color("orange")
t_rel.write("Relative: Spiral", font=("Arial", 10, "bold"))
t_rel.penup()
t_rel.goto(200, 100)
t_rel.pendown()

length = 10
for _ in range(40):
    t_rel.forward(length)
    t_rel.left(90)
    length += 5

turtle.done()