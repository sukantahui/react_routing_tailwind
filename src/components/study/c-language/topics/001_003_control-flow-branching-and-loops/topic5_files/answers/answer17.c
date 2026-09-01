/**
 * ============================================================================
 * Project 17: Digital Cash Register & Optimal Currency Denomination Breakdown
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void calculateDenominations(int amount) {
    printf("--- Currency Breakdown for INR %d ---\n", amount);
    if (amount <= 0) {
        printf(">> Invalid currency amount!\n\n");
        return;
    }

    /* Standard Indian Rupee Denominations */
    int notes[] = {500, 200, 100, 50, 20, 10, 5, 2, 1};
    int noteCount = sizeof(notes) / sizeof(notes[0]);

    int remaining = amount;
    int totalNotes = 0;

    printf("Denomination Breakdown (Greedy Allocation):\n");
    for (int i = 0; i < noteCount; i++) {
        int noteVal = notes[i];
        if (remaining >= noteVal) {
            int count = remaining / noteVal;
            remaining %= noteVal;
            totalNotes += count;
            printf("  • INR %3d Notes : %4d  (Total = INR %d)\n", noteVal, count, count * noteVal);
        }
    }
    printf(">> Minimum Total Notes/Coins Required: %d\n\n", totalNotes);
}

int main(void) {
    printf("===================================================================\n");
    printf("     DIGITAL CASH REGISTER & CURRENCY BREAKDOWN - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    calculateDenominations(3888);
    calculateDenominations(1475);
    calculateDenominations(92);

    printf("===================================================================\n");
    return 0;
}
