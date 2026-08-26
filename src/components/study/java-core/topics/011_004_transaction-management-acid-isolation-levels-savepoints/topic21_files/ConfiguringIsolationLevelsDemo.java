/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 21: Configuring Isolation Levels - conn.setTransactionIsolation()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;

public class ConfiguringIsolationLevelsDemo {

    public static void inspectAndConfigureIsolation(Connection conn) throws SQLException {
        DatabaseMetaData meta = conn.getMetaData();

        // 1. Inspect default and supported levels:
        System.out.println("   [DB INFO]: Default Isolation Level = " + meta.getDefaultTransactionIsolation());
        System.out.println("   [DB INFO]: Supports READ COMMITTED  = " + meta.supportsTransactionIsolationLevel(Connection.TRANSACTION_READ_COMMITTED));
        System.out.println("   [DB INFO]: Supports SERIALIZABLE    = " + meta.supportsTransactionIsolationLevel(Connection.TRANSACTION_SERIALIZABLE));

        // 2. Read current connection isolation:
        int currentLevel = conn.getTransactionIsolation();
        System.out.println("   [CONNECTION]: Current Active Level  = " + currentLevel);

        // 3. Change connection isolation level:
        conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
        System.out.println("   [CONNECTION]: Successfully updated to READ_COMMITTED! ✅");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 21: CONFIGURING ISOLATION LEVELS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY RULES FOR SETTING ISOLATION IN JDBC:");
        System.out.println("  1. Timing Rule : Call setTransactionIsolation() BEFORE beginning a transaction.");
        System.out.println("  2. Scope Rule  : The setting applies to all subsequent transactions on THIS connection.");
        System.out.println("  3. Pool Rule   : HikariCP allows configuring default isolation across the entire pool: 'config.setTransactionIsolation("TRANSACTION_READ_COMMITTED");'");

        System.out.println("\n==========================================================================");
    }
}
