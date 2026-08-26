/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 1: java.lang.StringBuilder: Architecture, Un-synchronized Performance & Usage
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class StringBuilderFoundationsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: java.lang.StringBuilder ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Initializing StringBuilder with default capacity (16 chars):
        StringBuilder sb = new StringBuilder();

        System.out.println(">>> 1. Initial Buffer State:");
        System.out.println("  sb.length()   : " + sb.length() + " characters");
        System.out.println("  sb.capacity() : " + sb.capacity() + " buffer capacity");

        // 2. Appending mixed datatypes in-place:
        sb.append("Trainee: ").append("Swadeep Paul");
        sb.append(" | Score: ").append(98.5);
        sb.append(" | Enrolled: ").append(true);

        System.out.println("\n>>> 2. Buffer State After In-Place Mutation:");
        System.out.println("  sb.toString() : "" + sb.toString() + """);
        System.out.println("  sb.length()   : " + sb.length() + " chars");
        System.out.println("  sb.capacity() : " + sb.capacity() + " buffer capacity");

        System.out.println("\n>>> Key Trait: StringBuilder is NOT synchronized (High speed single-threaded execution).");

        System.out.println("\n==========================================================================");
    }
}