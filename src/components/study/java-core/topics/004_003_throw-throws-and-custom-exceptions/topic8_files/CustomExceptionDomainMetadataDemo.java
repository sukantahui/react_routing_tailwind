/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 8: Rich Domain Metadata in Custom Exceptions: ErrorCodes, Timestamps & Audit IDs
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

import java.time.Instant;

public class CustomExceptionDomainMetadataDemo {

    public static class PaymentProcessingException extends RuntimeException {
        private final String errorCode;
        private final String transactionId;
        private final String studentId;
        private final Instant errorTimestamp;

        public PaymentProcessingException(String errorCode, String txId, String studentId, String message) {
            super(message);
            this.errorCode = errorCode;
            this.transactionId = txId;
            this.studentId = studentId;
            this.errorTimestamp = Instant.now();
        }

        public String getErrorCode() { return errorCode; }
        public String getTransactionId() { return transactionId; }
        public String getStudentId() { return studentId; }
        public Instant getErrorTimestamp() { return errorTimestamp; }
    }

    public static void executePayment(String studentId, String txId, double amount) {
        if (amount <= 0) {
            throw new PaymentProcessingException(
                    "PAY_ERR_4001",
                    txId,
                    studentId,
                    "Invalid payment amount: " + amount + " INR"
            );
        }
        System.out.println("  [SUCCESS] Payment processed: " + amount + " INR");
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: RICH EXCEPTION METADATA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        try {
            executePayment("STU_BP_9021", "TX_NHT_55442", -500.0);
        } catch (PaymentProcessingException ex) {
            System.out.println(">>> 1. Intercepted Enterprise Exception Object:");
            System.out.println("  Exception Message : " + ex.getMessage());
            System.out.println("  Error Code        : " + ex.getErrorCode());
            System.out.println("  Transaction ID    : " + ex.getTransactionId());
            System.out.println("  Student ID        : " + ex.getStudentId());
            System.out.println("  Timestamp (UTC)   : " + ex.getErrorTimestamp());
        }

        System.out.println("\n==========================================================================");
    }
}