/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 5: String Length and Character Access Methods
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringLengthAndCharAtDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("    STRING LENGTH & CHARAT() METHOD TRAVERSAL     ");
        System.out.println("==================================================");

        String text = "ICSE 2026 Barrackpore";
        int len = text.length();

        System.out.println("String: \"" + text + "\"");
        System.out.println("Total Length: " + len);
        System.out.println("First Character (index 0)        : " + text.charAt(0));
        System.out.println("Last Character (index length - 1): " + text.charAt(len - 1));

        // Traversing string to count uppercase, lowercase, digits, and spaces
        int uCount = 0, lCount = 0, dCount = 0, sCount = 0;

        for (int i = 0; i < len; i++) {
            char ch = text.charAt(i);
            if (ch >= 'A' && ch <= 'Z') {
                uCount++;
            } else if (ch >= 'a' && ch <= 'z') {
                lCount++;
            } else if (ch >= '0' && ch <= '9') {
                dCount++;
            } else if (ch == ' ') {
                sCount++;
            }
        }

        System.out.println("\nCharacter Analysis:");
        System.out.println("Uppercase letters : " + uCount);
        System.out.println("Lowercase letters : " + lCount);
        System.out.println("Digits            : " + dCount);
        System.out.println("Whitespace spaces : " + sCount);

        System.out.println("==================================================");
    }
}