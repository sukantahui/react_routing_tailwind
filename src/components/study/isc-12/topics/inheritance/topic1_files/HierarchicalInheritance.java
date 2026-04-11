// Hierarchical Inheritance Example
class Shape {
    String color;
    String name;
    
    public void displayColor() {
        System.out.println("This " + name + " is " + color + " in color");
    }
    
    public void draw() {
        System.out.println("Drawing " + name);
    }
}

class Circle extends Shape {
    double radius;
    
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
    
    public double calculateCircumference() {
        return 2 * Math.PI * radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
}

class Rectangle extends Shape {
    double length;
    double width;
    
    public double calculateArea() {
        return length * width;
    }
    
    public double calculatePerimeter() {
        return 2 * (length + width);
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle of size " + length + " x " + width);
    }
}

class Triangle extends Shape {
    double base;
    double height;
    
    public double calculateArea() {
        return 0.5 * base * height;
    }
    
    public void displayType() {
        System.out.println("This is a triangle shape");
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a triangle with base " + base + " and height " + height);
    }
}

public class HierarchicalInheritance {
    public static void main(String[] args) {
        System.out.println("=== Hierarchical Inheritance Demo ===\n");
        
        // Creating Circle object
        Circle circle = new Circle();
        circle.name = "Circle";
        circle.color = "Red";
        circle.radius = 5.0;
        circle.displayColor();
        circle.draw();
        System.out.println("Area: " + circle.calculateArea());
        System.out.println("Circumference: " + circle.calculateCircumference());
        
        System.out.println("\n--- --- ---\n");
        
        // Creating Rectangle object
        Rectangle rectangle = new Rectangle();
        rectangle.name = "Rectangle";
        rectangle.color = "Blue";
        rectangle.length = 10.0;
        rectangle.width = 6.0;
        rectangle.displayColor();
        rectangle.draw();
        System.out.println("Area: " + rectangle.calculateArea());
        System.out.println("Perimeter: " + rectangle.calculatePerimeter());
        
        System.out.println("\n--- --- ---\n");
        
        // Creating Triangle object
        Triangle triangle = new Triangle();
        triangle.name = "Triangle";
        triangle.color = "Green";
        triangle.base = 8.0;
        triangle.height = 5.0;
        triangle.displayColor();
        triangle.draw();
        System.out.println("Area: " + triangle.calculateArea());
        triangle.displayType();
        
        System.out.println("\n--- Inheritance Relationship ---");
        System.out.println("Circle, Rectangle, and Triangle all inherit from Shape");
        System.out.println("Each has its own specialized methods while sharing common ones");
    }
}