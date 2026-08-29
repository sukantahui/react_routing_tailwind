#include <stdio.h>

int msb_position(unsigned int n) {
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return (n + 1) >> 1;
}

int main() {
    unsigned int n = 18; // 18 = 10010 -> MSB mask = 16 (10000)
    printf("--- Find Most Significant Bit (MSB Mask) ---\nOriginal N = %u\nMSB Mask = %u\n", n, msb_position(n));
    return 0;
}
