// MathFloorCeilDemo.java
// ICSE Class X: Math.floor() vs Math.ceil()
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathFloorCeilDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHODS: floor() vs ceil() ===");
        
        // 1. Positive numbers
        System.out.println("Math.floor(7.8): " + Math.floor(7.8)); // 7.0
        System.out.println("Math.ceil(7.2): " + Math.ceil(7.2));   // 8.0
        
        // 2. Exact integers
        System.out.println("Math.floor(9.0): " + Math.floor(9.0)); // 9.0
        System.out.println("Math.ceil(9.0): " + Math.ceil(9.0));   // 9.0
        
        // 3. NEGATIVE NUMBERS - THE #1 ICSE BOARD TRAP:
        // Floor goes LEFT (down to smaller value): -7.2 -> -8.0
        System.out.println("Math.floor(-7.2): " + Math.floor(-7.2)); // -8.0
        System.out.println("Math.floor(-7.8): " + Math.floor(-7.8)); // -8.0
        
        // Ceil goes RIGHT (up to larger value): -7.8 -> -7.0
        System.out.println("Math.ceil(-7.8): " + Math.ceil(-7.8));   // -7.0
        System.out.println("Math.ceil(-7.2): " + Math.ceil(-7.2));   // -7.0
    }
}