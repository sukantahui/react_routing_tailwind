/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 6: The Classic Rectangle vs Square LSP Violation & Proper Architectural Remedy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class RectangleSquareLspViolationDemo {

    // 1. Base Class
    public static class Rectangle {
        protected int width;
        protected int height;

        public void setWidth(int w) { this.width = w; }
        public void setHeight(int h) { this.height = h; }
        public int getWidth() { return width; }
        public int getHeight() { return height; }
        public int getArea() { return width * height; }
    }

    // 2. Subclass attempting to model 'Square IS-A Rectangle'
    public static class Square extends Rectangle {
        @Override
        public void setWidth(int w) {
            this.width = w;
            this.height = w; // Enforcing square property mutates height unexpectedly!
        }

        @Override
        public void setHeight(int h) {
            this.width = h;
            this.height = h; // Enforcing square property mutates width unexpectedly!
        }
    }

    // CLIENT FUNCTION EXPECTING RECTANGLE INVARIANTS:
    public static void verifyRectangleArea(Rectangle r) {
        r.setWidth(10);
        r.setHeight(5);
        // Client expects Area == 10 * 5 = 50:
        System.out.printf("  Expected Area: 50 | Actual Area: %d | (Passed: %b)\n",
                r.getArea(), (r.getArea() == 50));
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: RECTANGLE VS SQUARE LSP VIOLATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Testing with genuine Rectangle:");
        verifyRectangleArea(new Rectangle()); // Works perfectly: Area = 50

        System.out.println("\n>>> 2. Testing with Square substituted for Rectangle (LSP FAILURE):");
        verifyRectangleArea(new Square()); // Fails! Area = 5 * 5 = 25!

        System.out.println("\n>>> ARCHITECTURAL LESSON:");
        System.out.println("  - In mathematics, a Square is a Rectangle.");
        System.out.println("  - In Software Engineering, a mutable Square is NOT substitutable for a mutable Rectangle!");
        System.out.println("  - SOLUTION: Make both inherit from an abstract 'Shape' interface (with getArea()) instead.");

        System.out.println("\n==========================================================================");
    }
}