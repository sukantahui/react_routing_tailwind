#include <stdio.h>

int compute_parity(unsigned int n) {
    n ^= n >> 16;
    n ^= n >> 8;
    n ^= n >> 4;
    n ^= n >> 2;
    n ^= n >> 1;
    return n & 1;
}

int main() {
    unsigned int n = 29; // 29 = 11101 (4 set bits -> even parity 0)
    printf("--- Bitwise Parity Computation ---\nNumber %u Parity = %d (%s)\n", n, compute_parity(n), compute_parity(n) ? "ODD" : "EVEN");
    return 0;
}
