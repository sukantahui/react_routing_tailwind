/**
 * Java Core Tutorial - Module 002_008: Interfaces, Default/Static Methods & Multiple Inheritance
 * Topic 5: Traditional Interface Methods: Implicitly 'public abstract'
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.interfaces;

public class TraditionalInterfaceMethodsDemo {

    public interface DatabaseOperations {
        // Both declarations are 100% equivalent in bytecode:
        void insertRecord(String table, String data);
        public abstract void deleteRecord(String table, int recordId);
    }

    public static class MySQLDatabaseOps implements DatabaseOperations {
        @Override
        public void insertRecord(String table, String data) {
            System.out.printf("  [MYSQL INSERT] INSERT INTO %s VALUES ('%s')\n", table, data);
        }

        @Override
        public void deleteRecord(String table, int recordId) {
            System.out.printf("  [MYSQL DELETE] DELETE FROM %s WHERE id = %d\n", table, recordId);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: TRADITIONAL INTERFACE METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        DatabaseOperations db = new MySQLDatabaseOps();
        db.insertRecord("trainees", "Swadeep Paul, Barrackpore");
        db.deleteRecord("trainees", 101);

        System.out.println("\n==========================================================================");
    }
}