/**
 * ============================================================================
 * Program: Module2ProjectsDemo.c
 * Module: 001_002 - C Tokens, Data Types & Operator Mechanics
 * Topic 6: Hands-on Projects & Lab Solutions
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

/* ============================================================================
 * PROJECT 1: Bitwise Hardware Status Register & Flags Inspector
 * Demonstrates bitwise masks, shifts, bit setting, clearing, and testing
 * ============================================================================ */
#define FLAG_POWER_ON     (1 << 0)  /* Bit 0: 0000 0001 */
#define FLAG_SENSOR_READY (1 << 1)  /* Bit 1: 0000 0010 */
#define FLAG_TX_ACTIVE    (1 << 2)  /* Bit 2: 0000 0100 */
#define FLAG_RX_BUFFER    (1 << 3)  /* Bit 3: 0000 1000 */
#define FLAG_ERROR_ALERT  (1 << 4)  /* Bit 4: 0001 0000 */

void runProject1_BitwiseRegister(void) {
    uint8_t statusRegister = 0x00;

    printf("\n=== PROJECT 1: BITWISE STATUS REGISTER & FLAGS INSPECTOR ===\n");
    printf("Initial Register State: 0x%02X\n", statusRegister);

    /* 1. Turn ON Power and Sensor Ready */
    statusRegister |= (FLAG_POWER_ON | FLAG_SENSOR_READY);
    printf("After Power & Sensor Init : 0x%02X\n", statusRegister);

    /* 2. Turn ON Transmit Active */
    statusRegister |= FLAG_TX_ACTIVE;
    printf("After Transmit Activated  : 0x%02X\n", statusRegister);

    /* 3. Check individual flag status */
    printf("Is Sensor Ready?          : %s\n", (statusRegister & FLAG_SENSOR_READY) ? "YES" : "NO");
    printf("Is Error Alert Active?    : %s\n", (statusRegister & FLAG_ERROR_ALERT) ? "YES" : "NO");

    /* 4. Simulate Error Alert and Clear Transmit */
    statusRegister |= FLAG_ERROR_ALERT;
    statusRegister &= ~FLAG_TX_ACTIVE;
    printf("After Error Triggered     : 0x%02X (TX Cleared, Error Set)\n", statusRegister);

    /* 5. Toggle RX Buffer status */
    statusRegister ^= FLAG_RX_BUFFER;
    printf("After Toggling RX Buffer  : 0x%02X\n", statusRegister);
}

/* ============================================================================
 * PROJECT 2: Payroll Tax, Allowance & Net Salary Calculator
 * Demonstrates exact arithmetic conversions, precision limits & formatting
 * ============================================================================ */
void runProject2_PayrollCalculator(void) {
    const float HRA_PERCENT = 20.0f;
    const float DA_PERCENT = 15.0f;
    const float PF_DEDUCTION_PERCENT = 12.0f;
    const float PROFESSIONAL_TAX = 200.0f;

    double basicSalary = 45000.0;
    
    double hraAmount = (basicSalary * HRA_PERCENT) / 100.0;
    double daAmount = (basicSalary * DA_PERCENT) / 100.0;
    double grossSalary = basicSalary + hraAmount + daAmount;
    
    double pfAmount = (basicSalary * PF_DEDUCTION_PERCENT) / 100.0;
    double totalDeductions = pfAmount + PROFESSIONAL_TAX;
    double netSalary = grossSalary - totalDeductions;

    printf("\n=== PROJECT 2: PAYROLL TAX & ALLOWANCE CALCULATOR ===\n");
    printf("----------------------------------------------------\n");
    printf("Basic Salary         : INR %.2f\n", basicSalary);
    printf("HRA (%.0f%%)          : INR %.2f\n", HRA_PERCENT, hraAmount);
    printf("DA  (%.0f%%)          : INR %.2f\n", DA_PERCENT, daAmount);
    printf("----------------------------------------------------\n");
    printf("Gross Salary         : INR %.2f\n", grossSalary);
    printf("----------------------------------------------------\n");
    printf("PF Deduction (%.0f%%) : INR %.2f\n", PF_DEDUCTION_PERCENT, pfAmount);
    printf("Professional Tax     : INR %.2f\n", PROFESSIONAL_TAX);
    printf("Total Deductions     : INR %.2f\n", totalDeductions);
    printf("====================================================\n");
    printf("NET TAKE-HOME SALARY : INR %.2f\n", netSalary);
    printf("====================================================\n");
}

int main(void) {
    printf("===================================================================\n");
    printf("     MODULE 001_002 CAPSTONE PROJECTS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Engineering Lab\n");
    printf("===================================================================\n");

    runProject1_BitwiseRegister();
    runProject2_PayrollCalculator();

    return 0;
}
