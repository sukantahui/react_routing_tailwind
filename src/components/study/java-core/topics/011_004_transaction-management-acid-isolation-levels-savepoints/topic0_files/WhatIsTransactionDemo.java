/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 0: What is a Transaction - Logical Unit of Work (LUW)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class WhatIsTransactionDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT IS A DATABASE TRANSACTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. DEFINITION OF A TRANSACTION:");
        System.out.println("  - A Transaction is a single Logical Unit of Work (LUW) comprising one or more SQL statements.");
        System.out.println("  - Fundamental Rule: Either EVERY operation succeeds (COMMIT) or ALL operations are undone (ROLLBACK).\n");

        System.out.println(">>> 2. THE CLASSIC MONEY TRANSFER SCENARIO:");
        System.out.println("  - Step 1: UPDATE accounts SET balance = balance - 5000 WHERE account_id = 'SWADEEP_101'");
        System.out.println("  - Step 2: UPDATE accounts SET balance = balance + 5000 WHERE account_id = 'DEBANGSHU_202'");
        System.out.println("  - Step 3: INSERT INTO transfer_audit_log VALUES ('SWADEEP_101', 'DEBANGSHU_202', 5000, NOW())\n");

        System.out.println(">>> WITHOUT TRANSACTIONS (Disaster):");
        System.out.println("  - If network fails after Step 1, Swadeep loses ₹5000 but Debangshu never receives it!");
        System.out.println(">>> WITH TRANSACTIONS (Reliable):");
        System.out.println("  - If network fails after Step 1, the entire transaction ROLLS BACK, restoring Swadeep's balance!");

        System.out.println("\n==========================================================================");
    }
}
