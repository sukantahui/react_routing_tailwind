// MathMaxMinDemo.java
// ICSE Class X: Math.max() and Math.min()
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathMaxMinDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHODS: max() and min() ===");
        
        // 1. Two-variable extremes
        System.out.println("Math.max(15, 29): " + Math.max(15, 29));     // 29
        System.out.println("Math.min(15, 29): " + Math.min(15, 29));     // 15
        
        // 2. Negative extremes
        System.out.println("Math.max(-15, -29): " + Math.max(-15, -29)); // -15
        System.out.println("Math.min(-15, -29): " + Math.min(-15, -29)); // -29
        
        // 3. Three-variable maximum (nested calls)
        int a = 45, b = 88, c = 32;
        int maxOfThree = Math.max(a, Math.max(b, c));
        System.out.println("Largest of (45, 88, 32): " + maxOfThree);    // 88
        
        // 4. Type promotion
        System.out.println("Math.max(10, 10.5): " + Math.max(10, 10.5)); // 10.5 (double)
    }
}