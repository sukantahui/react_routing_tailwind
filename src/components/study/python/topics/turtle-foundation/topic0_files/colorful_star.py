import turtle

t = turtle.Turtle()
t.speed(5)
t.pensize(2)

# Draw a colorful star pattern
colors = ["red", "blue", "green", "orange", "purple"]
for i in range(36):
    t.color(colors[i % 5])
    t.forward(100)
    t.right(170)

turtle.done()