#include <stdio.h>

int clear_lowest_set_bit(int n) {
    return n & (n - 1);
}

int main() {
    int n = 12; // 12 = 1100 -> 1000 (8)
    printf("--- Clear Lowest Set Bit (N & (N - 1)) ---\nOriginal N = %d (1100)\nAfter Clear = %d (1000)\n", n, clear_lowest_set_bit(n));
    return 0;
}
