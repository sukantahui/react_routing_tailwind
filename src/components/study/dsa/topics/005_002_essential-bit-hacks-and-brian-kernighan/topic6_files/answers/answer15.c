#include <stdio.h>
#include <stdbool.h>

int count_set_bits(int n) {
    int c = 0;
    while (n > 0) { n &= (n - 1); c++; }
    return c;
}

bool same_set_bit_count(int a, int b) {
    return count_set_bits(a) == count_set_bits(b);
}

int main() {
    int a = 5, b = 6; // 5 = 101 (2), 6 = 110 (2)
    printf("--- Same Set Bit Count Check ---\n");
    printf("Do %d and %d have same set bit count: %s\n", a, b, same_set_bit_count(a, b) ? "YES" : "NO");
    return 0;
}
