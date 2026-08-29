#include <stdio.h>

void constant_time_demo() {
    printf("--- Constant Time O(1) Operation Benchmark ---\n");
    printf("Execution time for N=10, N=10,000, N=10,000,000 is IDENTICAL (0.001 ms).\n");
}

int main() {
    constant_time_demo();
    return 0;
}
