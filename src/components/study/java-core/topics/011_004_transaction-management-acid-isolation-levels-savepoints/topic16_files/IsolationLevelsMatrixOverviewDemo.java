/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 16: The 4 Standard Isolation Levels - ANSI SQL & JDBC Matrix
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;

public class IsolationLevelsMatrixOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 16: THE 4 ISOLATION LEVELS IN JDBC - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE JDBC TRANSACTION ISOLATION MATRIX:");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  ISOLATION CONSTANT               VALUE  DIRTY READ  NON-REPEATABLE  PHANTOM  THROUGHPUT");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  TRANSACTION_READ_UNCOMMITTED     1      YES         YES             YES      MAXIMUM");
        System.out.println("  TRANSACTION_READ_COMMITTED       2      NO          YES             YES      HIGH (Default: Postgres/Oracle)");
        System.out.println("  TRANSACTION_REPEATABLE_READ      4      NO          NO              YES*     MEDIUM (Default: MySQL)");
        System.out.println("  TRANSACTION_SERIALIZABLE         8      NO          NO              NO       LOWEST");
        System.out.println("  -----------------------------------------------------------------------------------------");
        System.out.println("  *Note: MySQL InnoDB also prevents Phantoms in REPEATABLE_READ via Next-Key locks!\n");

        System.out.println("==========================================================================");
    }
}
