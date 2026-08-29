#include <stdio.h>
#include <math.h>

int position_rightmost_set_bit(int n) {
    if (n == 0) return -1;
    return log2(n & -n);
}

int main() {
    int n = 12; // 12 = 1100 -> LSB mask 4 -> pos 2
    printf("--- Position of Rightmost Set Bit ---\n");
    printf("Rightmost set bit position of %d = %d\n", n, position_rightmost_set_bit(n));
    return 0;
}
