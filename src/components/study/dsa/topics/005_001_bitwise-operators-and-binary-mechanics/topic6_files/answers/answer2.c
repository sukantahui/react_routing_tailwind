#include <stdio.h>
#include <stdbool.h>

bool is_kth_bit_set(int n, int k) {
    return (n & (1 << k)) != 0;
}

int main() {
    int n = 5, k = 2; // 5 = 101, k=2 bit is 1
    printf("--- Check if K-th Bit is Set ---\n");
    printf("Is bit %d set in %d: %s\n", k, n, is_kth_bit_set(n, k) ? "YES" : "NO");
    return 0;
}
