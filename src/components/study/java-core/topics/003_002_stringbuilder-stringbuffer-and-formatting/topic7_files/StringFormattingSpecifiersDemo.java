/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 7: Formatted Output with printf() and String.format() (%s, %d, %f, %b, %x)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class StringFormattingSpecifiersDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: String.format() & printf() SPECIFIERS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String name = "Swadeep Paul";
        int roll = 101;
        double fee = 25000.758;
        boolean passed = true;
        int hexValue = 255;

        // Formatted String Construction:
        String reportCard = String.format(
                "Trainee: %s | Roll: %04d | Fee: ₹%.2f | Passed: %b | Hex: 0x%X",
                name, roll, fee, passed, hexValue
        );

        System.out.println(">>> 1. Assembled with String.format():");
        System.out.println("  " + reportCard);

        System.out.println("\n>>> 2. Common Format Specifiers Cheatsheet:");
        System.out.println("  %s : String argument");
        System.out.println("  %d : Decimal integer (e.g. %04d -> zero-padded to 4 digits)");
        System.out.println("  %f : Floating-point number (e.g. %.2f -> rounded to 2 decimals)");
        System.out.println("  %b : Boolean value ('true'/'false')");
        System.out.println("  %x / %X : Hexadecimal representation (lower/upper)");
        System.out.println("  %n : Platform-independent newline separator (CRLF on Windows, LF on Linux)");

        System.out.println("\n==========================================================================");
    }
}