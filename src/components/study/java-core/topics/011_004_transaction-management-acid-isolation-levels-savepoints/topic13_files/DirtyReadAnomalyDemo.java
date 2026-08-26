/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 13: 1. Dirty Read - Reading Uncommitted Modifications
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class DirtyReadAnomalyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: DIRTY READ ANOMALY STEP-BY-STEP - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE DIRTY READ TIMELINE COLLISION:");
        System.out.println("  Time T1 (Tx 1): UPDATE students SET scholarship = 50000.0 WHERE id = 101; (UNCOMMITTED!)");
        System.out.println("  Time T2 (Tx 2): SELECT scholarship FROM students WHERE id = 101; -> Reads 50000.0! (DIRTY READ!)");
        System.out.println("  Time T3 (Tx 2): Approves student for gold credit card based on 50000.0 scholarship!");
        System.out.println("  Time T4 (Tx 1): ROLLBACK; (Tx 1 fails; scholarship reverts to 0.0!)");
        System.out.println("  Time T5 (Result): Bank issued gold credit card for money that NEVER EXISTED! 🚨\n");

        System.out.println(">>> THE REMEDY:");
        System.out.println("  - Set isolation level to at least TRANSACTION_READ_COMMITTED.");
        System.out.println("  - Database engine will block Tx 2 or serve the last committed snapshot (0.0)!\n");

        System.out.println("==========================================================================");
    }
}
