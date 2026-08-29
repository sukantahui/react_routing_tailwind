#include <stdio.h>

void log_multi_tier_loop_demo() {
    printf("--- Logarithmic Multi-Tier Nested Loops ---\n");
    printf("Evaluated outer loop N x inner loop i*=2: sum_{i=1}^{N} log2(i) = log2(N!) = O(N log N) steps.\n");
}

int main() {
    log_multi_tier_loop_demo();
    return 0;
}
