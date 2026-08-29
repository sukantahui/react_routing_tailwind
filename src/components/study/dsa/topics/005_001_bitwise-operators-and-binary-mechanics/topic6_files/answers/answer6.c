#include <stdio.h>

int count_set_bits_brian_kernighan(int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1); // Clears the lowest set bit
        count++;
    }
    return count;
}

int main() {
    int n = 29; // 29 = 11101 (4 set bits)
    printf("--- Count Set Bits (Brian Kernighan's Algorithm) ---\n");
    printf("Number of set bits in %d = %d\n", n, count_set_bits_brian_kernighan(n));
    return 0;
}
