/**
 * Java Core Tutorial - Module 003_006: Regular Expressions (java.util.regex)
 * Topic 5: Java Escaping Requirement: Why Double Backslashes (\\d, \\w) Are Mandatory
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.regex;

public class JavaDoubleBackslashEscapingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: JAVA DOUBLE BACKSLASH (\\\\) ESCAPING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Why does Java require '\\d' instead of '\d'?");
        System.out.println();
        System.out.println("  STEP 1: Java String Literal Compiler Parsing:");
        System.out.println("  - In Java source code, the backslash '\\' is an escape prefix for chars like '\\n', '\\t'.");
        System.out.println("  - If you write "\\d", the Java compiler looks for an escape sequence '\\d' and fails with a COMPILE ERROR!");
        System.out.println("  - To put a single literal backslash into the String in RAM, you must write "\\\\".");
        System.out.println();
        System.out.println("  STEP 2: Regex Engine Regex Parsing:");
        System.out.println("  - The Regex engine receives the string containing '\\d' in memory.");
        System.out.println("  - The regex parser recognizes '\\d' as the DIGIT meta-character!");
        System.out.println();
        System.out.println("  ESCAPING A LITERAL DOT ('.'):");
        System.out.println("  - In Regex, '.' means ANY character.");
        System.out.println("  - To match a literal dot (like in IP or email), regex needs '\\.'.");
        System.out.println("  - Therefore, in Java code you must write: "\\\\."!");

        String filename = "report.pdf";
        boolean isPdf = filename.matches(".+\\\\.pdf"); // Escaped literal dot before 'pdf'
        System.out.println("\n>>> Verification: Does '" + filename + "' end with literal '.pdf'? " + isPdf);

        System.out.println("\n==========================================================================");
    }
}