import turtle

screen = turtle.Screen()
screen.setup(700, 500)
screen.title("dot() vs stamp() Comparison")

t = turtle.Turtle()
t.speed(3)

# Use dot() for data points
t.penup()
t.goto(-200, 150)
t.color("black")
t.write("Data points using dot()", font=("Arial", 10, "bold"))

data = [(-180, 100), (-150, 80), (-120, 120), (-90, 60), (-60, 90)]
for x, y in data:
    t.goto(x, y)
    t.dot(10, "red")

# Use stamp() for icons
t.goto(50, 150)
t.write("Icon stamps", font=("Arial", 10, "bold"))

# Change shape for variety
shapes = ["turtle", "circle", "square", "triangle", "arrow"]
t.penup()
for i, shape in enumerate(shapes):
    t.shape(shape)
    t.color(["blue", "orange", "purple", "green", "cyan"][i])
    t.goto(50 + i*60, 50)
    t.stamp()

t.goto(0, -100)
t.write("Left: dots (circles)   Right: stamps (turtle shapes)", align="center", font=("Arial", 10, "normal"))

turtle.done()