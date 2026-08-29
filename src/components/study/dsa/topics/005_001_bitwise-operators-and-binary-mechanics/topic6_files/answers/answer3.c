#include <stdio.h>

int set_bit(int n, int k) { return n | (1 << k); }
int clear_bit(int n, int k) { return n & ~(1 << k); }
int toggle_bit(int n, int k) { return n ^ (1 << k); }

int main() {
    int n = 5; // 0101
    printf("--- Set, Clear, and Toggle K-th Bit ---\nOriginal N = %d\n", n);
    printf("Set Bit 1   : %d (0111)\n", set_bit(n, 1));
    printf("Clear Bit 2 : %d (0001)\n", clear_bit(n, 2));
    printf("Toggle Bit 0: %d (0100)\n", toggle_bit(n, 0));
    return 0;
}
