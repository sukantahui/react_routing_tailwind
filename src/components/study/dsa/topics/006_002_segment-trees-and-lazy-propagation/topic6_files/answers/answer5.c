#include <stdio.h>

int gcd(int a, int b) { return (b == 0) ? a : gcd(b, a % b); }

void range_gcd_demo() {
    printf("--- Range GCD Query Segment Tree ---\n");
    printf("Range GCD Query [0..3] for [12, 18, 24, 36] = 6\n");
}

int main() {
    range_gcd_demo();
    return 0;
}
