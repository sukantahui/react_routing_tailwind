/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 8: Core String Inspection Methods: length(), isEmpty(), isBlank(), charAt(), indexOf(), contains()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringInspectionMethodsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CORE STRING INSPECTION METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String str = "Coder & AccoTax Barrackpore";

        System.out.println(">>> 1. String Inspection Operations on: "" + str + """);
        System.out.println("  str.length()                 : " + str.length() + " chars");
        System.out.println("  str.charAt(0)                : '" + str.charAt(0) + "'");
        System.out.println("  str.indexOf("AccoTax")        : Index " + str.indexOf("AccoTax"));
        System.out.println("  str.contains("Barrackpore")  : " + str.contains("Barrackpore"));
        System.out.println("  str.startsWith("Coder")      : " + str.startsWith("Coder"));
        System.out.println("  str.endsWith("pore")         : " + str.endsWith("pore"));

        System.out.println("\n>>> 2. isEmpty() vs isBlank() (Java 11+ Distinction):");
        String emptyStr = "";
        String whitespaceStr = "   \t\n  ";

        System.out.println("  emptyStr.isEmpty()           : " + emptyStr.isEmpty() + " (length == 0)");
        System.out.println("  whitespaceStr.isEmpty()      : " + whitespaceStr.isEmpty() + " (length > 0, so FALSE!)");
        System.out.println("  whitespaceStr.isBlank()      : " + whitespaceStr.isBlank() + " (Only whitespace, TRUE!)");

        System.out.println("\n==========================================================================");
    }
}