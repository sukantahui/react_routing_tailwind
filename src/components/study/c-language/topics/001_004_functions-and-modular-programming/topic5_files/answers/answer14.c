/**
 * ============================================================================
 * Project 14: Mutual Indirect Recursion Parser
 * Module: 001_004 - Functions & Modular Programming
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

/* Forward Declarations for Mutual Recursion */
bool isEvenMutual(int n);
bool isOddMutual(int n);

bool isEvenMutual(int n) {
    if (n == 0) return true;
    if (n < 0) return isEvenMutual(-n);
    return isOddMutual(n - 1); // Calls isOddMutual!
}

bool isOddMutual(int n) {
    if (n == 0) return false;
    if (n < 0) return isOddMutual(-n);
    return isEvenMutual(n - 1); // Calls isEvenMutual!
}

int main(void) {
    printf("===================================================================\n");
    printf("     MUTUAL INDIRECT RECURSION PARSER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    int testValues[] = {0, 1, 4, 7, 12, 19, 42};
    int count = sizeof(testValues) / sizeof(testValues[0]);

    for (int i = 0; i < count; i++) {
        int v = testValues[i];
        printf("Number: %2d -> isEven = %-5s | isOdd = %-5s\n",
               v, isEvenMutual(v) ? "TRUE" : "FALSE", isOddMutual(v) ? "TRUE" : "FALSE");
    }

    printf("\n===================================================================\n");
    return 0;
}
