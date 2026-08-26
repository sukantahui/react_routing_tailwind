/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 2: Atomicity - All-Or-Nothing Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class AtomicityAllOrNothingDemo {

    public static void enrollStudentAtomically(Connection conn, int studentId, String name, double initialFee) throws SQLException {
        // Step 1: Disable Auto-Commit to establish Atomic Boundary:
        boolean originalAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false);

        String sqlStudent = "INSERT INTO students (student_id, name) VALUES (?, ?)";
        String sqlLedger  = "INSERT INTO fee_ledger (student_id, amount_paid, payment_date) VALUES (?, ?, NOW())";

        try (PreparedStatement ps1 = conn.prepareStatement(sqlStudent);
             PreparedStatement ps2 = conn.prepareStatement(sqlLedger)) {

            // Action 1: Insert student profile
            ps1.setInt(1, studentId);
            ps1.setString(2, name);
            ps1.executeUpdate();

            // Action 2: Insert initial fee receipt
            ps2.setInt(1, studentId);
            ps2.setDouble(2, initialFee);
            ps2.executeUpdate();

            // Step 2: If BOTH actions succeed, COMMIT ATOMICALLY!
            conn.commit();
            System.out.println("   [ATOMICITY]: Student enrolled and fee ledger recorded successfully! ✅");

        } catch (SQLException ex) {
            // Step 3: If ANY exception occurs, ROLLBACK ATOMICALLY!
            conn.rollback();
            System.err.println("   [ATOMICITY]: Enrollment failed! Rolled back both records cleanly! ❌ (" + ex.getMessage() + ")");
            throw ex;
        } finally {
            // Step 4: Restore original auto-commit status
            conn.setAutoCommit(originalAutoCommit);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: ATOMICITY (ALL-OR-NOTHING EXECUTION) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE ATOMIC GUARANTEE:");
        System.out.println("  - 100% Success -> commit()");
        System.out.println("  - Partial Error -> rollback() -> Zero side-effects left behind in database!");

        System.out.println("\n==========================================================================");
    }
}
