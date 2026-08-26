/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 4: Functional Interfaces: The Single Abstract Method (SAM) Contract
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

// 1. VALID FUNCTIONAL INTERFACE (Exactly ONE abstract method):
@FunctionalInterface
interface InvoiceValidator {

    // THE SINGLE ABSTRACT METHOD (SAM):
    boolean validate(double invoiceAmount, String clientGst);

    // DEFAULT METHODS DO NOT COUNT AGAINST SAM:
    default void printAuditHeader() {
        System.out.println("--- Barrackpore Tax Audit Header ---");
    }

    // STATIC METHODS DO NOT COUNT AGAINST SAM:
    static String getRegulationVersion() {
        return "GST-ACT-2026-V4";
    }

    // OBJECT CLASS METHOD OVERRIDES DO NOT COUNT AGAINST SAM:
    @Override
    boolean equals(Object obj);
}

public class FunctionalInterfaceSamContractDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: FUNCTIONAL INTERFACES & THE SAM RULE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // Implementing the SAM via a clean Lambda:
        InvoiceValidator validator = (amount, gst) -> amount > 0 && gst.startsWith("19"); // West Bengal GST code = 19

        validator.printAuditHeader();
        boolean valid = validator.validate(150000.0, "19AAACB1234F1Z5");
        System.out.println(">>> Invoice Validation Result: " + (valid ? "✅ VALID WB INVOICE" : "❌ INVALID"));
        System.out.println("  Regulation Version: " + InvoiceValidator.getRegulationVersion());

        System.out.println("\n==========================================================================");
    }
}