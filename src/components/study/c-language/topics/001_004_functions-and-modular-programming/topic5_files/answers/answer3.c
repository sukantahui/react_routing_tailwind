/**
 * ============================================================================
 * Project 3: Banking Account State Machine with Persistent Static Transaction Ledger
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

void executeBankTransaction(const char *clientName, char actionType, double amount) {
    /* Persistent State across calls */
    static int transactionSequence = 1000;
    static double runningVaultBalance = 100000.00; // Initial 1 Lakh

    transactionSequence++;

    printf("[TXN-%04d] Client: %-12s | Action: %c | Amount: INR %8.2f\n",
           transactionSequence, clientName, actionType, amount);

    if (actionType == 'D' || actionType == 'd') {
        runningVaultBalance += amount;
        printf("   >> Deposit Processed. Updated Vault Balance: INR %.2f\n\n", runningVaultBalance);
    } else if (actionType == 'W' || actionType == 'w') {
        if (amount <= runningVaultBalance) {
            runningVaultBalance -= amount;
            printf("   >> Withdrawal Dispensed. Remaining Vault Balance: INR %.2f\n\n", runningVaultBalance);
        } else {
            printf("   >> REJECTED: Insufficient Vault Funds! Balance: INR %.2f\n\n", runningVaultBalance);
        }
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     PERSISTENT STATIC BANKING STATE MACHINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    executeBankTransaction("Swadeep", 'D', 25000.00);
    executeBankTransaction("Tuhina", 'W', 15000.00);
    executeBankTransaction("Abhronila", 'W', 80000.00);
    executeBankTransaction("Debangshu", 'W', 50000.00); // Trigger rejection check

    printf("===================================================================\n");
    return 0;
}
