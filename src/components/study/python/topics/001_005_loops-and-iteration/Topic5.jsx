import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Topic 5: Simple Menu-Driven Programs in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>menu-driven program</strong> allows the user to choose
            different operations from a list of options.
            Such programs use <code>loops</code> and <code>conditional statements</code>
            together and are very important for <strong>practical exams</strong>.
          </p>
        </div>

        {/* ================= CONCEPT ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. What is a Menu-Driven Program?
          </h3>

          <p className="text-slate-300 text-sm">
            A menu-driven program repeatedly displays a menu and performs
            actions based on the user’s choice until the user decides to exit.
          </p>

          <p className="text-slate-400 text-sm font-mono">General Structure:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`while True:
    show menu
    take user choice
    perform action
    exit when needed`}
          </pre>

          {/* SVG Flow */}
          <svg width="420" height="160">
            <rect x="20" y="20" width="140" height="35" fill="#1e293b" />
            <text x="45" y="42" fill="#38bdf8">Display Menu</text>

            <rect x="20" y="70" width="160" height="35" fill="#0f766e" />
            <text x="45" y="92" fill="#ffffff">User Choice</text>

            <rect x="220" y="70" width="160" height="35" fill="#7c3aed" />
            <text x="250" y="92" fill="#ffffff">Perform Action</text>

            <line x1="100" y1="55" x2="100" y2="70" stroke="#94a3b8" />
            <line x1="180" y1="88" x2="220" y2="88" stroke="#94a3b8" />
          </svg>

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Menu-driven programs almost always use an <code>infinite loop</code>
            with <code>break</code> to exit.
          </div>
        </section>

        {/* ================= BASIC MENU ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. Simple Menu (Display Only)
          </h3>

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("1. Say Hello")
    print("2. Say Bye")
    print("3. Exit")

    choice = int(input("Enter choice: "))

    if choice == 1:
        print("Hello!")
    elif choice == 2:
        print("Bye!")
    elif choice == 3:
        break
    else:
        print("Invalid choice")`}
          />

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("1. Print Name")
    print("2. Exit")

    ch = input("Enter choice: ")

    if ch == "1":
        print("My name is Python")
    elif ch == "2":
        break
    else:
        print("Wrong option")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Always validate user input to avoid runtime errors.
          </div>
        </section>

        {/* ================= ARITHMETIC MENU ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            3. Menu-Driven Arithmetic Program
          </h3>

          <p className="text-slate-300 text-sm">
            This example performs arithmetic operations using menu choices.
          </p>

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Exit")

    choice = int(input("Enter choice: "))

    if choice == 4:
        break

    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))

    if choice == 1:
        print("Sum =", a + b)
    elif choice == 2:
        print("Difference =", a - b)
    elif choice == 3:
        print("Product =", a * b)
    else:
        print("Invalid choice")`}
          />

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("1. Square")
    print("2. Cube")
    print("3. Exit")

    ch = int(input("Enter choice: "))

    if ch == 3:
        break

    n = int(input("Enter number: "))

    if ch == 1:
        print("Square =", n * n)
    elif ch == 2:
        print("Cube =", n ** 3)
    else:
        print("Wrong choice")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            This type of program is very common in <strong>Class X practical exams</strong>.
          </div>
        </section>

        {/* ================= EXIT LOGIC ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            4. Exit Logic using break
          </h3>

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("Press 0 to exit")
    n = int(input("Enter number: "))

    if n == 0:
        print("Exiting program")
        break

    print("You entered:", n)`}
          />

          <EditablePythonCodeBlock
            initialCode={`while True:
    ch = input("Continue? (y/n): ")
    if ch == "n":
        break
    print("Loop running")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            The <code>break</code> statement provides a clean exit from infinite loops.
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            5. Common Mistakes in Menu Programs
          </h3>

          <EditablePythonCodeBlock
            initialCode={`# Missing break → infinite loop
while True:
    print("1. Exit")
    ch = int(input("Enter choice: "))
    if ch == 1:
        print("Exiting")`}
          />

          <EditablePythonCodeBlock
            initialCode={`# No input validation
choice = int(input("Enter choice: "))
print("You chose", choice)`}
          />

          <div className="bg-red-900/30 border-l-4 border-red-400 p-3 text-sm text-red-200">
            <strong>⚠ Teacher Warning:</strong>  
            Forgetting <code>break</code> and improper input handling are the most
            common errors in menu-driven programs.
          </div>
        </section>

      </div>
    );
  }
}
