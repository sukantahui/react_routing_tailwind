#include <stdio.h>

void exponential_counter_loop_demo() {
    printf("--- Exponential Counter Loop ---\n");
    printf("Evaluated outer i=1..2^N x inner O(1): 2^N steps (O(2^N) time complexity).\n");
}

int main() {
    exponential_counter_loop_demo();
    return 0;
}
