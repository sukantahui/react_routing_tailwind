#include <stdio.h>

unsigned int next_higher_same_set_bits(unsigned int n) {
    unsigned int c = n & -n;
    unsigned int r = n + c;
    return (((r ^ n) >> 2) / c) | r;
}

int main() {
    unsigned int n = 12; // 12 = 1100 (2 set bits) -> next higher with 2 set bits is 17 (10001)
    printf("--- Next Higher Number with Same Set Bits ---\nOriginal N = %u (1100)\nNext Higher = %u\n", n, next_higher_same_set_bits(n));
    return 0;
}
