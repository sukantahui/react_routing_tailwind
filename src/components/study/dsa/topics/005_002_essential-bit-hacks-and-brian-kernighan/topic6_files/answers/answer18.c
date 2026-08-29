#include <stdio.h>

int bitwise_negate(int n) {
    return ~n + 1;
}

int main() {
    int num = 42;
    printf("--- Bitwise Integer Sign Flip ---\nOriginal N = %d\nNegated N  = %d\n", num, bitwise_negate(num));
    return 0;
}
