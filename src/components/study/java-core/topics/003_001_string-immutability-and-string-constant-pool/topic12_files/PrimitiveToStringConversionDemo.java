/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 12: Converting Primitives to String: String.valueOf() vs toString() vs Concatenation ("" + n)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class PrimitiveToStringConversionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: PRIMITIVE TO STRING CONVERSION - BARRACKPORE");
        System.out.println("==========================================================================\n");

        int roll = 101;
        Double gpa = 9.75;
        Object nullObj = null;

        System.out.println(">>> 1. Using String.valueOf() [RECOMMENDED BEST PRACTICE]:");
        String s1 = String.valueOf(roll);
        String s2 = String.valueOf(nullObj); // Safely returns "null" without throwing NPE!
        System.out.println("  String.valueOf(roll)    : "" + s1 + """);
        System.out.println("  String.valueOf(nullObj) : "" + s2 + "" (Null Safe!)");

        System.out.println("\n>>> 2. Using Wrapper.toString():");
        String s3 = Integer.toString(roll);
        String s4 = gpa.toString();
        System.out.println("  Integer.toString(roll)  : "" + s3 + """);
        System.out.println("  gpa.toString()          : "" + s4 + """);

        System.out.println("\n>>> 3. Using String Concatenation ("" + n) [AVOID IN TIGHT LOOPS]:");
        String s5 = "" + roll; // Creates extra StringBuilder underneath!
        System.out.println("  "" + roll               : "" + s5 + "" (Slowest due to intermediate allocations)");

        System.out.println("\n==========================================================================");
    }
}