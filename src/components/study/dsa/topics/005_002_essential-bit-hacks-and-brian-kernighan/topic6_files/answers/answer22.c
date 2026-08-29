#include <stdio.h>

static const int MultiplyDeBruijnBitPosition[32] = {
    0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8,
    31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9
};

int debruijn_lsb_index(unsigned int v) {
    return MultiplyDeBruijnBitPosition[((unsigned int)((v & -v) * 0x077CB531U)) >> 27];
}

int main() {
    unsigned int v = 18; // 18 = 10010 -> LSB at index 1
    printf("--- Bitwise De Bruijn Sequence Lookup Engine ---\n");
    printf("Rightmost set bit index of %u = %d\n", v, debruijn_lsb_index(v));
    return 0;
}
