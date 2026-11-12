// MathCbrtAbsDemo.java
// ICSE Class X: Math.cbrt() and Math.abs()
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathCbrtAbsDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHODS: cbrt() and abs() ===");
        
        // 1. Math.cbrt with positive and negative arguments
        System.out.println("Math.cbrt(27.0): " + Math.cbrt(27.0));   // 3.0
        System.out.println("Math.cbrt(-27.0): " + Math.cbrt(-27.0)); // -3.0 (Valid!)
        System.out.println("Math.cbrt(125): " + Math.cbrt(125));     // 5.0
        
        // 2. Math.abs preserves parameter type
        int intAbs = Math.abs(-42);
        double dblAbs = Math.abs(-99.95);
        long lngAbs = Math.abs(-10000000000L);
        
        System.out.println("Math.abs(-42) [int]: " + intAbs);       // 42
        System.out.println("Math.abs(-99.95) [double]: " + dblAbs); // 99.95
        System.out.println("Math.abs(-10000000000L) [long]: " + lngAbs);
    }
}