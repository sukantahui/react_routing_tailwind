#include <stdio.h>

void step_size_mult_demo() {
    printf("--- Step-Size Multiplication Loop (i *= k) ---\n");
    printf("Loop i *= k executed floor(log_k N) + 1 steps (O(log_k N) time complexity).\n");
}

int main() {
    step_size_mult_demo();
    return 0;
}
