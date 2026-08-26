/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 6: Comparing Strings: '==' Reference Equality vs '.equals()' Content Equality
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringEqualsVsOperatorDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: '==' VS 'equals()' FOR STRINGS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        String str1 = "Shyamnagar";
        String str2 = "Shyamnagar";
        String str3 = new String("Shyamnagar");
        String str4 = "Shyam" + "nagar"; // Compile-time constant expression evaluates to "Shyamnagar" in SCP!

        System.out.println(">>> 1. Comparing References with '==' (Memory Address):");
        System.out.println("  str1 == str2 : " + (str1 == str2) + " (Both point to same SCP literal)");
        System.out.println("  str1 == str3 : " + (str1 == str3) + " (str3 is separate Heap instance)");
        System.out.println("  str1 == str4 : " + (str1 == str4) + " (Compiler folded constant literal into SCP)");

        System.out.println("\n>>> 2. Comparing Character Values with '.equals()':");
        System.out.println("  str1.equals(str3) : " + str1.equals(str3) + " (TRUE: Identical character sequence)");

        System.out.println("\n>>> GOLDEN RULE: ALWAYS compare Strings with '.equals()', NEVER with '=='!");

        System.out.println("\n==========================================================================");
    }
}