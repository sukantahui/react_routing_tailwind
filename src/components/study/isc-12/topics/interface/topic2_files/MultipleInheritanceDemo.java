// MultipleInheritanceDemo.java
public class MultipleInheritanceDemo {
    public static void main(String[] args) {
        // Polymorphic usage: Shape object can be treated as Movable or Drawable
        Shape shape = new Shape("red");
        
        // As Movable
        Movable movable = shape;
        movable.move(10, 20);
        
        // As Drawable
        Drawable drawable = shape;
        drawable.draw();
        
        // Original type can call all methods
        shape.resize(1.5);
        
        // Example: array of different objects that all implement Drawable
        Drawable[] drawables = {
            new Shape("blue"),
            new Shape("green"),
            new Shape("yellow")
        };
        
        for (Drawable d : drawables) {
            d.draw();
        }
    }
}