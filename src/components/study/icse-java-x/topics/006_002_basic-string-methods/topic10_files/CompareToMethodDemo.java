// CompareToMethodDemo.java
// ICSE Class X: compareTo() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class CompareToMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: compareTo() ===");
        
        // 1. Identical strings
        System.out.println("'Java'.compareTo('Java'): " + "Java".compareTo("Java")); // 0
        
        // 2. Differing characters (ASCII difference)
        // 'A' (65) - 'C' (67) = -2
        System.out.println("'Apple'.compareTo('Cat'): " + "Apple".compareTo("Cat")); // -2
        
        // 'B' (66) - 'A' (65) = 1
        System.out.println("'Bat'.compareTo('Apple'): " + "Bat".compareTo("Apple")); // 1
        
        // 3. Prefix Length Rule
        // 'car' length (3) - 'carpet' length (6) = -3
        System.out.println("'car'.compareTo('carpet'): " + "car".compareTo("carpet")); // -3
        
        // 4. Case Sensitivity impact: 'A' (65) vs 'a' (97) -> 65 - 97 = -32
        System.out.println("'A'.compareTo('a'): " + "A".compareTo("a")); // -32
    }
}