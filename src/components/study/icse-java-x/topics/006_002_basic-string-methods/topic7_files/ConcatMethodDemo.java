// ConcatMethodDemo.java
// ICSE Class X: concat() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class ConcatMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: concat() ===");
        
        String s1 = "ICSE";
        String s2 = " Computer Applications";
        
        // 1. Basic concatenation
        String combined = s1.concat(s2);
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("Combined: " + combined);
        
        // 2. Immutability verification
        System.out.println("Did s1 change? " + s1.equals("ICSE")); // true
        
        // 3. Method Chaining
        String greeting = "Welcome".concat(" to ").concat("Barrackpore").concat("!");
        System.out.println("Chained: " + greeting);
        
        // 4. Contrast: concat vs + operator with null
        String test = "Score: ";
        String nullStr = null;
        System.out.println("Using + operator: " + (test + nullStr)); // "Score: null"
        
        try {
            System.out.println(test.concat(nullStr)); // throws NullPointerException
        } catch (NullPointerException e) {
            System.out.println("test.concat(null) safely caught: NullPointerException thrown!");
        }
    }
}