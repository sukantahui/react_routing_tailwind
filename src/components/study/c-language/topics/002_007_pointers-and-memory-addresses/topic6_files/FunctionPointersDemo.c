#include <stdio.h>
#include <stdlib.h>

/**
 * FunctionPointersDemo.c
 * Demonstrates function pointers in C: syntax, callbacks, dispatch tables (jump tables),
 * and standard library qsort() custom comparators.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

// Math Operation Functions
int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }
int divide(int a, int b) { return (b != 0) ? a / b : 0; }

// 1. Function Pointer Type Definition
typedef int (*MathOperationFunc)(int, int);

// 2. Higher-Order Callback Function
void performOperation(int a, int b, MathOperationFunc operation, const char *opName) {
    int result = operation(a, b);
    printf("   • %s(%d, %d) = %d\n", opName, a, b, result);
}

// 3. Custom Comparator for qsort (Ascending & Descending)
int cmpAscending(const void *a, const void *b) {
    return (*(const int*)a - *(const int*)b);
}

int cmpDescending(const void *a, const void *b) {
    return (*(const int*)b - *(const int*)a);
}

int main(void) {
    printf("====================================================\n");
    printf(" Function Pointers, Callbacks & Dispatch Tables\n");
    printf(" Coder & AccoTax | Educator: Sukanta Hui\n");
    printf("====================================================\n\n");

    // 1. Direct Function Pointer Invocation
    MathOperationFunc pFunc = add;
    printf("1. Direct Function Pointer Call:\n");
    printf("   • pFunc (address %p) called with (15, 25): %d\n\n", (void*)pFunc, pFunc(15, 25));

    // 2. Callbacks via Higher-Order Function
    printf("2. Callbacks to Higher-Order Functions:\n");
    performOperation(20, 10, add, "Add");
    performOperation(20, 10, subtract, "Subtract");
    performOperation(20, 10, multiply, "Multiply");
    printf("\n");

    // 3. Dispatch Table (Array of Function Pointers)
    MathOperationFunc dispatchTable[4] = {add, subtract, multiply, divide};
    const char *opLabels[4] = {"+", "-", "*", "/"};
    int x = 40, y = 8;

    printf("3. Calculator Dispatch Table Array:\n");
    for (int i = 0; i < 4; i++) {
        printf("   • Op [%d] %d %s %d = %d\n", i, x, opLabels[i], y, dispatchTable[i](x, y));
    }
    printf("\n");

    // 4. Standard Library qsort() with Custom Comparator Callback
    int scores[] = {85, 42, 99, 63, 77};
    int n = sizeof(scores) / sizeof(scores[0]);

    printf("4. qsort() Sorting with Custom Function Pointer Comparators:\n");
    qsort(scores, n, sizeof(int), cmpAscending);
    printf("   • Ascending Sort : [ ");
    for (int i = 0; i < n; i++) printf("%d ", scores[i]);
    printf("]\n");

    qsort(scores, n, sizeof(int), cmpDescending);
    printf("   • Descending Sort: [ ");
    for (int i = 0; i < n; i++) printf("%d ", scores[i]);
    printf("]\n");

    return 0;
}
