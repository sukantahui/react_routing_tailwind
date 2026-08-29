#include <stdio.h>

int fast_abs(int n) {
    int mask = n >> 31; // 0 for positive, -1 for negative
    return (n ^ mask) - mask;
}

int main() {
    int n = -42;
    printf("--- Fast Absolute Value Without Branching ---\nInput: %d\nAbs  : %d\n", n, fast_abs(n));
    return 0;
}
