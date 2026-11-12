// SubstringMethodDemo.java
// ICSE Class X: substring() Method Deep Dive
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class SubstringMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE STRING METHOD: substring() ===");
        
        String s = "UNDERSTANDING";
        // Indices:  0123456789012 (length 13)
        
        // 1. Single argument form: from index 5 to end
        System.out.println("s.substring(5): " + s.substring(5)); // "STANDING"
        
        // 2. Dual argument form: from index 0 to 5 (exclusive)
        System.out.println("s.substring(0, 5): " + s.substring(0, 5)); // "UNDER"
        
        // 3. Middle substring
        System.out.println("s.substring(5, 10): " + s.substring(5, 10)); // "STAND"
        
        // 4. ICSE Pig Latin Prototype
        // For word 'TROUBLE', first vowel 'O' is at index 2
        String word = "TROUBLE";
        int vowelIdx = 2;
        String pigLatin = word.substring(vowelIdx) + word.substring(0, vowelIdx) + "AY";
        System.out.println("Pig Latin of " + word + ": " + pigLatin); // "OUBLETRAY"
    }
}