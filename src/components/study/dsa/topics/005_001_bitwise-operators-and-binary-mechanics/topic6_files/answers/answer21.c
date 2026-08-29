#include <stdio.h>

unsigned int reverse_bits_swar(unsigned int x) {
    x = ((x >> 1) & 0x55555555) | ((x & 0x55555555) << 1);
    x = ((x >> 2) & 0x33333333) | ((x & 0x33333333) << 2);
    x = ((x >> 4) & 0x0F0F0F0F) | ((x & 0x0F0F0F0F) << 4);
    x = ((x >> 8) & 0x00FF00FF) | ((x & 0x00FF00FF) << 8);
    x = (x >> 16) | (x << 16);
    return x;
}

int main() {
    unsigned int n = 43261596;
    printf("--- SWAR Parallel Bit Reversal Engine ---\nOriginal N = %u\nSWAR Rev N = %u\n", n, reverse_bits_swar(n));
    return 0;
}
