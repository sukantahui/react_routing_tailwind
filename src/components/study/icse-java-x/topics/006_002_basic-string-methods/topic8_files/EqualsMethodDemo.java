// EqualsMethodDemo.java
// ICSE Class X: equals() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class EqualsMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: equals() ===");
        
        String s1 = "Barrackpore";
        String s2 = "Barrackpore";
        String s3 = new String("Barrackpore");
        String s4 = "barrackpore";
        
        // 1. Content comparison
        System.out.println("s1.equals(s2): " + s1.equals(s2)); // true
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true
        System.out.println("s1.equals(s4): " + s1.equals(s4)); // false (case mismatch)
        
        // 2. Contrast with ==
        System.out.println("s1 == s2 (SCP pool): " + (s1 == s2)); // true
        System.out.println("s1 == s3 (Heap vs Pool): " + (s1 == s3)); // false!
        
        // 3. Null safety
        System.out.println("s1.equals(null): " + s1.equals(null)); // false
    }
}