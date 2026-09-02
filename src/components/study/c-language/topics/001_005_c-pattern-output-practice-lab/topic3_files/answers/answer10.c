#include <stdio.h>
#include <stdbool.h>

#define TARIFF_SLAB1_RATE 4.50
#define TARIFF_SLAB2_RATE 6.00
#define TARIFF_SLAB3_RATE 7.50
#define TARIFF_SLAB4_RATE 9.00

#define FIXED_CHARGE 150.00
#define GST_RATE 0.18

typedef struct {
    int consumerNumber;
    char name[50];
    double previousReading;
    double currentReading;
    double unitsConsumed;
    double energyCharge;
    double fixedCharge;
    double subtotal;
    double gstAmount;
    double totalBillAmount;
} ElectricityBill;

double calculateEnergyCharges(double units) {
    double charges = 0.0;
    if (units <= 100) {
        charges = units * TARIFF_SLAB1_RATE;
    } else if (units <= 200) {
        charges = (100 * TARIFF_SLAB1_RATE) + ((units - 100) * TARIFF_SLAB2_RATE);
    } else if (units <= 400) {
        charges = (100 * TARIFF_SLAB1_RATE) + (100 * TARIFF_SLAB2_RATE) + ((units - 200) * TARIFF_SLAB3_RATE);
    } else {
        charges = (100 * TARIFF_SLAB1_RATE) + (100 * TARIFF_SLAB2_RATE) + (200 * TARIFF_SLAB3_RATE) + ((units - 400) * TARIFF_SLAB4_RATE);
    }
    return charges;
}

void generateBill(ElectricityBill *bill) {
    static int invoiceCounter = 5001;
    
    bill->unitsConsumed = bill->currentReading - bill->previousReading;
    bill->energyCharge = calculateEnergyCharges(bill->unitsConsumed);
    bill->fixedCharge = FIXED_CHARGE;
    bill->subtotal = bill->energyCharge + bill->fixedCharge;
    bill->gstAmount = bill->subtotal * GST_RATE;
    bill->totalBillAmount = bill->subtotal + bill->gstAmount;

    printf("=============================================================\n");
    printf("   WEST BENGAL STATE ELECTRICITY UTILITY - BILL RECEIPT      \n");
    printf("   INVOICE REF NO: WBSEDCL/%d/2026                           \n", invoiceCounter++);
    printf("=============================================================\n");
    printf("Consumer No      : %d\n", bill->consumerNumber);
    printf("Consumer Name    : %s\n", bill->name);
    printf("Previous Reading : %10.2f kWh\n", bill->previousReading);
    printf("Current Reading  : %10.2f kWh\n", bill->currentReading);
    printf("Units Consumed   : %10.2f kWh\n", bill->unitsConsumed);
    printf("-------------------------------------------------------------\n");
    printf("TARIFF BREAKDOWN:                          AMOUNT (INR)\n");
    printf("  • Energy Slab Charges                    : %12.2f\n", bill->energyCharge);
    printf("  • Monthly Fixed Meter Charge             : %12.2f\n", bill->fixedCharge);
    printf("  SUBTOTAL (Taxable Amount)                : %12.2f\n", bill->subtotal);
    printf("  • GST @ 18.00%%                           : %12.2f\n", bill->gstAmount);
    printf("=============================================================\n");
    printf("TOTAL AMOUNT PAYABLE (INR)                 : %12.2f\n", bill->totalBillAmount);
    printf("=============================================================\n");
}

int main(void) {
    ElectricityBill bill1 = {884102, "Sukanta Hui", 1450.0, 1835.0};
    generateBill(&bill1);
    return 0;
}
