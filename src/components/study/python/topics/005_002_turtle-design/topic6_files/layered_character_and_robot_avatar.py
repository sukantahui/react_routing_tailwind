"""
Module: 005_002_turtle-design
Topic: Topic 6 - Combining geometric fills to compose complex graphics
File: layered_character_and_robot_avatar.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates combining basic geometric primitives (circles, rounded boxes,
triangles) to construct a retro vector robot avatar character.
"""

import turtle

def draw_robot_avatar():
    screen = turtle.Screen()
    screen.title("Vector Robot Avatar - Coder & AccoTax")
    screen.bgcolor("#0f172a")
    screen.setup(width=700, height=600)
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(3)

    # 1. Antenna Pole & Glowing Signal Orb
    t.penup(); t.goto(0, 110); t.pendown()
    t.color("#94a3b8")
    t.goto(0, 160)
    t.dot(18, "#f43f5e")  # Red indicator light

    # 2. Robot Head Box (Slate Blue)
    t.penup(); t.goto(-70, 0); t.pendown()
    t.color("#38bdf8", "#0284c7")
    t.begin_fill()
    for _ in range(2):
        t.forward(140)
        t.left(90)
        t.forward(110)
        t.left(90)
    t.end_fill()

    # 3. Visor / Eye Display (Dark Charcoal)
    t.penup(); t.goto(-50, 45); t.pendown()
    t.color("#020617", "#0f172a")
    t.begin_fill()
    for _ in range(2):
        t.forward(100)
        t.left(90)
        t.forward(45)
        t.left(90)
    t.end_fill()

    # 4. Glowing Cyan Eyes
    t.penup(); t.goto(-25, 67); t.pendown()
    t.dot(14, "#38bdf8")
    t.penup(); t.goto(25, 67); t.pendown()
    t.dot(14, "#38bdf8")

    # 5. Speaker Grille Mouth
    t.penup(); t.goto(-35, 20); t.pendown()
    t.color("#38bdf8")
    for _ in range(4):
        t.forward(12)
        t.penup(); t.forward(6); t.pendown()

    screen.update()
    turtle.done()

if __name__ == "__main__":
    draw_robot_avatar()
