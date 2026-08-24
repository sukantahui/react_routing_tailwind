import turtle

screen = turtle.Screen()
screen.setup(600, 400)
screen.title("Distance Control Demo")

t = turtle.Turtle()
t.speed(3)

# Target point (200, 100)
target_x, target_y = 200, 100

# Draw a dot at target
t.penup()
t.goto(target_x, target_y)
t.dot(10, "red")
t.write("Target", align="center")
t.goto(0, 0)
t.pendown()

# Move toward target using distance check
t.setheading(t.towards(target_x, target_y))
distance_to_target = t.distance(target_x, target_y)
print(f"Initial distance to target: {distance_to_target}")

# Move forward by that distance
t.forward(distance_to_target)

# Check final distance
final_distance = t.distance(target_x, target_y)
print(f"Final distance: {final_distance}")

if final_distance < 1:
    t.write("Reached target!", align="center", font=("Arial", 12, "normal"))

turtle.done()