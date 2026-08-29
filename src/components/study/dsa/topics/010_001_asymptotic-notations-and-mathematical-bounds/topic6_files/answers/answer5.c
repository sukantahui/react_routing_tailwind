#include <stdio.h>

void little_omega_profiler_demo() {
    printf("--- Little-omega vs Big-Omega Strict Lower Bound Profiler ---\n");
    printf("Limit as n->inf (n^2 / n) = inf -> n^2 is omega(n) (Strictly large lower bound).\n");
}

int main() {
    little_omega_profiler_demo();
    return 0;
}
