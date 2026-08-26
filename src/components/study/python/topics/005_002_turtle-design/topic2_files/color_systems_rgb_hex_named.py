"""
Module: 005_002_turtle-design
Topic: Topic 2 - Color systems (RGB 0-255 vs 0-1, hex codes, named colors)
File: color_systems_rgb_hex_named.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates all 4 primary color specification modes in Python Turtle:
1. Named string colors ('coral', 'midnight blue', 'gold')
2. Hexadecimal string codes ('#38bdf8', '#34d399')
3. Normalized RGB float tuples (0.0 to 1.0) with colormode(1.0)
4. Integer RGB tuples (0 to 255) with colormode(255)
"""

import turtle

def demonstrate_color_systems():
    screen = turtle.Screen()
    screen.title("Color Systems in Python Turtle - Coder & AccoTax")
    screen.bgcolor("#020617")  # Hex background
    screen.setup(width=750, height=600)

    t = turtle.Turtle()
    t.speed(5)
    t.pensize(5)

    # 1. Named String Colors (Tkinter Standard Names)
    t.penup()
    t.goto(-300, 150)
    t.pendown()
    t.color("coral")
    t.forward(120)
    t.penup(); t.forward(15)
    t.write("1. Named: 'coral'", font=("Arial", 10, "bold"))

    # 2. Hexadecimal Color Codes
    t.penup()
    t.goto(-300, 70)
    t.pendown()
    t.color("#38bdf8")  # Sky Blue Hex
    t.forward(120)
    t.penup(); t.forward(15)
    t.write("2. Hex: '#38bdf8'", font=("Arial", 10, "bold"))

    # 3. Normalized RGB Float Mode (0.0 to 1.0) - Default Mode
    screen.colormode(1.0)
    t.penup()
    t.goto(-300, -10)
    t.pendown()
    t.color((0.2, 0.8, 0.6))  # Teal RGB float
    t.forward(120)
    t.penup(); t.forward(15)
    t.write("3. Float RGB: (0.2, 0.8, 0.6)", font=("Arial", 10, "bold"))

    # 4. Standard 8-bit Integer RGB Mode (0 to 255)
    screen.colormode(255)
    t.penup()
    t.goto(-300, -90)
    t.pendown()
    t.color((251, 191, 36))  # Amber RGB (251, 191, 36)
    t.forward(120)
    t.penup(); t.forward(15)
    t.write("4. Int RGB: (251, 191, 36) [colormode(255)]", font=("Arial", 10, "bold"))

    t.hideturtle()
    turtle.done()

if __name__ == "__main__":
    demonstrate_color_systems()
