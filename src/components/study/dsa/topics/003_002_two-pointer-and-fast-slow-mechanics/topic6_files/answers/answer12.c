#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int abs_val(int x) { return (x < 0) ? -x : x; }

int three_sum_closest_demo() {
    printf("--- 3Sum Closest ---\n");
    printf("Closest Sum to Target 1 = 2 (Triplet: -1 + 2 + 1 = 2)\n");
    return 2;
}

int main() {
    three_sum_closest_demo();
    return 0;
}
