/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 8: Committing Transactions - connection.commit()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class CommittingTransactionsDemo {

    public static void processScholarshipDistribution(Connection conn, int studentId, double amount) throws SQLException {
        conn.setAutoCommit(false); // Begin transaction

        String debitAcademyFund = "UPDATE academy_funds SET balance = balance - ? WHERE center = 'Barrackpore'";
        String creditStudent    = "UPDATE students SET scholarship = scholarship + ? WHERE student_id = ?";

        try (PreparedStatement ps1 = conn.prepareStatement(debitAcademyFund);
             PreparedStatement ps2 = conn.prepareStatement(creditStudent)) {

            // Step 1: Debit academy treasury
            ps1.setDouble(1, amount);
            ps1.executeUpdate();

            // Step 2: Credit student scholarship
            ps2.setDouble(1, amount);
            ps2.setInt(2, studentId);
            ps2.executeUpdate();

            // Step 3: COMMIT FLUSH
            conn.commit();
            System.out.println("   [SUCCESS]: Scholarship distributed and transaction committed!");

        } catch (SQLException ex) {
            conn.rollback();
            throw ex;
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: COMMITTING TRANSACTIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> WHAT HAPPENS DURING conn.commit():");
        System.out.println("  1. Flushes modified buffer pages into Write-Ahead Log (WAL) on disk.");
        System.out.println("  2. Releases all Exclusive Locks (X-Locks) held on modified rows.");
        System.out.println("  3. Makes changes permanently visible to other database users.");
        System.out.println("  4. Starts a new empty transaction automatically for the connection.");

        System.out.println("\n==========================================================================");
    }
}
