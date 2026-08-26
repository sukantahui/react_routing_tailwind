/**
 * Java Core Tutorial - Module 011_003: ResultSet, Scrollable, Updatable & Metadata
 * Topic 5: TYPE_FORWARD_ONLY - Stream Processing & Memory Efficiency
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class TypeForwardOnlyProcessingDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: TYPE_FORWARD_ONLY STREAM PROCESSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY TYPE_FORWARD_ONLY IS ARCHITECTURALLY SUPERIOR:");
        System.out.println("  1. STREAMING PIPELINE:");
        System.out.println("     - Rows are fetched across the network in small batches (fetchSize, e.g. 50 rows).");
        System.out.println("     - Once a row is read and the cursor moves forward, the old row buffer is immediately eligible for GC!\n");

        System.out.println("  2. ZERO CLIENT MEMORY OVERHEAD:");
        System.out.println("     - Can export 50,000,000 student invoice records to CSV on a machine with only 64MB of RAM!");
        System.out.println("     - Scrollable ResultSets, by contrast, must cache all rows on the client, risking OutOfMemoryError!\n");

        System.out.println("  3. MAXIMUM DATABASE SPEED:");
        System.out.println("     - Database engine can stream rows straight off disk without maintaining expensive server-side cursor state.");

        System.out.println("\n==========================================================================");
    }
}
