#include <stdio.h>

void exponential_time_demo() {
    printf("--- Exponential Time O(2^N) Subset Generation Profiler ---\n");
    printf("N=10 -> 1,024 operations | N=20 -> 1,048,576 operations | N=30 -> 1,073,741,824 operations.\n");
}

int main() {
    exponential_time_demo();
    return 0;
}
