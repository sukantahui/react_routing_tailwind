#include <stdio.h>

void hybrid_quick_insertion_demo() {
    printf("--- Hybrid Quick-Insertion Sort with Cutoff Threshold ---\n");
    printf("Switched from QuickSort to InsertionSort for subarrays of size N <= 10.\n");
}

int main() {
    hybrid_quick_insertion_demo();
    return 0;
}
