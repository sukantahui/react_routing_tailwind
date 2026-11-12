// MathRoundRintDemo.java
// ICSE Class X: Math.round() vs Math.rint()
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class MathRoundRintDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE MATH METHODS: round() vs rint() ===");
        
        // 1. Math.round returns integer/long
        System.out.println("Math.round(4.4): " + Math.round(4.4));   // 4 (long)
        System.out.println("Math.round(4.5): " + Math.round(4.5));   // 5 (long)
        System.out.println("Math.round(4.6): " + Math.round(4.6));   // 5 (long)
        
        // NEGATIVE ROUNDING TRAP IN ICSE EXAMS:
        System.out.println("Math.round(-4.5): " + Math.round(-4.5)); // -4 (long)!
        System.out.println("Math.round(-4.6): " + Math.round(-4.6)); // -5 (long)
        
        // 2. Math.rint returns double
        System.out.println("Math.rint(4.4): " + Math.rint(4.4));     // 4.0 (double)
        System.out.println("Math.rint(4.6): " + Math.rint(4.6));     // 5.0 (double)
        
        // BANKER'S ROUNDING (Even Tie-Breaker):
        System.out.println("Math.rint(2.5) -> nearest EVEN: " + Math.rint(2.5)); // 2.0
        System.out.println("Math.rint(3.5) -> nearest EVEN: " + Math.rint(3.5)); // 4.0
        System.out.println("Math.rint(-2.5) -> nearest EVEN: " + Math.rint(-2.5)); // -2.0
        System.out.println("Math.rint(-3.5) -> nearest EVEN: " + Math.rint(-3.5)); // -4.0
    }
}