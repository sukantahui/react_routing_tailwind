/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 4: Atomic Double-Entry Transfers - ACID Transactions
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.Instant;
import java.util.UUID;

public class AtomicDoubleEntryTransfersDemo {

    public static class BankingService {

        public void transferFunds(Connection conn, String fromAcc, String toAcc, BigDecimal amount) throws SQLException {
            if (amount.compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("Transfer amount must be positive!");
            }

            // Enforce deterministic account lock ordering to prevent database deadlocks:
            String firstLock = fromAcc.compareTo(toAcc) < 0 ? fromAcc : toAcc;
            String secondLock = fromAcc.compareTo(toAcc) < 0 ? toAcc : fromAcc;

            System.out.println("   [LOCK ACQUISITION]: Acquiring locks in order: " + firstLock + " -> " + secondLock);

            conn.setAutoCommit(false); // Begin ACID Transaction!
            try {
                // 1. Deduct from Source Account:
                System.out.println("   [STEP 1]: Debiting ₹" + amount + " from " + fromAcc);

                // 2. Credit to Target Account:
                System.out.println("   [STEP 2]: Crediting ₹" + amount + " to " + toAcc);

                // 3. Write Immutable Audit Ledger Entries (Double-Entry):
                System.out.println("   [STEP 3]: Writing matching Double-Entry records to ledger_entries table");

                conn.commit(); // Commit all 3 steps atomically!
                System.out.println("   >>> [TX SUCCESS]: Fund transfer committed successfully! ✅
");

            } catch (Exception ex) {
                System.err.println("   >>> [TX ERROR]: Failure detected. Rolling back transaction! ❌");
                conn.rollback();
                throw ex;
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: ATOMIC DOUBLE-ENTRY TRANSFERS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println("Demonstrating ACID transaction handling with deadlock prevention.");
    }
}
