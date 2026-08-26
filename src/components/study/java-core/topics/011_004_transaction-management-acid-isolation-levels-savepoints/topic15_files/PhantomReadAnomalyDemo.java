/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 15: 3. Phantom Read - Row Insertion & Range Scan Anomalies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class PhantomReadAnomalyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 15: PHANTOM READ ANOMALY - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE PHANTOM READ COLLISION:");
        System.out.println("  Time T1 (Tx 1): SELECT * FROM students WHERE center = 'Barrackpore'; -> Returns 10 student rows.");
        System.out.println("  Time T2 (Tx 2): INSERT INTO students (name, center) VALUES ('Rohan Sen', 'Barrackpore');");
        System.out.println("  Time T3 (Tx 2): COMMIT; (Tx 2 insert is now committed!)");
        System.out.println("  Time T4 (Tx 1): SELECT * FROM students WHERE center = 'Barrackpore'; -> Returns 11 student rows!");
        System.out.println("  Time T5 (Result): A 'Phantom' 11th row appeared out of nowhere inside the SAME transaction! 👻\n");

        System.out.println(">>> NON-REPEATABLE READ VS PHANTOM READ:");
        System.out.println("  - Non-Repeatable Read : Modifies EXISTING row data (UPDATE).");
        System.out.println("  - Phantom Read        : Changes TOTAL ROW COUNT in range search (INSERT / DELETE).\n");

        System.out.println(">>> THE REMEDY:");
        System.out.println("  - Set isolation level to TRANSACTION_SERIALIZABLE (or rely on MySQL InnoDB Next-Key Locks).");

        System.out.println("\n==========================================================================");
    }
}
