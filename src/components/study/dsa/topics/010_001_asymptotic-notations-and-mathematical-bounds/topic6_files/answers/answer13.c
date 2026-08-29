#include <stdio.h>

void factorial_time_demo() {
    printf("--- Factorial Time O(N!) Permutation Generator Profiler ---\n");
    printf("N=5 -> 120 ops | N=10 -> 3,628,800 ops | N=15 -> 1,307,674,368,000 ops.\n");
}

int main() {
    factorial_time_demo();
    return 0;
}
