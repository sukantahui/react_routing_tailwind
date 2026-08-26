/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 9: Core String Transformation Methods: trim(), strip() (Java 11+), repeat()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringTransformationMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: STRING TRANSFORMATION METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String rawInput = "  \t  Barrackpore Hub  \n  ";

        System.out.println(">>> 1. Case Conversions (Creates BRAND NEW Strings!):");
        System.out.println("  toLowerCase() : "" + "JAVA CORE".toLowerCase() + """);
        System.out.println("  toUpperCase() : "" + "java core".toUpperCase() + """);

        System.out.println("\n>>> 2. trim() vs Modern strip() (Java 11+ Unicode Aware):");
        System.out.println("  trim()          : "" + rawInput.trim() + "" (Strips ASCII <= 32 only)");
        System.out.println("  strip()         : "" + rawInput.strip() + "" (Unicode-aware whitespace removal)");
        System.out.println("  stripLeading()  : "" + rawInput.stripLeading() + """);
        System.out.println("  stripTrailing() : "" + rawInput.stripTrailing() + """);

        System.out.println("\n>>> 3. repeat() (Java 11+):");
        String stars = "*".repeat(30);
        System.out.println("  "*".repeat(30)  : " + stars);

        System.out.println("\n>>> REMINDER: Because Strings are immutable, none of these methods modify the original string!");

        System.out.println("\n==========================================================================");
    }
}