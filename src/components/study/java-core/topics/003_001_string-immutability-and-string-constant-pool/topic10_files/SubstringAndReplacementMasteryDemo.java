/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 10: Substring & Replacement: substring(), replace(), replaceAll(), replaceFirst()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class SubstringAndReplacementMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: SUBSTRING & REPLACEMENT MASTERY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String text = "Java at Barrackpore. Java is awesome!";

        System.out.println(">>> 1. Substring Slicing (beginIndex inclusive, endIndex exclusive):");
        System.out.println("  text.substring(8)       : "" + text.substring(8) + """);
        System.out.println("  text.substring(8, 19)   : "" + text.substring(8, 19) + "" (Extracts 'Barrackpore')");

        System.out.println("\n>>> 2. Replacement Variants:");
        // replace() -> Literal character / CharSequence replacement (No regex)
        System.out.println("  replace("Java", "Kotlin")       : " + text.replace("Java", "Kotlin"));

        // replaceFirst() -> Regex replacement for 1st match only
        System.out.println("  replaceFirst("Java", "Spring")   : " + text.replaceFirst("Java", "Spring"));

        // replaceAll() -> Full Regex pattern replacement
        String sanitized = "User_Age: 25, Roll: 101".replaceAll("\\d+", "[REDACTED]");
        System.out.println("  replaceAll("\\d+", "[REDACTED]") : " + sanitized);

        System.out.println("\n==========================================================================");
    }
}