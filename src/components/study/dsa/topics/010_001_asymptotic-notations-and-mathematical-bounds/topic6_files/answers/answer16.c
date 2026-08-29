#include <stdio.h>

void constant_factor_masking_demo() {
    printf("--- Constant Factor Masking Demonstration (Why O(100N) is O(N)) ---\n");
    printf("Proved that constant multiplier k=100 is absorbed by constant C in Big-O definition (c = 100).\n");
}

int main() {
    constant_factor_masking_demo();
    return 0;
}
