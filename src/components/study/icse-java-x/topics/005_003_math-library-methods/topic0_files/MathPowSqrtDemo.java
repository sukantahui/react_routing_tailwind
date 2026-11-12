// MathPowSqrtDemo.java
// ICSE Class X: Math.pow() and Math.sqrt()
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathPowSqrtDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHODS: pow() and sqrt() ===");
        
        // 1. Math.pow always returns double
        double p1 = Math.pow(2, 3);
        System.out.println("Math.pow(2, 3): " + p1); // 8.0
        
        double p2 = Math.pow(5, 0);
        System.out.println("Math.pow(5, 0): " + p2); // 1.0
        
        // Explicit cast to int
        int intPow = (int) Math.pow(3, 4);
        System.out.println("(int) Math.pow(3, 4): " + intPow); // 81
        
        // 2. Math.sqrt always returns double
        double sq1 = Math.sqrt(49);
        System.out.println("Math.sqrt(49): " + sq1); // 7.0
        
        double sq2 = Math.sqrt(2);
        System.out.println("Math.sqrt(2): " + sq2); // 1.4142135623730951
        
        // Negative square root returns NaN
        double sqNeg = Math.sqrt(-16);
        System.out.println("Math.sqrt(-16): " + sqNeg); // NaN
    }
}