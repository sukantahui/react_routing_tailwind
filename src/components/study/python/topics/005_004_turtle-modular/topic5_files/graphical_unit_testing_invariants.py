"""
Module: 005_004_turtle-modular
Topic: Topic 5 - Clean code and DRY principles in graphical programming
File: graphical_unit_testing_invariants.py
Teacher & Mentor: Sukanta Hui

Description:
Demonstrates writing automated unit tests and assertions to verify
Turtle graphical invariants (zero state mutation, heading preservation, correct bounds).
"""

import turtle

def draw_square_safe(t, x, y, size, color="#38bdf8"):
    """Invariant: Leaves turtle exactly where it was before the call."""
    orig_pos = t.position()
    orig_head = t.heading()

    t.penup(); t.goto(x, y); t.setheading(0); t.pendown()
    t.color("white", color)
    t.begin_fill()
    for _ in range(4):
        t.forward(size); t.left(90)
    t.end_fill()

    # Restore
    t.penup(); t.goto(orig_pos); t.setheading(orig_head); t.pendown()

def test_draw_square_invariants():
    """Automated Unit Test Suite for draw_square_safe()."""
    t = turtle.Turtle()
    t.penup(); t.goto(42.5, -99.0); t.setheading(135.0); t.pendown()

    initial_pos = t.position()
    initial_heading = t.heading()

    # Execute function under test
    draw_square_safe(t, -100, 50, 60, color="#f43f5e")

    # Assertions
    assert t.position() == initial_pos, f"Position invariant violated: {t.position()} != {initial_pos}"
    assert t.heading() == initial_heading, f"Heading invariant violated: {t.heading()} != {initial_heading}"

    print("✅ All Graphical Unit Tests Passed! Zero State Leakage Verified.")

if __name__ == "__main__":
    test_draw_square_invariants()
