#include <stdio.h>

void sqrt_step_counter_demo() {
    printf("--- Square Root Step Counter (i * i <= N) ---\n");
    printf("Loop i*i <= N executed floor(sqrt(N)) steps (O(sqrt(N)) time complexity).\n");
}

int main() {
    sqrt_step_counter_demo();
    return 0;
}
