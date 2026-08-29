#include <stdio.h>

void comparison_lower_bound_demo() {
    printf("--- Comparison Lower Bound Proof: Why Comparison Sorts are Omega(N log N) ---\n");
    printf("Decision Tree leaves N! >= 2^h implies height h >= log2(N!) = Omega(N log N).\n");
}

int main() {
    comparison_lower_bound_demo();
    return 0;
}
