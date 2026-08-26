/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 4: Why Are Java Strings Immutable? (4 Pillars of String Immutability)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class WhyStringsAreImmutableDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: WHY JAVA STRINGS ARE IMMUTABLE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> The 4 Fundamental Reasons James Gosling Made Strings Immutable:");
        System.out.println();
        System.out.println("  1. STRING CONSTANT POOL (SCP) INTEGRITY:");
        System.out.println("     If String was mutable, changing 'Barrackpore' in one reference would silently");
        System.out.println("     alter the value for thousands of other independent references!");
        System.out.println();
        System.out.println("  2. SECURITY & CLASS LOADING:");
        System.out.println("     File paths, database URLs, and network ports are passed as Strings.");
        System.out.println("     If mutable, a malicious thread could change the DB username after authentication!");
        System.out.println();
        System.out.println("  3. THREAD SAFETY & CONCURRENCY:");
        System.out.println("     Immutable strings can be shared across 100 concurrent threads with ZERO synchronization overhead.");
        System.out.println();
        System.out.println("  4. HASHCODE CACHING (High Performance in HashMaps):");
        System.out.println("     Because String contents never change, the hashCode is calculated once and cached");
        System.out.println("     inside the 'hash' field. Subsequent hashCode() calls run in O(1) instant time!");

        System.out.println("\n==========================================================================");
    }
}