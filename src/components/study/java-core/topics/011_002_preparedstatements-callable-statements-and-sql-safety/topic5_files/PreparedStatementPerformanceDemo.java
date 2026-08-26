/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 5: PreparedStatement Performance - Plan Caching & Benchmark
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class PreparedStatementPerformanceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: PREPAREDSTATEMENT PERFORMANCE & PLAN CACHING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHY PREPAREDSTATEMENT RUNS 10x TO 50x FASTER IN BATCHES:");
        System.out.println("  1. STATEMENT (Uncached SQL String Parsing):");
        System.out.println("     - For 10,000 INSERT statements:");
        System.out.println("     - 10,000 Lexical SQL parse passes + 10,000 AST trees + 10,000 B-Tree optimizer calculations.");
        System.out.println("     - High database CPU spike and lock contention.\n");

        System.out.println("  2. PREPAREDSTATEMENT (Plan Cache Reuse):");
        System.out.println("     - Pre-compiles SQL template ONCE (1 parse pass + 1 optimizer plan).");
        System.out.println("     - Reuses same plan for all 10,000 rows!");
        System.out.println("     - Reduces DB CPU load by over 80%!\n");

        System.out.println(">>> CLIENT-SIDE STATEMENT CACHING (HikariCP / MySQL):");
        System.out.println("  - Driver property: 'cachePrepStmts=true&prepStmtCacheSize=250&prepStmtCacheSqlLimit=2048'");
        System.out.println("  - Keeps PreparedStatement instances cached in client RAM across multiple getConnection() calls!");

        System.out.println("\n==========================================================================");
    }
}
