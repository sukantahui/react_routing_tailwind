#include <stdio.h>

void dominance_ranking_demo() {
    printf("--- Asymptotic Dominance Ranking Tool ---\n");
    printf("Dominance Hierarchy: O(1) < O(log N) < O(sqrt N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!).\n");
}

int main() {
    dominance_ranking_demo();
    return 0;
}
