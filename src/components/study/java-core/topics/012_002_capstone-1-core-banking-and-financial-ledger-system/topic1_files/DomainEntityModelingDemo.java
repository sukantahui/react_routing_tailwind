/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 1: Domain Entity Modeling - Records & Value Objects
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public class DomainEntityModelingDemo {

    public enum AccountStatus { ACTIVE, FROZEN, CLOSED }
    public enum TransactionType { DEPOSIT, WITHDRAWAL, TRANSFER_DEBIT, TRANSFER_CREDIT }

    // 1. Immutable Audit Ledger Entry Record:
    public record LedgerEntry(
        UUID entryId,
        UUID transactionId,
        String accountNumber,
        TransactionType type,
        BigDecimal amount,
        Instant timestamp
    ) {}

    // 2. Customer Record:
    public record Customer(
        String customerId,
        String fullName,
        String email,
        String branchCenter
    ) {}

    // 3. Bank Account Entity:
    public static class BankAccount {
        private final String accountNumber;
        private final String customerId;
        private BigDecimal balance;
        private AccountStatus status;

        public BankAccount(String accNo, String custId, BigDecimal initialBalance) {
            this.accountNumber = accNo;
            this.customerId = custId;
            this.balance = initialBalance;
            this.status = AccountStatus.ACTIVE;
        }

        public String getAccountNumber() { return accountNumber; }
        public String getCustomerId() { return customerId; }
        public BigDecimal getBalance() { return balance; }
        public AccountStatus getStatus() { return status; }

        public void updateBalance(BigDecimal newBalance) { this.balance = newBalance; }
        public void setStatus(AccountStatus status) { this.status = status; }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: DOMAIN ENTITY MODELING - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        LedgerEntry entry = new LedgerEntry(
            UUID.randomUUID(),
            UUID.randomUUID(),
            "SB-BKP-2026-101",
            TransactionType.DEPOSIT,
            new BigDecimal("25000.00"),
            Instant.now()
        );

        System.out.println("Created Immutable Ledger Entry:
  " + entry);
        System.out.println("\n==========================================================================");
    }
}
