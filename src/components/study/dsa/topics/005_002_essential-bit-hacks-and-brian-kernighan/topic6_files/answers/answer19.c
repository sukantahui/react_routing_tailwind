#include <stdio.h>

int fast_modulo_power_of_two(int n, int k) {
    int mask = (1 << k) - 1;
    return n & mask;
}

int main() {
    int n = 29, k = 4; // 2^4 = 16. 29 % 16 = 13
    printf("--- Fast Modulo by Power of Two ---\n%d %% (2^%d) = %d\n", n, k, fast_modulo_power_of_two(n, k));
    return 0;
}
