#include <stdio.h>

void little_o_profiler_demo() {
    printf("--- Little-o vs Big-O Strict Upper Bound Profiler ---\n");
    printf("Limit as n->inf (n / n^2) = 0 -> n is o(n^2) (Strictly small upper bound).\n");
}

int main() {
    little_o_profiler_demo();
    return 0;
}
