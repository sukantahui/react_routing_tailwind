/**
 * Java Core Tutorial - Module 003_003: Wrapper Classes, Autoboxing & Number Parsing
 * Topic 13: Wrapper Constants & Methods: MAX_VALUE, SIZE, BYTES, toBinaryString, compare (Capstone)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.wrappers;

public class WrapperUtilitiesAndConstantsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: WRAPPER UTILITIES & CONSTANTS CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Architecture Constants in Integer & Long:");
        System.out.println("  Integer.MIN_VALUE    : " + Integer.MIN_VALUE);
        System.out.println("  Integer.MAX_VALUE    : " + Integer.MAX_VALUE);
        System.out.println("  Integer.SIZE         : " + Integer.SIZE + " bits");
        System.out.println("  Integer.BYTES        : " + Integer.BYTES + " bytes");

        System.out.println("\n>>> 2. Bitwise & Binary Representation Utilities:");
        int num = 255;
        System.out.println("  Integer.toBinaryString(255) : " + Integer.toBinaryString(num));
        System.out.println("  Integer.toHexString(255)    : 0x" + Integer.toHexString(num).toUpperCase());
        System.out.println("  Integer.bitCount(255)       : " + Integer.bitCount(num) + " set bits (popcount)");

        System.out.println("\n>>> 3. Static Type-Safe Comparison Methods (compare):");
        // Integer.compare(x, y) prevents subtraction integer overflow bugs!
        int comp1 = Integer.compare(10, 20); // Returns negative
        int comp2 = Double.compare(4.5, 4.5); // Returns 0 (Handles NaN and -0.0 correctly!)

        System.out.println("  Integer.compare(10, 20) : " + comp1 + " (10 is less than 20)");
        System.out.println("  Double.compare(4.5, 4.5): " + comp2 + " (Equal)");

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 003_003 WRAPPER CLASSES & AUTOBOXING 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}