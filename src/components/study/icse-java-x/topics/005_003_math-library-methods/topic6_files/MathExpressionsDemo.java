// MathExpressionsDemo.java
// ICSE Class X: Algebraic to Java Expression Translation
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathExpressionsDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE EXAM: ALGEBRAIC TO JAVA EXPRESSIONS ===");
        
        double a = 3, b = 4, c = 1, x = 5, y = 2;
        
        // Expression 1: Quadratic formula: (-b + sqrt(b^2 - 4ac)) / (2a)
        double root = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        System.out.println("1. Quadratic Root: " + root);
        
        // Expression 2: Distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
        double x1 = 1, y1 = 2, x2 = 4, y2 = 6;
        double dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        System.out.println("2. Distance between points: " + dist);
        
        // Expression 3: |x^3 - y^3| + sqrt(x + y)
        double expr3 = Math.abs(Math.pow(x, 3) - Math.pow(y, 3)) + Math.sqrt(x + y);
        System.out.println("3. Expression (|x^3 - y^3| + sqrt(x+y)): " + expr3);
        
        // Expression 4: Volume of Sphere: (4.0 / 3.0) * pi * r^3
        double r = 7;
        double volume = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);
        System.out.println("4. Sphere Volume: " + volume);
    }
}