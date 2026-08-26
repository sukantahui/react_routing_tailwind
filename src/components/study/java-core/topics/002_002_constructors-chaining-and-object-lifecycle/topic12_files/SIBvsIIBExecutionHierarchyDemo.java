/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 12: Static Initialization Blocks (SIB) vs Instance Initialization Blocks (IIB)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

public class SIBvsIIBExecutionHierarchyDemo {

    public static class DatabaseConnector {

        // Static variable
        private static String databaseUrl;

        // STATIC INITIALIZATION BLOCK (SIB):
        // Executes ONCE when class is loaded into Metaspace by ClassLoader
        static {
            databaseUrl = "jdbc:mysql://localhost:3306/coderaccotax_barrackpore";
            System.out.println("  [SIB] Static Block Executed: Database Driver Loaded & URL Configured (ONCE)");
        }

        // Instance variable
        private String connectionId;

        // INSTANCE INITIALIZATION BLOCK (IIB):
        // Executes ON EVERY 'new' object instantiation
        {
            this.connectionId = "CONN-" + System.nanoTime() % 10000;
            System.out.println("  [IIB] Instance Block Executed: Allocated Connection ID: " + this.connectionId);
        }

        // Constructor
        public DatabaseConnector(String clientName) {
            System.out.printf("  [CONSTRUCTOR] Client '%s' bound to connection %s\n", clientName, this.connectionId);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: SIB VS IIB EXECUTION HIERARCHY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. First Object Creation (Triggers Class Loading -> SIB, then IIB, then Constructor):");
        DatabaseConnector c1 = new DatabaseConnector("Swadeep Paul");

        System.out.println("\n>>> 2. Second Object Creation (SIB does NOT re-run; only IIB + Constructor run):");
        DatabaseConnector c2 = new DatabaseConnector("Tuhina Das");

        System.out.println("\n>>> 3. Third Object Creation (Only IIB + Constructor run):");
        DatabaseConnector c3 = new DatabaseConnector("Abhronila Das");

        System.out.println("\n==========================================================================");
    }
}