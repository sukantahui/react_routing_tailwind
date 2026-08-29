#include <stdio.h>

void log_time_demo() {
    printf("--- Logarithmic Time O(log N) Growth Profiler ---\n");
    printf("Steps for N=1000 -> 10 steps | N=1,000,000 -> 20 steps (Logarithmic growth).\n");
}

int main() {
    log_time_demo();
    return 0;
}
