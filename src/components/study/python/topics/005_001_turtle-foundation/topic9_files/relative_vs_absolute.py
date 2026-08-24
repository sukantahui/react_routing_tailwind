import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Relative vs Absolute - Same Path")

# Create two turtles for side‑by‑side comparison
t_rel = turtle.Turtle()
t_rel.color("blue")
t_rel.shape("turtle")
t_rel.penup()
t_rel.goto(-200, 100)
t_rel.pendown()
t_rel.write("Relative", font=("Arial", 12, "bold"))

t_abs = turtle.Turtle()
t_abs.color("red")
t_abs.shape("turtle")
t_abs.penup()
t_abs.goto(50, 100)
t_abs.pendown()
t_abs.write("Absolute", font=("Arial", 12, "bold"))

# Draw same "L" shape using relative commands (left turtle)
t_rel.forward(80)
t_rel.left(90)
t_rel.forward(60)
t_rel.right(90)
t_rel.forward(40)

# Draw same "L" shape using absolute coordinates (right turtle)
t_abs.goto(130, 100)   # after forward 80
t_abs.goto(130, 40)    # after left 90 forward 60
t_abs.goto(170, 40)    # after right 90 forward 40

turtle.done()