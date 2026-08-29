#include <stdio.h>

unsigned int reverse_bits(unsigned int n) {
    unsigned int rev = 0;
    for (int i = 0; i < 32; i++) {
        rev = (rev << 1) | (n & 1);
        n >>= 1;
    }
    return rev;
}

int main() {
    unsigned int n = 43261596; // 00000010100101000001111010011100
    printf("--- Reverse Bits of 32-Bit Unsigned Integer ---\nOriginal N = %u\nReversed N = %u\n", n, reverse_bits(n));
    return 0;
}
