/**
 * Java Core Tutorial - Module 004_003: Throw, Throws & Custom Exceptions
 * Topic 7: Creating Custom Checked Exceptions: Extending java.lang.Exception
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.exceptions;

// Custom CHECKED Exception (Extends java.lang.Exception):
public class GSTINValidationException extends Exception {

    private final String invalidGstin;

    public GSTINValidationException(String message, String gstin) {
        super(message);
        this.invalidGstin = gstin;
    }

    public String getInvalidGstin() { return invalidGstin; }
}

class GstBillingSystemDemo {

    // Checked exception MUST be declared in 'throws' signature:
    public static void generateAccoTaxInvoice(String gstin, double invoiceAmount)
            throws GSTINValidationException {

        if (gstin == null || gstin.length() != 15) {
            throw new GSTINValidationException("Indian GSTIN must be exactly 15 alphanumeric characters!", gstin);
        }

        System.out.printf("  [INVOICE CREATED] GSTIN: %s | Amount: %.2f INR%n", gstin, invoiceAmount);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: CUSTOM CHECKED EXCEPTIONS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Valid GST Invoice Generation:");
        try {
            generateAccoTaxInvoice("19AAAAA0000A1Z5", 45000.0);
        } catch (GSTINValidationException e) {
            System.out.println("  [ERROR] " + e.getMessage());
        }

        System.out.println("\n>>> 2. Triggering Custom Checked Exception (Caller MUST handle):");
        try {
            generateAccoTaxInvoice("INVALID_GST", 12000.0);
        } catch (GSTINValidationException e) {
            System.out.println("  [CHECKED EXCEPTION CAUGHT] " + e.getMessage());
            System.out.println("  [CORRECTION AUDIT] Rejected GSTIN: " + e.getInvalidGstin());
        }

        System.out.println("\n==========================================================================");
    }
}