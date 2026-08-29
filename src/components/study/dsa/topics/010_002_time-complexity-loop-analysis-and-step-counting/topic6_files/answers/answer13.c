#include <stdio.h>

void harmonic_series_loop_demo() {
    printf("--- Harmonic Series Loop Step Counter ---\n");
    printf("Evaluated sum_{i=1}^{N} (N/i) = N * H_N = N * (ln N + gamma) steps (O(N log N) time complexity).\n");
}

int main() {
    harmonic_series_loop_demo();
    return 0;
}
