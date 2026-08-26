/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 0: What is java.lang.String and Why It is the Most Heavily Used Type
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringFoundationsOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS java.lang.String - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. String is an object that wraps an immutable byte/char array:
        String instituteName = "Coder & AccoTax Barrackpore";

        System.out.println(">>> 1. Basic String Properties:");
        System.out.println("  Value              : " + instituteName);
        System.out.println("  Length (characters): " + instituteName.length());
        System.out.println("  Class Name         : " + instituteName.getClass().getName());
        System.out.println("  Interfaces         : Serializable, Comparable<String>, CharSequence");

        System.out.println("\n>>> 2. Compact Strings (Java 9+ JVM Optimization):");
        System.out.println("  - Historically stored as 'char[]' (2 bytes per character).");
        System.out.println("  - Modern Java stores Strings as 'byte[]' + a 1-byte LATIN1/UTF16 coder flag.");
        System.out.println("  - Cuts String heap footprint in half (50% RAM reduction in enterprise apps!).");

        System.out.println("\n==========================================================================");
    }
}