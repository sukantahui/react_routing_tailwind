/**
 * Java Core Tutorial - Module 002_011: SOLID Object-Oriented Design Principles in Java
 * Topic 2: Refactoring Monolithic Classes into Cohesive Single-Purpose Services
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.solid;

public class MonolithicRefactoringCaseStudyDemo {

    // 1. DTO / Model Layer
    public static class Invoice {
        public String invoiceNumber;
        public double rawAmount;
        public Invoice(String num, double amount) { this.invoiceNumber = num; this.rawAmount = amount; }
    }

    // 2. Calculation Service (Financial Business Logic)
    public static class TaxCalculatorService {
        public double computeGst(double amount) {
            return amount * 0.18; // 18% GST in Barrackpore
        }
    }

    // 3. Document Generator Service (Rendering Engine)
    public static class InvoicePdfGenerator {
        public void generatePdf(Invoice inv, double tax) {
            System.out.printf("  [PDF ENGINE] Generated PDF for %s: Total = ₹%.2f (Base ₹%.2f + GST ₹%.2f)\n",
                    inv.invoiceNumber, (inv.rawAmount + tax), inv.rawAmount, tax);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: REFACTORING MONOLITHIC CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Invoice inv = new Invoice("INV-BKP-2026-001", 10000.0);
        TaxCalculatorService taxService = new TaxCalculatorService();
        InvoicePdfGenerator pdfService = new InvoicePdfGenerator();

        double gst = taxService.computeGst(inv.rawAmount);
        pdfService.generatePdf(inv, gst);

        System.out.println("\n>>> Benefits of Refactoring:");
        System.out.println("  - Changing GST tax brackets only touches TaxCalculatorService.");
        System.out.println("  - Changing PDF layout formatting only touches InvoicePdfGenerator.");

        System.out.println("\n==========================================================================");
    }
}