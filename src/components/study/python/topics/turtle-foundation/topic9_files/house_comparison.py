import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.title("Draw a House: Relative vs Absolute")

# Relative method
t_rel = turtle.Turtle()
t_rel.penup()
t_rel.goto(-250, -100)
t_rel.pendown()
t_rel.color("green")
t_rel.write("Relative House", font=("Arial", 10, "bold"))

# Wall (square)
for _ in range(4):
    t_rel.forward(120)
    t_rel.left(90)

# Roof (triangle)
t_rel.left(45)
t_rel.forward(85)
t_rel.left(90)
t_rel.forward(85)
t_rel.left(45)

# Door
t_rel.penup()
t_rel.goto(-250 + 45, -100)
t_rel.pendown()
t_rel.forward(30)
t_rel.left(90)
t_rel.forward(50)
t_rel.left(90)
t_rel.forward(30)

# Absolute method
t_abs = turtle.Turtle()
t_abs.penup()
t_abs.goto(50, -100)
t_abs.pendown()
t_abs.color("blue")
t_abs.write("Absolute House", font=("Arial", 10, "bold"))

# Wall corners
wall_pts = [(50, -100), (170, -100), (170, 20), (50, 20), (50, -100)]
for x, y in wall_pts:
    t_abs.goto(x, y)

# Roof
t_abs.goto(110, 70)
t_abs.goto(170, 20)

# Door
t_abs.penup()
t_abs.goto(95, -100)
t_abs.pendown()
door_pts = [(95, -100), (125, -100), (125, -50), (95, -50), (95, -100)]
for x, y in door_pts:
    t_abs.goto(x, y)

turtle.done()