// Example 1: Missing prototype (implicit declaration)
// Compile with: gcc -std=c99 -Wall missing_prototype.c

#include <stdio.h>

int main() {
    int result = add(5, 3);   // ERROR: implicit declaration
    printf("Result = %d\n", result);
    return 0;
}

int add(int a, int b) {
    return a + b;
}