/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 2: Database Schema Design - Relational Ledger Tables
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

public class DatabaseSchemaDesignDemo {

    public static final String CREATE_ACCOUNTS_TABLE = """
        CREATE TABLE accounts (
            account_number VARCHAR(30) PRIMARY KEY,
            customer_id VARCHAR(30) NOT NULL,
            balance DECIMAL(15, 2) NOT NULL CHECK (balance >= 0.00),
            status VARCHAR(15) NOT NULL DEFAULT 'ACTIVE',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """;

    public static final String CREATE_LEDGER_TABLE = """
        CREATE TABLE ledger_entries (
            entry_id VARCHAR(36) PRIMARY KEY,
            transaction_id VARCHAR(36) NOT NULL,
            account_number VARCHAR(30) NOT NULL,
            type VARCHAR(20) NOT NULL,
            amount DECIMAL(15, 2) NOT NULL,
            timestamp TIMESTAMP NOT NULL,
            FOREIGN KEY (account_number) REFERENCES accounts(account_number)
        );
        CREATE INDEX idx_ledger_acc ON ledger_entries(account_number);
        CREATE INDEX idx_ledger_tx ON ledger_entries(transaction_id);
        """;

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: DATABASE SCHEMA DESIGN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. ACCOUNTS DDL:
" + CREATE_ACCOUNTS_TABLE);
        System.out.println(">>> 2. LEDGER DDL & INDEXES:
" + CREATE_LEDGER_TABLE);

        System.out.println("==========================================================================");
    }
}
