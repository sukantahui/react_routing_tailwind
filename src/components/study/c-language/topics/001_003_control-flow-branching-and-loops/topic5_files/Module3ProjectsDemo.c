/**
 * ============================================================================
 * Program: Module3ProjectsDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 5: Hands-on Projects: ATM Banking, Prime/Armstrong Engine, Patterns
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Project 1: Interactive ATM Banking Engine */
void runAtmBankingDemo(void) {
    printf("--- [Project 1] Interactive ATM Simulator ---\n");
    double balance = 25000.0;
    int enteredPin = 1234;
    int correctPin = 1234;

    if (enteredPin == correctPin) {
        printf("Authentication Successful!\n");
        printf("Initial Balance: INR %.2f\n", balance);
        
        /* Deposit Transaction */
        double depositAmount = 5000.0;
        balance += depositAmount;
        printf("Deposited: INR %.2f | New Balance: INR %.2f\n", depositAmount, balance);

        /* Withdrawal Transaction with Validation */
        double withdrawAmount = 7000.0;
        if (withdrawAmount <= balance && (int)withdrawAmount % 100 == 0) {
            balance -= withdrawAmount;
            printf("Withdrawn: INR %.2f | Final Balance: INR %.2f\n", withdrawAmount, balance);
        }
    }
}

/* Project 2: Number Analysis Engine (Prime & Armstrong Verifier) */
void runNumberAnalysisDemo(int number) {
    printf("\n--- [Project 2] Number Analysis for %d ---\n", number);
    
    /* 1. Prime Verification */
    bool isPrime = (number >= 2);
    for (int d = 2; d * d <= number; d++) {
        if (number % d == 0) {
            isPrime = false;
            break;
        }
    }
    printf("Prime Status     : %s\n", isPrime ? "PRIME" : "COMPOSITE / NOT PRIME");

    /* 2. Armstrong Verification */
    int temp = number, digitCount = 0;
    while (temp > 0) {
        digitCount++;
        temp /= 10;
    }
    
    temp = number;
    int armstrongSum = 0;
    while (temp > 0) {
        int rem = temp % 10;
        int powerProduct = 1;
        for (int p = 0; p < digitCount; p++) {
            powerProduct *= rem;
        }
        armstrongSum += powerProduct;
        temp /= 10;
    }
    printf("Armstrong Status : %s (Calculated Sum: %d)\n", 
           (armstrongSum == number) ? "ARMSTRONG NUMBER" : "NOT ARMSTRONG", armstrongSum);
}

/* Project 3: Diamond Pattern Generator */
void runDiamondGenerator(int n) {
    printf("\n--- [Project 3] Diamond Pattern Generator (N = %d) ---\n", n);
    /* Upper Pyramid */
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int star = 1; star <= (2 * i - 1); star++) printf("*");
        printf("\n");
    }
    /* Lower Inverted Pyramid */
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int star = 1; star <= (2 * i - 1); star++) printf("*");
        printf("\n");
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     MODULE 001_003 CAPSTONE PROJECTS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    runAtmBankingDemo();
    runNumberAnalysisDemo(153);
    runDiamondGenerator(4);

    printf("===================================================================\n");
    return 0;
}
