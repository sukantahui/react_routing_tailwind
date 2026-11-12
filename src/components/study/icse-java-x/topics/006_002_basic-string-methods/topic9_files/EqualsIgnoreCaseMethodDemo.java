// EqualsIgnoreCaseMethodDemo.java
// ICSE Class X: equalsIgnoreCase() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class EqualsIgnoreCaseMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: equalsIgnoreCase() ===");
        
        String answer = "YES";
        
        System.out.println("User entered 'yes': " + answer.equalsIgnoreCase("yes")); // true
        System.out.println("User entered 'Yes': " + answer.equalsIgnoreCase("Yes")); // true
        System.out.println("User entered 'yEs': " + answer.equalsIgnoreCase("yEs")); // true
        
        // Non-alphabetic must match exactly
        String code1 = "ICSE-2026";
        String code2 = "icse-2026";
        String code3 = "icse 2026"; // space instead of hyphen
        
        System.out.println("code1 vs code2: " + code1.equalsIgnoreCase(code2)); // true
        System.out.println("code1 vs code3: " + code1.equalsIgnoreCase(code3)); // false!
    }
}