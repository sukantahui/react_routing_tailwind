/**
 * ============================================================================
 * Project 6: Tower of Hanoi 3-Peg Solver with Step Counting & State Ledger
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void solveHanoi(int disks, char source, char destination, char auxiliary, int *moveCounter) {
    if (disks == 1) {
        (*moveCounter)++;
        printf("  Step %02d: Move disk 1 from Peg [%c] -> Peg [%c]\n", *moveCounter, source, destination);
        return;
    }

    /* Move n-1 disks from source to auxiliary using destination */
    solveHanoi(disks - 1, source, auxiliary, destination, moveCounter);

    /* Move nth largest disk from source to destination */
    (*moveCounter)++;
    printf("  Step %02d: Move disk %d from Peg [%c] -> Peg [%c]\n", *moveCounter, disks, source, destination);

    /* Move n-1 disks from auxiliary to destination using source */
    solveHanoi(disks - 1, auxiliary, destination, source, moveCounter);
}

int main(void) {
    printf("===================================================================\n");
    printf("     TOWER OF HANOI RECURSIVE SOLVER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int disks = 3;
    int moves = 0;

    printf("Solving Tower of Hanoi for N = %d disks (Expected moves = 2^%d - 1 = %d):\n\n",
           disks, disks, (1 << disks) - 1);

    solveHanoi(disks, 'A', 'C', 'B', &moves);

    printf("\n>> Total Disks Moved: %d | Total Sequential Moves: %d\n", disks, moves);
    printf("===================================================================\n");
    return 0;
}
