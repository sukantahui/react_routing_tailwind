/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 11: Parsing Strings with Custom Radices: Binary (2), Octal (8), Hex (16)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class CustomRadixParsingMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: CUSTOM RADIX NUMBER PARSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Binary Base 2 (Radix = 2):
        int fromBinary = Integer.parseInt("101010", 2);
        System.out.println("  Integer.parseInt("101010", 2) : " + fromBinary + " (Decimal 42)");

        // 2. Octal Base 8 (Radix = 8):
        int fromOctal = Integer.parseInt("77", 8);
        System.out.println("  Integer.parseInt("77", 8)     : " + fromOctal + " (Decimal 63)");

        // 3. Hexadecimal Base 16 (Radix = 16):
        int fromHex = Integer.parseInt("FF", 16);
        System.out.println("  Integer.parseInt("FF", 16)     : " + fromHex + " (Decimal 255)");

        // 4. Custom Radix Base 36 (Alphanumeric 0-9, A-Z):
        int fromBase36 = Integer.parseInt("JAVA", 36);
        System.out.println("  Integer.parseInt("JAVA", 36)   : " + fromBase36 + " (Decimal 903730)");

        System.out.println("\n>>> Radix Limits in Java: Minimum Radix is 2, Maximum Radix is 36 (Character.MAX_RADIX).");

        System.out.println("\n==========================================================================");
    }
}