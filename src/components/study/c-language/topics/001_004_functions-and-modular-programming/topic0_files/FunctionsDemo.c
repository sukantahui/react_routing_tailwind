#include <stdio.h>

/**
 * FunctionsDemo.c
 * Function prototypes, pass-by-value vs pass-by-reference,
 * and static storage class persistence.
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

// Function Prototypes
int calculateFactorial(int n);
void incrementCounter(void);
void swapValues(int *x, int *y);

int main(void) {
    int a = 10, b = 20;

    printf("=== C Functions & Storage Classes ===\n\n");

    // Call by Value / Factorial
    printf("Factorial of 5: %d\n\n", calculateFactorial(5));

    // Call by Reference / Pointer swap
    printf("Before Swap: a = %d, b = %d\n", a, b);
    swapValues(&a, &b);
    printf("After Swap : a = %d, b = %d\n\n", a, b);

    // Static Storage Class Persistence
    printf("Static Counter Calls:\n");
    incrementCounter();
    incrementCounter();
    incrementCounter();

    return 0;
}

int calculateFactorial(int n) {
    if (n <= 1) return 1;
    return n * calculateFactorial(n - 1);
}

void swapValues(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

void incrementCounter(void) {
    static int count = 0; // Persistent local storage across function invocations
    count++;
    printf("Counter Value: %d\n", count);
}
