/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 5: Durability - Write-Ahead Logs & Crash Recovery
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class DurabilityWriteAheadLogsDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: DURABILITY & WRITE-AHEAD LOGGING (WAL) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE WRITE-AHEAD LOGGING (WAL / REDO LOG) MECHANISM:");
        System.out.println("  1. User calls conn.commit().");
        System.out.println("  2. DB engine writes transaction changes sequentially into the WAL / Redo Log on disk.");
        System.out.println("  3. DB engine calls OS 'fsync()' to flush disk cache to non-volatile SSD/HDD.");
        System.out.println("  4. DB returns COMMIT SUCCESS to Java client.\n");

        System.out.println(">>> CRASH RECOVERY (ARIES Protocol):");
        System.out.println("  - Scenario: Server loses power immediately after step 4.");
        System.out.println("  - Upon Reboot:");
        System.out.println("    * Analysis Pass : Scans WAL to identify active transactions at time of crash.");
        System.out.println("    * Redo Pass     : Replays all committed WAL records forward into table data pages.");
        System.out.println("    * Undo Pass     : Rolls back any uncommitted transactions that were in-flight!");
        System.out.println("  - RESULT          : 100% Zero Committed Data Loss! 🛡️");

        System.out.println("\n==========================================================================");
    }
}
