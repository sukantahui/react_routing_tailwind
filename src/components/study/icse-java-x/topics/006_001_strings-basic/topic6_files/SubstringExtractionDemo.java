/**
 * Coder & AccoTax - ICSE Class X Computer Applications
 * Module 006_001: Strings Basic & Core Concepts
 * Topic 6: Substring Extraction and String Slicing
 * 
 * Educator: Sukanta Hui (Barrackpore, West Bengal)
 */

public class SubstringExtractionDemo {

    public static void main(String[] args) {
        System.out.println("==================================================");
        System.out.println("     SUBSTRING EXTRACTION & STRING SLICING        ");
        System.out.println("==================================================");

        String str = "BARRACKPORE";
        System.out.println("Target String: \"" + str + "\" (Length: " + str.length() + ")");

        // 1. One-parameter version: substring(beginIndex)
        // Extracts from beginIndex to the end of string
        String sub1 = str.substring(7); // From index 7 to end
        System.out.println("\n[1] str.substring(7): \"" + sub1 + "\" (Expected: \"PORE\")");

        // 2. Two-parameter version: substring(beginIndex, endIndex)
        // CRITICAL ICSE RULE: beginIndex is INCLUSIVE, endIndex is EXCLUSIVE!
        // Characters extracted = endIndex - beginIndex
        String sub2 = str.substring(0, 6); // Indices 0, 1, 2, 3, 4, 5
        System.out.println("\n[2] str.substring(0, 6): \"" + sub2 + "\" (Expected: \"BARRAC\")");

        String sub3 = str.substring(3, 7); // Indices 3, 4, 5, 6
        System.out.println("[3] str.substring(3, 7): \"" + sub3 + "\" (Expected: \"RACK\")");

        // 3. Real-life Application: Extracting Initials & Surname
        String fullName = "Swadeep Mukherjee";
        int spaceIndex = fullName.indexOf(' ');
        String firstName = fullName.substring(0, spaceIndex);
        String lastName = fullName.substring(spaceIndex + 1);
        String formatted = fullName.charAt(0) + ". " + lastName;

        System.out.println("\n[4] Real-world ICSE Formatting:");
        System.out.println("Full Name  : " + fullName);
        System.out.println("First Name : " + firstName);
        System.out.println("Surname    : " + lastName);
        System.out.println("Formatted  : " + formatted); // "S. Mukherjee"

        System.out.println("==================================================");
    }
}