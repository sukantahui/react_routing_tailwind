/**
 * Java Core Tutorial - Module 011_001: JDBC Architecture, Drivers & Connection Pooling (HikariCP)
 * Topic 5: The Connection Interface - java.sql.Connection
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class ConnectionInterfaceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: THE java.sql.Connection INTERFACE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY METHODS OF THE java.sql.Connection INTERFACE:");
        System.out.println("  1. STATEMENT FACTORIES:");
        System.out.println("     - conn.createStatement()                    : Creates generic SQL statement.");
        System.out.println("     - conn.prepareStatement(sql)                : Creates pre-compiled parametrized statement.");
        System.out.println("     - conn.prepareCall(sql)                     : Creates stored procedure call statement.\n");

        System.out.println("  2. TRANSACTION MANAGEMENT:");
        System.out.println("     - conn.setAutoCommit(false)                 : Disables auto-commit; begins manual transaction.");
        System.out.println("     - conn.commit()                             : Flushes and permanently persists transaction changes.");
        System.out.println("     - conn.rollback()                           : Reverts all uncommitted changes upon error.\n");

        System.out.println("  3. HEALTH & SESSION METADATA:");
        System.out.println("     - conn.isValid(int timeoutSeconds)          : Checks if TCP socket and DB session are active.");
        System.out.println("     - conn.getMetaData()                        : Returns DatabaseMetaData (tables, versions, dialects).");
        System.out.println("     - conn.close()                              : Closes socket (or returns connection to connection pool).");

        System.out.println("\n==========================================================================");
    }
}
