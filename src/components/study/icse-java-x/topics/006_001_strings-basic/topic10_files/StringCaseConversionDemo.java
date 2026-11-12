/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 10: Case Conversion Methods (toUpperCase, toLowerCase)
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringCaseConversionDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       CASE CONVERSION: UPPERCASE & LOWERCASE     ");
        System.out.println("==================================================");

        String title = "Icse Computer Applications 2026";
        System.out.println("Original String: \"" + title + "\"");

        // 1. toUpperCase()
        String upper = title.toUpperCase();
        System.out.println("\n[1] toUpperCase(): \"" + upper + "\"");

        // 2. toLowerCase()
        String lower = title.toLowerCase();
        System.out.println("[2] toLowerCase(): \"" + lower + "\"");

        // 3. Immutability check: title remains unchanged!
        System.out.println("\n[3] Verification of Original (Untouched):");
        System.out.println("    title is still: \"" + title + "\"");

        // 4. Non-alphabetic characters (digits, spaces, punctuation) are unaffected
        String code = "Roll#101-Barrackpore!";
        System.out.println("\n[4] Handling Symbols & Digits:");
        System.out.println("    Original : \"" + code + "\"");
        System.out.println("    Uppercase: \"" + code.toUpperCase() + "\"");

        System.out.println("==================================================");
    }
}