#include <stdio.h>

// DANGEROUS: no parentheses
#define SQUARE_BAD(x) x * x

int main() {
    int a = 5;
    printf("SQUARE_BAD(5) = %d\n", SQUARE_BAD(5));      // 25, ok
    printf("SQUARE_BAD(1+2) = %d\n", SQUARE_BAD(1+2));  // 1+2*1+2 = 5 (wrong!)
    return 0;
}