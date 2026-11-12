// ReplaceMethodDemo.java
// ICSE Class X: replace() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class ReplaceMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: replace() ===");
        
        String text = "mississippi";
        
        // 1. Character replacement
        String replaced1 = text.replace('s', 'z');
        System.out.println("Original: " + text);
        System.out.println("After replace('s', 'z'): " + replaced1); // mizzizzippi
        
        // 2. Immutability verification
        System.out.println("Original unchanged? " + text.equals("mississippi")); // true
        
        // 3. Substring replacement
        String phrase = "I love C++ programming";
        String javaPhrase = phrase.replace("C++", "Java");
        System.out.println("Substituted: " + javaPhrase);
        
        // 4. No match test
        String noMatch = text.replace('x', 'y');
        System.out.println("No match returns identical reference: " + (noMatch == text)); // true
    }
}