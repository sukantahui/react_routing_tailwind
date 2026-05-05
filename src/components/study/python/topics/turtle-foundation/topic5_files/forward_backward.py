import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Forward and Backward Demo")

t = turtle.Turtle()
t.shape("turtle")
t.speed(3)

# Move forward 100 units
t.forward(100)
t.write("forward(100)", font=("Arial", 10, "normal"))

# Move backward 50 units
t.backward(50)
t.write("backward(50)", font=("Arial", 10, "normal"))

# Forward again
t.forward(80)
t.write("forward(80)", font=("Arial", 10, "normal"))

# Heading remains unchanged throughout
print(f"Heading after moves: {t.heading()}°")

turtle.done()