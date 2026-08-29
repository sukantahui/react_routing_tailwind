#include <stdio.h>

int lowest_set_bit_mask(int n) {
    return n & -n;
}

int main() {
    int n = 12; // 12 = 1100 -> lowest set bit mask = 0100 (4)
    printf("--- Extract Lowest Set Bit Mask (N & -N) ---\nN = %d (1100)\nLowest Set Bit Mask = %d (0100)\n", n, lowest_set_bit_mask(n));
    return 0;
}
