/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 11: Whitespace Handling Using trim()
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class StringTrimWhitespaceDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("       WHITESPACE HANDLING USING TRIM()           ");
        System.out.println("==================================================");

        // Raw input with leading, trailing, and intermediate spaces
        String rawInput = "   Swadeep Mukherjee   ";
        System.out.println("Raw Input: \"" + rawInput + "\"");
        System.out.println("Raw Length: " + rawInput.length());

        // 1. Invoking trim()
        // Removes leading and trailing whitespace; internal spaces are PRESERVED!
        String cleaned = rawInput.trim();
        System.out.println("\n[1] After trim(): \"" + cleaned + "\"");
        System.out.println("Cleaned Length: " + cleaned.length());

        // 2. Trimming tabs and newlines
        String tabbedInput = "\t\n  ICSE Computer  \n\t";
        System.out.println("\n[2] Trimming tabs and newlines:");
        System.out.println("Cleaned: \"" + tabbedInput.trim() + "\"");

        // 3. String containing only spaces
        String onlySpaces = "     ";
        String trimmedEmpty = onlySpaces.trim();
        System.out.println("\n[3] Only spaces after trim(): \"" + trimmedEmpty + "\" (Length: " + trimmedEmpty.length() + ")");

        System.out.println("==================================================");
    }
}