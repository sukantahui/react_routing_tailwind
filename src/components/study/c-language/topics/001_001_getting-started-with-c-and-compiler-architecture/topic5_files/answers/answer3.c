/**
 * ============================================================================
 * Project 3: Commercial Grocery Invoice & GST Billing Engine
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("=======================================================================\n");
    printf("     CODER & ACCOTAX SUPERMART - BARRACKPORE INVOICE\n");
    printf("     GSTIN: 19ABCDE1234F1Z5 | Date: 02/09/2026\n");
    printf("=======================================================================\n");

    /* Item Details */
    const char *items[] = {"Basmati Rice (5kg)", "Refined Oil (1L)", "Dairy Milk (500ml)", "Whole Wheat Flour", "Almonds (250g)"};
    int quantities[] = {2, 3, 4, 1, 2};
    double unitPrices[] = {450.00, 165.50, 32.00, 380.00, 240.00};
    int itemCount = sizeof(quantities) / sizeof(quantities[0]);

    printf("%-4s %-25s %5s %12s %12s\n", "SL", "ITEM DESCRIPTION", "QTY", "RATE (INR)", "AMOUNT (INR)");
    printf("-----------------------------------------------------------------------\n");

    double subtotal = 0.0;
    for (int i = 0; i < itemCount; i++) {
        double lineTotal = quantities[i] * unitPrices[i];
        subtotal += lineTotal;
        printf("%-4d %-25s %5d %12.2f %12.2f\n", i + 1, items[i], quantities[i], unitPrices[i], lineTotal);
    }

    /* Tax Calculations */
    double cgst = subtotal * 0.09; // 9% Central GST
    double sgst = subtotal * 0.09; // 9% State GST
    double grandTotal = subtotal + cgst + sgst;

    printf("-----------------------------------------------------------------------\n");
    printf("%-48s %12.2f\n", "SUBTOTAL (Taxable Amount):", subtotal);
    printf("%-48s %12.2f\n", "CGST @ 9.00%:", cgst);
    printf("%-48s %12.2f\n", "SGST @ 9.00%:", sgst);
    printf("=======================================================================\n");
    printf("%-48s %12.2f\n", "FINAL INVOICE GRAND TOTAL (INR):", grandTotal);
    printf("=======================================================================\n");
    printf("             Thank you for shopping at Coder & AccoTax!\n");

    return 0;
}
