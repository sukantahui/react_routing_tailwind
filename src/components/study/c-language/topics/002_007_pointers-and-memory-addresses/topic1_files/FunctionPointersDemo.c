#include <stdio.h>

/**
 * FunctionPointersDemo.c
 * Callback functions using Function Pointers in C
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// Function that accepts a function pointer callback
void executeOperation(int (*op)(int, int), int x, int y) {
    printf("Operation Result: %d\n", op(x, y));
}

int main(void) {
    printf("=== Function Pointer Callbacks ===\n\n");
    executeOperation(add, 10, 20);
    executeOperation(multiply, 10, 20);
    return 0;
}
