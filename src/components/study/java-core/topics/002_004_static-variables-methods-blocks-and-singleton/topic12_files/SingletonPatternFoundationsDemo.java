/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 12: The Singleton Design Pattern: Ensuring Exactly One Instance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class SingletonPatternFoundationsDemo {

    public static class CentralDatabaseConnectionPool {
        // Static variable to hold the ONE instance
        private static CentralDatabaseConnectionPool instance;

        private String connectionString;

        // 1. Private Constructor
        private CentralDatabaseConnectionPool() {
            this.connectionString = "jdbc:mysql://localhost:3306/coderaccotax_db";
            System.out.println("  [SINGLETON BORN] Central Connection Pool created on Heap!");
        }

        // 2. Global Static Access Point
        public static CentralDatabaseConnectionPool getInstance() {
            if (instance == null) {
                instance = new CentralDatabaseConnectionPool();
            }
            return instance;
        }

        public void printStatus() {
            System.out.println("  -> Pool active: " + connectionString + " (HashCode: " + System.identityHashCode(this) + ")");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 12: SINGLETON DESIGN PATTERN FOUNDATIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Requesting instance 1:");
        CentralDatabaseConnectionPool p1 = CentralDatabaseConnectionPool.getInstance();
        p1.printStatus();

        System.out.println("\n>>> 2. Requesting instance 2:");
        CentralDatabaseConnectionPool p2 = CentralDatabaseConnectionPool.getInstance();
        p2.printStatus();

        System.out.println("\n>>> 3. Verifying Identity (Both point to exact same memory):");
        System.out.println("  Is p1 == p2? " + (p1 == p2));

        System.out.println("\n==========================================================================");
    }
}