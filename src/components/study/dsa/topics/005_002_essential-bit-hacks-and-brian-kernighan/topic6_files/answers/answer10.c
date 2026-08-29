#include <stdio.h>
#include <stdbool.h>

bool has_alternating_bits(int n) {
    long x = n ^ (n >> 1);
    return (x & (x + 1)) == 0;
}

int main() {
    int n = 5; // 5 = 101 (alternating)
    printf("--- Check Alternating Bits ---\n");
    printf("Does %d (101) have alternating bits: %s\n", n, has_alternating_bits(n) ? "YES" : "NO");
    return 0;
}
