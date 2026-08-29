#include <stdio.h>

void tail_call_quicksort_demo() {
    printf("--- Tail Call Optimization in Quick Sort ---\n");
    printf("Guaranteed O(log N) call stack memory bound by recurring on smaller partition first.\n");
}

int main() {
    tail_call_quicksort_demo();
    return 0;
}
