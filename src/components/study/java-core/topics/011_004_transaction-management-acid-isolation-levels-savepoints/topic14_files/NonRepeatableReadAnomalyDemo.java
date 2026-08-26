/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 14: 2. Non-Repeatable Read - Row Value Mutation on Re-Query
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

public class NonRepeatableReadAnomalyDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: NON-REPEATABLE READ ANOMALY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE NON-REPEATABLE READ COLLISION:");
        System.out.println("  Time T1 (Tx 1): SELECT course_fee FROM courses WHERE id = 'JAVA_101'; -> Returns ₹4,000");
        System.out.println("  Time T2 (Tx 2): UPDATE courses SET course_fee = 6000 WHERE id = 'JAVA_101';");
        System.out.println("  Time T3 (Tx 2): COMMIT; (Tx 2 is now permanently committed!)");
        System.out.println("  Time T4 (Tx 1): SELECT course_fee FROM courses WHERE id = 'JAVA_101'; -> Returns ₹6,000!");
        System.out.println("  Time T5 (Result): Inside the SAME transaction (Tx 1), querying the exact same row");
        System.out.println("                    returned two DIFFERENT values (4,000 vs 6,000)! (Non-Repeatable Read!)\n");

        System.out.println(">>> THE REMEDY:");
        System.out.println("  - Set isolation level to TRANSACTION_REPEATABLE_READ or TRANSACTION_SERIALIZABLE.");
        System.out.println("  - In REPEATABLE READ, Tx 1 will see ₹4,000 consistently throughout its entire lifetime!");

        System.out.println("\n==========================================================================");
    }
}
