/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 11: Savepoints for Partial Rollbacks - java.sql.Savepoint
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Savepoint;

public class SavepointsPartialRollbacksDemo {

    public static void executeNestedSavepointDemo(Connection conn) throws SQLException {
        conn.setAutoCommit(false); // Manual transaction

        try {
            // STEP 1: Mandatory core transaction operation
            System.out.println("   [TX]: Creating Student Profile (Swadeep Paul)...");

            // STEP 2: Establish a SAVEPOINT before optional operation
            Savepoint hostelBookingSavepoint = conn.setSavepoint("HOSTEL_BOOKING_POINT");
            System.out.println("   [SAVEPOINT]: Created checkpoint: " + hostelBookingSavepoint.getSavepointName());

            try {
                // STEP 3: Attempt optional operation (e.g. Hostel Room Allocation)
                System.out.println("   [TX]: Attempting optional hostel room allocation...");
                boolean hostelRoomsFull = true;

                if (hostelRoomsFull) {
                    throw new SQLException("Hostel is completely full!");
                }

            } catch (SQLException ex) {
                // STEP 4: PARTIAL ROLLBACK - Roll back ONLY to savepoint!
                System.err.println("   [PARTIAL ROLLBACK]: Hostel failed (" + ex.getMessage() + ") -> Rolling back hostel only!");
                conn.rollback(hostelBookingSavepoint);
                // Student Profile is STILL INTACT and NOT rolled back!
            }

            // STEP 5: Finalize and commit parent transaction
            conn.commit();
            System.out.println("   [TX SUCCESS]: Student Profile committed successfully without hostel!");

        } catch (Exception ex) {
            conn.rollback(); // Complete rollback if core profile fails
            throw ex;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 11: SAVEPOINTS & PARTIAL ROLLBACKS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> KEY METHODS OF java.sql.Savepoint:");
        System.out.println("  1. Savepoint sp = conn.setSavepoint();            // Anonymous savepoint");
        System.out.println("  2. Savepoint sp = conn.setSavepoint("CHECKPOINT"); // Named savepoint");
        System.out.println("  3. conn.rollback(sp);                             // Roll back to checkpoint only");
        System.out.println("  4. conn.releaseSavepoint(sp);                     // Frees savepoint resources from server");

        System.out.println("\n==========================================================================");
    }
}
