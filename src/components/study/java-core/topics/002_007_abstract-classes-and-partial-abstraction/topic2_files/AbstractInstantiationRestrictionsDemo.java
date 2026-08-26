/**
 * Java Core Tutorial - Module 002_007: Abstract Classes & Partial Abstraction
 * Topic 2: Why Abstract Classes CANNOT Be Directly Instantiated with 'new'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.abstraction;

public class AbstractInstantiationRestrictionsDemo {

    public abstract static class DatabaseConnector {
        // Abstract method without implementation body:
        public abstract void establishConnection();
    }

    public static class MySQLConnector extends DatabaseConnector {
        @Override
        public void establishConnection() {
            System.out.println("  [MYSQL] Connected via port 3306 to Barrackpore central DB.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: WHY ABSTRACT CLASSES CANNOT USE 'new' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. ATTEMPTING TO INSTANTIATE ABSTRACT CLASS DIRECTLY:
        // DatabaseConnector db = new DatabaseConnector(); // COMPILE ERROR!
        // Error: "DatabaseConnector is abstract; cannot be instantiated"

        System.out.println(">>> Why direct 'new DatabaseConnector()' is strictly illegal:");
        System.out.println("  1. Incomplete Definition: DatabaseConnector has abstract methods without code bodies.");
        System.out.println("  2. JVM Safety: If 'new' were allowed, calling 'db.establishConnection()' would crash");
        System.out.println("     because the JVM would have zero bytecodes to execute!");
        System.out.println("  3. Solution: Must instantiate a concrete subclass (e.g. MySQLConnector)!");

        System.out.println("\n>>> 2. Instantiating concrete subclass via superclass reference:");
        DatabaseConnector db = new MySQLConnector();
        db.establishConnection();

        System.out.println("\n==========================================================================");
    }
}