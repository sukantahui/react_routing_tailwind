"""
Module: 005_004_turtle-modular
Topic: Topic 3 - Building an extensible custom Shape & Icon Library
File: themeable_badge_system.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates designing an extensible themeable Badge & Pill component
system for UI notification alerts using the custom shape library.
"""

import turtle

def draw_pill_badge(t, x, y, text, status="success"):
    """
    Renders a modern rounded UI pill badge with status-aware color schemes:
    - 'success': emerald green
    - 'warning': amber gold
    - 'danger': rose red
    - 'info': sky blue
    """
    theme_colors = {
        "success": ("#064e3b", "#34d399", "✓"),
        "warning": ("#78350f", "#fbbf24", "⚠"),
        "danger":  ("#881337", "#fb7185", "✖"),
        "info":    ("#0c4a6e", "#38bdf8", "ℹ")
    }

    bg_col, text_col, icon_symbol = theme_colors.get(status, theme_colors["info"])

    width, height = 150, 36
    radius = height / 2

    # Draw rounded pill capsule
    t.penup(); t.goto(x + radius, y); t.setheading(0); t.pendown()
    t.color(text_col, bg_col)
    t.begin_fill()
    t.forward(width - 2 * radius)
    t.circle(radius, 180)
    t.forward(width - 2 * radius)
    t.circle(radius, 180)
    t.end_fill()

    # Draw text and icon inside badge
    t.penup(); t.goto(x + 18, y + 9); t.pendown()
    t.color(text_col)
    t.write(f"{icon_symbol}  {text.upper()}", font=("Arial", 9, "bold"))

def main():
    screen = turtle.Screen()
    screen.title("Themeable Status Badges - Coder & AccoTax")
    screen.bgcolor("#020617")
    screen.tracer(0)

    t = turtle.Turtle()
    t.hideturtle()
    t.pensize(2)

    # Render Badges
    draw_pill_badge(t, -260, 40, "Verified Pass", status="success")
    draw_pill_badge(t, -80, 40, "Disk Space Low", status="warning")
    draw_pill_badge(t, 100, 40, "Auth Failure", status="danger")
    draw_pill_badge(t, -80, -40, "Update Ready", status="info")

    screen.update()
    turtle.done()

if __name__ == "__main__":
    main()
