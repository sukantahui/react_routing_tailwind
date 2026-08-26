"""
Module: 005_002_turtle-design
Topic: Topic 4 - Background canvas design and window customization
File: canvas_setup_and_window_customization.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates complete canvas window configuration:
- screen.setup(width, height, startx, starty)
- screen.title(title_string)
- screen.bgcolor(color)
- screen.screensize(canvwidth, canvheight)
"""

import turtle

def customize_canvas_window():
    # 1. Obtain the Screen singleton
    screen = turtle.Screen()

    # 2. Window title and dimensions (800x600 centered on screen)
    screen.title("Deep Space Canvas Studio - Coder & AccoTax Barrackpore")
    screen.setup(width=800, height=600, startx=100, starty=100)

    # 3. Canvas background color
    screen.bgcolor("#020617")  # Slate 950 deep cosmic blue

    # 4. Logical scrollable world coordinate canvas
    screen.screensize(canvwidth=1200, canvheight=900, bg="#020617")

    # 5. Draw decorative golden frame along screen margins
    t = turtle.Turtle()
    t.speed(0)
    t.hideturtle()
    t.color("#fbbf24")
    t.pensize(2)

    t.penup(); t.goto(-380, 280); t.pendown()
    for _ in range(2):
        t.forward(760)
        t.right(90)
        t.forward(560)
        t.right(90)

    # Title header text
    t.penup(); t.goto(0, 240)
    t.write("PROFESSIONAL CANVAS STYLING", align="center", font=("Arial", 14, "bold"))

    turtle.done()

if __name__ == "__main__":
    customize_canvas_window()
