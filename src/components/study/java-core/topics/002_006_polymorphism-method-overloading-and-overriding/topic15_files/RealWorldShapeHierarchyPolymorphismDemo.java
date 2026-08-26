/**
 * Java Core Tutorial - Module 002_006: Polymorphism, Method Overriding & Dynamic Method Dispatch
 * Topic 15: Real-World Polymorphism: Shape Hierarchy (Circle, Rectangle, Triangle)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.polymorphism;

public class RealWorldShapeHierarchyPolymorphismDemo {

    public abstract static class Shape {
        protected String shapeName;
        public Shape(String name) { this.shapeName = name; }
        public abstract double calculateArea(); // Abstract contract for polymorphic dispatch
    }

    public static class Circle extends Shape {
        private double radius;
        public Circle(double radius) {
            super("Circle");
            this.radius = radius;
        }
        @Override
        public double calculateArea() {
            return Math.PI * radius * radius;
        }
    }

    public static class Rectangle extends Shape {
        private double width, height;
        public Rectangle(double width, double height) {
            super("Rectangle");
            this.width = width;
            this.height = height;
        }
        @Override
        public double calculateArea() {
            return width * height;
        }
    }

    public static class Triangle extends Shape {
        private double base, height;
        public Triangle(double base, double height) {
            super("Triangle");
            this.base = base;
            this.height = height;
        }
        @Override
        public double calculateArea() {
            return 0.5 * base * height;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: SHAPE HIERARCHY POLYMORPHISM CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Shape[] blueprints = {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        };

        double totalArea = 0.0;
        System.out.println(">>> Calculating blueprint areas polymorphically:");
        for (Shape s : blueprints) {
            double area = s.calculateArea(); // Dynamic Dispatch!
            System.out.printf("  -> %-12s Area: %8.2f sq. units\n", s.shapeName, area);
            totalArea += area;
        }

        System.out.printf("\n>>> Total Combined Layout Area: %.2f sq. units\n", totalArea);

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_006 POLYMORPHISM & METHOD OVERRIDING 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}