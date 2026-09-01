/**
 * ============================================================================
 * Project 8: Multi-Variable Value Swapping Engine (3 Distinct Variations)
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

int main(void) {
    printf("===================================================================\n");
    printf("     VARIABLE SWAPPING ALGORITHMIC LAB - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* Method 1: Using Temporary Storage Variable */
    int a = 10, b = 20;
    printf("--- [Method 1: Using Temporary Variable] ---\n");
    printf("Initial : A = %d, B = %d\n", a, b);
    int temp = a;
    a = b;
    b = temp;
    printf("Swapped : A = %d, B = %d\n\n", a, b);

    /* Method 2: Using Arithmetic Addition & Subtraction */
    int x = 45, y = 90;
    printf("--- [Method 2: Arithmetic (+ and -) Without Temp] ---\n");
    printf("Initial : X = %d, Y = %d\n", x, y);
    x = x + y; // x = 135
    y = x - y; // y = 135 - 90 = 45
    x = x - y; // x = 135 - 45 = 90
    printf("Swapped : X = %d, Y = %d\n\n", x, y);

    /* Method 3: Using Bitwise XOR (No Temp, No Overflow Risk) */
    int p = 0xAA, q = 0x55; // 170 and 85
    printf("--- [Method 3: Bitwise XOR (^) Without Temp] ---\n");
    printf("Initial : P = %#04X (%d), Q = %#04X (%d)\n", p, p, q, q);
    p = p ^ q;
    q = p ^ q;
    p = p ^ q;
    printf("Swapped : P = %#04X (%d), Q = %#04X (%d)\n", p, p, q, q);

    printf("===================================================================\n");
    return 0;
}
