#include <stdio.h>

void log_step_counter_demo() {
    printf("--- Logarithmic Step Counter (i *= 2) ---\n");
    printf("Loop i *= 2 executed floor(log2 N) + 1 steps (O(log N) time complexity).\n");
}

int main() {
    log_step_counter_demo();
    return 0;
}
