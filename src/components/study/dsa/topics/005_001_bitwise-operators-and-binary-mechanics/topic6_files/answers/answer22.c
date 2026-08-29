#include <stdio.h>

int multiply_bitwise(int a, int b) {
    int result = 0;
    while (b > 0) {
        if (b & 1) result += a;
        a <<= 1;
        b >>= 1;
    }
    return result;
}

int main() {
    int a = 12, b = 9;
    printf("--- Bitwise Parallel Carry-Lookahead Multiplier ---\n");
    printf("%d * %d = %d\n", a, b, multiply_bitwise(a, b));
    return 0;
}
