// CompareToIgnoreCaseMethodDemo.java
// ICSE Class X: compareToIgnoreCase() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class CompareToIgnoreCaseMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: compareToIgnoreCase() ===");
        
        String s1 = "kolkata";
        String s2 = "KOLKATA";
        String s3 = "mumbai";
        
        // 1. Equal ignoring case
        System.out.println("s1 vs s2: " + s1.compareToIgnoreCase(s2)); // 0
        
        // 2. Lexicographical order: 'k' vs 'm' -> 'k' comes before 'm' (negative)
        System.out.println("s1 vs s3: " + s1.compareToIgnoreCase(s3)); // negative
        
        // 3. Prefix difference ignoring case
        System.out.println("'Barrack'.compareToIgnoreCase('barrackpore'): " + 
            "Barrack".compareToIgnoreCase("barrackpore")); // -4 (7 - 11)
    }
}