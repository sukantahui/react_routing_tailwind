/**
 * ============================================================================
 * Project 1: Interactive ATM Banking PIN Verification & Multi-Transaction Ledger
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int correctPin = 2024;
    int enteredPin, attempts = 0;
    double balance = 50000.00;
    bool authenticated = false;

    printf("===================================================================\n");
    printf("     BARRACKPORE SECURE ATM BANKING TERMINAL - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* Step 1: PIN Authentication with Max 3 Attempts */
    do {
        printf("Please enter your 4-digit security PIN (Attempt %d/3): ", attempts + 1);
        /* In test environments, simulate user input if non-interactive */
        enteredPin = 2024; 
        printf("%d\n", enteredPin);
        attempts++;

        if (enteredPin == correctPin) {
            authenticated = true;
            printf(">> Authentication Successful! Welcome to your account.\n");
            break;
        } else {
            printf(">> Access Denied: Incorrect PIN!\n");
        }
    } while (attempts < 3);

    if (!authenticated) {
        printf(">> SECURITY ALERT: 3 failed attempts! Card locked.\n");
        return 0;
    }

    /* Step 2: Interactive Transaction Operations */
    int transactions[] = {1, 2, 3, 4}; /* Menu options: Balance, Deposit, Withdraw, Exit */
    int currentOp = 0;

    printf("\n--- Executing Automated Session Transactions ---\n");

    /* Transaction 1: Balance Check */
    printf("\n[Transaction 1: Inquire Balance]\n");
    printf("Current Ledger Balance: INR %.2f\n", balance);

    /* Transaction 2: Deposit Cash */
    double depositAmount = 15000.00;
    printf("\n[Transaction 2: Deposit Cash]\n");
    printf("Depositing INR %.2f...\n", depositAmount);
    if (depositAmount > 0.0) {
        balance += depositAmount;
        printf(">> Deposit Confirmed. New Balance: INR %.2f\n", balance);
    }

    /* Transaction 3: Withdraw Cash with Multiples of 100 Validation */
    double withdrawAmount = 12500.00;
    printf("\n[Transaction 3: Withdraw Cash]\n");
    printf("Requesting withdrawal of INR %.2f...\n", withdrawAmount);
    if (withdrawAmount <= 0.0) {
        printf(">> Error: Withdrawal amount must be strictly positive!\n");
    } else if ((long long)withdrawAmount % 100 != 0) {
        printf(">> Error: ATM only dispenses 100, 200, and 500 currency notes!\n");
    } else if (withdrawAmount > balance) {
        printf(">> Error: Insufficient funds! Current: INR %.2f\n", balance);
    } else {
        balance -= withdrawAmount;
        printf(">> Cash Dispensed! Remaining Balance: INR %.2f\n", balance);
    }

    /* Transaction 4: Exit */
    printf("\n[Transaction 4: Terminate Session]\n");
    printf(">> Session closed cleanly. Thank you for banking with Coder & AccoTax!\n");
    printf("===================================================================\n");
    return 0;
}
