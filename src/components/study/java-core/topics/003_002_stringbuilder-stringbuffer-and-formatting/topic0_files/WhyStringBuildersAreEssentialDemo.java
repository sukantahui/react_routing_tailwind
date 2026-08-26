/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 0: Why Mutable String Builders Are Essential: Avoiding Heap Garbage Creation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class WhyStringBuildersAreEssentialDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY MUTABLE STRING BUILDERS ARE ESSENTIAL - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The Problem of String Immutability during Concatenation:");
        System.out.println("  - When you write: String s = "A"; s += "B"; s += "C";");
        System.out.println("  - The JVM creates 3 separate String objects on the Heap: "A", "AB", and "ABC"!");
        System.out.println("  - In high-throughput servers (handling 10,000 req/sec), this triggers massive Garbage Collection (GC) pauses.");
        System.out.println();
        System.out.println(">>> The Solution: java.lang.StringBuilder / StringBuffer");
        System.out.println("  - Wraps a MUTABLE, growable internal byte/char buffer.");
        System.out.println("  - Modifies characters in-place inside the SAME memory buffer.");
        System.out.println("  - Zero intermediate garbage objects created during assembly!");

        System.out.println("\n==========================================================================");
    }
}