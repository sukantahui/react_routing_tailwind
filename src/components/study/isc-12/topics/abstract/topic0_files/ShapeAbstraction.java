// ShapeAbstraction.java
// Abstraction through geometric shapes - each shape calculates area differently

abstract class Shape {
    // Abstract methods - each shape must implement its own way
    public abstract double calculateArea();
    public abstract double calculatePerimeter();
    
    // Concrete method - same for all shapes
    public void displayInfo() {
        System.out.println("Shape type: " + this.getClass().getSimpleName());
        System.out.println("Area: " + calculateArea());
        System.out.println("Perimeter: " + calculatePerimeter());
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double calculateArea() {
        // Complex formula hidden - user just calls the method
        return Math.PI * radius * radius;
    }
    
    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double calculateArea() {
        return width * height;
    }
    
    @Override
    public double calculatePerimeter() {
        return 2 * (width + height);
    }
}

public class ShapeAbstraction {
    public static void main(String[] args) {
        Shape s1 = new Circle(5);
        Shape s2 = new Rectangle(4, 6);
        
        s1.displayInfo();   // No need to know π * r² inside
        s2.displayInfo();
        
        // Abstraction benefit: we can treat all shapes uniformly
        Shape[] shapes = {s1, s2};
        double totalArea = 0;
        for (Shape shape : shapes) {
            totalArea += shape.calculateArea();
        }
        System.out.println("Total area: " + totalArea);
    }
}