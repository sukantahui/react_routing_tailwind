/**
 * Java Core Tutorial - Module 003_002: StringBuilder, StringBuffer & String Formatting
 * Topic 3: Detailed Comparison: String vs StringBuilder vs StringBuffer
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.stringbuilder;

public class StringVsBuilderVsBufferComparisonDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: String vs StringBuilder vs StringBuffer - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Feature           | String            | StringBuilder     | StringBuffer      |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");
        System.out.println("| Storage / Memory  | SCP & Heap        | Heap only         | Heap only         |");
        System.out.println("| Mutability        | IMMUTABLE         | MUTABLE           | MUTABLE           |");
        System.out.println("| Thread-Safety     | Thread-Safe (imm) | NOT Thread-Safe   | THREAD-SAFE (sync)|");
        System.out.println("| Performance       | Slow in loops     | FASTEST (No locks)| Moderate (Locking)|");
        System.out.println("| Introduced In     | Java 1.0          | Java 5.0          | Java 1.0          |");
        System.out.println("+-------------------+-------------------+-------------------+-------------------+");

        System.out.println("\n>>> Summary Selection Guide:");
        System.out.println("  1. Choose String        : For constants, keys, DTO fields, and small fixed text.");
        System.out.println("  2. Choose StringBuilder : For local method string assembly, loops, and building JSON/SQL.");
        System.out.println("  3. Choose StringBuffer  : Only for legacy multi-threaded shared buffers.");

        System.out.println("\n==========================================================================");
    }
}