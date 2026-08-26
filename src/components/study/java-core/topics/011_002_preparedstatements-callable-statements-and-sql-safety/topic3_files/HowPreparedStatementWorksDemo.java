/**
 * Java Core Tutorial - Module 011_002: PreparedStatements, CallableStatements & SQL Safety
 * Topic 3: How PreparedStatement Works - Placeholders & DB Pre-Compilation
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class HowPreparedStatementWorksDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: HOW PREPAREDSTATEMENT WORKS UNDER THE HOOD - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 2-PHASE PREPAREDSTATEMENT EXECUTION PROTOCOL:");
        System.out.println("  PHASE 1: PRE-COMPILATION (conn.prepareStatement(sql)):");
        System.out.println("           - App sends: 'SELECT * FROM students WHERE center = ? AND fees > ?'");
        System.out.println("           - Database engine parses syntax, validates table/column names, checks permissions,");
        System.out.println("             generates cost-based B-Tree index scan execution plan, and stores it in Plan Cache!");
        System.out.println("           - Returns Statement Handle ID to client.\n");

        System.out.println("  PHASE 2: PARAMETER BINDING & EXECUTION (pstmt.executeQuery()):");
        System.out.println("           - App binds: [1 -> "Barrackpore", 2 -> 4000.0]");
        System.out.println("           - App sends ONLY binary data values alongside the Statement Handle ID.");
        System.out.println("           - Database engine runs the cached execution plan immediately with zero re-parsing!\n");

        System.out.println(">>> RESULT: Blistering speed and zero possibility of SQL injection!");
        System.out.println("==========================================================================");
    }
}
