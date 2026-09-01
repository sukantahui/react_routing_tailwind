/**
 * ============================================================================
 * Program: ParameterPassingDemo.c
 * Module: 001_004 - Functions & Modular Programming
 * Topic 1: Parameter Passing: Call by Value vs Pointers (Call by Reference)
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>

/* ============================================================================
 * 1. CALL BY VALUE: Works on a duplicate copy; cannot modify original!
 * ============================================================================ */
void trySwapByValue(int x, int y) {
    int temp = x;
    x = y;
    y = temp;
    printf("   [Inside trySwapByValue] Copy X = %d, Copy Y = %d\n", x, y);
}

/* ============================================================================
 * 2. PASSING POINTERS (SIMULATED CALL BY REFERENCE): Modifies caller variables!
 * ============================================================================ */
void swapByPointer(int *ptrX, int *ptrY) {
    int temp = *ptrX;
    *ptrX = *ptrY;
    *ptrY = temp;
    printf("   [Inside swapByPointer] Memory values at %p and %p swapped!\n", (void*)ptrX, (void*)ptrY);
}

/* ============================================================================
 * 3. MULTIPLE OUT-PARAMETERS VIA POINTERS: Returns quotient and remainder
 * ============================================================================ */
void divideWithRemainder(int dividend, int divisor, int *quotientOut, int *remainderOut) {
    if (divisor != 0) {
        *quotientOut = dividend / divisor;
        *remainderOut = dividend % divisor;
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     CALL BY VALUE VS PASSING POINTERS - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* Test 1: Call by Value Failure */
    int a = 10, b = 20;
    printf("--- [Test 1] Call by Value (Passing Copies) ---\n");
    printf("Before Function Call : A = %d, B = %d\n", a, b);
    trySwapByValue(a, b);
    printf("After Function Call  : A = %d, B = %d (UNMODIFIED!)\n\n", a, b);

    /* Test 2: Passing Pointers Success */
    printf("--- [Test 2] Passing Pointers (Simulated Call by Reference) ---\n");
    printf("Before Function Call : A = %d, B = %d\n", a, b);
    swapByPointer(&a, &b); // Pass memory addresses
    printf("After Function Call  : A = %d, B = %d (SUCCESSFULLY SWAPPED!)\n\n", a, b);

    /* Test 3: Returning Multiple Results via Out-Parameters */
    int num = 47, den = 6;
    int q = 0, r = 0;
    printf("--- [Test 3] Multiple Return Out-Parameters ---\n");
    divideWithRemainder(num, den, &q, &r);
    printf("Dividend = %d, Divisor = %d -> Quotient = %d, Remainder = %d\n", num, den, q, r);

    printf("===================================================================\n");
    return 0;
}
