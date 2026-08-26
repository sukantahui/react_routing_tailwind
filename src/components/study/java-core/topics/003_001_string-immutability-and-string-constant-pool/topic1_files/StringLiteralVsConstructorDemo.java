/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 1: String Creation: String Literal vs Constructor Allocation (new String())
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringLiteralVsConstructorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: LITERAL VS CONSTRUCTOR ALLOCATION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. String Literal (Stored directly in String Constant Pool):
        String s1 = "Barrackpore";
        String s2 = "Barrackpore"; // Reuses s1 reference from SCP!

        // 2. String Constructor (Forces a new distinct Heap object outside SCP):
        String s3 = new String("Barrackpore");

        System.out.println(">>> 1. Comparing Literals with '==' (Reference Identity):");
        System.out.println("  s1 == s2 : " + (s1 == s2) + " (Both point to the SAME object in SCP!)");

        System.out.println("\n>>> 2. Comparing Literal vs Constructor with '==':");
        System.out.println("  s1 == s3 : " + (s1 == s3) + " (s3 is a separate instance in regular Heap!)");

        System.out.println("\n>>> 3. Comparing Content with 'equals()':");
        System.out.println("  s1.equals(s3) : " + s1.equals(s3) + " (Same character values!)");

        System.out.println("\n==========================================================================");
    }
}