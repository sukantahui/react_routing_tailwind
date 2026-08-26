/**
 * Java Core Tutorial - Module 003_001: String Immutability & The String Constant Pool (SCP)
 * Topic 2: The String Constant Pool (SCP) Inside the JVM Heap Memory
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.strings;

public class StringConstantPoolArchitectureDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: STRING CONSTANT POOL (SCP) ARCHITECTURE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> History & Evolution of SCP Location in JVM Memory:");
        System.out.println("  - Java 6 and earlier: SCP resided in the 'PermGen' (Permanent Generation) space.");
        System.out.println("    (Caused frequent 'java.lang.OutOfMemoryError: PermGen space' crashes!).");
        System.out.println();
        System.out.println("  - Java 7+: SCP was MOVED to the MAIN HEAP memory!");
        System.out.println("    (Benefits: Strings in SCP can now be garbage collected when unreferenced!).");
        System.out.println();
        System.out.println("  - Java 8+: PermGen completely removed and replaced by Metaspace (off-heap native RAM),");
        System.out.println("    while SCP remains safely in regular Heap.");

        System.out.println("\n==========================================================================");
    }
}