/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 0: Capstone Architecture & Requirements Breakdown
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

public class BankingArchitectureOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" CAPSTONE 1: CORE BANKING & FINANCIAL LEDGER ENGINE");
        System.out.println(" EDUCATOR: SUKANTA HUI | ACADEMIC HUB: BARRACKPORE, WB");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. CORE MISSION CRITICAL REQUIREMENTS:");
        System.out.println("  - Zero Floating Point Errors : 100% BigDecimal calculations with HALF_EVEN rounding.");
        System.out.println("  - Atomic Fund Transfers      : Strict ACID double-entry accounting (Debit from A and Credit to B in 1 Tx).");
        System.out.println("  - Immutable Audit Ledger     : Every single penny movement generates an immutable LedgerEntry record.");
        System.out.println("  - Thread Safety & Contention : High concurrency account updates without deadlock or race conditions.");
        System.out.println("  - Connection Pooling         : HikariCP backed connection pool with custom DAO layer.\n");

        System.out.println(">>> 2. ARCHITECTURAL LAYERS:");
        System.out.println("  [Presentation / CLI] ---> [BankingService] ---> [AccountDao & LedgerDao] ---> [HikariCP] ---> [Postgres/H2]");

        System.out.println("\n==========================================================================");
    }
}
