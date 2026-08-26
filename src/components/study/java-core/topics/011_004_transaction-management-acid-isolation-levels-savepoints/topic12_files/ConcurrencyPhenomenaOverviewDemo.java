/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 12: Concurrency Phenomena - Multi-User Database Anomalies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConcurrencyPhenomenaOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: CONCURRENCY READ PHENOMENA - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 3 ANSI SQL READ ANOMALIES:");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  ANOMALY               SCENARIO DESCRIPTION                               PREVENTED BY");
        System.out.println("  --------------------------------------------------------------------------------------------------");
        System.out.println("  1. DIRTY READ         Tx A reads uncommitted modifications of Tx B.      READ COMMITTED +");
        System.out.println("                        Tx B then rolls back -> Tx A read ghost data!");
        System.out.println("  2. NON-REPEATABLE     Tx A reads row X. Tx B updates row X & commits.    REPEATABLE READ +");
        System.out.println("     READ               Tx A re-reads row X and sees DIFFERENT values!");
        System.out.println("  3. PHANTOM READ       Tx A queries WHERE range (e.g. 5 rows).            SERIALIZABLE");
        System.out.println("                        Tx B inserts a new matching row & commits.");
        System.out.println("                        Tx A re-queries same range -> Sees 6 rows! (Phantom)");
        System.out.println("  --------------------------------------------------------------------------------------------------");

        System.out.println("\n==========================================================================");
    }
}
