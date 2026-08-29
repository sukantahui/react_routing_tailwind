#include <stdio.h>

void dependent_j_nested_loop_demo() {
    printf("--- Dependent Dependent-J Nested Loop Step Counter ---\n");
    printf("Summation sum_{i=0}^{N-1} i = N(N-1)/2 steps (O(N^2) time complexity).\n");
}

int main() {
    dependent_j_nested_loop_demo();
    return 0;
}
