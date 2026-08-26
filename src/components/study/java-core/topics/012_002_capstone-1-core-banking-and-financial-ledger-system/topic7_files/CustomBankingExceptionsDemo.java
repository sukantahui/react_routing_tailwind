/**
 * Java Core Tutorial - Module 012_002: Core Banking Capstone
 * Topic 7: Custom Banking Exceptions - Domain Error Hierarchy
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.banking;

import java.math.BigDecimal;

public class CustomBankingExceptionsDemo {

    // Base Domain Exception:
    public static class BankingException extends RuntimeException {
        private final String errorCode;

        public BankingException(String errorCode, String message) {
            super(message);
            this.errorCode = errorCode;
        }

        public String getErrorCode() { return errorCode; }
    }

    // Specific Domain Exceptions:
    public static class InsufficientFundsException extends BankingException {
        private final String accountNumber;
        private final BigDecimal availableBalance;
        private final BigDecimal attemptedAmount;

        public InsufficientFundsException(String accNo, BigDecimal available, BigDecimal attempted) {
            super("BANK-4001", "Insufficient balance in account " + accNo + ". Available: ₹" + available + ", Attempted: ₹" + attempted);
            this.accountNumber = accNo;
            this.availableBalance = available;
            this.attemptedAmount = attempted;
        }
    }

    public static class AccountFrozenException extends BankingException {
        public AccountFrozenException(String accNo) {
            super("BANK-4003", "Account " + accNo + " is frozen by compliance.");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CUSTOM BANKING DOMAIN EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try {
            System.out.println("Attempting withdrawal of ₹50,000 from account with ₹10,000 balance...");
            throw new InsufficientFundsException("SB-BKP-101", new BigDecimal("10000.00"), new BigDecimal("50000.00"));
        } catch (InsufficientFundsException ex) {
            System.err.println("Caught Domain Error [" + ex.getErrorCode() + "]: " + ex.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}
