// ComparisonDemo.java
// Direct comparison between abstract and concrete classes

// ========== ABSTRACT CLASS ==========
// Cannot be instantiated, may have abstract methods
abstract class Shape {
    protected String color;
    
    // Constructor - exists but cannot be called directly with 'new'
    public Shape(String color) {
        this.color = color;
    }
    
    // Concrete method - fully implemented
    public String getColor() {
        return color;
    }
    
    // Abstract method - no body, must be overridden
    public abstract double getArea();
    
    // Another concrete method
    public void display() {
        System.out.println("This is a " + color + " shape with area: " + getArea());
    }
}

// ========== CONCRETE CLASS ==========
// Can be instantiated, all methods have bodies
class Circle {
    private double radius;
    private String color;
    
    // Constructor - can be called with 'new'
    public Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    // All methods are concrete (fully implemented)
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    public String getColor() {
        return color;
    }
    
    public void display() {
        System.out.println("Circle: radius=" + radius + ", color=" + color + ", area=" + getArea());
    }
}

public class ComparisonDemo {
    public static void main(String[] args) {
        System.out.println("=== ABSTRACT CLASS USAGE ===");
        // Shape s = new Shape("red"); // ERROR: Cannot instantiate abstract class
        
        // Must use concrete subclass
        class Rectangle extends Shape {
            private double width, height;
            
            public Rectangle(String color, double width, double height) {
                super(color);
                this.width = width;
                this.height = height;
            }
            
            @Override
            public double getArea() {
                return width * height;
            }
        }
        
        Shape rect = new Rectangle("blue", 5, 3);
        rect.display();
        
        System.out.println("\n=== CONCRETE CLASS USAGE ===");
        Circle circle = new Circle(4.2, "red");  // Direct instantiation
        circle.display();
        
        System.out.println("\n=== KEY DIFFERENCES ===");
        System.out.println("1. Abstract class: cannot use 'new'");
        System.out.println("2. Concrete class: can use 'new'");
        System.out.println("3. Abstract class: may have abstract methods (no body)");
        System.out.println("4. Concrete class: all methods have bodies");
    }
}