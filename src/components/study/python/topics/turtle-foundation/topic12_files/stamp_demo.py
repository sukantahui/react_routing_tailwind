import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("stamp() Demo")

t = turtle.Turtle()
t.shape("turtle")
t.color("green")
t.speed(5)

# Stamp at different positions and orientations
angles = [0, 45, 90, 135, 180, 225, 270, 315]
radius = 120

t.penup()
for angle in angles:
    t.goto(0, 0)
    t.setheading(angle)
    t.forward(radius)
    t.stamp()
    t.write(f"  heading {angle}°", font=("Arial", 8, "normal"))

# Store stamp ID to later remove one
t.goto(0, -150)
stamp_id = t.stamp()
t.write("  this stamp can be removed", font=("Arial", 8, "normal"))

# Wait a moment then remove that stamp (optional)
# t.clearstamp(stamp_id)

turtle.done()