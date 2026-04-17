// Shape.java
public class Shape implements Movable, Drawable {
    private int x, y;
    private String color;

    public Shape(String color) {
        this.color = color;
        this.x = 0;
        this.y = 0;
    }

    @Override
    public void move(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.println("Shape moved to (" + x + ", " + y + ")");
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " shape at (" + x + ", " + y + ")");
    }

    // Additional method specific to Shape
    public void resize(double factor) {
        System.out.println("Resizing shape by factor " + factor);
    }
}