import turtle

screen = turtle.Screen()
screen.title("Turtle State Demo")

t = turtle.Turtle()
t.shape("turtle")
t.color("purple")

# Show initial state
print(f"Position: {t.pos()}")
print(f"Heading: {t.heading()}")
print(f"Is pen down? {t.isdown()}")
print(f"Visible? {t.isvisible()}")

t.forward(100)
t.left(90)
t.penup()
t.forward(50)

print(f"After changes - Position: {t.pos()}")
print(f"Heading: {t.heading()}")
print(f"Is pen down? {t.isdown()}")

turtle.done()