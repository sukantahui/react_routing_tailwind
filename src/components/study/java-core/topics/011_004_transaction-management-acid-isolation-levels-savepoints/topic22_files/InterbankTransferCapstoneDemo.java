/**
 * Java Core Tutorial - Module 011_004: Transaction Management, ACID, Isolation Levels & Savepoints
 * Topic 22: Inter-Bank Transfer - Debit/Credit Atomicity Transaction Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class InterbankTransferCapstoneDemo {

    public static boolean transferFunds(Connection conn, String fromAccount, String toAccount, double amount) throws SQLException {
        if (amount <= 0.0) {
            throw new IllegalArgumentException("Transfer amount must be positive!");
        }

        boolean previousAutoCommit = conn.getAutoCommit();
        conn.setAutoCommit(false); // START ATOMIC TRANSACTION

        String checkBalanceSql = "SELECT balance FROM accounts WHERE account_num = ? FOR UPDATE"; // Exclusive Row Lock!
        String debitSql        = "UPDATE accounts SET balance = balance - ? WHERE account_num = ?";
        String creditSql       = "UPDATE accounts SET balance = balance + ? WHERE account_num = ?";
        String auditSql        = "INSERT INTO transfer_logs (sender, receiver, amount, timestamp) VALUES (?, ?, ?, NOW())";

        try (PreparedStatement psCheck = conn.prepareStatement(checkBalanceSql);
             PreparedStatement psDebit = conn.prepareStatement(debitSql);
             PreparedStatement psCredit = conn.prepareStatement(creditSql);
             PreparedStatement psAudit = conn.prepareStatement(auditSql)) {

            // Step 1: Lock and check sender's balance (FOR UPDATE)
            psCheck.setString(1, fromAccount);
            try (ResultSet rs = psCheck.executeQuery()) {
                if (!rs.next()) {
                    throw new SQLException("Sender account not found: " + fromAccount);
                }
                double currentBalance = rs.getDouble("balance");
                if (currentBalance < amount) {
                    throw new SQLException("Insufficient funds! Available: ₹" + currentBalance + ", Requested: ₹" + amount);
                }
            }

            // Step 2: Debit sender account
            psDebit.setDouble(1, amount);
            psDebit.setString(2, fromAccount);
            psDebit.executeUpdate();

            // Step 3: Credit receiver account
            psCredit.setDouble(1, amount);
            psCredit.setString(2, toAccount);
            int updatedReceiver = psCredit.executeUpdate();
            if (updatedReceiver == 0) {
                throw new SQLException("Receiver account not found: " + toAccount);
            }

            // Step 4: Write audit log
            psAudit.setString(1, fromAccount);
            psAudit.setString(2, toAccount);
            psAudit.setDouble(3, amount);
            psAudit.executeUpdate();

            // Step 5: ALL STEPS SUCCEEDED -> COMMIT ATOMIC TRANSACTION!
            conn.commit();
            System.out.println("   [TRANSFER SUCCESS]: ₹" + amount + " transferred atomically from " + fromAccount + " to " + toAccount + "! ✅");
            return true;

        } catch (Exception ex) {
            // Step 6: ANY FAILURE -> ROLLBACK COMPLETELY!
            System.err.println("   [TRANSFER FAILED]: " + ex.getMessage() + " -> Rolling back entire transaction! 🛡️");
            conn.rollback();
            return false;

        } finally {
            // Step 7: Restore connection auto-commit
            conn.setAutoCommit(previousAutoCommit);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 22: INTER-BANK TRANSFER ATOMICITY CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE COMPLETE 7-STEP FINANCIAL TRANSACTION BLUEPRINT:");
        System.out.println("  1. conn.setAutoCommit(false);");
        System.out.println("  2. 'SELECT ... FOR UPDATE' to acquire pessimistic exclusive lock and verify balance.");
        System.out.println("  3. Execute Debit DML.");
        System.out.println("  4. Execute Credit DML.");
        System.out.println("  5. Insert Audit Trail DML.");
        System.out.println("  6. conn.commit() in try block; conn.rollback() in catch block.");
        System.out.println("  7. Restore conn.setAutoCommit(true) in finally block.\n");

        System.out.println("==========================================================================");
        System.out.println(" MODULE 011_004 COMPLETE: TRANSACTION MANAGEMENT & ACID MASTERED!");
        System.out.println("==========================================================================");
    }
}
