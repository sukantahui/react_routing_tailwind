// ShapeAreaCalculator.java
// Geometric shape system for CAD/GIS applications

import java.util.ArrayList;

// Abstract shape class
abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract methods - must be implemented by all shapes
    public abstract double area();
    public abstract double perimeter();
    
    // Concrete method - common for all shapes
    public void displayInfo() {
        System.out.println("Shape: " + this.getClass().getSimpleName());
        System.out.println("Color: " + color);
        System.out.println("Area: " + String.format("%.2f", area()));
        System.out.println("Perimeter: " + String.format("%.2f", perimeter()));
    }
    
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}

// Circle implementation
class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
    
    public double getRadius() { return radius; }
    public void setRadius(double radius) { this.radius = radius; }
}

// Rectangle implementation
class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
    
    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

// Triangle implementation
class Triangle extends Shape {
    private double sideA, sideB, sideC;
    
    public Triangle(String color, double sideA, double sideB, double sideC) {
        super(color);
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }
    
    @Override
    public double area() {
        // Heron's formula
        double s = (sideA + sideB + sideC) / 2;
        return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    }
    
    @Override
    public double perimeter() {
        return sideA + sideB + sideC;
    }
}

// Square (special rectangle)
class Square extends Rectangle {
    public Square(String color, double side) {
        super(color, side, side);
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Shape: Square");
        System.out.println("Color: " + getColor());
        System.out.println("Area: " + String.format("%.2f", area()));
        System.out.println("Perimeter: " + String.format("%.2f", perimeter()));
    }
}

public class ShapeAreaCalculator {
    public static void main(String[] args) {
        System.out.println("=== SHAPE CALCULATOR DEMO ===\n");
        
        // Collection of shapes
        ArrayList<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle("Red", 5.0));
        shapes.add(new Rectangle("Blue", 4.0, 6.0));
        shapes.add(new Triangle("Green", 3.0, 4.0, 5.0));
        shapes.add(new Square("Yellow", 4.0));
        
        // Process all shapes polymorphically
        double totalArea = 0;
        for (Shape s : shapes) {
            s.displayInfo();
            totalArea += s.area();
            System.out.println();
        }
        
        System.out.println("Total area of all shapes: " + String.format("%.2f", totalArea));
        
        // Real-world use: sorting shapes by area
        shapes.sort((s1, s2) -> Double.compare(s1.area(), s2.area()));
        System.out.println("\n=== SHAPES SORTED BY AREA ===");
        for (Shape s : shapes) {
            System.out.println(s.getClass().getSimpleName() + ": " + String.format("%.2f", s.area()));
        }
    }
}