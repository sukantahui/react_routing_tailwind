#include <stdio.h>

int set_trailing_zeroes(int n) {
    return n | (n - 1);
}

int main() {
    int n = 12; // 12 = 1100 -> 1111 (15)
    printf("--- Set Trailing Zeroes (N | (N - 1)) ---\nOriginal N = %d (1100)\nAfter Set = %d (1111)\n", n, set_trailing_zeroes(n));
    return 0;
}
