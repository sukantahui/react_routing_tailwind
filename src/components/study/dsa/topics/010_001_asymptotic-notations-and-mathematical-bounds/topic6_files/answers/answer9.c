#include <stdio.h>

void linearithmic_time_demo() {
    printf("--- Linearithmic Time O(N log N) Growth Profiler ---\n");
    printf("Execution time scales as N * log(N) (MergeSort / QuickSort growth).\n");
}

int main() {
    linearithmic_time_demo();
    return 0;
}
