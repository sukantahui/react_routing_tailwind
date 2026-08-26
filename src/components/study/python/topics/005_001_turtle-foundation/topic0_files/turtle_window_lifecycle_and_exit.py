"""
# Module: 005_001_turtle-foundation
# Topic 0: Introduction to Turtle Graphics: history, educational purpose, and real-world relevance
# File: turtle_window_lifecycle_and_exit.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Clean window lifecycle management, event loop termination,
#              and exception-safe canvas cleanup.
"""

import turtle

def execute_safe_turtle_lifecycle(auto_cleanup: bool = True) -> bool:
    """Demonstrates clean Tkinter Turtle window setup and safe destruction."""
    print("   [...] Testing Safe Turtle Screen Lifecycle...")

    try:
        screen = turtle.Screen()
        screen.title("Coder & Accotax • Lifecycle Test")
        screen.setup(400, 300)

        t = turtle.Turtle()
        t.speed(0)
        t.forward(50)

        assert t.xcor() == 50.0

        if auto_cleanup:
            turtle.bye()
            print("   [PASS] 1. Turtle canvas closed cleanly with turtle.bye()")
        return True
    except Exception as e:
        print(f"   [ERROR] Canvas lifecycle error: {e}")
        return False

def main():
    print("=" * 75)
    print("[WINDOW LIFECYCLE] Safe Canvas Initialization & Event Loop Teardown")
    print("=" * 75)

    success = execute_safe_turtle_lifecycle(auto_cleanup=True)
    assert success is True

    print("=" * 75)
    print("[TAKEAWAY] Always use turtle.done() or screen.exitonclick() in production")
    print("           scripts, and turtle.bye() in automated test harnesses.")
    print("=" * 75)

if __name__ == "__main__":
    main()
