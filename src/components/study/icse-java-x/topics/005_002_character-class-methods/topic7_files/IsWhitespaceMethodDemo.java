// IsWhitespaceMethodDemo.java
// ICSE Class X: Character.isWhitespace() Method
// Coder & AccoTax, Barrackpore · Sukanta Hui

public class IsWhitespaceMethodDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE CHARACTER METHOD: isWhitespace() ===");
        
        char c1 = ' ';
        char c2 = '\t';
        char c3 = '\n';
        char c4 = 'A';
        char c5 = '9';
        
        System.out.println("isWhitespace(' '): " + Character.isWhitespace(c1));   // true
        System.out.println("isWhitespace('\\t'): " + Character.isWhitespace(c2)); // true
        System.out.println("isWhitespace('\\n'): " + Character.isWhitespace(c3)); // true
        System.out.println("isWhitespace('A'): " + Character.isWhitespace(c4));   // false
        System.out.println("isWhitespace('9'): " + Character.isWhitespace(c5));   // false
        
        // Word counter using isWhitespace
        String sentence = "ICSE   Computer   Applications  2026";
        int wordCount = 0;
        boolean inWord = false;
        
        for (int i = 0; i < sentence.length(); i++) {
            char ch = sentence.charAt(i);
            if (!Character.isWhitespace(ch)) {
                if (!inWord) {
                    wordCount++;
                    inWord = true;
                }
            } else {
                inWord = false;
            }
        }
        System.out.println("Sentence: \"" + sentence + "\"");
        System.out.println("Accurate Word Count: " + wordCount); // 4 words
    }
}