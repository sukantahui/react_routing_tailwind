#include <stdio.h>

// We'd like to return both quotient and remainder
// This is NOT possible in C (without structs or pointers)
int divide(int a, int b) {
    int q = a / b;
    int r = a % b;
    // Can't return two values!
    return q;   // only one value returned
}

int main() {
    int result = divide(10, 3);
    printf("Quotient = %d (remainder lost)\n", result);
    return 0;
}