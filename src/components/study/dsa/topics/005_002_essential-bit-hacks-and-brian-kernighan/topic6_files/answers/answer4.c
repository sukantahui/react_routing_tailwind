#include <stdio.h>

int clear_trailing_ones(int n) {
    return n & (n + 1);
}

int main() {
    int n = 11; // 11 = 1011 -> 1000 (8)
    printf("--- Clear Trailing Ones (N & (N + 1)) ---\nOriginal N = %d (1011)\nAfter Clear = %d (1000)\n", n, clear_trailing_ones(n));
    return 0;
}
