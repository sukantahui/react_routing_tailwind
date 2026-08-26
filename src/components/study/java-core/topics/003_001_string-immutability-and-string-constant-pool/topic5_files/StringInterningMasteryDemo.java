/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 5: The 'intern()' Method: Manually Caching Dynamic Strings into SCP
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringInterningMasteryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE String.intern() METHOD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Literal placed in SCP:
        String poolStr = "Naihati";

        // 2. Dynamic string on regular Heap:
        String heapStr = new String("Naihati");

        // 3. Calling intern() returns the canonical SCP reference:
        String internedStr = heapStr.intern();

        System.out.println(">>> 1. Comparing heapStr vs poolStr with '==':");
        System.out.println("  heapStr == poolStr        : " + (heapStr == poolStr) + " (Distinct Heap Objects)");

        System.out.println("\n>>> 2. Comparing internedStr vs poolStr with '==':");
        System.out.println("  internedStr == poolStr    : " + (internedStr == poolStr) + " (Same Canonical SCP Object!)");

        System.out.println("\n>>> How intern() works under the hood:");
        System.out.println("  - If SCP already contains the string, intern() returns the pooled reference.");
        System.out.println("  - If SCP does NOT contain it, intern() adds it to SCP and returns that reference.");

        System.out.println("\n==========================================================================");
    }
}