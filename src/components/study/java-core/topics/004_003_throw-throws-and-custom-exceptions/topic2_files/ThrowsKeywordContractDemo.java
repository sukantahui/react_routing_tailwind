/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 2: The 'throws' Keyword: Declaring Checked Exceptions as Part of API Contracts
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;

public class ThrowsKeywordContractDemo {

    // Method declaring 'throws' for Checked Exceptions (Part of the public API contract):
    public static void exportAcademyLedger(String filePath) throws IOException, SQLException {
        System.out.println("  [CONTRACT EXPORT] Exporting records to: " + filePath);

        if (filePath == null || filePath.isEmpty()) {
            throw new IOException("File path cannot be null or empty!");
        }

        if (filePath.endsWith(".corrupt")) {
            throw new SQLException("Database connection severed during ledger serialization!");
        }

        System.out.println("  [SUCCESS] Ledger exported cleanly to Barrackpore archive.");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: THE 'throws' KEYWORD CONTRACT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The Role of 'throws':");
        System.out.println("  - Declares to callers what checked exceptions this method might produce.");
        System.out.println("  - Enforces that callers must either catch them or declare them in their own 'throws' clause.");

        System.out.println("\n>>> 2. Invoking Method with Required Caller Handling:");
        try {
            exportAcademyLedger("barrackpore_accounts_2026.csv");
        } catch (IOException | SQLException e) {
            System.out.println("  [CALLER HANDLED] " + e.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}