// Example 3: Argument count/type mismatch
// Compile with: gcc -std=c99 -Wall argument_mismatch.c

#include <stdio.h>

void printSum(int a, int b) {
    printf("Sum = %d\n", a + b);
}

int main() {
    printSum(5);           // ERROR: too few arguments
    printSum(3.14, 2.71);  // WARNING: double passed to int (truncation)
    return 0;
}