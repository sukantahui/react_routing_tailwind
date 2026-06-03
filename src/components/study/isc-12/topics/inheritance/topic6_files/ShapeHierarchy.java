// ShapeHierarchy.java - Hierarchical Inheritance with Abstract Class
// Real-world: Geometry calculator for Ichapur school project

abstract class Shape {
    protected String color;
    
    Shape(String color) {
        this.color = color;
        System.out.println("Shape constructor: color = " + color);
    }
    
    abstract double area();
    abstract double perimeter();
    
    void displayColor() {
        System.out.println("Color: " + color);
    }
}

class Circle extends Shape {
    private double radius;
    
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double length, width;
    
    Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }
    
    @Override
    double area() {
        return length * width;
    }
    
    @Override
    double perimeter() {
        return 2 * (length + width);
    }
}

class Triangle extends Shape {
    private double side1, side2, side3;
    
    Triangle(String color, double s1, double s2, double s3) {
        super(color);
        this.side1 = s1;
        this.side2 = s2;
        this.side3 = s3;
    }
    
    @Override
    double area() {
        // Heron's formula
        double s = (side1 + side2 + side3) / 2;
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    }
    
    @Override
    double perimeter() {
        return side1 + side2 + side3;
    }
}

public class ShapeHierarchy {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("Red", 5.0),
            new Rectangle("Blue", 4.0, 6.0),
            new Triangle("Green", 3.0, 4.0, 5.0)
        };
        
        System.out.println("\n--- Shape Area & Perimeter ---");
        for (Shape s : shapes) {
            s.displayColor();
            System.out.printf("Area: %.2f\n", s.area());
            System.out.printf("Perimeter: %.2f\n\n", s.perimeter());
        }
    }
}